import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalFooter } from '@/components/GlobalFooter';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Imprint' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical:
        locale === 'en'
          ? 'https://ntechcolab.com/imprint'
          : `https://ntechcolab.com/${locale}/aviso-legal`,
      languages: {
        en: 'https://ntechcolab.com/imprint',
        'pt-BR': 'https://ntechcolab.com/pt-BR/aviso-legal',
      },
    },
  };
}

export default async function ImprintPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Imprint' });
  const isPTBR = locale === 'pt-BR';

  return (
    <div data-name="Imprint" className="flex flex-col min-h-screen bg-white">
      <Header currentPage="imprint" />
      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-[#4c4d58] relative w-full py-[64px] md:py-[80px]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8 text-center">
            <h1 className="text-[32px] md:text-[48px] lg:text-[56px] font-bold leading-[1.2] text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-[16px] md:text-[18px] leading-[1.6] text-white/80 max-w-[600px] mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-white py-[48px] md:py-[64px]">
          <div className="max-w-[800px] mx-auto px-6 md:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-[24px] font-bold text-[#4c4d58] mb-4">
                {isPTBR ? 'Informações da Empresa' : 'Company Information'}
              </h2>
              <p className="text-[#6b7280] mb-6">
                <strong>NETZSCH-Feinmahltechnik GmbH</strong>
                <br />
                Sedanstraße 70
                <br />
                95100 Selb
                <br />
                Germany
              </p>

              <h2 className="text-[24px] font-bold text-[#4c4d58] mb-4">
                {isPTBR ? 'Contato' : 'Contact'}
              </h2>
              <p className="text-[#6b7280] mb-6">
                {isPTBR ? 'Telefone' : 'Phone'}: +49 9287 797-0
                <br />
                {isPTBR ? 'E-mail' : 'Email'}: info@netzsch.com
              </p>

              <h2 className="text-[24px] font-bold text-[#4c4d58] mb-4">
                {isPTBR ? 'Representação Legal' : 'Legal Representation'}
              </h2>
              <p className="text-[#6b7280] mb-6">
                {isPTBR
                  ? 'Representado pelos Diretores Gerentes'
                  : 'Represented by the Managing Directors'}
              </p>

              <h2 className="text-[24px] font-bold text-[#4c4d58] mb-4">
                {isPTBR ? 'Registro Comercial' : 'Commercial Register'}
              </h2>
              <p className="text-[#6b7280] mb-6">
                {isPTBR
                  ? 'Registrado no Tribunal de Registro Comercial de Hof'
                  : 'Registered at the Commercial Register Court of Hof'}
                <br />
                HRB 363
              </p>

              <h2 className="text-[24px] font-bold text-[#4c4d58] mb-4">
                {isPTBR ? 'Número de IVA' : 'VAT Number'}
              </h2>
              <p className="text-[#6b7280] mb-6">DE 132 766 625</p>
            </div>
          </div>
        </section>
      </main>
      <GlobalFooter />
    </div>
  );
}

