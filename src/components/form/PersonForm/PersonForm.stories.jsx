import React from 'react';
import { fn } from '@storybook/test';
import PersonForm from './PersonForm';

export default {
  title: 'Form/PersonForm',
  component: PersonForm,
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

// 新規登録フォーム（必須項目のみ）
export const NewPerson = {
  args: {
    onSubmit: fn(),
    onCancel: fn(),
  },
};

// 編集フォーム（フル情報）
export const EditPerson = {
  args: {
    initialData: {
      name: '山田太郎',
      birthDate: new Date('1988-07-15'),
      gender: '男性',
      occupations: ['プログラマー', 'デザイナー'],
      hobbies: ['読書', '旅行'],
      allergies: ['卵', '小麦'],
      notes: '趣味の読書は主にミステリー小説\n休日は家族と過ごすことが多い',
    },
    onSubmit: fn(),
    onCancel: fn(),
  },
};

// 生年月日入力
export const WithBirthDate = {
  args: {
    initialData: {
      name: '鈴木一郎',
      birthDate: new Date('1995-12-03'),
      gender: '男性',
    },
    onSubmit: fn(),
    onCancel: fn(),
  },
};

// 職業入力（複数）
export const WithOccupations = {
  args: {
    initialData: {
      name: '佐藤健一',
      birthDate: new Date('1980-05-20'),
      gender: '男性',
      occupations: ['医師', '研究者', '大学教授'],
      notes: '大学病院に勤務しながら研究活動も行っている',
    },
    onSubmit: fn(),
    onCancel: fn(),
  },
};

// 趣味入力（複数）
export const WithHobbies = {
  args: {
    initialData: {
      name: '佐藤花子',
      birthDate: new Date('1992-08-12'),
      gender: '女性',
      occupations: ['会社員'],
      hobbies: ['料理', '園芸', '写真', 'ヨガ', '絵画'],
      notes: '週末は趣味の写真撮影や絵画教室に通っている',
    },
    onSubmit: fn(),
    onCancel: fn(),
  },
};

// アレルギー選択（複数）
export const WithAllergies = {
  args: {
    initialData: {
      name: '田中健一',
      birthDate: new Date('1990-03-25'),
      gender: '男性',
      occupations: ['シェフ'],
      hobbies: ['料理'],
      allergies: ['えび', 'かに', '小麦', '乳'],
      notes: 'アレルギー対応の料理開発に力を入れている',
    },
    onSubmit: fn(),
    onCancel: fn(),
  },
};

// 詳細な備考付き
export const WithDetailedNotes = {
  args: {
    initialData: {
      name: '中村優子',
      birthDate: new Date('1985-11-08'),
      gender: '女性',
      occupations: ['フリーランス', 'ライター'],
      hobbies: ['読書', '映画鑑賞'],
      notes:
        '在宅でライターとして活動\n得意分野は食文化とライフスタイル\n海外在住経験：2010-2015 ロンドン\n言語：日本語、英語',
    },
    onSubmit: fn(),
    onCancel: fn(),
  },
};
