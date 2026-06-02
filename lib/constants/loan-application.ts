/**
 * Shared copy for secured loan application form intros.
 */

export type LoanApplicationType =
  | 'home'
  | 'business'
  | 'car'
  | 'gold'
  | 'personal';

export interface LoanApplicationIntroCopy {
  title: string;
  description: string;
}

const DEFAULT_DESCRIPTION =
  'Let AI help you find the best loan offers tailored to you';

export const LOAN_APPLICATION_INTRO: Record<
  LoanApplicationType,
  LoanApplicationIntroCopy
> = {
  home: {
    title: 'Apply for Home Loan',
    description: DEFAULT_DESCRIPTION,
  },
  business: {
    title: 'Apply for Business Loan',
    description: DEFAULT_DESCRIPTION,
  },
  car: {
    title: 'Apply for Car Loan',
    description: DEFAULT_DESCRIPTION,
  },
  gold: {
    title: 'Apply for Gold Loan',
    description: DEFAULT_DESCRIPTION,
  },
  personal: {
    title: 'Apply for Personal Loan',
    description: DEFAULT_DESCRIPTION,
  },
};

export const getLoanApplicationIntro = (
  loanType: LoanApplicationType
): LoanApplicationIntroCopy => LOAN_APPLICATION_INTRO[loanType];
