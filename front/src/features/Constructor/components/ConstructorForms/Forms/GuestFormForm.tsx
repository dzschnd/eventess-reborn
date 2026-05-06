import type { FC } from "react";
import FormLayout from "../../../layouts/FormLayout";
import plusIcon from "../../../../../assetsOld/buttonIcons/plus.png";
import { QuestionType, type QuestionTypeValue } from "../../../../../types";
import type { AppDispatch, RootState } from "../../../../../api/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { updateLocalDraft } from "../../../../../api/redux/slices/draftSlice";
import { updateDraft } from "../../../../../api/service/DraftService";
import GuestFormInput from "../Inputs/GuestFormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { draftUpdateBaseSchema } from "../../../../../shared/schemas/draft";
import { CalendarDays, Info, LockKeyhole } from "lucide-react";

interface FormInput {
  questions:
    | {
        question: string;
        type: QuestionTypeValue;
        position: number;
      }[]
    | null;
  answers:
    | {
        answer: string;
        questionPosition: number;
        position: number;
      }[]
    | null;
}

type AnswerFormValue = NonNullable<FormInput["answers"]>[number];

const guestFormSchema = draftUpdateBaseSchema.pick({
  questions: true,
  answers: true,
});

const GuestFormLockedField: FC<{
  label: string;
  value: string;
  icon: "lock" | "calendar";
}> = ({ label, value, icon }) => {
  const Icon = icon === "lock" ? LockKeyhole : CalendarDays;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="font-primary text-[12px] font-semibold leading-[1.2] text-grey-400">
          {label}
        </span>
        <Info className="h-4 w-4 text-black" strokeWidth={2} />
      </div>
      <div className="flex h-11 items-center gap-4 rounded-[44px] border border-grey-100 bg-grey-50 px-4">
        <Icon className="h-5 w-5 shrink-0 text-grey-300" strokeWidth={2} />
        <span className="font-primary text-[14px] font-normal text-grey-300">
          {value}
        </span>
      </div>
    </div>
  );
};

const GuestFormForm: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id, questions, answers, eventDate } = useSelector(
    (state: RootState) => state.draft,
  );
  const displayedEventDate = eventDate
    ? eventDate.split("-").reverse().join(".")
    : "дд.мм.гггг";

  const { control, getValues, setValue } = useForm<FormInput>({
    resolver: zodResolver(guestFormSchema),
    defaultValues: questions
      ? {
          questions: [...questions].sort((a, b) => a.position - b.position),
          answers: answers
            ? [...answers].sort((a, b) => a.position - b.position)
            : null,
        }
      : {
          questions: [
            {
              question: "",
              type: QuestionType.CHECKBOX,
              position: 0,
            },
          ],
          answers: [],
        },
  });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const {
    fields: answerFields,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: "answers",
  });

  const handleUpdateLocalDraft = () => {
    const updatedQuestions = getValues("questions");
    if (!updatedQuestions) return;
    const updatedQuestionsFiltered = updatedQuestions.filter(
      (q) => q.question !== "",
    );

    const formData = updatedQuestionsFiltered.map((q, i) => ({
      thisQuestion: q,
      answers: answerFields
        .filter((answer) => answer.questionPosition === i)
        .map((answer) => ({
          answer: answer.answer.trim(),
          position: answer.position,
          questionPosition: i,
        })),
    }));

    const questions = formData.map((item) => ({
      question: item.thisQuestion.question.trim(),
      type: item.thisQuestion.type,
      position: item.thisQuestion.position,
    }));

    const answers = formData.flatMap((item) =>
      item.answers
        .filter((a) => a.answer.trim() !== "")
        .map((answer) => ({
          answer: answer.answer.trim(),
          questionPosition: item.thisQuestion.position,
          position: answer.position,
        })),
    );

    dispatch(
      updateLocalDraft({
        questions: questions,
        answers: answers,
      }),
    );
  };

  const handleUpdateDraft = async () => {
    const updatedQuestions = getValues("questions");
    if (!updatedQuestions) return;
    const updatedQuestionsFiltered = updatedQuestions.filter(
      (q) => q.question.trim() !== "",
    );

    const formData = updatedQuestionsFiltered.map((q, i) => ({
      thisQuestion: q,
      answers: answerFields
        .filter((answer) => answer.questionPosition === i)
        .filter(() => q.type !== QuestionType.TEXT)
        .map((answer) => ({
          answer: answer.answer.trim(),
          position: answer.position,
          questionPosition: i,
        })),
    }));

    const questions = formData.map((item) => ({
      question: item.thisQuestion.question.trim(),
      type: item.thisQuestion.type,
      position: item.thisQuestion.position,
    }));

    const answers = formData.flatMap((item) =>
      item.answers
        .filter((a) => a.answer.trim() !== "")
        .map((answer) => ({
          answer: answer.answer.trim(),
          questionPosition: item.thisQuestion.position,
          position: answer.position,
        })),
    );

    await dispatch(
      updateDraft({
        id: id,
        questions: questions,
        answers: answers,
      }),
    );
  };

  const handleRemoveQuestion = async (questionIndex: number) => {
    removeQuestion(questionIndex);

    const updatedAnswers = getValues("answers");
    const answersToRemove = updatedAnswers
      ? [...updatedAnswers]
          .map((answer, index) => ({ ...answer, formIndex: index }))
          .filter((answer) => answer.questionPosition === questionIndex)
      : [];
    for (let i = answersToRemove.length - 1; i >= 0; i--) {
      removeAnswer(answersToRemove[i].formIndex);
    }

    const remainingAnswers = getValues("answers");
    const updatedAnswersWithPositions = remainingAnswers
      ? [...remainingAnswers].map((a) => {
          return a.questionPosition > questionIndex
            ? {
                ...a,
                questionPosition: a.questionPosition - 1,
              }
            : a;
        })
      : [];
    const updatedAnswersFiltered = updatedAnswersWithPositions.filter(
      (answer) => answer.answer !== "",
    );
    const updatedAnswersFilteredWithPositions = updatedAnswersFiltered.map(
      (a, i) => ({
        ...a,
        position: i,
      }),
    );

    const updatedQuestions = getValues("questions");
    const updatedQuestionsWithPositions = updatedQuestions
      ? [...updatedQuestions].map((q, i) => ({
          ...q,
          position: i,
        }))
      : [];
    const updatedQuestionsFiltered = updatedQuestionsWithPositions.filter(
      (q) => q.question !== "",
    );
    const updatedQuestionsFilteredWithPositions = updatedQuestionsFiltered.map(
      (q, i) => ({
        ...q,
        position: i,
      }),
    );

    setValue("questions", updatedQuestionsWithPositions);
    setValue("answers", updatedAnswersWithPositions);

    dispatch(
      updateLocalDraft({
        questions: updatedQuestionsFilteredWithPositions,
        answers: updatedAnswersFilteredWithPositions,
      }),
    );

    await dispatch(
      updateDraft({
        id: id,
        questions: updatedQuestionsFilteredWithPositions,
        answers: updatedAnswersFilteredWithPositions,
      }),
    );
  };

  const handleRemoveAnswer = async (index: number) => {
    removeAnswer(index);

    const updatedAnswers = getValues("answers");
    const updatedAnswersWithPositions = updatedAnswers
      ? updatedAnswers.map((a, i) => ({
          answer: a.answer,
          position: i,
          questionPosition: a.questionPosition,
        }))
      : [];
    const updatedAnswersFiltered = updatedAnswersWithPositions.filter(
      (answer) => answer.answer !== "",
    );
    const updatedAnswersFilteredWithPositions = updatedAnswersFiltered.map(
      (a, i) => ({
        ...a,
        position: i,
      }),
    );

    setValue("answers", updatedAnswersWithPositions);

    dispatch(
      updateLocalDraft({
        questions: questions,
        answers: updatedAnswersFilteredWithPositions,
      }),
    );
    await dispatch(
      updateDraft({
        id: id,
        questions: questions,
        answers: updatedAnswersFilteredWithPositions,
      }),
    );
  };

  return (
    <FormLayout pageIndex={6} description={"Узнайте побольше о ваших гостях!"}>
      <div className="flex flex-col gap-5">
        <GuestFormLockedField
          label="Имя гостя/гостей"
          value="Этот вопрос нельзя удалить"
          icon="lock"
        />
        <GuestFormLockedField
          label="Присутствие на торжестве"
          value="Этот вопрос нельзя удалить"
          icon="lock"
        />
        <GuestFormLockedField
          label="Ответить до"
          value={displayedEventDate}
          icon="calendar"
        />
      </div>

      {questionFields.map((field, index) => (
        <Controller
          key={field.id}
          control={control}
          name={`questions.${index}`}
          render={({ field }) => (
            <GuestFormInput
              value={{
                question: field.value.question,
                type: field.value.type,
                position: index,
                answers: answerFields
                  .map((answer, answerIndex) => ({
                    answer: answer.answer,
                    position: answerIndex,
                    questionPosition: answer.questionPosition,
                    globalAnswerIndex: answerIndex,
                  }))
                  .filter((answer) => answer.questionPosition === index),
              }}
              questionIndex={index}
              onChange={(value) => {
                const currentAnswers = getValues("answers") || [];

                const updatedAnswers = currentAnswers
                  .filter((answer) => answer.questionPosition !== index)
                  .concat(
                    (value.answers ?? []).map(
                      (answer: AnswerFormValue, answerIndex: number) => ({
                        ...answer,
                        questionPosition: index,
                        position: answerIndex,
                      }),
                    ),
                  );

                setValue(`answers`, updatedAnswers);
                field.onChange(value);
                handleUpdateLocalDraft();
              }}
              onBlur={handleUpdateDraft}
              onRemoveQuestion={() => handleRemoveQuestion(index)}
              onRemoveAnswer={(answerIndex) => handleRemoveAnswer(answerIndex)}
              appendAnswer={() =>
                appendAnswer({
                  answer: "",
                  position: answerFields.length,
                  questionPosition: index,
                })
              }
              placeholder={"Пожелания по напиткам"}
            />
          )}
        />
      ))}

      <button
        type="button"
        className="self-center"
        onClick={() =>
          appendQuestion({
            question: "",
            position: questionFields.length,
            type: QuestionType.CHECKBOX,
          })
        }
      >
        <div className="mb-1 flex items-center gap-1">
          <span className="font-primary text-300 font-normal text-grey-400">
            Добавить вопрос
          </span>
          <img src={plusIcon} alt="Add" className="h-[15px] w-[15px]" />
        </div>
        <div className="h-[1px] w-full bg-grey-400" />
      </button>
    </FormLayout>
  );
};

export default GuestFormForm;
