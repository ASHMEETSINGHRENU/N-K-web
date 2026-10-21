import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence
} from 'framer-motion';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  onMouseEnter?: () => void;
  className?: string;
  hasPopup?: boolean;
  pressed?: boolean;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
  ariaLabel?: string;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  hasPopup?: boolean;
  pressed?: boolean;
  label: React.ReactNode;
};

function DockItem({
  children,
  className = '',
  onClick,
  onMouseEnter,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  hasPopup = false,
  pressed = false,
  label
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const resting = reduceMotion ? baseItemSize : magnification;
  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, resting, baseItemSize]);
  const size = useSpring(targetSize, reduceMotion ? { duration: 0 } : spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full border cursor-pointer text-[#F7F3EA] bg-[#102A43]/90 border-[#B08D57]/35 shadow-[0_10px_24px_-16px_rgba(11,33,53,0.9)]',
        className
      )}
      tabIndex={0}
      role="button"
      aria-label={typeof label === 'string' ? label : undefined}
      aria-haspopup={hasPopup ? 'true' : undefined}
      aria-expanded={hasPopup ? pressed : undefined}
    >
      {Children.map(children, (child) =>
        React.isValidElement(child)
          ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })
          : child
      )}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.18 }}
          className={cn(
            'absolute top-[calc(100%+12px)] left-1/2 z-50 w-fit whitespace-pre rounded-full border border-[#B08D57]/40 bg-[#0B2135] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#F7F3EA] shadow-[0_12px_30px_-18px_rgba(11,33,53,0.9)]',
            className
          )}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={cn('flex items-center justify-center text-current', className)}>{children}</div>;
}

export function MagnificationDock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 140,
  panelHeight = 52,
  dockHeight = 72,
  baseItemSize = 36,
  ariaLabel = 'Primary navigation'
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  const maxHeight = useMemo(
    () => Math.max(panelHeight, Math.min(dockHeight, magnification + 18)),
    [dockHeight, magnification, panelHeight]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, reduceMotion ? panelHeight : maxHeight]);
  const height = useSpring(heightRow, reduceMotion ? { duration: 0 } : spring);

  return (
    <motion.div style={{ height }} className="flex max-w-full items-center justify-center overflow-visible">
      <motion.div
        onMouseMove={({ clientX }) => {
          isHovered.set(1);
          mouseX.set(clientX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={cn(
          'flex items-center w-fit gap-1.5 rounded-full border border-[#D8C3A5]/30 bg-[#0B2135]/45 px-2 py-1.5 backdrop-blur-md shadow-[0_14px_36px_-22px_rgba(11,33,53,0.85)]',
          className
        )}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label={ariaLabel}
      >
        {items.map((item, index) => (
          <DockItem
            key={typeof item.label === 'string' ? item.label : index}
            onClick={item.onClick}
            onMouseEnter={item.onMouseEnter}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            hasPopup={item.hasPopup}
            pressed={item.pressed}
            label={item.label}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default MagnificationDock;
