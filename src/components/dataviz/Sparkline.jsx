import React from 'react';
import { cn } from '../../utils/index.js';

/**
 * Pure SVG Sparkline for metric micro-trends (Zero heavy dependency)
 */
export function Sparkline({
  data = [12, 18, 15, 25, 22, 30, 28, 35],
  color = '#0c87eb',
  height = 28,
  width = 96,
  strokeWidth = 2,
  fill = true,
  className = '',
}) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `${points} ${width},${height} 0,${height}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn('overflow-visible', className)}
    >
      {fill && (
        <polygon
          points={areaPoints}
          fill={color}
          fillOpacity={0.15}
        />
      )}
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export default Sparkline;
