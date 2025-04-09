import React from 'react';
import PropTypes from 'prop-types';
import { Handle, Position } from 'reactflow';

const PersonNode = ({ data, selected }) => {
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md bg-white border-2 ${
        selected ? 'border-blue-500' : 'border-gray-200'
      }`}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex flex-col items-center gap-2">
        <div className="text-lg font-bold">{data.name}</div>
        {data.birthDate && (
          <div className="text-sm text-gray-500">
            {new Date(data.birthDate).toLocaleDateString('ja-JP')}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

PersonNode.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    birthDate: PropTypes.instanceOf(Date),
    gender: PropTypes.string,
    occupations: PropTypes.arrayOf(PropTypes.string),
    hobbies: PropTypes.arrayOf(PropTypes.string),
    allergies: PropTypes.arrayOf(PropTypes.string),
    notes: PropTypes.string,
  }).isRequired,
  selected: PropTypes.bool,
};

export default PersonNode;
