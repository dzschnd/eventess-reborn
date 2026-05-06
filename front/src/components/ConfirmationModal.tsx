import { useEffect, useRef } from "react";
import type { FC } from "react";
import { useCloseOnClickOutside } from "../hooks/useCloseOnClickOutside";
import cross from "../assetsOld/buttonIcons/cross.png";
import { X } from "lucide-react";

type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  message?: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "default" | "danger";
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  variant = "default",
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useCloseOnClickOutside({
    popupRef: overlayRef,
    setIsPopupOpenAction: (open) => {
      if (!open) onCancel();
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  if (variant === "danger") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
        <div
          ref={overlayRef}
          className="relative flex w-full max-w-[850px] flex-col rounded-[42px] bg-white px-6 pb-[92px] pt-[94px] sm:px-[68px]"
        >
          <button
            onClick={onCancel}
            aria-label="Закрыть"
            className="absolute right-7 top-7 flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#f2f2f2] text-black transition-colors duration-200 hover:bg-[#e5e5e5]"
          >
            <X size={34} strokeWidth={3} />
          </button>
          <h2 className="mx-auto max-w-[640px] text-center font-primary text-[38px] font-bold leading-[1.12] text-primary sm:text-[48px]">
            {title}
          </h2>
          {message && (
            <p className="mx-auto mt-5 max-w-[560px] text-center font-primary text-300 font-light text-grey-500">
              {message}
            </p>
          )}
          <div className="mt-[84px] flex flex-col gap-5 sm:flex-row sm:gap-[28px]">
            <button
              onClick={onCancel}
              className="h-[86px] flex-1 rounded-[42px] border-2 border-primary bg-white font-primary text-[32px] font-normal leading-[1] text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className="h-[86px] flex-1 rounded-[42px] border-2 border-primary bg-primary font-primary text-[32px] font-normal leading-[1] text-white transition-colors duration-200 hover:border-primary-700 hover:bg-primary-700"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={overlayRef}
        className="relative mx-4 flex w-full max-w-[360px] flex-col gap-5 rounded-[30px] bg-white p-[30px]"
      >
        <div className="flex justify-between gap-[30px]">
          <h2 className="font-primary text-500 font-normal text-grey-500">
            {title}
          </h2>
          <button onClick={onCancel} className="flex-shrink">
            <img src={cross} alt="Close" className="h-6 max-w-6" />
          </button>
        </div>
        <p className="font-primary text-300 font-light text-grey-500">
          {message}
        </p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="h-10 rounded-[30px] border-[2px] border-grey-300 px-4 font-primary text-300 font-normal text-grey-300"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="h-10 rounded-[30px] bg-grey-300 px-4 font-primary text-300 font-normal text-white"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
