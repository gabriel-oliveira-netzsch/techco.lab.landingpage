'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@/components/icons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TalentPoolCTAProps {
  translations: {
    title: string;
    subtitle: string;
    buttonText: string;
    modalTitle: string;
  };
}

export function TalentPoolCTA({ translations }: TalentPoolCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* CTA Card */}
      <section className="bg-[#fafafa] py-[48px] md:py-[64px]">
        <div className="max-w-[900px] mx-auto px-6 md:px-8">
          <div className="bg-[#00B894] rounded-[12px] p-8 md:p-12 text-center">
            <h2 className="text-[28px] md:text-[32px] font-bold text-white mb-4">
              {translations.title}
            </h2>
            <p className="text-[15px] md:text-[17px] text-white/90 leading-[1.7] mb-8 max-w-[600px] mx-auto">
              {translations.subtitle}
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="default"
              size="lg"
              className="bg-white text-[#00B894] hover:bg-white/90 font-semibold"
            >
              {translations.buttonText}
              <ArrowRightIcon className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Modal with iframe */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[600px] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-[20px] font-bold text-[#4c4d58]">
              {translations.modalTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <iframe
              src="https://join.smartrecruiters.com/NETZSCHGroup/16494f8c-5b13-4ebf-b243-b9e692bc9793-talentpool-bra"
              className="w-full h-[80vh] max-h-[calc(100vh-100px)] border-0"
              title={translations.modalTitle}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
