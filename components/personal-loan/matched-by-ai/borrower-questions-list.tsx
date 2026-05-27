'use client';

/**
 * BorrowerQuestionsList
 * Vertical stack of suggested-question rows. Owns the shared no-op handler
 * for now so each row doesn't define its own; when the AI chat modal ships
 * this is the single place to route prefill questions into the modal.
 */

import { JSX } from 'react';
import BorrowerQuestionRow from './borrower-question-row';
import { AI_BORROWER_QUESTIONS, type BorrowerQuestionItem } from '../constants';

interface BorrowerQuestionsListProps {
  questions?: BorrowerQuestionItem[];
}

const BorrowerQuestionsList = ({
  questions = AI_BORROWER_QUESTIONS,
}: BorrowerQuestionsListProps): JSX.Element => {
  const handleAsk = (_question: string): void => {
    // Placeholder until AI chat modal ships. Question will be forwarded as
    // a prefill prompt at that point.
    void _question;
  };

  return (
    <div className="space-y-3">
      {questions.map((item, index) => (
        <BorrowerQuestionRow
          key={item.id}
          item={item}
          index={index}
          onAsk={handleAsk}
        />
      ))}
    </div>
  );
};

export default BorrowerQuestionsList;
