import type { FC } from "react";
import FormLayout from "../../../layouts/FormLayout";
import ProgramEventInput from "../Inputs/ProgramEventInput";
import { useAppDispatch, useAppSelector } from "../../../../../api/redux/hooks";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { updateLocalDraft } from "../../../../../api/redux/slices/draftSlice";
import { updateDraft } from "../../../../../api/service/DraftService";
import { Time } from "@internationalized/date";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { draftUpdateBaseSchema } from "../../../../../shared/schemas/draft";

interface FormInput {
  planItems:
    | {
        eventTime: Time | null;
        description: string | null;
        position: number;
      }[]
    | null;
}

const timeToString = (value: Time) => {
  const hours = value.hour.toString().padStart(2, "0");
  const minutes = value.minute.toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

type FormPlanItem = {
  eventTime: Time | null;
  description: string | null;
  position: number;
};

const isFormPlanItem = (value: unknown): value is FormPlanItem => {
  if (typeof value !== "object" || value === null) return false;
  return "position" in value;
};

const programFormSchema = z.object({
  planItems: z.preprocess((value: unknown) => {
    if (!Array.isArray(value)) return value;
    return value.filter(isFormPlanItem).map((planItem) => ({
      ...planItem,
      eventTime: planItem.eventTime ? timeToString(planItem.eventTime) : "",
      description: planItem.description ?? "",
    }));
  }, draftUpdateBaseSchema.shape.planItems),
});

const ProgramForm: FC = () => {
  const dispatch = useAppDispatch();
  const { id, planItems } = useAppSelector((state) => state.draft);

  const { control, getValues, setValue } = useForm<FormInput>({
    resolver: zodResolver(programFormSchema),
    defaultValues: {
      planItems: planItems
        ? [...planItems]
            .sort((a, b) => a.position - b.position)
            .map((planItem) => ({
              ...planItem,
              eventTime: planItem.eventTime
                ? new Time(
                    parseInt(planItem.eventTime.split(":")[0]),
                    parseInt(planItem.eventTime.split(":")[1]),
                  )
                : null,
            }))
        : [
            { eventTime: new Time(), description: "", position: 0 },
            { eventTime: new Time(), description: "", position: 1 },
            { eventTime: new Time(), description: "", position: 2 },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "planItems",
  });

  const mapTimeToStringAndTrimDescription = (
    planItems: {
      eventTime: Time | null;
      description: string | null;
      position: number;
    }[],
  ) => {
    return planItems.map((planItem) => {
      return {
        ...planItem,
        eventTime: planItem.eventTime
          ? planItem.eventTime.toString().split(":")[0] +
            ":" +
            planItem.eventTime.toString().split(":")[1]
          : "",
        description: planItem.description?.trim() || "",
      };
    });
  };

  const handleUpdateLocalDraft = () => {
    const updatedPlanItems = getValues().planItems;
    if (!updatedPlanItems) return;
    const updatedPlanItemsFiltered = updatedPlanItems.filter(
      (planItem) => planItem.description !== "",
    );
    const updatedPlanItemsWithStringTime = mapTimeToStringAndTrimDescription(
      updatedPlanItemsFiltered,
    );
    dispatch(updateLocalDraft({ planItems: updatedPlanItemsWithStringTime }));
  };

  const handleUpdateDraft = async () => {
    const updatedPlanItems = getValues().planItems;
    if (!updatedPlanItems) return;
    const updatedPlanItemsFiltered = updatedPlanItems.filter(
      (planItem) => planItem.description !== "",
    );
    const updatedPlanItemsWithStringTime = mapTimeToStringAndTrimDescription(
      updatedPlanItemsFiltered,
    );
    await dispatch(
      updateDraft({ id: id, planItems: updatedPlanItemsWithStringTime }),
    );
  };

  const handleRemovePlanItem = async (index: number) => {
    remove(index);

    const updatedPlanItems = getValues().planItems;
    const updatedPlanItemsWithPositions = updatedPlanItems
      ? updatedPlanItems.map((planItem, i) => ({
          ...planItem,
          position: i,
        }))
      : [];
    const updatedPlanItemsFiltered = updatedPlanItemsWithPositions.filter(
      (planItem) => planItem.description !== "",
    );
    const updatedPlanItemsFilteredWithPositions = updatedPlanItemsFiltered.map(
      (planItem, i) => ({
        ...planItem,
        position: i,
      }),
    );
    const updatedPlanItemsWithStringTime = mapTimeToStringAndTrimDescription(
      updatedPlanItemsFilteredWithPositions,
    );

    setValue("planItems", updatedPlanItemsWithPositions);
    await dispatch(
      updateDraft({ id: id, planItems: updatedPlanItemsWithStringTime }),
    );
  };

  return (
    <FormLayout
      pageIndex={3}
      description={
        "Укажите время и краткое описание каждого момента — от церемонии до финальной вечеринки. Пусть гости знают, чего ждать и когда веселиться!🎉"
      }
    >
      <div className="flex flex-col gap-7 pt-2 sm:gap-8">
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            control={control}
            name={`planItems.${index}`}
            render={({ field }) => (
              <ProgramEventInput
                value={{
                  eventTime: field.value.eventTime,
                  description: field.value.description,
                  position: index,
                }}
                onChange={(value) => {
                  field.onChange(value);
                  handleUpdateLocalDraft();
                }}
                onBlur={handleUpdateDraft}
                onRemove={() => handleRemovePlanItem(index)}
                placeholder={"Введите событие"}
              />
            )}
          />
        ))}

        <button
          type="button"
          className="mt-2 h-[42px] self-center rounded-[42px] border border-primary px-8 font-primary text-[14px] font-semibold leading-[1] text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
          onClick={() =>
            append({
              eventTime: new Time(),
              description: "",
              position: fields.length,
            })
          }
        >
          Добавить событие +
        </button>
      </div>
    </FormLayout>
  );
};

export default ProgramForm;
