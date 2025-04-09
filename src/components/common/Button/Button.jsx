import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Button = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children,
  className,
}) => {
  const baseStyles = 'rounded-md font-medium focus:outline-none transition-colors';

  const variantStyles = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    secondary:
      'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    icon: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
  };

  const sizeStyles = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <button
      className={classNames(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && disabledStyles,
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  /**
   * ボタンのバリアント
   */
  variant: PropTypes.oneOf(['primary', 'secondary', 'icon']),
  /**
   * ボタンのサイズ
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * 無効状態
   */
  disabled: PropTypes.bool,
  /**
   * クリックハンドラー
   */
  onClick: PropTypes.func,
  /**
   * ボタンの内容
   */
  children: PropTypes.node.isRequired,
  /**
   * 追加のCSSクラス
   */
  className: PropTypes.string,
};

export default Button;
