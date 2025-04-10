import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/Modal/Modal';
import Button from '../common/Button/Button';

const ExportModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const getExportData = () => {
    const data = {
      persons: JSON.parse(localStorage.getItem('family-persons')),
      relations: JSON.parse(localStorage.getItem('family-relations')),
      nodePositions: JSON.parse(localStorage.getItem('family-node-positions')),
    };
    return JSON.stringify(data, null, 2);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getExportData());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('クリップボードへのコピーに失敗しました:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([getExportData()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'family-tree-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="データのエクスポート" size="large">
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded max-h-[60vh] overflow-y-auto">
          <pre className="whitespace-pre-wrap overflow-x-auto font-mono text-sm">
            {getExportData()}
          </pre>
        </div>
        <div className="flex justify-end space-x-4">
          <Button onClick={handleCopyToClipboard}>
            {copied ? 'コピーしました！' : 'クリップボードにコピー'}
          </Button>
          <Button onClick={handleDownload}>JSONファイルをダウンロード</Button>
        </div>
      </div>
    </Modal>
  );
};

ExportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ExportModal;
