# 家系図アプリケーションコーディング規約

## 1. プロジェクト構造

### 1.1 ディレクトリ構造

```
src/
  ├── components/          # UIコンポーネント
  │   ├── common/         # 共通コンポーネント
  │   ├── family-tree/    # 家系図関連コンポーネント
  │   ├── form/          # フォームコンポーネント
  │   ├── layout/        # レイアウトコンポーネント
  │   ├── modal/         # モーダルコンポーネント
  │   └── pages/         # ページコンポーネント
  ├── hooks/             # カスタムフック
  ├── utils/            # ユーティリティ関数
  └── types/            # 型定義
```

### 1.2 ファイル命名規則

- コンポーネント: `PascalCase.jsx`（例：`PersonNode.jsx`）
- フック: `useCamelCase.js`（例：`useFamily.js`）
- ユーティリティ: `camelCase.js`（例：`formatDate.js`）
- テスト: `*.test.js`または`*.spec.js`
- Storybook: `*.stories.jsx`

## 2. コンポーネント設計

### 2.1 基本構造

```javascript
import React from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ prop1, prop2 }) => {
  return <div>{/* JSXの内容 */}</div>;
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.func,
};

export default ComponentName;
```

### 2.2 Props

- 必須のpropsには必ず`isRequired`を設定
- 型は具体的に指定（`any`は使用しない）
- デフォルト値は分割代入で指定
- 複雑なオブジェクトは`PropTypes.shape`で定義

## 3. スタイリング

### 3.1 Tailwind CSS

- ユーティリティクラスを優先して使用
- 共通のスタイルはコンポーネント間で再利用
- 複雑なスタイルは@applyディレクティブでカスタムクラスとして定義
- レスポンシブデザインはTailwindのブレークポイントを使用

### 3.2 命名規則

- BEMライクな命名（Tailwindの機能を活用しつつ）
- コンポーネント固有のクラス: `コンポーネント名-要素`
- 状態クラス: `is-状態名`または`has-状態名`

## 4. ロジック実装

### 4.1 カスタムフック

- 単一責任の原則に従う
- 状態ロジックは必ずフックとして分離
- 命名は`use`プレフィックスで始める
- 戻り値は一貫した形式のオブジェクトで返す

### 4.2 関数

- アロー関数を基本とする
- 複雑な関数は適切に分割
- メモ化（useMemo, useCallback）を適切に使用
- 副作用は明確に分離（useEffect内で管理）

## 5. コードフォーマット

### 5.1 基本ルール

- インデント: スペース2個
- 最大行長: 100文字
- セミコロン必須
- 文字列はシングルクォート
- オブジェクト/配列の最後のカンマは必須

### 5.2 import順序

1. Reactコア
2. サードパーティライブラリ
3. 自作コンポーネント
4. カスタムフック
5. ユーティリティ
6. 型定義
7. スタイル

## 6. コメント

### 6.1 必須コメント

- 複雑なロジックの説明
- 関数の仕様（JSDoc形式）
- バグ修正や一時的な対応（TODO/FIXME）

### 6.2 JSDocフォーマット

```javascript
/**
 * 関数の説明
 * @param {型} 引数名 - 説明
 * @returns {型} 戻り値の説明
 */
```

## 7. テスト

### 7.1 テストの種類

- ユニットテスト: 個々の関数やフック
- コンポーネントテスト: レンダリングとインタラクション
- 統合テスト: 複数のコンポーネントの連携

### 7.2 テスト規約

- テストファイルはテスト対象の隣に配置
- describe/itで適切にグループ化
- テストケースは given-when-then パターンで記述
- モックは最小限に留める

## 8. Storybook

### 8.1 ストーリー作成

- コンポーネントごとに基本ケースと変種を用意
- インタラクションテストを含める
- アクセシビリティテストを実施
- 適切なドキュメントを記述
