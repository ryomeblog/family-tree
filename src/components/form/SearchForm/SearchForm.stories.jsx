import React from 'react';
import { fn } from '@storybook/test';
import SearchForm from './SearchForm';

export default {
  title: 'Form/SearchForm',
  component: SearchForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ width: '400px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

// 基本的な検索フォーム
export const Basic = {
  args: {
    onSearch: fn(),
  },
};

// カスタムプレースホルダー
export const CustomPlaceholder = {
  args: {
    placeholder: '家族を検索...',
    onSearch: fn(),
  },
};

// 検索中状態
export const Searching = {
  args: {
    onSearch: fn(() => {
      // 実際のアプリケーションでは、この部分でローディング状態を制御します
      return new Promise(resolve => {
        setTimeout(resolve, 2000);
      });
    }),
  },
};

// 検索結果表示
export const WithResults = {
  args: {
    onSearch: fn(query => {
      // 実際のアプリケーションでは、この部分で検索結果を表示します
      const mockResults = [
        { id: '1', name: '山田太郎' },
        { id: '2', name: '山田花子' },
      ].filter(person => person.name.includes(query));
      console.log('検索結果:', mockResults);
    }),
  },
};

// 結果なし状態
export const NoResults = {
  args: {
    onSearch: fn(query => {
      // 実際のアプリケーションでは、この部分で「結果なし」を表示します
      console.log(`"${query}" に一致する検索結果が見つかりませんでした`);
    }),
  },
};
