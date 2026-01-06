'use client';

import { TalentPoolForm } from './TalentPoolForm';

interface TalentPoolSectionProps {
  translations: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    cvLabel: string;
    cvDropzoneText: string;
    cvFormats: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    errorMessage: string;
    tryAgain: string;
    required: string;
    invalidEmail: string;
    invalidFileType: string;
    fileTooLarge: string;
  };
}

export function TalentPoolSection({ translations }: TalentPoolSectionProps) {
  return (
    <section className="bg-white py-[48px] md:py-[64px]">
      <div className="max-w-[600px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#4c4d58] mb-4">
            {translations.title}
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#6b7280] leading-[1.7]">
            {translations.subtitle}
          </p>
        </div>

        {/* Form */}
        <TalentPoolForm translations={translations} />
      </div>
    </section>
  );
}

