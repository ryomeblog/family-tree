import React from 'react';
import { fn } from '@storybook/test';
import { ReactFlowProvider } from 'reactflow';
import PersonNode from './PersonNode';

export default {
  title: 'Family Tree/PersonNode',
  component: PersonNode,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ReactFlowProvider>
        <div style={{ width: '400px', height: '300px', padding: '20px' }}>
          <Story />
        </div>
      </ReactFlowProvider>
    ),
  ],
};

// 基本的な人物ノード（名前のみ）
export const Basic = {
  args: {
    data: {
      name: '山田太郎',
    },
    onRelationAdd: fn(),
  },
};

// 生年月日と性別のみ
export const WithBirthDateAndGender = {
  args: {
    data: {
      name: '山田花子',
      birthDate: new Date('1990-05-15'),
      gender: '女性',
    },
    onRelationAdd: fn(),
  },
};

// 選択状態のノード
export const Selected = {
  args: {
    data: {
      name: '田中一郎',
      birthDate: new Date('1985-08-22'),
      gender: '男性',
    },
    isSelected: true,
    onRelationAdd: fn(),
  },
};

// 全情報表示
export const FullInfo = {
  args: {
    data: {
      name: '佐藤美咲',
      birthDate: new Date('1992-11-03'),
      gender: '女性',
      occupations: ['プログラマー', 'デザイナー'],
      hobbies: ['読書', '料理', '旅行'],
      allergies: ['卵', '小麦'],
      notes: '趣味の料理は和食が得意\n休日は技術書を読んで過ごすことが多い',
    },
    onRelationAdd: fn(),
  },
};

// 複数の職業
export const MultipleOccupations = {
  args: {
    data: {
      name: '中村優子',
      birthDate: new Date('1978-03-18'),
      gender: '女性',
      occupations: ['教師', '作家', 'カウンセラー'],
      hobbies: ['絵画'],
      notes: '教育関連の著書を執筆\nスクールカウンセラーとしても活動',
    },
    onRelationAdd: fn(),
  },
};

// 複数のアレルギー
export const MultipleAllergies = {
  args: {
    data: {
      name: '高橋健二',
      birthDate: new Date('1995-12-07'),
      gender: '男性',
      occupations: ['シェフ'],
      hobbies: ['料理', '釣り'],
      allergies: ['えび', 'かに', '小麦', '乳'],
      notes: 'アレルギー対応専門のレストランで修行中',
    },
    onRelationAdd: fn(),
  },
};

// 長い備考
export const WithLongNotes = {
  args: {
    data: {
      name: '鈴木一郎',
      birthDate: new Date('1982-09-30'),
      gender: '男性',
      occupations: ['フリーランス'],
      hobbies: ['音楽', '旅行'],
      notes:
        '海外在住経験：\n- 2005-2008 ニューヨーク\n- 2010-2012 ロンドン\n- 2015-2018 シンガポール\n\n使用言語：\n- 日本語（ネイティブ）\n- 英語（ビジネスレベル）\n- 中国語（日常会話）',
    },
    onRelationAdd: fn(),
  },
};
