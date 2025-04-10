import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchForm from '../../form/SearchForm/SearchForm';
import Button from '../../common/Button/Button';
import ExportModal from '../../modal/ExportModal';
import ImportModal from '../../modal/ImportModal';

const Header = ({ onSearch }) => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">家系図アプリ</h1>
          <div className="flex items-center space-x-4">
            <Button onClick={() => setIsExportModalOpen(true)}>エクスポート</Button>
            <Button onClick={() => setIsImportModalOpen(true)}>インポート</Button>
            <div className="w-64">
              <SearchForm onSearch={onSearch} />
            </div>
          </div>
        </div>
      </div>
      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
      <ImportModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} />
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
