import React from 'react';
import { ICONS } from './icon-map';
import { IconName, IconSize } from './icon.types';
import clsx from 'clsx';

interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
}

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  className,
}) => {
  const LucideIcon = ICONS[name];

  if (!LucideIcon) return null;

  return (
    <LucideIcon
      size={sizeMap[size]}
      className={clsx('stroke-current', className)}
    />
  );
};
