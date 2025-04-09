import React from 'react';
import PropTypes from 'prop-types';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';

const FamilyEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) => {
  // エッジの中間点を計算
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  // 親ノード間の接続パス
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // 中間点（子供との接続用）
  const centerPoint = {
    x: midX,
    y: midY + 20, // 中間点を少し下にずらす
  };

  return (
    <>
      {/* 親ノード間のエッジ */}
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />

      {/* 中間点のマーカー */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${centerPoint.x}px, ${centerPoint.y}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <div
            className="w-3 h-3 bg-blue-500 rounded-full cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              // エッジクリックイベントを発火（子供追加モーダルのトリガー）
              const event = new CustomEvent('edgeClick', {
                detail: { id, data },
              });
              document.dispatchEvent(event);
            }}
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

FamilyEdge.propTypes = {
  id: PropTypes.string.isRequired,
  sourceX: PropTypes.number.isRequired,
  sourceY: PropTypes.number.isRequired,
  targetX: PropTypes.number.isRequired,
  targetY: PropTypes.number.isRequired,
  sourcePosition: PropTypes.string.isRequired,
  targetPosition: PropTypes.string.isRequired,
  style: PropTypes.object,
  markerEnd: PropTypes.string,
  data: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default FamilyEdge;
