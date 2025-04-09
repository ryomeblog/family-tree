import React from 'react';
import { fn } from '@storybook/test';
import RelationForm from './RelationForm';

export default {
  title: 'Form/RelationForm',
  component: RelationForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ width: '500px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

const samplePersons = [
  { id: '1', name: '山田太郎', age: 40 },
  { id: '2', name: '山田花子', age: 38 },
  { id: '3', name: '田中一郎', age: 35 },
  { id: '4', name: '田中美咲', age: 32, spouse: '3' },
  { id: '5', name: '佐藤健一', age: 45 },
  { id: '6', name: '佐藤良子', age: 42 },
];

// 基本的な関係追加
export const Basic = {
  args: {
    persons: samplePersons,
    onSubmit: fn(),
    onCancel: fn(),
  },
};

// 初期選択状態
export const WithInitialPerson = {
  args: {
    persons: samplePersons,
    initialPerson: samplePersons[0],
    onSubmit: fn(),
    onCancel: fn(),
  },
};

// 選択済み配偶者の除外
export const WithExistingSpouse = {
  args: {
    persons: samplePersons,
    initialPerson: samplePersons[2], // 田中一郎（配偶者あり）
    onSubmit: fn(),
    onCancel: fn(),
  },
};

// バリデーション表示
export const WithValidation = {
  args: {
    persons: samplePersons,
    onSubmit: fn(),
    onCancel: fn(),
  },
};
