import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
} from "react-aria-components";
import type { DateValue, ValidationResult } from "react-aria-components";
import { FieldError } from "react-aria-components";
import { today, getLocalTimeZone } from "@internationalized/date";
import arrowLeft from "../../../../../assetsOld/buttonIcons/arrowLeft.png";
import arrowRight from "../../../../../assetsOld/buttonIcons/arrowRight.png";
import { useEffect, useRef, useState, forwardRef } from "react";

interface Props<T extends DateValue> {
  label: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  value?: T;
  onChange?: (value: DateValue) => void;
  onBlur?: () => void;
}

const ConstructorDateInput = forwardRef<HTMLInputElement, Props<DateValue>>(
  ({ label, errorMessage, value, onChange, onBlur }: Props<DateValue>, ref) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 760);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 760);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, [value]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          popoverRef.current &&
          !popoverRef.current.contains(event.target as Node)
        ) {
          setIsPopoverOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const openPopover = () => {
      setIsPopoverOpen(true);
    };

    const handleDateChange = (newValue: DateValue | null) => {
      if (onChange && newValue) {
        onChange(newValue);
      }
      setIsPopoverOpen(false);
    };

    const currentDateValue = today(getLocalTimeZone());

    return (
      <DatePicker
        minValue={currentDateValue}
        value={value}
        onChange={handleDateChange}
        onBlur={onBlur}
      >
        <Label className="sr-only">{label}</Label>
        <Group
          onClick={openPopover}
          className="flex h-12 cursor-pointer items-center rounded-[50px] border border-grey-100 bg-white px-4 transition-colors duration-200 focus-within:border-grey-300"
        >
          <DateInput className="flex w-full" ref={ref}>
            {(segment) => (
              <DateSegment
                segment={segment}
                className="font-primary text-400 font-normal text-grey-500 placeholder:text-grey-200 focus:outline-none"
              />
            )}
          </DateInput>
        </Group>
        <FieldError className={"text-300 text-red-500"}>
          {errorMessage}
        </FieldError>
        {isPopoverOpen && (
          <Popover
            ref={popoverRef}
            isNonModal={!isMobile}
            className="focus:outline-none"
          >
            <Dialog>
              <Calendar className="w-52 rounded-[7px] border-[1px] border-grey-100 bg-white p-2">
                <header className="flex justify-between">
                  <Button slot="previous">
                    <img src={arrowLeft} alt="Previous" />
                  </Button>
                  <Heading />
                  <Button slot="next">
                    <img src={arrowRight} alt="Next" />
                  </Button>
                </header>
                <CalendarGrid weekdayStyle={"short"} className="w-full">
                  {(date) => (
                    <CalendarCell
                      date={date}
                      className={`text-center ${date < currentDateValue ? "bg-grey-50" : ""}`}
                    />
                  )}
                </CalendarGrid>
              </Calendar>
            </Dialog>
          </Popover>
        )}
      </DatePicker>
    );
  },
);

export default ConstructorDateInput;
