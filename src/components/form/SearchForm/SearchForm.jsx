import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../common/Button/Button';

const SearchForm = ({ onSearch, placeholder = '名前や職業で検索' }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const inputStyle =
    'flex-1 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500';

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        className={inputStyle}
      />
      <Button type="submit" variant="primary" disabled={!query.trim()}>
        検索
      </Button>
      {query && (
        <Button type="button" variant="secondary" onClick={handleClear}>
          クリア
        </Button>
      )}
    </form>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchForm;
