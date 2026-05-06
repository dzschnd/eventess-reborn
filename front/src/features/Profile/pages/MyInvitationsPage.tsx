import type { FC } from "react";
import InvitationCard from "../components/Invitations/InvitationCard";
import { Link, useNavigate } from "react-router-dom";
import goBackIcon from "../../../assetsOld/buttonIcons/arrowLeft.png";
import type { InvitationDetailsResponse } from "../../../shared/types";
import InivitationCardSkeleton from "../components/Invitations/InivitationCardSkeleton";
import { useInvitations } from "../../../hooks/useInvitations";
import DashboardEmptyState from "../components/DashboardEmptyState";
import ProfileDashboardLayout from "../layouts/ProfileDashboardLayout";

const MyInvitationsPage: FC = () => {
  const { invitations, loading } = useInvitations();
  const navigate = useNavigate();

  return (
    <ProfileDashboardLayout>
      <button className="md:hidden">
        <Link to="/profile">
          <div className="flex items-center gap-[5px]">
            <img src={goBackIcon} alt="Go Back" className="h-6 w-6" />
            <h1 className="font-primary text-800 font-normal leading-[1.2] text-grey-500">
              Мои приглашения
            </h1>
          </div>
        </Link>
      </button>
      <h1 className="hidden font-primary text-[24px] font-semibold leading-[1.21] text-grey-500 md:inline">
        Мои приглашения
      </h1>
      <div className="mt-10 flex w-full flex-col items-center gap-5 sm:grid sm:grid-cols-2 sm:gap-x-[25px] sm:gap-y-5 md:grid-cols-3 md:gap-x-[30px] md:gap-y-[60px]">
        {loading ? (
          <>
            <InivitationCardSkeleton />
            <InivitationCardSkeleton />
            <InivitationCardSkeleton />
          </>
        ) : invitations &&
          Array.isArray(invitations) &&
          invitations.length > 0 ? (
          invitations.map((invitation: InvitationDetailsResponse) => (
            <InvitationCard
              key={invitation.id}
              id={invitation.id}
              coupleImage={invitation.coupleImage}
              templateName={invitation.templateName}
              firstPartnerName={
                invitation.firstPartnerName
                  ? invitation.firstPartnerName
                  : "Невеста"
              }
              secondPartnerName={
                invitation.secondPartnerName
                  ? invitation.secondPartnerName
                  : "Жених"
              }
            />
          ))
        ) : (
          <div className="w-full sm:col-span-2 md:col-span-3">
            <DashboardEmptyState
              title="У вас пока нет приглашений"
              description="Создайте первое приглашение и начните оформлять событие."
              buttonLabel="Создать приглашение"
              onButtonClick={() => navigate("/catalog")}
              showButtonIcon={false}
              icon="invitation"
            />
          </div>
        )}
      </div>
    </ProfileDashboardLayout>
  );
};

export default MyInvitationsPage;
