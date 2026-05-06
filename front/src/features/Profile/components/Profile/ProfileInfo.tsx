import { useState } from "react";
import type { FC, FormEvent } from "react";
import { Check, Info, Mail } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../api/redux/hooks";
import InputField from "../../../Auth/components/InputField";
import { useForm } from "react-hook-form";
import {
  changeEmail,
  requestEmailChange,
} from "../../../../api/service/UserService";
import FormErrorMessage from "../../../../components/FormErrorMessage";
import OtpInput from "./OtpInput";
import { requestChangeEmailSchema } from "../../../../shared/schemas/auth";
import type { StateError } from "../../../../types";

const ProfileInfo: FC = () => {
  const dispatch = useAppDispatch();
  const [isEmailInputOpen, setIsEmailInputOpen] = useState<boolean>(false);
  const [isOtpInputOpen, setIsOtpInputOpen] = useState<boolean>(false);
  const [isOtpInputLoading, setIsOtpInputLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [isInvalidOtpError, setIsInvalidOtpError] = useState("");
  const [isSuccessfulEmailChange, setIsSuccessfulEmailChange] = useState(false);
  const [prevOtpLength, setPrevOtpLength] = useState(0);
  const { email } = useAppSelector((state) => state.user);

  const { register, getValues, setValue } = useForm<{
    email: string;
  }>({
    mode: "onSubmit",
    defaultValues: {
      email: email ? email : "",
    },
  });

  const handleRequestChangeEmail = async (e: FormEvent) => {
    e.preventDefault();
    const newEmail = getValues("email");
    if (!email || newEmail === email) {
      return setIsEmailInputOpen(false);
    }
    if (newEmail.trim() === "") {
      setValue("email", email ?? "");
      setIsEmailInputOpen(false);
      return;
    }
    const emailValidation = requestChangeEmailSchema.safeParse({
      currentEmail: email,
      newEmail: newEmail.trim(),
    });
    if (!emailValidation.success) {
      setEmailError(
        emailValidation.error.issues[0]?.message ?? "Некорректный формат почты",
      );
      return;
    }
    setIsOtpInputLoading(true);
    const response = await dispatch(
      requestEmailChange({ currentEmail: email, newEmail: newEmail.trim() }),
    );
    setIsOtpInputLoading(false);
    if (response.meta.requestStatus === "fulfilled") {
      setIsOtpInputOpen(true);
      setEmailError("");
    } else {
      const errorPayload = response.payload as StateError | undefined;
      setEmailError(errorPayload?.message ?? "Произошла ошибка");
      setIsEmailInputOpen(false);
      setValue("email", email ?? "");
    }
  };

  const handleChangeEmail = async (otp: string) => {
    setEmailError("");
    const newEmail = getValues("email");
    if (newEmail.trim() === "") {
      setValue("email", email ?? "");
      setIsOtpInputOpen(false);
      setIsEmailInputOpen(false);
      return;
    }
    const response = await dispatch(
      changeEmail({ otp: otp, newEmail: newEmail.trim() }),
    );
    if (response.meta.requestStatus !== "fulfilled") {
      const errorPayload = response.payload as StateError | undefined;
      if (
        errorPayload?.status === 400 &&
        !isInvalidOtpError &&
        prevOtpLength < 6
      ) {
        setIsInvalidOtpError("error");
      } else if (errorPayload?.status !== 400) {
        setEmailError(errorPayload?.message ?? "Произошла ошибка");
      }
      setValue("email", email ?? "");
    } else {
      setIsSuccessfulEmailChange(true);
    }
  };

  const handleCancelOtpInput = () => {
    setIsOtpInputOpen(false);
    setIsEmailInputOpen(false);
    setValue("email", email ?? "");
  };

  return (
    <div className="w-full">
      {isOtpInputOpen && (
        <OtpInput
          setIsError={setIsInvalidOtpError}
          isSuccess={isSuccessfulEmailChange}
          setPrevOtpLength={setPrevOtpLength}
          isError={isInvalidOtpError !== ""}
          onSubmit={handleChangeEmail}
          onCancel={handleCancelOtpInput}
        />
      )}
      <h1 className="font-primary text-800 font-semibold leading-[1.2] text-grey-500">
        Личный кабинет
      </h1>

      <section className="mt-[30px] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#e8e8ed] pb-5">
          <h2 className="font-primary text-500 font-semibold leading-[1.2] text-grey-500">
            Электронная почта
          </h2>
          <p className="text-300 leading-[1.4] text-grey-400">
            Эта почта используется для входа, уведомлений и восстановления
            доступа.
          </p>
        </div>

        <div className="flex flex-col gap-5 border-b border-[#e8e8ed] py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f3f4f5] text-grey-500">
              <Mail size={17} strokeWidth={1.8} />
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <span className="text-300 leading-[1.2] text-grey-300">
                Текущий email
              </span>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <span className="break-all font-primary text-400 font-semibold leading-[1.3] text-grey-500 md:text-500">
                  {email}
                </span>
                <span className="inline-flex w-fit items-center gap-2 rounded-[8px] bg-[#e7f5ee] px-3 py-2 text-200 font-semibold leading-[1] text-[#147846]">
                  <Check size={16} strokeWidth={2} className="text-[#147846]" />
                  Подтверждена
                </span>
              </div>
            </div>
          </div>

          {!isEmailInputOpen && (
            <button
              type="button"
              onClick={() => {
                setIsEmailInputOpen(true);
                setEmailError("");
              }}
              className="h-9 rounded-42 border border-primary bg-primary px-6 font-primary text-300 font-semibold text-white transition-colors duration-200 hover:bg-primary-700"
            >
              Сменить почту
            </button>
          )}
        </div>

        {isEmailInputOpen && (
          <form
            onSubmit={handleRequestChangeEmail}
            className="mt-5 grid gap-5 rounded-20 border border-grey-75 bg-[#fafafa] p-5 md:grid-cols-[minmax(0,1fr)_300px]"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h3 className="font-primary text-400 font-semibold leading-[1.2] text-grey-500">
                  Смена электронной почты
                </h3>
                <p className="text-300 leading-[1.4] text-grey-400">
                  Мы отправим письмо с подтверждением на новый адрес.
                </p>
              </div>
              <div className="relative">
                <label
                  htmlFor="email"
                  className="mb-2 block text-300 font-normal leading-[1.2] text-grey-500"
                >
                  Новый email <span className="text-red-500">*</span>
                </label>
                <InputField
                  {...register("email", {
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Некорректный формат почты",
                    },
                  })}
                  id={"email"}
                  type={"email"}
                  placeholder={"Введите новый email"}
                  disabled={isOtpInputLoading}
                  inputClassName="h-11 rounded-30 border border-grey-100 bg-white px-4 font-primary text-400 font-normal text-grey-500 placeholder:text-grey-200 focus:border-blue-400"
                />
                {emailError && <FormErrorMessage message={emailError} />}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={isOtpInputLoading}
                  onClick={() => {
                    setValue("email", email ?? "");
                    setIsEmailInputOpen(false);
                    setEmailError("");
                  }}
                  className="h-9 rounded-42 px-6 font-primary text-300 font-semibold text-primary transition-colors duration-200 hover:bg-primary-50"
                >
                  Отменить
                </button>
                <button
                  type="submit"
                  disabled={isOtpInputLoading}
                  className="h-9 rounded-42 bg-primary px-6 font-primary text-300 font-semibold text-white transition-colors duration-200 hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Отправить письмо
                </button>
              </div>
            </div>

            <div className="flex gap-3 rounded-20 bg-white p-4">
              <Info
                size={24}
                strokeWidth={1.8}
                className="shrink-0 text-primary"
              />
              <div className="flex flex-col gap-2">
                <h4 className="font-primary text-300 font-semibold leading-[1.2] text-grey-500">
                  Как это работает
                </h4>
                <p className="text-300 leading-[1.4] text-grey-400">
                  На новый email будет отправлено письмо с подтверждением.
                  После подтверждения мы обновим ваш адрес.
                </p>
              </div>
            </div>
          </form>
        )}

      </section>
    </div>
  );
};

export default ProfileInfo;
