import { useState } from "react";
import type { FC, KeyboardEvent } from "react";
import InputLabel from "../../../Auth/components/InputLabel";
import InputField from "../../../Auth/components/InputField";
import SubmitButton from "../../../Auth/components/SubmitButton";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useAppDispatch } from "../../../../api/redux/hooks";
import { changePassword } from "../../../../api/service/UserService";
import FormErrorMessage from "../../../../components/FormErrorMessage";
import { WRONG_PASSWORD } from "../../../../api/messages";
import { changePasswordSchema } from "../../../../shared/schemas/auth";
import type { StateError } from "../../../../types";

type FormInput = z.infer<typeof changePasswordSchema>;

const ChangePassword: FC = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const handleChangePassword: SubmitHandler<FormInput> = async () => {
    const oldPassword = getValues("oldPassword");
    const newPassword = getValues("newPassword");
    const result = await dispatch(changePassword({ oldPassword, newPassword }));
    if (result.meta.requestStatus === "rejected") {
      setSuccessMessage(null);
      const error = result.payload as StateError | undefined;
      if (error?.status === 400) setError(WRONG_PASSWORD);
      else setError(error?.message ?? "Произошла ошибка");
    } else {
      setError("");
      const success = result.payload as { message?: string } | undefined;
      setSuccessMessage(success?.message ?? "Пароль обновлен");
      setValue("oldPassword", "");
      setValue("newPassword", "");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div className="max-w-[367px]">
      <h2 className="font-primary text-600 font-semibold leading-[1.2] text-grey-500">
        Сменить пароль
      </h2>
      <form
        className="mt-4 flex flex-col gap-4"
        onSubmit={handleSubmit(handleChangePassword)}
        onKeyDown={handleKeyDown}
      >
        <div className="relative">
          <div className="mb-2">
            <InputLabel id={"oldPassword"} label={"Введите старый пароль"} />
          </div>
          <InputField
            {...register("oldPassword")}
            onChange={() => clearErrors("oldPassword")}
            id={"oldPassword"}
            type={"password"}
            placeholder={"******"}
            inputClassName="h-12 rounded-[8px] border border-grey-100 bg-white px-4 pr-[52px] font-primary text-400 font-normal text-grey-500 placeholder:text-grey-200 focus:border-grey-300"
            passwordButtonClassName="right-4 top-1/2 -translate-y-1/2 md:top-1/2"
          />
          {errors.oldPassword && (
            <FormErrorMessage message={errors.oldPassword.message} />
          )}
        </div>
        <div className="relative">
          <div className="mb-2">
            <InputLabel id={"newPassword"} label={"Введите новый пароль"} />
          </div>
          <InputField
            {...register("newPassword")}
            id={"newPassword"}
            type={"password"}
            placeholder={"******"}
            onChange={() => clearErrors("newPassword")}
            inputClassName="h-12 rounded-[8px] border border-grey-100 bg-white px-4 pr-[52px] font-primary text-400 font-normal text-grey-500 placeholder:text-grey-200 focus:border-grey-300"
            passwordButtonClassName="right-4 top-1/2 -translate-y-1/2 md:top-1/2"
          />

          {error && <FormErrorMessage message={error} />}
          {errors.newPassword && (
            <FormErrorMessage message={errors.newPassword.message} />
          )}
          {successMessage && <FormErrorMessage message={successMessage} />}
        </div>
        <SubmitButton
          message={"Сохранить"}
        />
      </form>
    </div>
  );
};

export default ChangePassword;
