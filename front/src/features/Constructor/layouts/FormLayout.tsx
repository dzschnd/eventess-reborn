import { useState } from "react";
import type { FC, PropsWithChildren } from "react";
import DisableBlockToggle from "../components/DisableBlockToggle";
import hamburgerMenu from "../../../assetsOld/hamburger-menu.png";
import { Link } from "react-router-dom";
import { constructorPages } from "./ConstructorLayout";
import FormMenu from "../components/ConstructorForms/FormMenu";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../api/redux/store";
import { setLastViewedConstructorBlock } from "../../../api/redux/slices/draftSlice";

interface FormLayoutProps extends PropsWithChildren {
  pageIndex: number;
  description: string;
  isBlockDisabled?: boolean;
  setIsBlockDisabled?: (disabled: boolean) => void;
}
const FormLayout: FC<FormLayoutProps> = ({
  children,
  pageIndex,
  description,
  setIsBlockDisabled,
  isBlockDisabled,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="relative flex min-h-full w-full max-w-full flex-col items-center justify-between bg-white sm:max-w-[423px] sm:shadow-form">
      {isMenuOpen && (
        <div className="absolute inset-0 z-30 bg-white">
          <FormMenu pageIndex={pageIndex} setIsMenuOpen={setIsMenuOpen} />
        </div>
      )}
      <div className="relative w-full flex-grow overflow-y-auto overflow-x-hidden sm:w-[423px] sm:min-w-[423px] sm:shadow-form">
        <div className="absolute inset-0 flex min-h-full w-full justify-center px-4 pt-6 sm:w-[423px] sm:min-w-[423px] sm:px-[30px] sm:pt-[38px]">
          <div className="w-full max-w-[363px]">
            <div className="mb-[40px] flex items-center justify-between">
              <h1 className="font-primary text-600 font-semibold leading-[1.2] text-grey-400">
                {constructorPages[pageIndex].name}
              </h1>
              <div className="flex items-center gap-3">
                {!constructorPages[pageIndex].required &&
                  isBlockDisabled !== undefined &&
                  setIsBlockDisabled && (
                    <DisableBlockToggle
                      isBlockDisabled={isBlockDisabled}
                      setIsBlockDisabled={setIsBlockDisabled}
                      blockLink={constructorPages[pageIndex].link}
                    />
                  )}
                <button onClick={() => setIsMenuOpen(true)}>
                  <img
                    src={hamburgerMenu}
                    alt="Open Menu"
                    className="h-5 w-5"
                  />
                </button>
              </div>
            </div>
            <div className="">
              {isBlockDisabled && (
                <div className="absolute bottom-0 left-0 right-0 top-[90px] z-10 bg-grey-50 bg-opacity-50"></div>
              )}
              <p className="mb-[30px] font-primary text-300 font-normal leading-[1.22] text-grey-400">
                {description}
              </p>
              <div className="flex flex-col gap-[22px] pb-5">{children}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-20 flex w-full justify-center gap-3 bg-white px-4 py-[14px] shadow-[0_-8px_24px_rgba(33,33,33,0.08)] sm:max-w-[423px] sm:gap-2.5 sm:px-[30px]">
        <Link
          className="flex-1 sm:flex-none"
          to={
            pageIndex > 0
              ? constructorPages[pageIndex - 1].link
              : "/profile/drafts"
          }
        >
          <button
            onClick={() => dispatch}
            className="h-[46px] w-full rounded-42 border-2 border-primary bg-white font-primary text-300 font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-white sm:h-[36px] sm:w-[176.5px]"
          >
            Назад
          </button>
        </Link>
        <Link
          className="flex-1 sm:flex-none"
          to={
            pageIndex < constructorPages.length - 1
              ? constructorPages[pageIndex + 1].link
              : "/constructor/preview"
          }
        >
          <button
            onClick={() =>
              dispatch(
                setLastViewedConstructorBlock(
                  constructorPages[pageIndex].link.replace("/constructor/", ""),
                ),
              )
            }
            className="h-[46px] w-full rounded-42 bg-primary font-primary text-300 font-semibold text-white transition-colors duration-200 hover:bg-primary-700 sm:h-[36px] sm:w-[176.5px]"
          >
            Далее
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FormLayout;
