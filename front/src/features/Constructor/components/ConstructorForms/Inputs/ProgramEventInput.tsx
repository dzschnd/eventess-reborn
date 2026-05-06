import type { FC } from "react";
import type { FieldValues } from "react-hook-form";
import {
  DateInput,
  DateSegment,
  Label,
  TimeField,
} from "react-aria-components";
import { Time } from "@internationalized/date";
import { X } from "lucide-react";

interface ProgramEventInputProps {
  value?: {
    eventTime: Time | null;
    description: string | null;
    position: number;
  } | null;
  placeholder: string;
  onChange: (value: FieldValues) => void;
  onBlur: () => void;
  onRemove: () => void;
}

const ProgramEventInput: FC<ProgramEventInputProps> = ({
  placeholder,
  value,
  onChange,
  onBlur,
  onRemove,
}) => {
  const handleTimeChange = (time: Time) => {
    onChange({ ...value, eventTime: time });
  };

  return (
    <div className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2">
      <div className="col-start-1 row-start-1">
        <span className="font-primary text-200 font-semibold leading-[1.2] text-grey-400">
          Время
        </span>
      </div>
      <div className="col-start-2 row-start-1">
        <Label className="font-primary text-200 font-semibold leading-[1.2] text-grey-400">
          Событие
        </Label>
      </div>

      <div className="col-start-1 row-start-2">
        <TimeField
          value={value?.eventTime || new Time(0, 0)}
          onChange={(time) => {
            return handleTimeChange(time!);
          }}
          onBlur={onBlur}
        >
          <DateInput className="flex items-center gap-0.5">
            {(segment) => (
              <DateSegment
                segment={segment}
                className={
                  segment.type === "literal"
                    ? "font-primary text-[14px] font-normal leading-[1] text-grey-300"
                    : "flex h-11 w-[46px] items-center justify-center rounded-[14px] border border-grey-100 font-primary text-[14px] font-normal leading-[1] text-grey-300 placeholder:text-grey-200 focus:outline-none focus:ring-1 focus:ring-grey-300"
                }
              />
            )}
          </DateInput>
        </TimeField>
      </div>

      <div className="col-start-2 row-start-2 min-w-0">
        <div className="flex h-11 items-center rounded-[24px] border border-grey-100 px-4">
          <input
            autoComplete="off"
            type="text"
            className="w-full font-primary text-[14px] font-normal text-grey-500 placeholder:text-grey-200 focus:outline-none"
            placeholder={placeholder}
            value={value?.description || ""}
            onChange={(e) =>
              onChange({ ...value, description: e.target.value })
            }
            onBlur={onBlur}
          />
        </div>
      </div>

      <button
        type="button"
        className="col-start-3 row-start-2 flex h-6 w-6 items-center justify-center rounded-full bg-grey-50 text-black transition-colors duration-200 hover:bg-grey-100"
        onMouseDown={(e) => e.preventDefault()}
        onClick={onRemove}
      >
        <X className="h-4 w-4" strokeWidth={3} />
      </button>
    </div>
  );
};

export default ProgramEventInput;
