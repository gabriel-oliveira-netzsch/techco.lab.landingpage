import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { GlobalFooter } from '@/components/GlobalFooter';
import { ArrowRightIcon } from '@/components/icons';
import { ArrowLeft } from 'lucide-react';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

// Mock position data
const positionData = {
  '1': {
    title: 'Senior Software Engineer',
    titlePtBr: 'Engenheiro de Software Sênior',
    department: 'Engineering',
    departmentPtBr: 'Engenharia',
    location: 'Curitiba, Brazil (Hybrid)',
    locationPtBr: 'Curitiba, Brasil (Híbrido)',
    description:
      'We are looking for a Senior Software Engineer to join our team and help build innovative digital solutions for industrial applications.',
    descriptionPtBr:
      'Estamos procurando um Engenheiro de Software Sênior para se juntar ao nosso time e ajudar a construir soluções digitais inovadoras para aplicações industriais.',
    requirements: [
      '5+ years of experience in software development',
      'Strong proficiency in TypeScript and React',
      'Experience with cloud services (AWS, Azure, or GCP)',
      'Knowledge of CI/CD pipelines',
      'Excellent communication skills',
    ],
    requirementsPtBr: [
      '5+ anos de experiência em desenvolvimento de software',
      'Forte proficiência em TypeScript e React',
      'Experiência com serviços de nuvem (AWS, Azure ou GCP)',
      'Conhecimento em pipelines CI/CD',
      'Excelentes habilidades de comunicação',
    ],
  },
  '2': {
    title: 'Product Designer',
    titlePtBr: 'Designer de Produto',
    department: 'Design',
    departmentPtBr: 'Design',
    location: 'Pomerode, Brazil (Hybrid)',
    locationPtBr: 'Pomerode, Brasil (Híbrido)',
    description:
      'We are seeking a talented Product Designer to create intuitive and beautiful user experiences for our industrial digital products.',
    descriptionPtBr:
      'Estamos buscando um Designer de Produto talentoso para criar experiências de usuário intuitivas e bonitas para nossos produtos digitais industriais.',
    requirements: [
      '3+ years of experience in product design',
      'Proficiency in Figma and design systems',
      'Strong portfolio demonstrating UX/UI skills',
      'Experience with user research and testing',
      'Ability to collaborate with cross-functional teams',
    ],
    requirementsPtBr: [
      '3+ anos de experiência em design de produto',
      'Proficiência em Figma e design systems',
      'Portfólio forte demonstrando habilidades de UX/UI',
      'Experiência com pesquisa e testes de usuário',
      'Capacidade de colaborar com times multifuncionais',
    ],
  },
  '3': {
    title: 'Data Engineer',
    titlePtBr: 'Engenheiro de Dados',
    department: 'Data',
    departmentPtBr: 'Dados',
    location: 'Curitiba, Brazil (Hybrid)',
    locationPtBr: 'Curitiba, Brasil (Híbrido)',
    description:
      'Join our data team to build robust data pipelines and infrastructure that power our industrial AI solutions.',
    descriptionPtBr:
      'Junte-se ao nosso time de dados para construir pipelines de dados robustos e infraestrutura que alimentam nossas soluções de IA industrial.',
    requirements: [
      '4+ years of experience in data engineering',
      'Strong SQL and Python skills',
      'Experience with data warehouses and ETL pipelines',
      'Knowledge of Apache Spark or similar technologies',
      'Understanding of data modeling and architecture',
    ],
    requirementsPtBr: [
      '4+ anos de experiência em engenharia de dados',
      'Fortes habilidades em SQL e Python',
      'Experiência com data warehouses e pipelines ETL',
      'Conhecimento de Apache Spark ou tecnologias similares',
      'Entendimento de modelagem e arquitetura de dados',
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const position = positionData[id as keyof typeof positionData];

  if (!position) {
    return {
      title: 'Position Not Found',
    };
  }

  const isPTBR = locale === 'pt-BR';

  return {
    title: isPTBR ? position.titlePtBr : position.title,
    description: isPTBR ? position.descriptionPtBr : position.description,
  };
}

export default async function PositionDetailsPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const isPTBR = locale === 'pt-BR';
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const position = positionData[id as keyof typeof positionData];

  if (!position) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header currentPage="open-positions" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[32px] font-bold text-[#4c4d58] mb-4">
              {isPTBR ? 'Vaga não encontrada' : 'Position Not Found'}
            </h1>
            <Link
              href={`${prefix}/open-positions`}
              className="text-[#00B894] hover:underline"
            >
              {isPTBR ? 'Ver todas as vagas' : 'View all positions'}
            </Link>
          </div>
        </main>
        <GlobalFooter />
      </div>
    );
  }

  return (
    <div data-name="PositionDetails" className="flex flex-col min-h-screen bg-white">
      <Header currentPage="open-positions" />
      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-[#4c4d58] relative w-full py-[48px] md:py-[64px]">
          <div className="max-w-[1000px] mx-auto px-6 md:px-8">
            <Link
              href={`${prefix}/open-positions`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="size-4" />
              <span>
                {isPTBR ? 'Voltar para vagas' : 'Back to positions'}
              </span>
            </Link>
            <h1 className="text-[28px] md:text-[40px] lg:text-[48px] font-bold leading-[1.2] text-white mb-4">
              {isPTBR ? position.titlePtBr : position.title}
            </h1>
            <div className="flex flex-wrap gap-2 text-[14px]">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full">
                {isPTBR ? position.departmentPtBr : position.department}
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full">
                {isPTBR ? position.locationPtBr : position.location}
              </span>
            </div>
          </div>
        </section>

        {/* Position Content */}
        <section className="bg-white py-[48px] md:py-[64px]">
          <div className="max-w-[1000px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-[24px] font-bold text-[#4c4d58] mb-4">
                  {isPTBR ? 'Sobre a vaga' : 'About the Role'}
                </h2>
                <p className="text-[16px] text-[#6b7280] leading-[1.8] mb-8">
                  {isPTBR ? position.descriptionPtBr : position.description}
                </p>

                <h2 className="text-[24px] font-bold text-[#4c4d58] mb-4">
                  {isPTBR ? 'Requisitos' : 'Requirements'}
                </h2>
                <ul className="space-y-3">
                  {(isPTBR ? position.requirementsPtBr : position.requirements).map(
                    (req, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-[16px] text-[#6b7280]"
                      >
                        <span className="text-[#00B894] mt-1">✓</span>
                        {req}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-[#f9fafb] rounded-[16px] p-6 sticky top-8">
                  <h3 className="text-[18px] font-bold text-[#4c4d58] mb-4">
                    {isPTBR ? 'Interessado?' : 'Interested?'}
                  </h3>
                  <p className="text-[14px] text-[#6b7280] mb-6">
                    {isPTBR
                      ? 'Candidate-se agora e faça parte da nossa equipe de inovação digital.'
                      : 'Apply now and join our digital innovation team.'}
                  </p>
                  <a
                    href={`https://karriere.netzsch.com/en/jobs/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#00B894] hover:bg-[#009874] text-white font-semibold py-3 px-6 rounded-[8px] inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    {isPTBR ? 'Candidatar-se' : 'Apply Now'}
                    <ArrowRightIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <GlobalFooter />
    </div>
  );
}

