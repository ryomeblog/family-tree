import React from 'react';
import { fn } from '@storybook/test';
import { ReactFlowProvider } from 'reactflow';
import FamilyEdge from './FamilyEdge';

export default {
  title: 'Family Tree/FamilyEdge',
  component: FamilyEdge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ReactFlowProvider>
        <div style={{ width: '400px', height: '200px', padding: '20px' }}>
          <Story />
        </div>
      </ReactFlowProvider>
    ),
  ],
};

const defaultProps = {
  id: 'edge-1',
  sourceX: 50,
  sourceY: 50,
  targetX: 250,
  targetY: 50,
  sourcePosition: 'right',
  targetPosition: 'left',
  onChildAdd: fn(),
  onDelete: fn(),
};

// 基本的な関係線
export const Basic = {
  args: {
    ...defaultProps,
  },
};

// 選択状態の関係線
export const Selected = {
  args: {
    ...defaultProps,
    isSelected: true,
  },
};

// インタラクティブな操作
export const Interactive = {
  args: {
    ...defaultProps,
    onChildAdd: fn(),
    onDelete: fn(),
  },
};

// 斜めの関係線
export const Diagonal = {
  args: {
    ...defaultProps,
    targetX: 250,
    targetY: 150,
  },
};

// カスタムスタイル
export const CustomStyle = {
  args: {
    ...defaultProps,
    style: {
      strokeDasharray: '5,5',
    },
  },
};

// マーカー付き
export const WithMarker = {
  args: {
    ...defaultProps,
    markerEnd: 'url(#arrow)',
  },
};
