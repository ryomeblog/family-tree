import React from 'react';
import { fn } from '@storybook/test';
import { ReactFlowProvider } from 'reactflow';
import FamilyTreeFlow from './FamilyTreeFlow';

export default {
  title: 'Family Tree/FamilyTreeFlow',
  component: FamilyTreeFlow,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ReactFlowProvider>
        <div style={{ width: '100%', height: '600px' }}>
          <Story />
        </div>
      </ReactFlowProvider>
    ),
  ],
};

// 空の家系図
export const Empty = {
  args: {
    nodes: [],
    edges: [],
    onNodesChange: fn(),
    onEdgesChange: fn(),
    onNodeClick: fn(),
    onEdgeClick: fn(),
    onPersonAdd: fn(),
  },
};

// 基本的な家系図
export const Basic = {
  args: {
    nodes: [
      {
        id: '1',
        type: 'person',
        position: { x: 250, y: 0 },
        data: {
          name: '山田太郎',
          birthDate: new Date('1958-05-15'),
          gender: '男性',
          occupations: ['医師'],
        },
      },
      {
        id: '2',
        type: 'person',
        position: { x: 500, y: 0 },
        data: {
          name: '山田花子',
          birthDate: new Date('1960-08-23'),
          gender: '女性',
          occupations: ['教師'],
        },
      },
      {
        id: '3',
        type: 'person',
        position: { x: 375, y: 150 },
        data: {
          name: '山田一郎',
          birthDate: new Date('1988-12-10'),
          gender: '男性',
          occupations: ['会社員'],
          hobbies: ['読書', '旅行'],
          notes: '休日は家族と過ごすことが多い',
        },
      },
    ],
    edges: [
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        type: 'family',
      },
      {
        id: 'e1-3',
        source: '1',
        target: '3',
        type: 'family',
      },
    ],
    onNodesChange: fn(),
    onEdgesChange: fn(),
    onNodeClick: fn(),
    onEdgeClick: fn(),
    onPersonAdd: fn(),
  },
};

// 複数世代の家系図
export const MultipleGenerations = {
  args: {
    nodes: [
      {
        id: '1',
        type: 'person',
        position: { x: 250, y: 0 },
        data: {
          name: '佐藤一郎',
          birthDate: new Date('1938-03-20'),
          gender: '男性',
          occupations: ['元会社役員'],
          notes: '趣味は盆栽\n毎朝6時に起床して散歩をする習慣がある',
        },
      },
      {
        id: '2',
        type: 'person',
        position: { x: 500, y: 0 },
        data: {
          name: '佐藤みどり',
          birthDate: new Date('1940-11-05'),
          gender: '女性',
          hobbies: ['園芸'],
          notes: '家庭菜園で野菜を育てている',
        },
      },
      {
        id: '3',
        type: 'person',
        position: { x: 250, y: 150 },
        data: {
          name: '佐藤健一',
          birthDate: new Date('1968-07-15'),
          gender: '男性',
          occupations: ['医師'],
          allergies: ['えび', 'かに'],
        },
      },
      {
        id: '4',
        type: 'person',
        position: { x: 500, y: 150 },
        data: {
          name: '佐藤美咲',
          birthDate: new Date('1970-09-28'),
          gender: '女性',
          occupations: ['看護師'],
          hobbies: ['ヨガ', '料理'],
        },
      },
      {
        id: '5',
        type: 'person',
        position: { x: 375, y: 300 },
        data: {
          name: '佐藤優子',
          birthDate: new Date('1998-12-03'),
          gender: '女性',
          occupations: ['大学院生'],
          hobbies: ['音楽', '絵画'],
          allergies: ['卵'],
          notes: '医学部で研究中\n将来は小児科医を目指している',
        },
      },
    ],
    edges: [
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        type: 'family',
      },
      {
        id: 'e3-4',
        source: '3',
        target: '4',
        type: 'family',
      },
      {
        id: 'e1-3',
        source: '1',
        target: '3',
        type: 'family',
      },
      {
        id: 'e3-5',
        source: '3',
        target: '5',
        type: 'family',
      },
    ],
    onNodesChange: fn(),
    onEdgesChange: fn(),
    onNodeClick: fn(),
    onEdgeClick: fn(),
    onPersonAdd: fn(),
  },
};
