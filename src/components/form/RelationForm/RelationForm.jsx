import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../common/Button/Button';

const RelationForm = ({ persons, initialPerson, onSubmit, onCancel, relationName: defaultRelationName, singleSelect }) => {
  const [selectedPerson, setSelectedPerson] = useState('');
  const [relationName, setRelationName] = useState(defaultRelationName || '');

  const handleSubmit = e => {
    e.preventDefault();
    if (selectedPerson) {
      if (initialPerson) {
        onSubmit(initialPerson.id, selectedPerson, relationName);
      } else if (singleSelect) {
        onSubmit(null, selectedPerson);
      }
    }
  };

  const inputStyle =
    'mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!defaultRelationName && (
        <div>
          <label className="block text-sm font-medium text-gray-700">関係名 *</label>
          <input
            type="text"
            value={relationName}
            onChange={e => setRelationName(e.target.value)}
            className={inputStyle}
            placeholder="例：夫婦、親子など"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">相手を選択 *</label>
        <select
          value={selectedPerson}
          onChange={e => setSelectedPerson(e.target.value)}
          className={inputStyle}
          required
        >
          <option value="">選択してください</option>
          {persons
            .filter(person => person.id !== initialPerson?.id)
            .map(person => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
        </select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          キャンセル
        </Button>
        <Button type="submit" disabled={!selectedPerson || (!defaultRelationName && !relationName)}>
          追加
        </Button>
      </div>
    </form>
  );
};

RelationForm.propTypes = {
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  initialPerson: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  relationName: PropTypes.string,
  singleSelect: PropTypes.bool,
};

RelationForm.defaultProps = {
  singleSelect: false,
};

export default RelationForm;
