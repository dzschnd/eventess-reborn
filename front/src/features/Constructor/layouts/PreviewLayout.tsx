import type { FC } from "react";
import { IphoneMockup } from "../../../assets/svg/IphoneMockup";
import {
  calculatePreviewHeight,
  calculatePreviewWidth,
} from "../../../utils/previewUtils";
import InvitationPreview from "../../Templates/InvitationPreview";

interface PreviewLayoutProps {
  isMobile: boolean;
  block: string;
  calculatedWidth: number | null;
  calculatedHeight: number | null;
}

const PreviewLayout: FC<PreviewLayoutProps> = ({
  isMobile,
  block,
  calculatedWidth,
  calculatedHeight,
}) => {
  if (!calculatedWidth) return null;

  const mobilePhoneWidth =
    calculatedWidth && calculatedHeight
      ? Math.min(
          Math.max(
            Math.min(calculatedWidth, calculatedHeight * (823 / 1677)),
            320,
          ),
          390,
        )
      : 375;
  const mobilePhoneHeight = mobilePhoneWidth * (1677 / 823);
  const mobileScreenWidth = mobilePhoneWidth * (746 / 823);
  const mobileScreenHeight = mobilePhoneHeight * (1619 / 1677);

  return (
    <div className={"flex h-full w-full items-center justify-center"}>
      {isMobile ? (
        <div
          className={
            "relative flex-shrink-0 overflow-hidden rounded-[40px] bg-white"
          }
          style={{
            width: `${mobilePhoneWidth}px`,
            height: `${mobilePhoneHeight}px`,
            minWidth: "320px",
          }}
        >
          <div
            className="absolute overflow-hidden bg-white"
            style={{
              top: `${(32 / 1677) * 100}%`,
              left: `${(38 / 823) * 100}%`,
              width: `${(746 / 823) * 100}%`,
              height: `${(1619 / 1677) * 100}%`,
              borderRadius: `${(40 / 746) * 100}%`,
            }}
          >
            <InvitationPreview
              block={block}
              width={mobileScreenWidth}
              height={mobileScreenHeight}
              isMobile={isMobile}
            />
          </div>
          <IphoneMockup />
        </div>
      ) : (
        <>
          <div
            className="hidden h-full w-full items-center justify-center rounded-[30px] border-[9px] border-grey-500 md:flex"
            style={{
              maxHeight: `${calculatedWidth && calculatedHeight ? Math.min(calculatedWidth * (453 / 807), calculatedHeight) + "px" : "453px"}`,
              maxWidth: `${calculatedWidth && calculatedHeight ? Math.min(calculatedWidth, calculatedHeight * (807 / 453)) + "px" : "807px"}`,
            }}
          >
            <InvitationPreview
              block={block}
              width={calculatePreviewWidth(
                calculatedWidth,
                calculatedHeight,
                isMobile,
              )}
              height={calculatePreviewHeight(
                calculatedWidth,
                calculatedHeight,
                isMobile,
              )}
              isMobile={isMobile}
            />
          </div>
          <div
            className="flex h-full w-full items-center justify-center rounded-[30px] border-[9px] border-grey-500 md:hidden"
            style={{
              maxHeight: `${calculatedWidth && calculatedHeight ? Math.min(calculatedWidth * (508 / 232), calculatedHeight) + "px" : "508px"}`,
              maxWidth: `${calculatedWidth && calculatedHeight ? Math.min(calculatedWidth, calculatedHeight * (232 / 508)) + "px" : "232px"}`,
            }}
          >
            <InvitationPreview
              block={block}
              width={calculatePreviewWidth(
                calculatedWidth,
                calculatedHeight,
                isMobile,
              )}
              height={calculatePreviewHeight(
                calculatedWidth,
                calculatedHeight,
                isMobile,
              )}
              isMobile={isMobile}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PreviewLayout;
