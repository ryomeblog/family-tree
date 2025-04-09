# 家系図アプリケーションアーキテクチャ設計

## 1. ディレクトリ構造

```
src/
├── components/           # UIコンポーネント
│   ├── common/          # 共通コンポーネント
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.stories.jsx
│   │   ├── Modal/
│   │   │   ├── Modal.jsx
│   │   │   └── Modal.stories.jsx
│   │   ├── Tooltip/
│   │   │   ├── Tooltip.jsx
│   │   │   └── Tooltip.stories.jsx
│   │   └── Badge/
│   │       ├── Badge.jsx
│   │       └── Badge.stories.jsx
│   ├── layout/          # レイアウト関連
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.stories.jsx
│   │   └── ZoomControl/
│   │       ├── ZoomControl.jsx
│   │       └── ZoomControl.stories.jsx
│   ├── familyTree/      # 家系図関連
│   │   ├── PersonNode/
│   │   │   ├── PersonNode.jsx
│   │   │   └── PersonNode.stories.jsx
│   │   ├── FamilyEdge/
│   │   │   ├── FamilyEdge.jsx
│   │   │   └── FamilyEdge.stories.jsx
│   │   └── FamilyTreeFlow/
│   │       ├── FamilyTreeFlow.jsx
│   │       └── FamilyTreeFlow.stories.jsx
│   └── forms/           # フォーム関連
│       ├── PersonForm/
│       │   ├── PersonForm.jsx
│       │   └── PersonForm.stories.jsx
│       ├── RelationForm/
│       │   ├── RelationForm.jsx
│       │   └── RelationForm.stories.jsx
│       └── SearchForm/
│           ├── SearchForm.jsx
│           └── SearchForm.stories.jsx
├── hooks/               # カスタムフック
│   ├── useFlow.js      # ReactFlow関連のフック
│   ├── useLocalStorage.js
│   └── useFamily.js
├── utils/              # ユーティリティ関数
│   ├── flowLayout.js   # ReactFlow用レイアウト
│   ├── validation.js
│   └── storage.js
├── constants/          # 定数
│   ├── allergyOptions.js
│   └── validation.js
└── styles/            # スタイル
    └── tailwind/
```

## 2. コンポーネント設計

### 2.1 ReactFlow統合

```javascript
// カスタムノードのPropTypes
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
};

// カスタムエッジのPropTypes
FamilyEdge.propTypes = {
  id: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['spouse', 'child']).isRequired,
  children: PropTypes.arrayOf(PropTypes.string),
};

// ReactFlowのカスタム設定
const nodeTypes = {
  person: PersonNode,
};

const edgeTypes = {
  family: FamilyEdge,
};
```

### 2.2 共通コンポーネント

- **Button**

  - プロパティ: variant, size, disabled, onClick, children
  - バリエーション: primary, secondary, icon

- **Modal**

  - プロパティ: isOpen, onClose, title, children
  - 機能: 背景クリックで閉じる、ESCキーで閉じる

- **Tooltip**

  - プロパティ: content, position, children
  - 機能: ホバー/クリックでの表示切り替え

- **Badge**
  - プロパティ: text, variant, onRemove
  - 用途: 職業、趣味、アレルギーの表示

### 2.3 家系図コンポーネント

- **PersonNode**

  - ReactFlowのカスタムノード
  - ツールチップ統合
  - コンテキストメニュー

- **FamilyEdge**

  - ReactFlowのカスタムエッジ
  - 夫婦・子供関係の表示
  - インタラクション機能

- **FamilyTreeFlow**
  - ReactFlowラッパー
  - レイアウト制御
  - インタラクション管理

## 3. データモデル

### 3.1 Person（人物）

```javascript
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
```

### 3.2 Relation（関係）

```javascript
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
```

### 3.3 ReactFlowデータ構造

```javascript
FamilyTreeFlow.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  edges: PropTypes.arrayOf(PropTypes.object).isRequired,
  onNodesChange: PropTypes.func,
  onEdgesChange: PropTypes.func,
  onNodeClick: PropTypes.func,
  onEdgeClick: PropTypes.func,
};
```

## 4. カスタムフック

### 4.1 useFlow

```javascript
const useFlow = () => {
  // ReactFlowの状態管理
  // ノード/エッジの操作
  // レイアウト計算
  // ズーム/パン制御
};
```

### 4.2 useFamily

```javascript
const useFamily = () => {
  // 家系図データの管理
  // ローカルストレージとの同期
  // ReactFlowデータへの変換
};
```

## 5. Storybookの構成

### 5.1 Stories構造

```
stories/
├── Introduction.stories.mdx   # ドキュメント
├── common/                    # 共通コンポーネント
├── familyTree/               # 家系図コンポーネント
└── forms/                    # フォームコンポーネント
```

### 5.2 Story作成ガイドライン

- コンポーネントごとに個別のストーリーファイル
- インタラクションのデモ
- 様々なユースケースの表示
- アクセシビリティテスト
- レスポンシブデザインの確認

## 6. ReactFlow統合のポイント

### 6.1 レイアウト

- 階層的レイアウトの実装
- 世代間の適切な間隔
- 兄弟ノード間の間隔

### 6.2 インタラクション

- ノード選択時の挙動
- エッジ操作の制御
- ミニマップの実装

### 6.3 パフォーマンス最適化

- メモ化によるレンダリング最適化
- 大規模データの効率的な処理
- レイアウト計算の最適化

## 7. バリデーションルール

### 7.1 人物情報

- 名前: 必須
- 生年月日: 任意
- 性別: 任意
- 職業: 任意、最大10個
- 趣味: 任意、最大10個
- アレルギー: 任意、事前定義された選択肢から選択
  - 選択肢は「えび」、「かに」、「くるみ」、「小麦」、「そば」、「卵」、「乳」、「落花生（ピーナッツ）」、「アーモンド」、「あわび」、「いか」、「いくら」、「オレンジ」、「カシューナッツ」、「キウイフルーツ」、「牛肉」、「ごま」、「さけ」、「さば」、「大豆」、「鶏肉」、「バナナ」、「豚肉」、「まつたけ」、「もも」、「やまいも」、「りんご」、「ゼラチン」
- 備考: 任意

### 7.2 関係

- 同一人物との関係は作成不可
- 既に配偶者がいる場合は新規関係を作成不可
