import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Tooltip = ({ content, position = 'top', trigger = 'hover', children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  };

  const arrowStyles = {
    top: 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-gray-800',
    right: 'left-[-6px] top-1/2 -translate-y-1/2 border-r-gray-800',
    bottom: 'top-[-6px] left-1/2 -translate-x-1/2 border-b-gray-800',
    left: 'right-[-6px] top-1/2 -translate-y-1/2 border-l-gray-800',
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsVisible(!isVisible);
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
      {isVisible && (
        <>
          <div
            className={classNames(
              'absolute z-50 px-2 py-1',
              'text-sm text-white bg-gray-800 rounded',
              'whitespace-nowrap',
              positionStyles[position],
            )}
          >
            {content}
            <div
              className={classNames(
                'absolute w-2 h-2 rotate-45',
                'border-4 border-transparent',
                arrowStyles[position],
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  /**
   * ツールチップの内容
   */
  content: PropTypes.node.isRequired,
  /**
   * ツールチップの表示位置
   */
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /**
   * 表示トリガー
   */
  trigger: PropTypes.oneOf(['hover', 'click']),
  /**
   * ラップする要素
   */
  children: PropTypes.node.isRequired,
};

export default Tooltip;
