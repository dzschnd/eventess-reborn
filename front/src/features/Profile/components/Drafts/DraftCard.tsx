import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../../../api/redux/store";
import { useDispatch } from "react-redux";
import { getDraft, publishDraft } from "../../../../api/service/DraftService";
import redVelvetDefaultImage from "../../../../assetsOld/templates/redVelvet/namesImage.png";
import { ExternalLink, Trash2 } from "lucide-react";
import { templates } from "../../../../constants";

interface DraftCardProps {
  id: number;
  templateName: string;
  firstPartnerName: string | null;
  secondPartnerName: string | null;
  coupleImage: string | null;
  handleDelete: () => void;
}

const DraftCard: FC<DraftCardProps> = ({
  id,
  templateName,
  coupleImage,
  firstPartnerName,
  secondPartnerName,
  handleDelete,
}) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const templateInfo = templates.find(
    (template) => template.name === templateName,
  );

  const handleEdit = async () => {
    const response = await dispatch(getDraft({ id: id }));
    if (response.meta.requestStatus === "fulfilled")
      navigate("/constructor/names");
  };

  const handlePublish = async () => {
    const response = await dispatch(publishDraft({ id }));
    if (response.meta.requestStatus === "fulfilled") {
      navigate(`/invitations/${id}`);
    }
  };

  const backgroundImageUrl = coupleImage
    ? "https://pub-6a9646833fc24b188cbc779464f80132.r2.dev" +
      coupleImage.split(".com")[1]
    : templateName === "red_velvet"
      ? redVelvetDefaultImage
      : (templateInfo?.previewImage ?? redVelvetDefaultImage);

  return (
    <div className="flex w-full max-w-[267px] flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-[24px] bg-grey-50">
        <img
          src={backgroundImageUrl}
          alt={
            firstPartnerName && secondPartnerName
              ? `${firstPartnerName} и ${secondPartnerName}`
              : (templateInfo?.displayedName ?? "Черновик приглашения")
          }
          className="h-full w-full object-cover"
        />
        <div className="absolute right-4 top-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              void handleEdit();
            }}
            aria-label="Открыть черновик"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/25 text-white transition-colors duration-200 hover:bg-black/40"
          >
            <ExternalLink size={22} strokeWidth={2.1} />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            aria-label="Удалить черновик"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/25 text-white transition-colors duration-200 hover:bg-black/40"
          >
            <Trash2 size={23} strokeWidth={2.1} />
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 px-1">
        <span className="min-w-0 truncate font-primary text-[22px] font-normal leading-[1.2] text-grey-500">
          {templateInfo?.displayedName ?? templateName}
        </span>
        <span className="shrink-0 font-primary text-[22px] font-bold leading-[1.2] text-grey-500">
          {(templateInfo?.price ?? 3500).toLocaleString("ru")}₽
        </span>
      </div>

      <div className="mt-5 flex items-center gap-2 px-1">
        <button
          type="button"
          onClick={() => {
            void handleEdit();
          }}
          className="h-[42px] flex-1 rounded-[42px] border border-primary bg-white px-3 font-primary text-[17px] font-normal leading-[1] text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
        >
          Редактировать
        </button>
        <button
          type="button"
          onClick={() => {
            void handlePublish();
          }}
          className="h-[42px] flex-1 rounded-[42px] border border-primary bg-primary px-3 font-primary text-[17px] font-normal leading-[1] text-white transition-colors duration-200 hover:border-primary-700 hover:bg-primary-700"
        >
          Опубликовать
        </button>
      </div>
    </div>
  );
};

export default DraftCard;
