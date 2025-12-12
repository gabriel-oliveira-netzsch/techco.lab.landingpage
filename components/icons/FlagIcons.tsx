import { cn } from '@/lib/utils';

interface FlagIconProps {
  className?: string;
}

export function USFlagIcon({ className = 'w-4 h-3' }: FlagIconProps) {
  return (
    <svg className={cn(className)} viewBox="0 0 7410 3900" xmlns="http://www.w3.org/2000/svg">
      <rect width="7410" height="3900" fill="#b22234" />
      <path
        d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0"
        stroke="#fff"
        strokeWidth="300"
      />
      <rect width="2964" height="2100" fill="#3c3b6e" />
      <g fill="#fff">
        <g id="s18">
          <g id="s9">
            <g id="s5">
              <g id="s4">
                <path
                  id="s"
                  d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z"
                />
                <use xlinkHref="#s" y="420" />
                <use xlinkHref="#s" y="840" />
                <use xlinkHref="#s" y="1260" />
              </g>
              <use xlinkHref="#s" y="1680" />
            </g>
            <use xlinkHref="#s4" x="247" y="210" />
          </g>
          <use xlinkHref="#s9" x="494" />
        </g>
        <use xlinkHref="#s18" x="988" />
        <use xlinkHref="#s9" x="1976" />
        <use xlinkHref="#s5" x="2470" />
      </g>
    </svg>
  );
}

export function BRFlagIcon({ className = 'w-4 h-3' }: FlagIconProps) {
  return (
    <svg className={cn(className)} viewBox="0 0 720 504" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="504" fill="#009b3a" />
      <path d="M 360,7 l 352,245 l -352,245 l -352,-245 z" fill="#fedf00" />
      <circle cx="360" cy="252" r="114.24" fill="#002776" />
      <path d="M 360,138 a 114,114 0 0,0 0,228" fill="#fff" />
      <path d="M 231,250 a 130,130 0 0,0 258,0" fill="#002776" />
    </svg>
  );
}

