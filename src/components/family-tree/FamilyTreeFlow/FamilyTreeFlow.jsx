import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '../../common/Button/Button';
import { Modal } from '../../common/Modal/Modal';
import PersonForm from '../../form/PersonForm/PersonForm';
import RelationForm from '../../form/RelationForm/RelationForm';
import FamilyEdge from '../FamilyEdge/FamilyEdge';
import RelationNode from '../RelationNode/RelationNode';

// エッジとノードタイプの定義
const edgeTypes = {
  family: FamilyEdge,
};

const defaultNodeTypes = {
  person: null,
  relation: RelationNode,
};

const FamilyTreeFlow = ({
  nodes,
  edges,
  nodeTypes,
  onNodesChange,
  onEdgesChange,
  onPersonAdd,
  onEdgeDelete,
  onPersonEdit,
  onPersonDelete,
  onRelationAdd,
  onChildAdd,
}) => {
  const [showPersonForm, setShowPersonForm] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showPersonDetails, setShowPersonDetails] = useState(false);
  const [showPersonEdit, setShowPersonEdit] = useState(false);
  const [showRelationForm, setShowRelationForm] = useState(false);
  const [selectedRelation, setSelectedRelation] = useState(null);
  const [showRelationActions, setShowRelationActions] = useState(false);
  const [showChildSelectForm, setShowChildSelectForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // ReactFlowのオプション
  const flowOptions = useMemo(
    () => ({
      fitView: true,
      attributionPosition: 'bottom-right',
      minZoom: 0.1,
      maxZoom: 2,
      snapToGrid: true,
      snapGrid: [15, 15],
      defaultViewport: { x: 0, y: 0, zoom: 1 },
      preventScrolling: true,
      nodesDraggable: true,
      nodesConnectable: false,
      elementsSelectable: true,
      selectNodesOnDrag: false,
    }),
    [],
  );

  // ノードタイプの合成（メモ化）
  const combinedNodeTypes = useMemo(
    () => ({
      ...defaultNodeTypes,
      ...nodeTypes,
    }),
    [nodeTypes],
  );

  const handleNodeClick = (_, node) => {
    if (node.type === 'person') {
      setSelectedPerson(node.data);
      setShowPersonDetails(true);
    } else if (node.type === 'relation') {
      setSelectedRelation(node);
      setShowRelationActions(true);
    }
  };

  const handleEditPerson = data => {
    onPersonEdit?.(selectedPerson.id, data);
    setShowPersonEdit(false);
    setSelectedPerson(null);
  };

  const handleDeletePerson = () => {
    onPersonDelete?.(selectedPerson.id);
    setShowDeleteConfirm(false);
    setShowPersonDetails(false);
    setSelectedPerson(null);
  };

  const handleAddRelation = (person1Id, person2Id, relationName) => {
    onRelationAdd?.(person1Id, person2Id, relationName);
    setShowRelationForm(false);
    setSelectedPerson(null);
  };

  const calculateAge = birthDate => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="relative w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={combinedNodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        {...flowOptions}
      >
        <Background />
        <Controls />
        <MiniMap style={{ height: 120 }} />
      </ReactFlow>

      {/* 人物登録ボタン - ミニマップの上に配置 */}
      <div className="absolute bottom-32 right-4 z-50">
        <Button onClick={() => setShowPersonForm(true)}>人物登録</Button>
      </div>

      {/* 人物登録モーダル */}
      <Modal isOpen={showPersonForm} onClose={() => setShowPersonForm(false)} title="人物登録">
        <PersonForm
          onSubmit={data => {
            onPersonAdd?.(data);
            setShowPersonForm(false);
          }}
          onCancel={() => setShowPersonForm(false)}
        />
      </Modal>

      {/* 人物詳細モーダル */}
      <Modal
        isOpen={showPersonDetails}
        onClose={() => {
          setShowPersonDetails(false);
          setSelectedPerson(null);
        }}
        title="人物詳細"
      >
        {selectedPerson && (
          <div className="space-y-4">
            <div>
              <label className="font-semibold">名前：</label>
              <span>{selectedPerson.name}</span>
            </div>
            {selectedPerson.birthDate && (
              <div>
                <label className="font-semibold">生年月日：</label>
                <span>
                  {new Date(selectedPerson.birthDate).toLocaleDateString('ja-JP')} (
                  {calculateAge(selectedPerson.birthDate)}歳)
                </span>
              </div>
            )}
            {selectedPerson.gender && (
              <div>
                <label className="font-semibold">性別：</label>
                <span>{selectedPerson.gender}</span>
              </div>
            )}
            {selectedPerson.occupations?.length > 0 && (
              <div>
                <label className="font-semibold">職業：</label>
                <span>{selectedPerson.occupations.join('、')}</span>
              </div>
            )}
            {selectedPerson.hobbies?.length > 0 && (
              <div>
                <label className="font-semibold">趣味：</label>
                <span>{selectedPerson.hobbies.join('、')}</span>
              </div>
            )}
            {selectedPerson.allergies?.length > 0 && (
              <div>
                <label className="font-semibold">アレルギー：</label>
                <span>{selectedPerson.allergies.join('、')}</span>
              </div>
            )}
            {selectedPerson.notes && (
              <div>
                <label className="font-semibold">備考：</label>
                <div className="whitespace-pre-line">{selectedPerson.notes}</div>
              </div>
            )}
            <div className="flex justify-end gap-2 pt-4">
              <Button
                onClick={() => {
                  setShowPersonDetails(false);
                  setShowRelationForm(true);
                }}
              >
                関係を追加
              </Button>
              <Button
                onClick={() => {
                  setShowPersonDetails(false);
                  setShowPersonEdit(true);
                }}
              >
                編集
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setShowPersonDetails(false);
                  setShowDeleteConfirm(true);
                }}
              >
                削除
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 人物編集モーダル */}
      <Modal
        isOpen={showPersonEdit}
        onClose={() => {
          setShowPersonEdit(false);
          setSelectedPerson(null);
        }}
        title="人物編集"
      >
        <PersonForm
          initialData={selectedPerson}
          onSubmit={handleEditPerson}
          onCancel={() => {
            setShowPersonEdit(false);
            setSelectedPerson(null);
          }}
        />
      </Modal>

      {/* 人物削除確認モーダル */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="削除の確認"
      >
        <div className="space-y-4">
          <p className="text-red-600">
            この人物を削除すると、関連するすべての関係も削除されます。 この操作は取り消せません。
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
              キャンセル
            </Button>
            <Button variant="danger" onClick={handleDeletePerson}>
              削除する
            </Button>
          </div>
        </div>
      </Modal>

      {/* 関係追加モーダル */}
      <Modal
        isOpen={showRelationForm}
        onClose={() => {
          setShowRelationForm(false);
          setSelectedPerson(null);
        }}
        title="関係追加"
      >
        <RelationForm
          persons={nodes
            .filter(
              node =>
                node.type === 'person' &&
                !edges.some(
                  edge =>
                    (edge.source === selectedPerson?.id && edge.target === node.id) ||
                    (edge.target === selectedPerson?.id && edge.source === node.id),
                ),
            )
            .map(node => ({
              id: node.id,
              name: node.data.name,
            }))}
          initialPerson={selectedPerson}
          onSubmit={handleAddRelation}
          onCancel={() => {
            setShowRelationForm(false);
            setSelectedPerson(null);
          }}
        />
      </Modal>

      {/* 関係アクションモーダル */}
      <Modal
        isOpen={showRelationActions}
        onClose={() => {
          setShowRelationActions(false);
          setSelectedRelation(null);
        }}
        title="関係の操作"
      >
        <div className="flex flex-col gap-6">
          <Button onClick={() => setShowChildSelectForm(true)}>子供を選択</Button>
          <Button
            variant="danger"
            onClick={() => {
              onEdgeDelete?.(selectedRelation.id);
              setShowRelationActions(false);
              setSelectedRelation(null);
            }}
          >
            関係を削除
          </Button>
        </div>
      </Modal>

      {/* 既存の子供選択モーダル */}
      <Modal
        isOpen={showChildSelectForm}
        onClose={() => {
          setShowChildSelectForm(false);
          setSelectedRelation(null);
        }}
        title="子供を選択"
      >
        <RelationForm
          persons={[
            ...new Map(
              nodes
                .filter(node => {
                  // 人物ノードのみを対象
                  if (node.type !== 'person') return false;

                  // selectedRelationがない場合は全ての人物を表示
                  if (!selectedRelation) return true;

                  // 関係ノードに関連する人物を除外
                  const isRelatedPerson = edges.some(
                    edge =>
                      // 関係ノードに接続されているエッジを確認
                      edge.target === selectedRelation.id && edge.source === node.id,
                  );

                  return !isRelatedPerson;
                })
                .map(node => [
                  node.id,
                  {
                    id: node.id,
                    name: node.data.name,
                  },
                ]),
            ).values(),
          ]}
          initialPerson={null}
          onSubmit={(person1Id, person2Id) => {
            const selectedNode = nodes.find(node => node.id === person2Id);

            if (selectedNode) {
              // 既存の人物を子供として選択する場合のデータ
              const childData = {
                id: person2Id,
                type: 'person',
                position: selectedNode.position,
                width: selectedNode.width,
                height: selectedNode.height,
                ...selectedNode.data, // データを直接展開
              };

              // 子供の追加（エッジの作成は useFamily 内で行われる）
              onChildAdd?.(selectedRelation.id, childData);
            }
            setShowChildSelectForm(false);
            setSelectedRelation(null);
          }}
          onCancel={() => {
            setShowChildSelectForm(false);
            setSelectedRelation(null);
          }}
          relationName="子供"
          singleSelect={true}
        />
      </Modal>
    </div>
  );
};

FamilyTreeFlow.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  edges: PropTypes.arrayOf(PropTypes.object).isRequired,
  nodeTypes: PropTypes.object.isRequired,
  onNodesChange: PropTypes.func,
  onEdgesChange: PropTypes.func,
  onPersonAdd: PropTypes.func,
  onEdgeDelete: PropTypes.func,
  onPersonEdit: PropTypes.func,
  onPersonDelete: PropTypes.func,
  onRelationAdd: PropTypes.func,
  onChildAdd: PropTypes.func,
};

export default FamilyTreeFlow;
