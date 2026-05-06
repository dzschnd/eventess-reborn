import { useRef, useState } from "react";
import type { FC } from "react";
import cloudIcon from "../../../assetsOld/cloudIcon.png";
import { CircleUserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../../assets/svg/Logo";
import PreviewToggle from "./ConstructorPreview/PreviewToggle";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../api/redux/store";
import { publishDraft, validateDraft } from "../../../api/service/DraftService";
import cross from "../../../assetsOld/buttonIcons/cross.png";
import { useCloseOnClickOutside } from "../../../hooks/useCloseOnClickOutside";
import type { StateError } from "../../../types";
import ConfirmationModal from "../../../components/ConfirmationModal";

interface ConstructorHeaderProps {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

const ConstructorHeader: FC<ConstructorHeaderProps> = ({
  isMobile,
  setIsMobile,
}) => {
  const { loading, error, id } = useSelector((state: RootState) => state.draft);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  useCloseOnClickOutside({
    popupRef: overlayRef,
    setIsPopupOpenAction: setShowOverlay,
  });

  const onValidate = async () => {
    const response = await validateDraft({ id });
    const error = response as StateError | undefined;
    if (error?.status === 400) {
      const details = error.details
        ?.map((detail) => detail.message)
        .filter(Boolean);
      setValidationErrors(
        details && details.length > 0 ? details : [error.message],
      );
      setShowOverlay(true);
    } else {
      setShowPublishConfirm(true);
    }
  };

  const confirmPublish = async () => {
    setShowPublishConfirm(false);
    const response = await dispatch(publishDraft({ id }));
    if (response.meta.requestStatus === "fulfilled") {
      navigate(`../../invitations/${id}`);
    }
  };

  return (
    <>
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={overlayRef}
            className="relative mx-4 flex max-w-[328px] flex-col gap-5 rounded-[30px] bg-white p-[30px]"
          >
            <div className="flex justify-between gap-[30px]">
              <h2 className="font-primary text-500 font-normal text-grey-500">
                Предпросмотр перед публикацией
              </h2>
              <button
                onClick={() => setShowOverlay(false)}
                className="flex-shrink"
              >
                <img src={cross} alt="Close" className="h-6 max-w-6" />
              </button>
            </div>
            <p className="font-primary text-300 font-light text-grey-500">
              У вас не заполнены некоторые поля, это может привести к ошибкам
              отображения приглашения:
            </p>
            <ul className="text-error text-left text-300">
              {validationErrors.map((error, index) => (
                <li className={"list-inside list-disc"} key={index}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <ConfirmationModal
        isOpen={showPublishConfirm}
        title="Публикация приглашения"
        message="Оплата пока не подключена — это заглушка. Нажимая «Опубликовать», вы разместите приглашение в демо-режиме."
        confirmLabel="Опубликовать"
        cancelLabel="Отмена"
        onConfirm={confirmPublish}
        onCancel={() => setShowPublishConfirm(false)}
      />

      <div className="relative flex h-[62px] w-full shrink-0 items-center justify-center bg-white px-[16px] shadow-[0_8px_24px_rgba(33,33,33,0.08)] sm:px-[28px]">
        <div className="absolute left-[16px] flex items-center gap-[18px] sm:left-[28px]">
          <Link to={"/"} className="inline-flex">
            <Logo width={76} desktopWidth={108} />
          </Link>
          <div className="hidden items-center gap-[6px] sm:flex">
            <img
              src={cloudIcon}
              alt=""
              className="h-[14px] w-[14px] opacity-70"
            />
            <span className="font-primary text-200 font-normal leading-[1] text-grey-400">
              {error
                ? error.message
                : loading
                  ? "Сохранение..."
                  : "Сохранено."}
            </span>
          </div>
        </div>
        <div className="hidden md:block">
          <PreviewToggle isMobile={isMobile} setIsMobile={setIsMobile} />
        </div>
        <div className="absolute right-[16px] flex items-center justify-end gap-3 sm:right-[28px]">
          <a
            href="/constructor/preview"
            className="hidden sm:block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="h-9 rounded-42 border border-primary bg-white px-4 font-primary text-[13px] font-semibold leading-[1] text-primary shadow-[0_8px_18px_rgba(126,91,79,0.08)] transition duration-200 hover:-translate-y-[1px] hover:bg-primary hover:text-white hover:shadow-[0_12px_24px_rgba(126,91,79,0.14)] active:translate-y-0 active:shadow-[0_6px_14px_rgba(126,91,79,0.1)] sm:px-5">
              Предпросмотр
            </button>
          </a>
          <button
            onClick={onValidate}
            className="h-9 rounded-42 border border-primary bg-primary px-4 font-primary text-[13px] font-semibold leading-[1] text-white shadow-[0_10px_22px_rgba(126,91,79,0.18)] transition duration-200 hover:-translate-y-[1px] hover:border-primary-700 hover:bg-primary-700 hover:shadow-[0_14px_28px_rgba(126,91,79,0.22)] active:translate-y-0 active:shadow-[0_7px_16px_rgba(126,91,79,0.16)] sm:px-5"
          >
            Опубликовать
          </button>
          <Link to={"/profile"} className="text-primary hover:text-primary-700">
            <CircleUserRound size={22} strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ConstructorHeader;
