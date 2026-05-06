import { useEffect, useState } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../api/redux/store";
import Button from "./Button";
import { Logo } from "../assets/svg/Logo";
import { BurgerMenuIcon } from "../assets/svg/BurgerMenuIcon";
import { ProfileIcon } from "../assets/svg/ProfileIcon";
import { MobileMenu } from "./MobileMenu";
import clsx from "clsx";
import { CloseMenuIcon } from "../assets/svg/CloseMenuIcon";
import useCreateDefaultDraft from "../utils/useCreateDefaultDraft";
import AuthLayout from "../features/Auth/layouts/AuthLayout";
import type { AuthPage } from "../types";
import { useAppDispatch } from "../api/redux/hooks";
import { logoutUser } from "../api/service/UserService";

type HeaderProps = {
  variant?: "default" | "profile";
};

const Header: FC<HeaderProps> = ({ variant = "default" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [currentAuthPage, setCurrentAuthPage] = useState<AuthPage>("LOGIN");

  const [loginInputValues, setLoginInputValues] = useState({
    email: "",
    password: "",
  });
  const [registerInputValues, setRegisterInputValues] = useState({
    email: "",
    password: "",
  });
  const [forgotPasswordInputValues, setForgotPasswordInputValues] = useState({
    email: "",
  });

  const { verified } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const createDefaultDraft = useCreateDefaultDraft();
  const isProfileVariant = variant === "profile";

  useEffect(() => {
    if (isMenuOpen || isAuthOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen, isAuthOpen]);

  useEffect(() => {
    const handleAuthOpen = () => {
      setCurrentAuthPage("LOGIN");
      setIsAuthOpen(true);
    };
    window.addEventListener("auth:open", handleAuthOpen);
    return () => window.removeEventListener("auth:open", handleAuthOpen);
  }, []);

  const headerContent = (
    <>
      <div
        className={clsx(
          "flex items-center justify-start gap-4",
          isProfileVariant ? "shrink-0" : "flex-1",
        )}
      >
        <button
          className={clsx("md:hidden")}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <CloseMenuIcon /> : <BurgerMenuIcon />}
        </button>
        {!isProfileVariant && (
          <div className={"hidden gap-3 md:flex"}>
            <Link
              to={"/"}
              className={"inline-flex [clip-path:inset(0_round_42px)]"}
            >
              <Button
                borderRadius={42}
                message={"ГЛАВНАЯ"}
                className={"h-[36px] px-[24px] text-300"}
              />
            </Link>
            <Link
              to={"/catalog"}
              className={"inline-flex [clip-path:inset(0_round_42px)]"}
            >
              <Button
                borderRadius={42}
                message={"КАТАЛОГ"}
                className={"h-[36px] px-[24px] text-300"}
              />
            </Link>
            <Link
              to={"/blog"}
              className={"inline-flex [clip-path:inset(0_round_42px)]"}
            >
              <Button
                borderRadius={42}
                message={"БЛОГ"}
                className={"h-[36px] px-[24px] text-300"}
              />
            </Link>
          </div>
        )}
      </div>
      <Link
        to={"/"}
        className={clsx(
          isProfileVariant
            ? "ml-3 shrink-0 md:ml-0"
            : "absolute left-1/2 -translate-x-1/2 transform",
        )}
      >
        <Logo desktopWidth={108} width={76} />
      </Link>
      <div className={"flex flex-1 items-center justify-end gap-3"}>
        <Button
          borderRadius={42}
          onClick={createDefaultDraft}
          message={isProfileVariant ? "Создать приглашение" : "СОЗДАТЬ ПРИГЛАШЕНИЕ"}
          inverted
          className={clsx(
            "hidden h-[36px] px-[24px] sm:block",
            isProfileVariant ? "font-open-sans text-[14px]" : "text-300",
          )}
        />
        <Button
          borderRadius={42}
          onClick={createDefaultDraft}
          message={"СОЗДАТЬ"}
          inverted
          className={"h-[36px] px-4 text-200 sm:hidden"}
        />

        {verified && isProfileVariant ? (
          <button
            type="button"
            onClick={() => {
              void dispatch(logoutUser());
            }}
            className="hidden rounded-[28px] bg-[#f3f3f3] px-6 py-3 font-open-sans text-[14px] font-semibold leading-none text-[#232323] transition-colors duration-200 hover:bg-[#ebebeb] sm:block"
          >
            Выйти
          </button>
        ) : verified ? (
          <Link to={"/profile"} className={"hidden sm:block"}>
            <ProfileIcon />
          </Link>
        ) : (
          <Button
            borderRadius={42}
            onClick={() => setIsAuthOpen(true)}
            message={"ВОЙТИ"}
            className={"hidden h-[36px] px-4 text-300 sm:block"}
          />
        )}
      </div>
    </>
  );

  return (
    <>
      {isMenuOpen && (
        <MobileMenu
          isAuth={verified}
          setIsMenuOpen={setIsMenuOpen}
          setIsAuthOpen={setIsAuthOpen}
        />
      )}
      {/*TODO: focus automatically (for tabbing)*/}
      {isAuthOpen && (
        <AuthLayout
          setIsAuthOpen={setIsAuthOpen}
          currentPage={currentAuthPage}
          setCurrentPage={setCurrentAuthPage}
          loginInputValues={loginInputValues}
          setLoginInputValues={setLoginInputValues}
          registerInputValues={registerInputValues}
          setRegisterInputValues={setRegisterInputValues}
          forgotPasswordInputValues={forgotPasswordInputValues}
          setForgotPasswordInputValues={setForgotPasswordInputValues}
        />
      )}
      {isProfileVariant ? (
        <div className="w-full px-4 pt-2 md:px-[40px] md:pt-3">
          <div className="mx-auto flex w-full max-w-[1146px] items-center rounded-[28px] bg-white px-4 py-[14px] shadow-[0_18px_50px_rgba(33,33,33,0.08)] md:px-6">
            {headerContent}
          </div>
        </div>
      ) : (
        <div
          className={clsx(
            "shadow-custom-2 fixed z-40 flex h-full max-h-[56px] w-full items-center px-4 md:max-h-[60px]",
            isMenuOpen ? "bg-white" : "backdrop-blur-[15px]",
          )}
        >
          {headerContent}
        </div>
      )}
    </>
  );
};

export default Header;
