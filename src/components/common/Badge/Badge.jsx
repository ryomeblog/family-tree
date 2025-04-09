import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Badge = ({ text, variant = 'occupation', onRemove }) => {
  const variantStyles = {
    occupation: 'bg-blue-100 text-blue-800 border-blue-200',
    hobby: 'bg-green-100 text-green-800 border-green-200',
    allergy: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span
      className={classNames(
        'inline-flex items-center px-2 py-1 rounded-full',
        'text-sm font-medium border',
        variantStyles[variant],
      )}
    >
      {text}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={classNames('ml-1 -mr-1 p-0.5 rounded-full', 'hover:bg-opacity-25', {
            'hover:bg-blue-500': variant === 'occupation',
            'hover:bg-green-500': variant === 'hobby',
            'hover:bg-red-500': variant === 'allergy',
          })}
        >
          <span className="sr-only">削除</span>
          <svg
            className="w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

Badge.propTypes = {
  /**
   * バッジのテキスト
   */
  text: PropTypes.string.isRequired,
  /**
   * バッジの種類
   */
  variant: PropTypes.oneOf(['occupation', 'hobby', 'allergy']),
  /**
   * 削除ボタンのクリックハンドラー
   */
  onRemove: PropTypes.func,
};

export default Badge;
