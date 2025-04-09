import React from 'react';
import { Badge } from './Badge';

export default {
  title: 'Common/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// Basic Badge
export const Basic = {
  args: {
    text: 'エンジニア',
  },
};

// Occupation Badge
export const Occupation = {
  args: {
    text: 'プログラマー',
    variant: 'occupation',
  },
};

// Hobby Badge
export const Hobby = {
  args: {
    text: '読書',
    variant: 'hobby',
  },
};

// Allergy Badge
export const Allergy = {
  args: {
    text: '卵',
    variant: 'allergy',
  },
};

// Removable Badge
export const Removable = {
  args: {
    text: 'エンジニア',
    onRemove: () => alert('削除ボタンがクリックされました'),
  },
};

// All Variants
export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge text="プログラマー" variant="occupation" />
      <Badge text="プログラマー" variant="occupation" onRemove={() => {}} />
      <Badge text="読書" variant="hobby" />
      <Badge text="読書" variant="hobby" onRemove={() => {}} />
      <Badge text="卵" variant="allergy" />
      <Badge text="卵" variant="allergy" onRemove={() => {}} />
    </div>
  ),
};

// Multiple Badges
export const MultipleBadges = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">職業</h3>
        <div className="flex flex-wrap gap-2">
          <Badge text="プログラマー" variant="occupation" onRemove={() => {}} />
          <Badge text="エンジニア" variant="occupation" onRemove={() => {}} />
          <Badge text="デザイナー" variant="occupation" onRemove={() => {}} />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">趣味</h3>
        <div className="flex flex-wrap gap-2">
          <Badge text="読書" variant="hobby" onRemove={() => {}} />
          <Badge text="旅行" variant="hobby" onRemove={() => {}} />
          <Badge text="料理" variant="hobby" onRemove={() => {}} />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">アレルギー</h3>
        <div className="flex flex-wrap gap-2">
          <Badge text="卵" variant="allergy" onRemove={() => {}} />
          <Badge text="小麦" variant="allergy" onRemove={() => {}} />
          <Badge text="乳" variant="allergy" onRemove={() => {}} />
        </div>
      </div>
    </div>
  ),
};
