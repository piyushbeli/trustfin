/**
 * FaqFooterSection
 * Ask AI CTA and legal disclaimer shown directly below the FAQ accordion.
 */

import { JSX } from 'react';
import { SectionWrapper, AiChatCta } from '@/components/shared';
import { LOAN_MARKETPLACE_DISCLAIMER } from '@/lib/constants/legal-copy';
import { AI_CTA_COPY } from './constants';

interface FaqFooterSectionProps {
	hideDisclaimer?: boolean;
	disclaimer?: string;
}

const FaqFooterSection = ({
	hideDisclaimer = false,
	disclaimer = LOAN_MARKETPLACE_DISCLAIMER,
}: FaqFooterSectionProps): JSX.Element => {
	return (
		<SectionWrapper className="pt-0">
			<div
				className="space-y-4"
			>
				<AiChatCta label={AI_CTA_COPY.askAiLabel} variant="gradient" />
				{!hideDisclaimer && (
					<p className="text-sm italic leading-relaxed text-muted-foreground">
						{disclaimer}
					</p>
				)}
			</div>
		</SectionWrapper>
	);
};

export default FaqFooterSection;
