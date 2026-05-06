import type { FC } from "react";
import clsx from "clsx";
import {
  CalendarDays,
  Clock3,
  Heart,
  MapPin,
  Shirt,
  UserRound,
} from "lucide-react";

const tabIcons = {
  Место: MapPin,
  Программа: CalendarDays,
  Дресскод: Shirt,
  Пожелания: Heart,
  "Анкета гостя": UserRound,
  Таймер: Clock3,
} as const;

export const TabButton: FC<{
  message: string;
  onClick?: () => void;
  isSelected: boolean;
  className?: string;
}> = ({ message, onClick, isSelected, className }) => {
  return (
    <button
      disabled={isSelected}
      className={clsx(
        "flex h-[58px] items-center justify-center gap-3 rounded-42 border px-[26px] text-300 font-semibold leading-[1] transition-all duration-200",
        isSelected
          ? "border-primary bg-primary text-white shadow-[0_10px_22px_rgba(161,15,4,0.26)]"
          : "border-[#ead5cd] bg-white/70 text-grey-300 hover:border-primary-100 hover:text-primary",
        className,
      )}
      onClick={onClick}
    >
      {isSelected ? (
        <span className="h-[9px] w-[9px] rounded-full bg-white" />
      ) : (
        (() => {
          const Icon = tabIcons[message as keyof typeof tabIcons];
          return Icon ? (
            <Icon size={21} strokeWidth={1.8} className="text-[#bca79f]" />
          ) : null;
        })()
      )}
      <span className={clsx(isSelected ? "text-white" : "text-grey-300")}>
        {message}
      </span>
    </button>
  );
};
