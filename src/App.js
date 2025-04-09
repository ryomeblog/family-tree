import React, { useState, useCallback, useMemo } from 'react';
import { ReactFlowProvider } from 'reactflow';
import Header from './components/layout/Header/Header';
import FamilyTreeFlow from './components/family-tree/FamilyTreeFlow/FamilyTreeFlow';
import useFamily from './hooks/useFamily';
import PersonNode from './components/family-tree/PersonNode/PersonNode';

// ノードタイプの定義をメモ化
const nodeTypes = {
  person: PersonNode,
};

function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addPerson,
    addRelation,
    addChild,
    updatePerson,
    deleteRelation,
    deletePerson,
    searchPersons,
  } = useFamily();

  const [searchResults, setSearchResults] = useState(null);

  // 検索ハンドラーをメモ化
  const handleSearch = useCallback(
    query => {
      if (!query) {
        setSearchResults(null);
        return;
      }
      const results = searchPersons(query);
      setSearchResults(results);
    },
    [searchPersons],
  );

  // 表示するノードをメモ化
  const displayNodes = useMemo(() => {
    if (!searchResults) return nodes;
    return nodes.filter(node => searchResults.some(p => p.id === node.id));
  }, [nodes, searchResults]);

  return (
    <ReactFlowProvider>
      <div className="h-screen flex flex-col">
        <Header onSearch={handleSearch} />
        <main className="flex-1 bg-gray-50">
          <FamilyTreeFlow
            nodeTypes={nodeTypes}
            nodes={displayNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onPersonAdd={addPerson}
            onEdgeDelete={deleteRelation}
            onPersonEdit={updatePerson}
            onPersonDelete={deletePerson}
            onRelationAdd={addRelation}
            onChildAdd={addChild}
          />
        </main>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
