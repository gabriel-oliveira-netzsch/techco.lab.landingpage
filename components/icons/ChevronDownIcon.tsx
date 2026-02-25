import { cn } from '@/lib/utils';

interface ChevronDownIconProps {
  className?: string;
  fill?: string;
}

const chevronPath = "M10.9846 4.10769L6.25385 8.88462C6.11538 9.02308 5.88462 9.02308 5.74615 8.88462L1.01538 4.10769C0.876923 3.96923 0.876923 3.73846 1.01538 3.6L1.52308 3.09231C1.66154 2.95385 1.89231 2.95385 2.03077 3.09231L5.74615 6.85385C5.88462 6.99231 6.11538 6.99231 6.25385 6.85385L9.96923 3.11538C10.1077 2.97692 10.3385 2.97692 10.4769 3.11538L10.9846 3.62308C11.1 3.76154 11.1 3.96923 10.9846 4.10769V4.10769Z";

export function ChevronDownIcon({ className, fill = 'white' }: ChevronDownIconProps) {
  return (
    <div className={cn('size-[12px] relative shrink-0', className)}>
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 12"
      >
        <path
          clipRule="evenodd"
          d={chevronPath}
          fill={fill}
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
}

