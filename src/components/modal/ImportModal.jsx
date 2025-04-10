import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/Modal/Modal';
import Button from '../common/Button/Button';

const ImportModal = ({ isOpen, onClose }) => {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImport = async data => {
    try {
      const parsedData = JSON.parse(data);

      // データの形式を検証
      if (!parsedData.persons || !parsedData.relations || !parsedData.nodePositions) {
        throw new Error('無効なデータ形式です');
      }

      // データを保存
      localStorage.setItem('family-persons', JSON.stringify(parsedData.persons));
      localStorage.setItem('family-relations', JSON.stringify(parsedData.relations));
      localStorage.setItem('family-node-positions', JSON.stringify(parsedData.nodePositions));

      // 成功したらモーダルを閉じてページをリロード
      onClose();
      window.location.reload();
    } catch (error) {
      setError('データのインポートに失敗しました: ' + error.message);
    }
  };

  const handleTextImport = () => {
    if (!jsonText.trim()) {
      setError('JSONテキストを入力してください');
      return;
    }
    handleImport(jsonText);
  };

  const handleFileImport = async event => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      handleImport(text);
    } catch (error) {
      setError('ファイルの読み込みに失敗しました');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="データのインポート" size="large">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">JSONテキストを入力</label>
          <textarea
            className="w-full h-48 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={jsonText}
            onChange={e => setJsonText(e.target.value)}
            placeholder="ここにJSONテキストを貼り付けてください"
          />
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileImport}
            accept=".json"
            className="hidden"
          />
          <Button onClick={() => fileInputRef.current.click()}>JSONファイルを選択</Button>
          <Button onClick={handleTextImport}>テキストをインポート</Button>
        </div>
      </div>
    </Modal>
  );
};

ImportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImportModal;
