# Storybookコンポーネント設計書

## 1. 共通コンポーネント（Common Components）

### 1.1 Button

```jsx
Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'icon']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

// ストーリー一覧
- Primary Button (各サイズ)
- Secondary Button (各サイズ)
- Icon Button (各サイズ)
- Disabled状態
```

### 1.2 Modal

```jsx
Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

// ストーリー一覧
-基本的なモーダル - サイズバリエーション - 長いコンテンツ - フォーム付きモーダル;
```

### 1.3 Tooltip

```jsx
Tooltip.propTypes = {
  content: PropTypes.node,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  children: PropTypes.node,
  trigger: PropTypes.oneOf(['hover', 'click']),
};

// ストーリー一覧
-各方向のTooltip - クリックトリガー - ホバートリガー - カスタムコンテンツ;
```

### 1.4 Badge

```jsx
Badge.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(['occupation', 'hobby', 'allergy']),
  onRemove: PropTypes.func,
};

// ストーリー一覧
-職業バッジ - 趣味バッジ - アレルギーバッジ - 削除可能バッジ;
```

## 2. 家系図コンポーネント（ReactFlow Components）

### 2.1 PersonNode

```jsx
PersonNode.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    birthDate: PropTypes.instanceOf(Date),
    gender: PropTypes.string,
    occupations: PropTypes.arrayOf(PropTypes.string),
    hobbies: PropTypes.arrayOf(PropTypes.string),
    allergies: PropTypes.arrayOf(PropTypes.string),
    notes: PropTypes.string,
  }).isRequired,
  isSelected: PropTypes.bool,
  onRelationAdd: PropTypes.func,
};

// ストーリー一覧
- 基本的な人物ノード
- 選択状態のノード
- 最小限の情報（名前のみ）
- 全情報表示
- 生年月日と年齢表示
- 備考付き表示
```

### 2.2 FamilyEdge

```jsx
FamilyEdge.propTypes = {
  id: PropTypes.string.isRequired,
  sourceX: PropTypes.number.isRequired,
  sourceY: PropTypes.number.isRequired,
  targetX: PropTypes.number.isRequired,
  targetY: PropTypes.number.isRequired,
  sourcePosition: PropTypes.string.isRequired,
  targetPosition: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onChildAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

// ストーリー一覧
-夫婦関係線 - 親子関係線 - 選択状態の関係線 - ツールチップ付き関係線 - インタラクティブな操作;
```

### 2.3 FamilyTreeFlow

```jsx
FamilyTreeFlow.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  edges: PropTypes.arrayOf(PropTypes.object).isRequired,
  onNodesChange: PropTypes.func,
  onEdgesChange: PropTypes.func,
  onNodeClick: PropTypes.func,
  onEdgeClick: PropTypes.func,
};

// ストーリー一覧
- 空の家系図
- サンプルデータ表示
- ズーム＆パン操作
- ノード操作
- エッジ操作
- 複数世代の表示
```

## 3. フォームコンポーネント（Form Components）

### 3.1 PersonForm

```jsx
PersonForm.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    birthDate: PropTypes.instanceOf(Date),
    gender: PropTypes.string,
    occupations: PropTypes.arrayOf(PropTypes.string),
    hobbies: PropTypes.arrayOf(PropTypes.string),
    allergies: PropTypes.arrayOf(PropTypes.string),
    notes: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

// ストーリー一覧
- 新規登録フォーム
- 編集フォーム
- 生年月日入力
- 職業入力（複数）
- 趣味入力（複数）
- アレルギー選択（複数）
- 備考欄入力
```

### 3.2 RelationForm

```jsx
RelationForm.propTypes = {
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialPerson: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

// ストーリー一覧
-基本的な関係追加 - 初期選択状態 - バリデーションエラー表示 - 選択済み配偶者の除外;
```

### 3.3 SearchForm

```jsx
SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

// ストーリー一覧
-基本的な検索フォーム - 検索結果表示 - 検索中状態 - 結果なし状態;
```
