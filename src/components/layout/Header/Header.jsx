import React from 'react';
import PropTypes from 'prop-types';
import SearchForm from '../../form/SearchForm/SearchForm';

const Header = ({ onSearch }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">家系図アプリ</h1>
          <div className="w-64">
            <SearchForm onSearch={onSearch} />
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
