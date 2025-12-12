'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { TechcoLabLogo, ArrowRightIcon } from '@/components/icons';
import { MobileMenu } from '@/components/MobileMenu';
import { LanguageSelector } from '@/components/LanguageSelector';

interface HeaderProps {
  currentPage: string;
}

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

function NavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="box-border content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 no-underline transition-all duration-200 hover:opacity-80"
    >
      <span
        className={`font-medium leading-normal relative shrink-0 text-[16px] text-nowrap whitespace-pre ${
          isActive
            ? 'font-bold bg-clip-text bg-gradient-to-r from-[#00B894] to-[#00A07D]'
            : 'font-normal text-white'
        }`}
        style={
          isActive
            ? { WebkitTextFillColor: 'transparent' }
            : undefined
        }
      >
        {children}
      </span>
    </Link>
  );
}

function BrowsePositionsButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ backgroundColor: '#009874' }}
        transition={{ duration: 0.2 }}
        className="bg-[#00b894] box-border content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 cursor-pointer"
      >
        <span className="font-semibold leading-normal relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">
          {label}
        </span>
        <ArrowRightIcon />
      </motion.div>
    </Link>
  );
}

export function Header({ currentPage }: HeaderProps) {
  const locale = useLocale();
  const t = useTranslations('Navigation');
  
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const isPTBR = locale === 'pt-BR';

  return (
    <header className="bg-[#4c4d58] box-border content-stretch flex items-center justify-between px-4 md:px-8 lg:px-[32px] py-[16px] relative shrink-0 w-full">
      <div
        aria-hidden="true"
        className="absolute border-[#d9d9d9] border-[0px_0px_1px] border-solid inset-0 pointer-events-none"
      />

      {/* Left side: Logo + Navigation */}
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
        <Link
          href={prefix || '/'}
          className="flex items-center justify-center relative shrink-0 transition-opacity hover:opacity-80 cursor-pointer"
        >
          <div className="flex-none scale-y-[-100%]">
            <TechcoLabLogo />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="box-border content-stretch hidden lg:flex gap-[10px] items-start p-[10px] relative shrink-0">
          <NavLink href={prefix || '/'} isActive={currentPage === 'home'}>
            {t('home')}
          </NavLink>
          <NavLink href={`${prefix}/what-we-do`} isActive={currentPage === 'what-we-do'}>
            {t('whatWeDo')}
          </NavLink>
          <NavLink href={`${prefix}/our-culture`} isActive={currentPage === 'our-culture'}>
            {t('ourCulture')}
          </NavLink>
          <NavLink href={`${prefix}/open-positions`} isActive={currentPage === 'open-positions'}>
            {t('openPositions')}
          </NavLink>
        </nav>
      </div>

      {/* Right side: CTA + Language Selector + Mobile Menu */}
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
        {/* Desktop: CTA + Language */}
        <div className="hidden lg:flex gap-[16px] items-center">
          <BrowsePositionsButton
            href={`${prefix}/open-positions`}
            label={t('browsePositions')}
          />
          <LanguageSelector />
        </div>

        {/* Mobile: Menu */}
        <div className="flex lg:hidden gap-[16px] items-center">
          <MobileMenu
            currentPage={currentPage}
            languageSelector={<LanguageSelector />}
          />
        </div>
      </div>
    </header>
  );
}

