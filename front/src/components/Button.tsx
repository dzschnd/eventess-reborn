import type { FC } from "react";
import clsx from "clsx";

const Button: FC<{
  message: string;
  type?: "button" | "submit" | "reset";
  borderRadius: number;
  onClick?: () => void;
  inverted?: boolean;
  className?: string;
  disabled?: boolean;
}> = ({
  message,
  type,
  borderRadius,
  onClick,
  inverted,
  className,
  disabled,
}) => {
  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      className={clsx(
        `rounded-[${borderRadius}px] border border-primary text-300 font-semibold`,
        inverted
          ? "bg-primary text-white hover:bg-primary-700"
          : "text-primary hover:bg-primary hover:text-white",
        disabled && "cursor-not-allowed opacity-70",
        className,
      )}
      onClick={onClick}
    >
      {message}
    </button>
  );
};

export default Button;
