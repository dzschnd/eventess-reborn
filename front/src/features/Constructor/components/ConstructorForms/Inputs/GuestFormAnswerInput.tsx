import { useId } from "react";
import type { ChangeEvent, FC } from "react";
import crossIcon from "../../../../../assetsOld/buttonIcons/cross.png";

interface GuestFormAnswerInputProps {
  index: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onRemove: () => void;
}

const GuestFormAnswerInput: FC<GuestFormAnswerInputProps> = ({
  index,
  value,
  onChange,
  onBlur,
  onRemove,
}) => {
  const baseId = useId();

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={baseId}
        className="font-primary text-[12px] font-semibold text-grey-400"
      >
        {`Вариант ответа ${index + 1}`}
      </label>

      <div
        key={`${baseId}-answer-${index}`}
        className="flex items-center justify-between gap-2"
      >
        <input
          autoComplete={"off"}
          id={baseId}
          type={"text"}
          className="h-11 w-full rounded-[44px] border border-grey-100 px-4 font-primary text-[14px] font-normal text-grey-500 placeholder:text-grey-200 focus:outline-none"
          placeholder={"Введите ответ"}
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
        />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onRemove}
        >
          <img
            src={crossIcon}
            alt="Remove Answer"
            className="float-end h-5 w-5"
          />
        </button>
      </div>
    </div>
  );
};

export default GuestFormAnswerInput;
