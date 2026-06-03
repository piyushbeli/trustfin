interface AuthStepTitleProps {
  titleLine1: string;
  titleLine2: string;
  subtitle?: string;
}

/**
 * Two-line auth step heading with optional gray subtitle.
 */
export const AuthStepTitle = ({
  titleLine1,
  titleLine2,
  subtitle,
}: AuthStepTitleProps): React.ReactNode => {
  return (
    <div className="mb-12">
      <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
        {titleLine1}
      </h1>
      <p className="text-2xl text-gray-900 leading-tight mb-2">
        {titleLine2}
      </p>
      {subtitle && (
        <p className="text-sm text-gray-500 mb-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};
