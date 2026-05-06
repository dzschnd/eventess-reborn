import { forwardRef, useId } from "react";
import type { ChangeEvent, FC } from "react";

interface InputProps {
  placeholder: string;
  label: string;
  className?: string;
  disabled?: boolean;
  value?: string | null;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  labelClassName?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
}
const TextInput: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      label,
      className,
      value,
      onChange,
      onBlur,
      labelClassName,
      inputContainerClassName,
      inputClassName,
    },
    ref,
  ) => {
    const id = useId();

    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <label
          htmlFor={id}
          className={`font-primary text-200 font-normal leading-[1.2] text-grey-400 ${labelClassName ?? ""}`}
        >
          {label}
        </label>
        <div
          className={`flex h-[46px] items-center rounded-[44px] border border-grey-100 px-4 ${inputContainerClassName ?? ""}`}
        >
          <input
            autoComplete={"off"}
            id={id}
            type={"text"}
            className={`w-full font-primary text-300 font-normal text-grey-500 placeholder:text-grey-200 focus:outline-none disabled:bg-white ${inputClassName ?? ""}`}
            placeholder={placeholder}
            value={value ?? ""}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
          />
        </div>
      </div>
    );
  },
);

export default TextInput;
