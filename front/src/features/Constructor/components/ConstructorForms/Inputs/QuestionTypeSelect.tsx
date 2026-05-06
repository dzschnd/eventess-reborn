import { useRef, useState } from "react";
import type { FC } from "react";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import type { Key } from "react-aria-components";
import arrowRightIcon from "../../../../../assetsOld/buttonIcons/arrowRight.png";
import { QuestionType, type QuestionTypeValue } from "../../../../../types";

interface QuestionTypeSelectProps {
  value: QuestionTypeValue;
  onChange: (newType: QuestionTypeValue) => void;
}

const QuestionTypeSelect: FC<QuestionTypeSelectProps> = ({
  value,
  onChange,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Select
      selectedKey={value}
      onSelectionChange={(newKey: Key) => {
        const newType =
          newKey === "react-aria-1"
            ? QuestionType.CHECKBOX
            : newKey === "react-aria-2"
              ? QuestionType.SELECT
              : QuestionType.TEXT;
        onChange(newType);
        setIsPopoverOpen(false);
      }}
    >
      <Button
        ref={triggerRef}
        onPress={() => setIsPopoverOpen(true)}
        className="flex h-11 w-full items-center rounded-[44px] border border-grey-100 px-4 focus:outline-none"
      >
        <div className="relative flex w-full items-center gap-4 focus:outline-none">
          <Label className="shrink-0 font-primary text-[12px] font-semibold text-grey-400">
            Тип вопроса
          </Label>
          <SelectValue className="flex font-primary text-[14px] font-normal text-grey-500">
            {value === QuestionType.CHECKBOX && "Несколько из списка"}
            {value === QuestionType.SELECT && "Один из списка"}
            {value === QuestionType.TEXT && "Текст"}
          </SelectValue>
          <img
            src={arrowRightIcon}
            alt="Dropdown"
            className="absolute right-0 top-1/2 h-4 w-4"
            style={{
              transform: `translateY(-50%) rotate(${isPopoverOpen ? `0` : `90deg`}`,
            }}
          />
        </div>
      </Button>
      <Popover
        style={{ width: triggerRef.current?.offsetWidth }}
        className="w-full"
        isOpen={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
      >
        <ListBox className="flex flex-col rounded-[20px] border-[1px] border-grey-100 bg-white font-primary text-400 font-normal text-grey-500 focus:outline-none">
          <ListBoxItem
            textValue={"Несколько из списка"}
            className="flex cursor-pointer px-5 pb-2 pt-5 focus:outline-none"
          >
            Несколько из списка
          </ListBoxItem>
          <ListBoxItem
            textValue={"Один из списка"}
            className="flex cursor-pointer px-5 py-2 focus:outline-none"
          >
            Один из списка
          </ListBoxItem>
          <ListBoxItem
            textValue={"Текст"}
            className="flex cursor-pointer px-5 pb-5 pt-2 focus:outline-none"
          >
            Текст
          </ListBoxItem>
        </ListBox>
      </Popover>
    </Select>
  );
};

export default QuestionTypeSelect;
