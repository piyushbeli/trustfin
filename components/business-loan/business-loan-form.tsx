'use client';

import {
  ActionButton,
  ApplicationFormBar,
  ApplicationFormIntro,
  ApplicationProgress,
} from '@/components/shared';
import { getLoanApplicationIntro } from '@/lib/constants/loan-application';
import BusinessLoanFields from './business-loan-fields';
import { buildBusinessLoanPayload } from './business-loan-form.config';
import { useBusinessLoanForm } from './use-business-loan-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

interface BusinessLoanFormProps {
  onClose?: () => void;
  /** When true, form is embedded in modal; root uses flex-1 min-h-0 and back on step 1 calls onClose */
  isModal?: boolean;
  /** Called when the API submit succeeds so the parent can show success state. */
  onSuccess?: () => void;
}

const BusinessLoanForm = ({ onClose, isModal = false, onSuccess }: BusinessLoanFormProps): React.ReactNode => {
  const {
    formValues,
    formErrors,
    handleFieldChange,
    handleNext,
    handleBack,
    handleSubmit,
    currentStep,
    totalSteps,
    currentStepConfig,
    isFirstStep,
    isLastStep,
    isSubmitting,
    canSubmit,
  } = useBusinessLoanForm({ onSuccess });
  const router = useRouter();
  const { isAuthenticated, openAuthModalWithPhoneAndAction } = useAuth();

  const handleHeaderBackClick = (): void => {
    if (isFirstStep) {
      if (onClose) {
        onClose();
      } else {
        router.push('/');
      }
      return;
    }
    handleBack();
  };

  const onFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!isAuthenticated) {
      // Store form payload as pending action; show OTP (no phone input).
      // After OTP success, usePostLogin calls bl-leads API and emits success event.
      const payload = buildBusinessLoanPayload(formValues);
      void openAuthModalWithPhoneAndAction(formValues.mobile, {
        type: 'submit_business_loan',
        businessLoanPayload: payload,
      });
      return;
    }
    handleSubmit();
  };

  const renderFooterButton = (): React.ReactNode => {
    if (!isLastStep) {
      return (
        <ActionButton type="button" onClick={handleNext} fullWidth className="h-14 text-base">
          Next
        </ActionButton>
      );
    }
    return (
      <ActionButton
        type="submit"
        disabled={!canSubmit}
        isLoading={isSubmitting}
        fullWidth
        className="h-14 text-base"
      >
        Submit
      </ActionButton>
    );
  };

  const rootClassName = isModal
    ? 'flex flex-col flex-1 min-h-0 bg-white'
    : 'bg-white h-screen flex flex-col';

  const { title: introTitle, description: introDescription } =
    getLoanApplicationIntro('business');

  return (
    <div className={rootClassName}>
      <div className="shrink-0 bg-white border-b">
        <ApplicationFormBar
          title="Business Loan Application"
          onBack={handleHeaderBackClick}
          backAriaLabel={isFirstStep ? 'Back' : 'Previous step'}
        />
        <ApplicationProgress
          currentStep={currentStep}
          totalSteps={totalSteps}
          className="px-4 pb-4"
        />
      </div>

      <form onSubmit={onFormSubmit} className="flex flex-col flex-1 min-h-0">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto w-full p-6 space-y-6">
            <ApplicationFormIntro
              title={introTitle}
              description={introDescription}
            />
            <h2 className="lead-form-heading">{currentStepConfig.title}</h2>

            <div key={currentStep} className="space-y-5">
              <BusinessLoanFields
                stepNumber={currentStep}
                formValues={formValues}
                formErrors={formErrors}
                handleFieldChange={handleFieldChange}
              />
            </div>
          </div>
        </div>

        {/* Footer button */}
        <div className="border-t bg-white p-4 shrink-0 max">{renderFooterButton()}</div>
      </form>
    </div>
  );
};

export default BusinessLoanForm;
