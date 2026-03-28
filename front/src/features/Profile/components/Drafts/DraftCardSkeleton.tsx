import type { FC } from "react";
import deleteIcon from "../../../../assetsOld/buttonIcons/deleteIcon.png";

const DraftCardSkeleton: FC = () => {
  return (
    <div className="relative flex h-[428px] w-[267px] flex-col gap-[20px] rounded-[20px] bg-grey-50 bg-cover bg-no-repeat pb-[20px] pt-[43px] sm:h-[381px] sm:w-[222px] md:h-[606px] md:w-[273px] md:bg-[transparent] md:pt-0">
      <div className="relative mx-[27px] h-[428px] rounded-[20px] bg-grey-100 sm:mx-[23.5px] md:mx-[23px]"></div>
      <div className="mx-auto h-5 w-[156px] rounded-full bg-grey-100 md:h-6 md:w-[180px]"></div>
      <div className="flex justify-center gap-[18px] px-[27px] sm:gap-[7px] sm:px-[12px] md:gap-6 md:px-[23px]">
        <div className="h-11 w-[165px] rounded-[42px] bg-grey-100 md:max-w-[223px] md:flex-1"></div>
        <div className="flex h-11 min-w-11 items-center justify-center rounded-full bg-grey-100">
          <img src={deleteIcon} alt="Delete" className="h-11 min-w-11 opacity-0" />
        </div>
      </div>
    </div>
  );
};

export default DraftCardSkeleton;
