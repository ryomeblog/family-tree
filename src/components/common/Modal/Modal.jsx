import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Modal = ({ isOpen, onClose, title, children, size = 'medium' }) => {
  const handleEscape = useCallback(
    event => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const sizeStyles = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={classNames('bg-white rounded-lg shadow-xl', 'w-full', sizeStyles[size])}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  /**
   * モーダルの表示状態
   */
  isOpen: PropTypes.bool.isRequired,
  /**
   * モーダルを閉じる関数
   */
  onClose: PropTypes.func.isRequired,
  /**
   * モーダルのタイトル
   */
  title: PropTypes.string.isRequired,
  /**
   * モーダルの内容
   */
  children: PropTypes.node.isRequired,
  /**
   * モーダルのサイズ
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Modal;
