import { cn } from '@/lib/utils';

interface ArrowRightIconProps {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function ArrowRightIcon({
  className,
  stroke = 'white',
  strokeWidth = 1.5,
}: ArrowRightIconProps) {
  return (
    <div className={cn('size-[16px] relative shrink-0', className)}>
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g>
          <path
            d="M3.33333 8H12.6667"
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
          <path
            d="M8 3.33333L12.6667 8L8 12.6667"
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
        </g>
      </svg>
    </div>
  );
}

