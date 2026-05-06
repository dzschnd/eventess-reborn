import React, { forwardRef } from "react";
import type { FC } from "react";
import { Eye, EyeOff } from "lucide-react";
import FormErrorMessage from "../../../components/FormErrorMessage";
import { twMerge } from "tailwind-merge";

interface InputFieldProps {
  id: string;
  type: string;
  placeholder: string;
  icon?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent) => void;
  disabled?: boolean;
  error?: string;
  inputClassName?: string;
  passwordButtonClassName?: string;
}

const InputField: FC<InputFieldProps> = forwardRef<
  HTMLInputElement,
  InputFieldProps
>(
  (
    {
      id,
      type,
      placeholder,
      value,
      onChange,
      onBlur,
      disabled,
      error,
      inputClassName,
      passwordButtonClassName,
      ...props
    },
    ref,
  ) => {
    const [isPasswordVisible, setPasswordVisible] = React.useState(false);
    const togglePasswordVisibility = () => {
      setPasswordVisible(!isPasswordVisible);
    };

    return (
      <>
        <div className="relative">
          <input
            id={id}
            type={type === "password" && isPasswordVisible ? "text" : type}
            className={twMerge(
              "h-14 w-full rounded-[8px] border border-grey-100 px-4 font-primary text-400 font-light leading-[1.4] placeholder:text-grey-200 focus:outline-none md:h-11",
              error && "border-red-error",
              inputClassName,
            )}
            placeholder={placeholder}
            ref={ref}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            {...props}
            disabled={disabled}
          />
          {type === "password" && (
            <button
              type="button"
              className={twMerge(
                "absolute right-4 top-4 md:top-2.5",
                passwordButtonClassName,
              )}
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <EyeOff
                  size={20}
                  strokeWidth={1.7}
                  aria-label="Hide password"
                  className="text-grey-300"
                />
              ) : (
                <Eye
                  size={20}
                  strokeWidth={1.7}
                  aria-label="Show password"
                  className="text-grey-300"
                />
              )}
            </button>
          )}
        </div>
        {error && <FormErrorMessage message={error} />}
      </>
    );
  },
);

export default InputField;
