'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { TechcoLabLogo, NetzschLogo, LinkedInIcon } from '@/components/icons';
import { images } from '@/lib/images';

export function GlobalFooter() {
  const locale = useLocale();
  const t = useTranslations('Footer');
  
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const isPTBR = locale === 'pt-BR';

  const homeLink = prefix || '/';
  const imprintPath = isPTBR ? 'aviso-legal' : 'imprint';

  // Handler to reopen the Cookiebot consent banner
  const handleCookieManagement = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as Window & { Cookiebot?: { renew: () => void } }).Cookiebot) {
      (window as Window & { Cookiebot?: { renew: () => void } }).Cookiebot?.renew();
    }
  };

  return (
    <footer className="bg-[#1E7264] w-full">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="box-border flex flex-col gap-[24px] items-center justify-center p-[64px] w-full max-w-[1200px] px-6 md:px-8">
          <div className="flex flex-col gap-[32px] items-start w-full">
            {/* Logos Row */}
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex items-center justify-start shrink-0">
                <Link
                  href={homeLink}
                  className="flex-none scale-y-[-100%] hover:opacity-80 transition-opacity"
                >
                  <TechcoLabLogo />
                </Link>
              </div>
              <a
                href="https://www.netzsch.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <NetzschLogo />
              </a>
            </div>

            {/* Tagline + GPTW Badge */}
            <div className="relative w-full">
              <p className="font-normal leading-normal text-[16px] text-white w-full max-w-[80%] md:max-w-none">
                {t('tagline')}
              </p>
              <div className="hidden md:block absolute right-0 top-[-12.22px] h-[84px] w-[59px]">
                <Image
                  alt="Great Place To Work Certified"
                  className="w-full h-full object-contain"
                  src={images.gptwCertified}
                  width={59}
                  height={84}
                  unoptimized
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-row items-center gap-[16px]">
              <a
                href="https://www.linkedin.com/company/techco-lab/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://www.glassdoor.com/Overview/Working-at-Techco-lab-EI_IE10916436.11,21.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  alt="Find us on Glassdoor"
                  src="https://www.glassdoor.com.br/pc-app/static/img/partnerCenter/badges/eng_SQUARE_32x32.png"
                  width={21}
                  height={21}
                />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-0 w-full border-t border-white opacity-20" />

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row h-auto md:h-[44px] items-center justify-between w-full gap-4">
            <p className="font-normal leading-normal text-[16px] text-center md:text-left text-white">
              {t('copyright')}
            </p>
            <div className="flex flex-wrap font-normal gap-[24px] items-center justify-center md:justify-end leading-normal text-[16px] text-white">
              <Link
                href={`${prefix}/${imprintPath}`}
                className="hover:opacity-80 transition-opacity"
              >
                {t('imprint')}
              </Link>
              <a
                href="#"
                onClick={handleCookieManagement}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              >
                {t('cookieManagement')}
              </a>
              <a
                href="https://karriere.netzsch.com/en/data-protection/#:~:text=We%20collect%2C%20process%20and%20use,country%2Dspecific%20data%20protection%20regulations."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                {t('privacyPolicy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

