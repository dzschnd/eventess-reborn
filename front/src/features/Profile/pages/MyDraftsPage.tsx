import { useState } from "react";
import type { FC } from "react";
import DraftCard from "../components/Drafts/DraftCard";
import goBackIcon from "../../../assetsOld/buttonIcons/arrowLeft.png";
import { Link, useNavigate } from "react-router-dom";
import { deleteDraft } from "../../../api/service/DraftService";
import type { CardInfo } from "../../../types";
import DraftCardSkeleton from "../components/Drafts/DraftCardSkeleton";
import { useDrafts } from "../../../hooks/useDrafts";
import ConfirmationModal from "../../../components/ConfirmationModal";
import ProfileDashboardLayout from "../layouts/ProfileDashboardLayout";

const MyDraftsPage: FC = () => {
  const { drafts, loading, refresh } = useDrafts();
  const navigate = useNavigate();
  const [draftToDelete, setDraftToDelete] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setDraftToDelete(id);
  };

  const confirmDelete = async () => {
    if (draftToDelete === null) return;
    await deleteDraft(draftToDelete);
    setDraftToDelete(null);
    void refresh();
  };

  return (
    <>
      <ConfirmationModal
        isOpen={draftToDelete !== null}
        title="Вы уверены, что хотите удалить черновик?"
        confirmLabel="Удалить"
        cancelLabel="Отмена"
        onConfirm={confirmDelete}
        onCancel={() => setDraftToDelete(null)}
        variant="danger"
      />
      <ProfileDashboardLayout cardClassName="flex flex-col">
        <button className="w-full md:hidden">
          <Link to="/profile">
            <div className="flex items-center gap-[5px]">
              <img src={goBackIcon} alt="Go Back" className="h-6 w-6" />
              <h1 className="font-primary text-800 font-normal leading-[1.2] text-grey-500">
                Мои черновики
              </h1>
            </div>
          </Link>
        </button>
        <h1 className="hidden font-primary text-[24px] font-semibold leading-[1.21] text-grey-500 md:inline">
          Мои черновики
        </h1>
        <div className="mt-10 flex w-full flex-col items-center gap-5 sm:grid sm:grid-cols-2 sm:justify-items-center sm:gap-x-[40px] sm:gap-y-5 md:gap-y-[60px]">
          {loading ? (
            <>
              <DraftCardSkeleton />
              <DraftCardSkeleton />
              <DraftCardSkeleton />
            </>
          ) : drafts && Array.isArray(drafts) && drafts.length > 0 ? (
            drafts.map((draft: CardInfo) => (
              <DraftCard
                key={draft.id}
                id={draft.id}
                coupleImage={draft.coupleImage}
                templateName={draft.templateName}
                firstPartnerName={
                  draft.firstPartnerName ? draft.firstPartnerName : "Невеста"
                }
                secondPartnerName={
                  draft.secondPartnerName ? draft.secondPartnerName : "Жених"
                }
                handleDelete={() => handleDelete(draft.id)}
              />
            ))
          ) : (
            <div className="flex w-full flex-col rounded-[20px] bg-grey-50 p-5">
              <span className="font-grey-500 mb-5 text-300 font-medium">
                У вас еще нет ни одного черновика
              </span>
              <button
                onClick={() => navigate("/catalog")}
                className="h-[42px] rounded-[30px] bg-grey-300 px-[18px] font-semibold text-white"
              >
                Создать
              </button>
            </div>
          )}
        </div>
      </ProfileDashboardLayout>
    </>
  );
};

export default MyDraftsPage;
