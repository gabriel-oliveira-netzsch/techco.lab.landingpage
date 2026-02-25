'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ChevronDownIcon, USFlagIcon, BRFlagIcon } from '@/components/icons';
import { locales, type Locale } from '@/i18n/config';
import { trackLanguageChange, hasStatisticsConsent } from "@/lib/analytics";

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPTBR = currentLocale === "pt-BR";

  // Calculate paths for each locale
  const localePaths = useMemo(() => {
    // Build regex pattern from all locales (escape special characters)
    const escapedLocales = locales.map((l) => l.replace(/-/g, "\\-"));
    const localePattern = escapedLocales.join("|");
    const localeRegex = new RegExp(`^/(${localePattern})`);

    // Remove the current locale prefix
    const pathWithoutLocale = pathname.replace(localeRegex, "") || "/";

    // With localePrefix: 'always', all paths need the locale prefix
    return {
      en: `/en${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`,
      "pt-BR": `/pt-BR${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`,
    };
  }, [pathname]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="content-stretch flex gap-[4px] items-center relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Select language"
      >
        <div className="flex items-center gap-[6px]">
          {isPTBR ? (
            <BRFlagIcon className="w-4 h-3" />
          ) : (
            <USFlagIcon className="w-4 h-3" />
          )}
          <span className="font-medium leading-[20px] relative shrink-0 text-[14px] text-center text-nowrap text-white whitespace-pre">
            {isPTBR ? "PT-BR" : "EN"}
          </span>
        </div>
        <ChevronDownIcon
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <nav
          className="absolute right-0 top-full mt-2 bg-white rounded-[8px] shadow-lg overflow-hidden z-50 min-w-[140px] border border-gray-100"
          aria-label="Language selection"
        >
          <Link
            href={localePaths.en}
            onClick={() => {
              if (hasStatisticsConsent() && currentLocale !== "en") {
                trackLanguageChange(currentLocale, "en");
              }
            }}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-150 ${
              currentLocale === "en" ? "bg-gray-50" : ""
            }`}
          >
            <USFlagIcon className="w-5 h-4 flex-shrink-0" />
            <span className="font-medium text-[14px] text-[#4c4d58] whitespace-nowrap">
              English
            </span>
            {currentLocale === "en" && (
              <svg
                className="w-4 h-4 text-[#00B894] ml-auto flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </Link>
          <Link
            href={localePaths["pt-BR"]}
            onClick={() => {
              if (hasStatisticsConsent() && currentLocale !== "pt-BR") {
                trackLanguageChange(currentLocale, "pt-BR");
              }
            }}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-150 ${
              currentLocale === "pt-BR" ? "bg-gray-50" : ""
            }`}
          >
            <BRFlagIcon className="w-5 h-4 flex-shrink-0" />
            <span className="font-medium text-[14px] text-[#4c4d58] whitespace-nowrap">
              Português
            </span>
            {currentLocale === "pt-BR" && (
              <svg
                className="w-4 h-4 text-[#00B894] ml-auto flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </Link>
        </nav>
      )}
    </div>
  );
}
