import { useCallback, useEffect, useMemo } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from './useLocalStorage';

const useFamily = () => {
  const [persons, setPersons] = useLocalStorage('family-persons', []);
  const [relations, setRelations] = useLocalStorage('family-relations', []);
  const [nodePositions, setNodePositions] = useLocalStorage('family-node-positions', {});
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // ノードの位置を計算（メモ化）
  const calculateNodePosition = useMemo(() => {
    const baseX = 50;
    const baseY = 50;
    const horizontalGap = 200;
    const verticalGap = 100;
    const nodesPerRow = 3;

    return index => ({
      x: baseX + (index % nodesPerRow) * horizontalGap,
      y: baseY + Math.floor(index / nodesPerRow) * verticalGap,
    });
  }, []);

  // 関係の削除（内部用、再帰なし）
  const deleteRelationInternal = useCallback(
    relationId => {
      setRelations(prev => prev.filter(r => r.id !== relationId));
      setEdges(prev => prev.filter(edge => edge.id !== relationId));
    },
    [setRelations, setEdges],
  );

  // 人物の削除
  const deletePerson = useCallback(
    personId => {
      // 直接関連する関係を見つける
      const relatedRelationIds = relations
        .filter(
          relation =>
            relation.person1Id === personId ||
            relation.person2Id === personId ||
            relation.children.includes(personId),
        )
        .map(r => r.id);

      // 関係を一括削除
      relatedRelationIds.forEach(relationId => {
        deleteRelationInternal(relationId);
      });

      // 人物を削除
      setPersons(prev => prev.filter(person => person.id !== personId));
      setNodes(prev => prev.filter(node => node.id !== personId));
    },
    [relations, deleteRelationInternal, setPersons, setNodes],
  );

  // 人物の追加
  const addPerson = useCallback(
    data => {
      const id = uuidv4();
      const newPerson = { id, ...data };
      const position = calculateNodePosition(nodes.length);

      setPersons(prev => [...prev, newPerson]);
      setNodePositions(prev => ({
        ...prev,
        [id]: position,
      }));
      setNodes(prev => [
        ...prev,
        {
          id,
          type: 'person',
          position,
          data: newPerson,
        },
      ]);

      return id;
    },
    [setPersons, setNodes, calculateNodePosition],
  );

  // 関係ノードの位置を計算（メモ化）
  const calculateRelationNodePosition = useMemo(() => {
    return (person1Node, person2Node) => {
      const midX = (person1Node.position.x + person2Node.position.x) / 2;
      const maxY = Math.max(person1Node.position.y, person2Node.position.y);
      return {
        x: midX,
        y: maxY + 50,
      };
    };
  }, []);

  // 関係の追加
  const addRelation = useCallback(
    (person1Id, person2Id, relationName) => {
      const relationNodeId = uuidv4();
      const edge1Id = uuidv4();
      const edge2Id = uuidv4();

      // 親ノードを取得
      const person1Node = nodes.find(node => node.id === person1Id);
      const person2Node = nodes.find(node => node.id === person2Id);

      if (!person1Node || !person2Node) return null;

      // 関係ノードの位置を計算
      const relationNodePosition = calculateRelationNodePosition(person1Node, person2Node);

      // 関係ノードを追加
      const newRelation = {
        id: relationNodeId,
        person1Id,
        person2Id,
        relationName,
        children: [],
      };

      // 関係データを更新
      setRelations(prev => [...prev, newRelation]);

      // 関係ノードを追加
      setNodePositions(prev => ({
        ...prev,
        [relationNodeId]: relationNodePosition,
      }));
      setNodes(prev => [
        ...prev,
        {
          id: relationNodeId,
          type: 'relation',
          position: relationNodePosition,
          data: {
            id: relationNodeId,
            relationName,
          },
        },
      ]);

      // エッジを追加（人物→関係ノード）
      setEdges(prev => [
        ...prev,
        {
          id: edge1Id,
          source: person1Id,
          target: relationNodeId,
          type: 'family',
          sourceHandle: 'bottom',
          targetHandle: 'left',
        },
        {
          id: edge2Id,
          source: person2Id,
          target: relationNodeId,
          type: 'family',
          sourceHandle: 'bottom',
          targetHandle: 'right',
        },
      ]);

      return relationNodeId;
    },
    [nodes, setRelations, setNodes, setEdges, calculateRelationNodePosition],
  );

  // 子供の追加
  const addChild = useCallback(
    (relationNodeId, childData) => {
      // 既存の人物かどうかを確認
      const childId = childData.id;
      const edgeId = uuidv4();

      // 新規作成の場合のみ人物を追加
      if (!nodes.find(node => node.id === childId)) {
        addPerson(childData);
      }

      // 関係ノードを探す
      const relationNode = nodes.find(node => node.id === relationNodeId);
      if (!relationNode) return childId;

      // 子供の位置を計算
      const childPosition = {
        x: relationNode.position.x,
        y: relationNode.position.y + 100,
      };

      // 子供の位置を更新
      setNodePositions(prev => ({
        ...prev,
        [childId]: childPosition,
      }));
      setNodes(prev =>
        prev.map(node => {
          if (node.id === childId) {
            return {
              ...node,
              position: childPosition,
            };
          }
          return node;
        }),
      );

      // 関係に子供を追加
      setRelations(prev =>
        prev.map(relation => {
          if (relation.id === relationNodeId) {
            return {
              ...relation,
              children: [...relation.children, childId],
            };
          }
          return relation;
        }),
      );

      // エッジを追加（関係ノード→子供）
      setEdges(prev => [
        ...prev,
        {
          id: edgeId,
          source: relationNodeId,
          target: childId,
          type: 'family',
          sourceHandle: 'bottom',
          targetHandle: 'top',
        },
      ]);

      return childId;
    },
    [addPerson, nodes, setNodes, setRelations, setEdges],
  );

  // 人物の更新
  const updatePerson = useCallback(
    (id, data) => {
      setPersons(prev => prev.map(person => (person.id === id ? { ...person, ...data } : person)));

      setNodes(prev =>
        prev.map(node => (node.id === id ? { ...node, data: { ...node.data, ...data } } : node)),
      );
    },
    [setPersons, setNodes],
  );

  // 関係の削除（外部用）
  const deleteRelation = useCallback(
    relationNodeId => {
      const relation = relations.find(r => r.id === relationNodeId);
      if (!relation) return;

      // 関連するエッジを削除
      setEdges(prev =>
        prev.filter(edge => edge.source !== relationNodeId && edge.target !== relationNodeId),
      );

      // 関係を削除
      setRelations(prev => prev.filter(r => r.id !== relationNodeId));

      // 関係ノードを削除
      setNodes(prev => prev.filter(node => node.id !== relationNodeId));
    },
    [relations, setEdges, setRelations, setNodes],
  );

  // 人物の検索
  const searchPersons = useCallback(
    query => {
      const normalizedQuery = query.toLowerCase();
      return persons.filter(
        person =>
          person.name.toLowerCase().includes(normalizedQuery) ||
          person.occupations?.some(occupation =>
            occupation.toLowerCase().includes(normalizedQuery),
          ),
      );
    },
    [persons],
  );

  // 初期状態の設定
  // ノードの位置を更新
  const updateNodePosition = useCallback(
    (nodeId, position) => {
      setNodePositions(prev => ({
        ...prev,
        [nodeId]: position,
      }));
    },
    [setNodePositions],
  );

  // ノード変更時のハンドラーをカスタマイズ
  const handleNodesChange = useCallback(
    changes => {
      onNodesChange(changes);
      changes.forEach(change => {
        if (change.type === 'position' && change.position) {
          updateNodePosition(change.id, change.position);
        }
      });
    },
    [onNodesChange, updateNodePosition],
  );

  useEffect(() => {
    // 保存された人物データからノードを生成
    const initialNodes = persons.map(person => ({
      id: person.id,
      type: 'person',
      position: nodePositions[person.id] || calculateNodePosition(persons.indexOf(person)),
      data: person,
    }));

    // 関係ノードとエッジを生成
    const relationNodes = [];
    const relationEdges = [];

    relations.forEach(relation => {
      const person1Node = initialNodes.find(node => node.id === relation.person1Id);
      const person2Node = initialNodes.find(node => node.id === relation.person2Id);

      if (person1Node && person2Node) {
        // 関係ノードの位置を計算
        const relationNodePosition = calculateRelationNodePosition(person1Node, person2Node);

        // 関係ノードを追加
        // 関係ノードの位置を保存
        setNodePositions(prev => ({
          ...prev,
          [relation.id]: relationNodePosition,
        }));

        relationNodes.push({
          id: relation.id,
          type: 'relation',
          position: relationNodePosition,
          data: {
            id: relation.id,
            relationName: relation.relationName,
          },
        });

        // エッジを追加（人物→関係ノード）
        relationEdges.push(
          {
            id: `edge-${person1Node.id}-${relation.id}`,
            source: person1Node.id,
            target: relation.id,
            type: 'family',
            sourceHandle: 'bottom',
            targetHandle: 'left',
          },
          {
            id: `edge-${person2Node.id}-${relation.id}`,
            source: person2Node.id,
            target: relation.id,
            type: 'family',
            sourceHandle: 'bottom',
            targetHandle: 'right',
          },
        );

        // 子供へのエッジを追加
        relation.children.forEach(childId => {
          relationEdges.push({
            id: `edge-${relation.id}-${childId}`,
            source: relation.id,
            target: childId,
            type: 'family',
            sourceHandle: 'bottom',
            targetHandle: 'top',
          });
        });
      }
    });

    setNodes([...initialNodes, ...relationNodes]);
    setEdges(relationEdges);
  }, [
    persons,
    relations,
    calculateNodePosition,
    calculateRelationNodePosition,
    setNodes,
    setEdges,
  ]);

  return {
    persons,
    nodes,
    edges,
    onNodesChange: handleNodesChange,
    onEdgesChange,
    addPerson,
    addRelation,
    addChild,
    updatePerson,
    deleteRelation,
    deletePerson,
    searchPersons,
  };
};

export default useFamily;
