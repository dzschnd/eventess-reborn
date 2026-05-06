import { useEffect, useState } from "react";
import type { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import goBackIcon from "../../../assetsOld/buttonIcons/arrowLeft.png";
import type {
  GuestAnswerResponse,
  InvitationDetailsResponse,
} from "../../../shared/types";
import GuestAnswerSkeleton from "../components/GuestAnswers/GuestAnswerSkeleton";
import { useGuestAnswers } from "../../../hooks/useGuestAnswers";
import { useInvitations } from "../../../hooks/useInvitations";
import DashboardEmptyState from "../components/DashboardEmptyState";
import ProfileDashboardLayout from "../layouts/ProfileDashboardLayout";

const MyGuestAnswersPage: FC = () => {
  const location = useLocation();
  const state = location.state as { id?: number | string } | null;
  const rawId = state?.id;
  const parsedId =
    typeof rawId === "string"
      ? Number.parseInt(rawId, 10)
      : typeof rawId === "number"
        ? rawId
        : 0;
  const { guestAnswers, loading: guestAnswersLoading } = useGuestAnswers();
  const { invitations, loading: invitationsLoading } = useInvitations();
  const [currentId, setCurrentId] = useState<number>(parsedId);
  const navigate = useNavigate();
  const loading = guestAnswersLoading || invitationsLoading;

  useEffect(() => {
    if (!parsedId && invitations.length > 0) {
      setCurrentId(invitations[0].id);
    }
  }, [parsedId, invitations]);

  const groupAnswersByGuestId = (answers: GuestAnswerResponse[]) => {
    return answers.reduce<Record<string, GuestAnswerResponse[]>>(
      (acc, answer) => {
        if (!acc[answer.guestId]) {
          acc[answer.guestId] = [];
        }
        acc[answer.guestId].push(answer);
        return acc;
      },
      {},
    );
  };

  const getGuestAnswersByInvitation = (invitationId: number) => {
    const filteredAnswers = guestAnswers.filter(
      (guestAnswer) => guestAnswer.invitationId === invitationId,
    );

    const sortedAnswers = filteredAnswers.sort((a, b) => a.id - b.id);

    return groupAnswersByGuestId(sortedAnswers);
  };

  const groupAnswersByQuestionId = (answers: GuestAnswerResponse[]) => {
    return answers.reduce<Record<number, string[]>>((acc, answer) => {
      if (!acc[answer.questionId]) {
        acc[answer.questionId] = [];
      }
      acc[answer.questionId].push(answer.answer);
      return acc;
    }, {});
  };

  return (
    <ProfileDashboardLayout>
      <button className="md:hidden">
        <Link to="/profile">
          <div className="flex items-center gap-[5px]">
            <img src={goBackIcon} alt="Go Back" className="h-6 w-6" />
            <h1 className="font-primary text-800 font-normal leading-[1.2] text-grey-500">
              Ответы гостей
            </h1>
          </div>
        </Link>
      </button>
      <h1 className="hidden font-primary text-[24px] font-semibold leading-[1.21] text-grey-500 md:inline">
        Ответы гостей
      </h1>
      <div className="mt-10">
        {loading ? (
          <GuestAnswerSkeleton />
        ) : invitations &&
          Array.isArray(invitations) &&
          invitations.length > 0 ? (
          <>
            <div className="scrollbar-hide flex gap-[30px] overflow-x-auto pb-[3px]">
              {invitations.map((invitation: InvitationDetailsResponse) => (
                <div key={invitation.id}>
                  <button onClick={() => setCurrentId(invitation.id)}>
                    <span
                      className={`${invitation.id === currentId ? "border-b-[2px] border-b-red-500" : ""} whitespace-nowrap font-primary text-400 font-semibold leading-[1.4] text-grey-500`}
                    >
                      {invitation.firstPartnerName} и{" "}
                      {invitation.secondPartnerName} ({invitation.eventDate})
                    </span>
                  </button>
                </div>
              ))}
            </div>

            <div>
              {guestAnswers.length > 0 ? (
                invitations.map((invitation: InvitationDetailsResponse) => {
                  const groupedAnswers = getGuestAnswersByInvitation(
                    invitation.id,
                  );

                  return (
                    <div key={invitation.id}>
                      {invitation.id === currentId && (
                        <div>
                          {Object.entries(groupedAnswers).length > 0 ? (
                            Object.entries(groupedAnswers).map(
                              ([guestId, answers]) => (
                                <div
                                  key={guestId}
                                  className="mt-[30px] flex flex-col gap-5"
                                >
                                  <dl
                                    className="flex flex-col gap-5 rounded-[20px] bg-green-50 p-5 md:p-[30px]"
                                    style={{
                                      backgroundColor: answers[0].isComing
                                        ? "#A2FDDB40"
                                        : "#FFEBEA",
                                    }}
                                  >
                                    <div className="flex flex-col sm:flex-row">
                                      <dt className="mb-2.5 font-primary text-400 font-semibold leading-[1.4] text-grey-500">
                                        Имя:&nbsp;
                                      </dt>
                                      <dd className="font-primary text-400 font-light leading-[1.4] text-grey-500">
                                        {answers[0].guestName}
                                      </dd>
                                    </div>
                                    <div className="flex flex-col sm:flex-row">
                                      <dt className="mb-2.5 font-primary text-400 font-semibold leading-[1.4] text-grey-500">
                                        Присутствие:&nbsp;
                                      </dt>
                                      <dd className="font-primary text-400 font-light leading-[1.4] text-grey-500">
                                        {answers[0].isComing
                                          ? "С удовольствием приеду (приедем)"
                                          : "К сожалению, не получится"}
                                      </dd>
                                    </div>
                                    <div>
                                      {Object.entries(
                                        groupAnswersByQuestionId(answers),
                                      ).map(([questionId, currentAnswers]) => {
                                        const question =
                                          invitation.questions?.find(
                                            (q) => q.id === Number(questionId),
                                          );

                                        return question ? (
                                          <div
                                            key={question.id}
                                            className="flex flex-col sm:flex-row"
                                          >
                                            <dt className="mb-2.5 font-primary text-400 font-semibold leading-[1.4] text-grey-500">
                                              {question.question}:&nbsp;
                                            </dt>
                                            <dd className="font-primary text-400 font-light leading-[1.4] text-grey-500">
                                              {currentAnswers.join(", ")}
                                            </dd>
                                          </div>
                                        ) : null;
                                      })}
                                    </div>
                                  </dl>
                                </div>
                              ),
                            )
                          ) : (
                            <DashboardEmptyState
                              className="mt-[30px]"
                              title="Пока нет ответов гостей"
                              description="Когда гости ответят на приглашение, их ответы появятся здесь."
                              icon="rsvp"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <DashboardEmptyState
                  className="mt-[30px]"
                  title="Пока нет ответов гостей"
                  description="Когда гости ответят на приглашение, их ответы появятся здесь."
                  icon="rsvp"
                />
              )}
            </div>
          </>
        ) : (
          <DashboardEmptyState
            title="Пока нет ответов гостей"
            description="Когда гости ответят на приглашение, их ответы появятся здесь."
            buttonLabel="Создать приглашение"
            onButtonClick={() => navigate("/profile/invitations")}
            showButtonIcon={false}
            icon="rsvp"
          />
        )}
      </div>
    </ProfileDashboardLayout>
  );
};

export default MyGuestAnswersPage;
