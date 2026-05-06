import type { FC } from "react";
import { Plus } from "lucide-react";

type DashboardEmptyStateProps = {
  title: string;
  description: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  icon?: "invitation" | "rsvp";
  showButtonIcon?: boolean;
  className?: string;
};

const DashboardEmptyState: FC<DashboardEmptyStateProps> = ({
  title,
  description,
  buttonLabel,
  onButtonClick,
  showButtonIcon = true,
  className = "",
}) => {
  const showButton = buttonLabel && onButtonClick;

  return (
    <div
      className={`flex w-full rounded-[28px] bg-[#faf7f4] p-6 sm:p-7 ${className}`}
    >
      <div className="flex w-full flex-col items-start">
        <h2 className="font-primary text-[20px] font-semibold leading-[1.18] text-grey-500 sm:text-[22px]">
          {title}
        </h2>
        <p className="font-open-sans mt-2 max-w-[430px] text-[14px] leading-[1.5] text-grey-400">
          {description}
        </p>

        {showButton && (
          <button
            type="button"
            onClick={onButtonClick}
            className="font-open-sans mt-6 inline-flex h-[44px] items-center justify-center gap-2 rounded-[999px] bg-primary px-5 text-[14px] font-semibold leading-none text-white transition-colors duration-200 hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:bg-primary-700"
          >
            {showButtonIcon && <Plus className="h-4 w-4" strokeWidth={2} />}
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardEmptyState;
