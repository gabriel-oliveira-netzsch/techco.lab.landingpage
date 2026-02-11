'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { TechcoLabLogo, NetzschLogo, LinkedInIcon } from '@/components/icons';
import { images } from '@/lib/images';
import { ExternalLink } from "@/components/analytics/ExternalLink";

export function GlobalFooter() {
  const locale = useLocale();
  const t = useTranslations("Footer");

  const prefix = locale === "en" ? "" : `/${locale}`;
  const isPTBR = locale === "pt-BR";

  const homeLink = prefix || "/";
  const imprintPath = isPTBR ? "aviso-legal" : "imprint";
  const privacyPath = isPTBR ? "politica-de-privacidade" : "privacy-policy";

  // Handler to reopen the Cookiebot consent banner
  const handleCookieManagement = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (
      typeof window !== "undefined" &&
      (window as Window & { Cookiebot?: { renew: () => void } }).Cookiebot
    ) {
      (
        window as Window & { Cookiebot?: { renew: () => void } }
      ).Cookiebot?.renew();
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
              <ExternalLink
                href="https://www.netzsch.com/en"
                linkText="NETZSCH Logo"
                className="hover:opacity-80 transition-opacity"
              >
                <NetzschLogo />
              </ExternalLink>
            </div>

            {/* Tagline + GPTW Badge */}
            <div className="relative w-full">
              <p className="font-normal leading-normal text-[16px] text-white w-full max-w-[80%] md:max-w-none">
                {t("tagline")}
              </p>
              <div className="hidden md:block absolute right-0 top-[-12.22px] h-[84px] w-[59px]">
                <Image
                  alt="Great Place To Work Certified"
                  title="Great Place To Work Certified Badge"
                  className="w-full h-full object-contain"
                  src={images.gptwCertified}
                  width={59}
                  height={84}
                  unoptimized
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full text-white text-[14px]">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-[12px] uppercase tracking-wider opacity-70">
                  {t("contact.title")}
                </span>
                <ExternalLink
                  href="mailto:info@netzsch.com"
                  linkText="Email"
                  className="hover:opacity-80 transition-opacity"
                >
                  info@netzsch.com
                </ExternalLink>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-[12px] uppercase tracking-wider opacity-70">
                  {t("contact.locations")}
                </span>
                <span>Curitiba, PR • Pomerode, SC</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-[12px] uppercase tracking-wider opacity-70">
                  {t("contact.careers")}
                </span>
                <Link
                  href={`${prefix}/open-positions`}
                  className="hover:opacity-80 transition-opacity underline"
                >
                  {t("contact.viewPositions")}
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-row items-center gap-[16px]">
              <ExternalLink
                href="https://www.linkedin.com/company/techco-lab/"
                linkText="LinkedIn"
                className="hover:opacity-80 transition-opacity"
              >
                <LinkedInIcon />
              </ExternalLink>
              <ExternalLink
                href="https://www.glassdoor.com/Overview/Working-at-Techco-lab-EI_IE10916436.11,21.htm"
                linkText="Glassdoor"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  alt="Find us on Glassdoor"
                  title="Techco.lab on Glassdoor"
                  src="https://www.glassdoor.com.br/pc-app/static/img/partnerCenter/badges/eng_SQUARE_32x32.png"
                  width={21}
                  height={21}
                />
              </ExternalLink>
            </div>
          </div>

          {/* Divider */}
          <div className="h-0 w-full border-t border-white opacity-20" />

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row h-auto md:h-[44px] items-center justify-between w-full gap-4">
            <p className="font-normal leading-normal text-[16px] text-center md:text-left text-white">
              {t("copyright")}
            </p>
            <div className="flex flex-wrap font-normal gap-[24px] items-center justify-center md:justify-end leading-normal text-[16px] text-white">
              <Link
                href={`${prefix}/${imprintPath}`}
                className="hover:opacity-80 transition-opacity"
              >
                {t("imprint")}
              </Link>
              <a
                href="#"
                onClick={handleCookieManagement}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              >
                {t("cookieManagement")}
              </a>
              <Link
                href={`${prefix}/${privacyPath}`}
                className="hover:opacity-80 transition-opacity"
              >
                {t("privacyPolicy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

