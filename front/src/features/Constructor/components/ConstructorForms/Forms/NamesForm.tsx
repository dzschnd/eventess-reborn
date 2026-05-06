import { useRef } from "react";
import type { FC } from "react";
import ImageSelector from "../Inputs/ImageSelector";
import TextInput from "../Inputs/TextInput";
import FormLayout from "../../../layouts/FormLayout";
import { useAppDispatch, useAppSelector } from "../../../../../api/redux/hooks";
import { Controller, useForm } from "react-hook-form";
import { updateDraft } from "../../../../../api/service/DraftService";
import { updateLocalDraft } from "../../../../../api/redux/slices/draftSlice";
import {
  resetImage,
  uploadImage,
} from "../../../../../api/service/UploadService";
import { defaultTemplateImages } from "../../../../Templates/defaultTemplateImages";
import { zodResolver } from "@hookform/resolvers/zod";
import { draftUpdateBaseSchema } from "../../../../../shared/schemas/draft";

interface FormInput {
  firstPartnerName: string | null;
  secondPartnerName: string | null;
}

const namesFormSchema = draftUpdateBaseSchema.pick({
  firstPartnerName: true,
  secondPartnerName: true,
});

const NamesForm: FC = () => {
  const dispatch = useAppDispatch();
  const { id, firstPartnerName, secondPartnerName, coupleImage, templateName } =
    useAppSelector((state) => state.draft);

  let defaultImage;

  switch (templateName) {
    case "nezhnost":
      defaultImage = defaultTemplateImages.nezhnostCoupleImage;
      break;
    default:
      defaultImage = "";
  }

  const {
    control,
    getValues,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onBlur",
    resolver: zodResolver(namesFormSchema),
    defaultValues: {
      firstPartnerName: firstPartnerName,
      secondPartnerName: secondPartnerName,
    },
  });

  const savedValuesRef = useRef({
    firstPartnerName,
    secondPartnerName,
  });

  const handleUpdateLocalDraft = () => {
    const { firstPartnerName, secondPartnerName } = getValues();

    dispatch(
      updateLocalDraft({
        firstPartnerName: firstPartnerName,
        secondPartnerName: secondPartnerName,
      }),
    );
  };

  const handleUpdateDraft = async () => {
    const { firstPartnerName, secondPartnerName } = getValues();
    const normalizedFirstPartnerName = firstPartnerName?.trim() ?? null;
    const normalizedSecondPartnerName = secondPartnerName?.trim() ?? null;

    if (
      normalizedFirstPartnerName !==
        savedValuesRef.current.firstPartnerName?.trim() ||
      normalizedSecondPartnerName !==
        savedValuesRef.current.secondPartnerName?.trim()
    ) {
      await dispatch(
        updateDraft({
          id: id,
          firstPartnerName: normalizedFirstPartnerName,
          secondPartnerName: normalizedSecondPartnerName,
        }),
      );

      savedValuesRef.current = {
        firstPartnerName: normalizedFirstPartnerName,
        secondPartnerName: normalizedSecondPartnerName,
      };
    }
  };

  const handleImageChange = async (file: File | null) => {
    if (file) await dispatch(uploadImage({ file, id, type: "coupleImage" }));
  };

  const handleImageReset = async () => {
    await dispatch(resetImage({ id, type: "coupleImage" }));
  };

  return (
    <FormLayout
      pageIndex={0}
      description={
        "Добро пожаловать в вашу историю любви! Введите имена жениха и невесты и добавьте ваше общее фото, чтобы все знали, кто станет главными героями этого волшебного дня! 💍✨"
      }
    >
      <Controller
        name="firstPartnerName"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label={"Как зовут невесту?"}
            labelClassName="font-semibold"
            placeholder={"Невеста"}
            onChange={(e) => {
              field.onChange(e);
              handleUpdateLocalDraft();
            }}
            onBlur={handleUpdateDraft}
          />
        )}
      />
      {errors.firstPartnerName && (
        <span className="text-red-500">{errors.firstPartnerName.message}</span>
      )}

      <Controller
        name="secondPartnerName"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label={"Как зовут жениха?"}
            labelClassName="font-semibold"
            placeholder={"Жених"}
            onChange={(e) => {
              field.onChange(e);
              handleUpdateLocalDraft();
            }}
            onBlur={handleUpdateDraft}
          />
        )}
      />
      {errors.secondPartnerName && (
        <span className="text-red-500">{errors.secondPartnerName.message}</span>
      )}

      <ImageSelector
        onImageChange={handleImageChange}
        onImageReset={handleImageReset}
        imageUrl={coupleImage}
        defaultImage={defaultImage}
      />
    </FormLayout>
  );
};

export default NamesForm;
