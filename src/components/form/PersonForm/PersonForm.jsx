import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../common/Button/Button';
import { Badge } from '../../common/Badge/Badge';

const ALLERGY_OPTIONS = [
  'えび',
  'かに',
  'くるみ',
  '小麦',
  'そば',
  '卵',
  '乳',
  '落花生',
  'アーモンド',
  'あわび',
  'いか',
  'いくら',
  'オレンジ',
  'カシューナッツ',
  'キウイフルーツ',
  '牛肉',
  'ごま',
  'さけ',
  'さば',
  '大豆',
  '鶏肉',
  'バナナ',
  '豚肉',
  'まつたけ',
  'もも',
  'やまいも',
  'りんご',
  'ゼラチン',
];

const calculateAge = birthDate => {
  if (!birthDate) return null;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const PersonForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    birthDate: initialData?.birthDate
      ? new Date(initialData.birthDate).toISOString().split('T')[0]
      : '',
    gender: initialData?.gender || '',
    occupations: initialData?.occupations || [],
    hobbies: initialData?.hobbies || [],
    allergies: initialData?.allergies || [],
    notes: initialData?.notes || '',
  });

  const [errors, setErrors] = useState({});
  const [tempInput, setTempInput] = useState({
    occupation: '',
    hobby: '',
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = '名前は必須です';
    if (formData.occupations.length > 10) newErrors.occupations = '職業は最大10個までです';
    if (formData.hobbies.length > 10) newErrors.hobbies = '趣味は最大10個までです';
    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      const submissionData = {
        ...formData,
        birthDate: formData.birthDate ? new Date(formData.birthDate) : undefined,
      };
      onSubmit(submissionData);
    } else {
      setErrors(newErrors);
    }
  };

  const addItem = (e, field, value) => {
    e.preventDefault(); // フォーム送信を防止
    if (value && formData[field].length < 10) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value],
      });
      setTempInput({
        ...tempInput,
        [field.replace('s', '')]: '',
      });
    }
  };

  const removeItem = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  const inputStyle =
    'mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500';

  const age = calculateAge(formData.birthDate);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">名前 *</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className={inputStyle}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">生年月日</label>
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={formData.birthDate}
            onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
            className={inputStyle}
          />
          {age !== null && <span className="text-gray-600">{age}歳</span>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">性別</label>
        <select
          value={formData.gender}
          onChange={e => setFormData({ ...formData, gender: e.target.value })}
          className={inputStyle}
        >
          <option value="">選択してください</option>
          <option value="男性">男性</option>
          <option value="女性">女性</option>
          <option value="その他">その他</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">職業（最大10個）</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={tempInput.occupation}
            onChange={e => setTempInput({ ...tempInput, occupation: e.target.value })}
            className={inputStyle}
          />
          <Button
            type="button"
            onClick={e => addItem(e, 'occupations', tempInput.occupation)}
            disabled={formData.occupations.length >= 10}
          >
            追加
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.occupations.map((occupation, index) => (
            <Badge
              key={index}
              text={occupation}
              variant="occupation"
              onRemove={() => removeItem('occupations', index)}
            />
          ))}
        </div>
        {errors.occupations && <p className="mt-1 text-sm text-red-600">{errors.occupations}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">趣味（最大10個）</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={tempInput.hobby}
            onChange={e => setTempInput({ ...tempInput, hobby: e.target.value })}
            className={inputStyle}
          />
          <Button
            type="button"
            onClick={e => addItem(e, 'hobbies', tempInput.hobby)}
            disabled={formData.hobbies.length >= 10}
          >
            追加
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.hobbies.map((hobby, index) => (
            <Badge
              key={index}
              text={hobby}
              variant="hobby"
              onRemove={() => removeItem('hobbies', index)}
            />
          ))}
        </div>
        {errors.hobbies && <p className="mt-1 text-sm text-red-600">{errors.hobbies}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">アレルギー</label>
        <select
          value=""
          onChange={e => {
            if (e.target.value) {
              setFormData({
                ...formData,
                allergies: [...new Set([...formData.allergies, e.target.value])],
              });
            }
          }}
          className={inputStyle}
        >
          <option value="">選択してください</option>
          {ALLERGY_OPTIONS.map(allergy => (
            <option key={allergy} value={allergy}>
              {allergy}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.allergies.map((allergy, index) => (
            <Badge
              key={index}
              text={allergy}
              variant="allergy"
              onRemove={() => removeItem('allergies', index)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">備考</label>
        <textarea
          value={formData.notes}
          onChange={e => setFormData({ ...formData, notes: e.target.value })}
          rows={4}
          className={inputStyle}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4 pb-4">
        <Button variant="secondary" onClick={onCancel}>
          キャンセル
        </Button>
        <Button type="submit">{initialData ? '更新' : '登録'}</Button>
      </div>
    </form>
  );
};

PersonForm.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
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

export default PersonForm;
