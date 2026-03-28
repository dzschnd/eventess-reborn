import type { FC } from "react";

const GuestAnswerSkeleton: FC = () => {
  return (
    <div className="mt-10">
      <div className="scrollbar-hide flex gap-[30px] overflow-x-auto pb-[3px]">
        <div className="h-7 w-[260px] rounded-full bg-grey-100"></div>
        <div className="h-7 w-[220px] rounded-full bg-grey-100"></div>
      </div>

      <div className="mt-[30px] flex flex-col gap-5">
        {[0, 1].map((item) => (
          <div
            key={item}
            className="flex flex-col gap-5 rounded-[20px] bg-grey-50 p-5 md:p-[30px]"
          >
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <div className="h-5 w-16 rounded-full bg-grey-100"></div>
              <div className="h-5 w-[180px] rounded-full bg-grey-100"></div>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <div className="h-5 w-28 rounded-full bg-grey-100"></div>
              <div className="h-5 w-[220px] rounded-full bg-grey-100"></div>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <div className="h-5 w-24 rounded-full bg-grey-100"></div>
              <div className="h-5 w-[200px] rounded-full bg-grey-100"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestAnswerSkeleton;
