import React from 'react';
import PropTypes from 'prop-types';
import { Handle, Position } from 'reactflow';

const RelationNode = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200">
      <Handle type="target" position={Position.Left} id="left" style={{ top: '50%' }} />
      <Handle type="target" position={Position.Right} id="right" style={{ top: '50%' }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ left: '50%' }} />
      <div className="text-sm font-medium text-gray-700">{data.relationName}</div>
    </div>
  );
};

RelationNode.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    relationName: PropTypes.string.isRequired,
  }).isRequired,
};

export default RelationNode;
