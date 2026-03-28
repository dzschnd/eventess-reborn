import type { FC } from "react";

const InvitationCardSkeleton: FC = () => {
  return (
    <div className="relative flex h-[428px] w-[267px] flex-col gap-[20px] rounded-[20px] bg-grey-50 bg-cover bg-no-repeat pb-[20px] pt-[43px] sm:h-[425.4px] sm:w-[222px] md:h-[606px] md:w-[273px] md:bg-[transparent] md:pt-0">
      <div className="relative mx-[27px] h-full rounded-[20px] bg-grey-100 sm:mx-[23.5px] md:mx-[23px]"></div>
      <div className="mx-auto h-5 w-[156px] rounded-full bg-grey-100 md:h-6 md:w-[180px]"></div>
      <div className="flex flex-col items-center justify-center gap-[18px] px-[27px] sm:gap-3 sm:px-[12px] md:px-[23px]">
        <div className="h-[41px] w-full rounded-[42px] bg-grey-100"></div>
        <div className="h-[41px] w-full rounded-[42px] bg-grey-100 sm:w-[107px] md:w-full"></div>
      </div>
    </div>
  );
};

export default InvitationCardSkeleton;
