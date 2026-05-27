'use client';

/**
 * FaqFooterSection
 * Ask AI CTA and legal disclaimer shown directly below the FAQ accordion.
 */

import { JSX } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, AiChatCta } from '@/components/shared';
import { LOAN_MARKETPLACE_DISCLAIMER } from '@/lib/constants/legal-copy';
import { AI_CTA_COPY } from './constants';

const FaqFooterSection = (): JSX.Element => {
	return (
		<SectionWrapper className="pt-0">
			<motion.div
				initial={{ opacity: 0, y: 8 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.35 }}
				className="space-y-4"
			>
				<AiChatCta label={AI_CTA_COPY.askAiLabel} variant="gradient" />
				<p className="text-sm italic leading-relaxed text-muted-foreground">
					{LOAN_MARKETPLACE_DISCLAIMER}
				</p>
			</motion.div>
		</SectionWrapper>
	);
};

export default FaqFooterSection;
