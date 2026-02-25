'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';

interface MobileMenuProps {
  currentPage: string;
  languageSelector: React.ReactNode;
}

export function MobileMenu({ currentPage, languageSelector }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('Navigation');
  
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const navItems = [
    { key: 'home', path: prefix || '/', label: t('home') },
    { key: 'what-we-do', path: `${prefix}/what-we-do`, label: t('whatWeDo') },
    { key: 'our-culture', path: `${prefix}/our-culture`, label: t('ourCulture') },
    { key: 'open-positions', path: `${prefix}/open-positions`, label: t('openPositions') },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="flex items-center justify-center p-2 text-white hover:opacity-80 transition-opacity"
          aria-label="Open menu"
        >
          <Menu className="size-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-[#4c4d58] border-[#4c4d58] w-full max-w-[300px]">
        <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
        <div className="flex flex-col h-full pt-12">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <SheetClose asChild key={item.key}>
                <Link
                  href={item.path}
                  className={`px-4 py-3 text-[16px] font-medium transition-colors rounded-lg ${
                    currentPage === item.key
                      ? 'text-[#00B894] bg-white/10'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </nav>

          <div className="mt-8 px-4">
            <SheetClose asChild>
              <Link
                href={`${prefix}/open-positions`}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#00B894] text-white rounded-lg font-semibold hover:bg-[#009874] transition-colors"
              >
                {t('browsePositions')}
              </Link>
            </SheetClose>
          </div>

          <div className="mt-auto p-4 border-t border-white/20">
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Language</span>
              {languageSelector}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

