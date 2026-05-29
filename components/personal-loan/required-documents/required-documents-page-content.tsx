/**
 * RequiredDocumentsPageContent
 * Composes all sections for the Personal Loan Documents Required page.
 */

import { JSX } from 'react';
import {
  AiChatCta,
  FaqList,
  MultiColumnTable,
  SectionTitle,
  SectionWrapper,
} from '@/components/shared';
import InfoAccordionList from '@/components/personal-loan/info-accordion/info-accordion-list';
import { AI_CTA_COPY } from '@/components/personal-loan/constants';
import { PERSONAL_LOAN_DOCUMENTS_REQUIRED_FAQS } from '@/lib/constants/personal-loan-documents-required-faqs';
import RequiredDocumentsHero from './required-documents-hero';
import {
  PAGE_DISCLAIMER,
  REQUIRED_DOCUMENTS_ACCORDION_DEFAULT_OPEN,
  REQUIRED_DOCUMENTS_ACCORDION_ITEMS,
  VERIFICATION_TABLE_HEADERS,
  VERIFICATION_TABLE_ROWS,
  WHAT_DOCUMENTS_SECTION,
} from './constants';

const BODY_CLASS = 'text-sm leading-relaxed text-muted-foreground md:text-base';

const RequiredDocumentsPageContent = (): JSX.Element => {
  return (
    <div className="min-h-screen pb-24 pt-24 md:pt-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto flex max-w-3xl flex-col px-4 pt-6">
          <div className="space-y-8">
            <RequiredDocumentsHero />

            <SectionWrapper className="px-0 py-0" innerClassName="mx-0 max-w-none px-0">
              <div className="space-y-4">
                <SectionTitle
                  as="h2"
                  className="custom-text-black text-left text-lg font-semibold md:text-xl"
                >
                  {WHAT_DOCUMENTS_SECTION.title}
                </SectionTitle>
                {WHAT_DOCUMENTS_SECTION.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className={BODY_CLASS}>
                    {paragraph}
                  </p>
                ))}
                <MultiColumnTable
                  headers={VERIFICATION_TABLE_HEADERS}
                  rows={VERIFICATION_TABLE_ROWS}
                  minWidthClassName="min-w-[640px]"
                />
                {WHAT_DOCUMENTS_SECTION.closing.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className={BODY_CLASS}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </SectionWrapper>

            <InfoAccordionList
              items={REQUIRED_DOCUMENTS_ACCORDION_ITEMS}
              defaultOpen={[...REQUIRED_DOCUMENTS_ACCORDION_DEFAULT_OPEN]}
            />

            <SectionWrapper className="px-0 py-0" innerClassName="mx-0 max-w-none px-0">
              <SectionTitle as="h2" className="mb-4 text-center text-lg font-semibold md:text-xl">
                Frequently Asked Questions
              </SectionTitle>
              <FaqList items={PERSONAL_LOAN_DOCUMENTS_REQUIRED_FAQS} />
            </SectionWrapper>

            <AiChatCta
              label={AI_CTA_COPY.askAiLabel}
              variant="gradient"
              className="custom-cta-button"
            />

            <p className="text-xs italic leading-relaxed text-muted-foreground md:text-sm">
              {PAGE_DISCLAIMER}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequiredDocumentsPageContent;
