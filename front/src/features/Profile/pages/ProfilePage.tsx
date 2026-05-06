import { useEffect } from "react";
import type { FC } from "react";
import ProfileInfo from "../components/Profile/ProfileInfo";
import LogoutButton from "../components/Profile/LogoutButton";
import ChangePassword from "../components/Profile/ChangePassword";
import { useNavigate } from "react-router-dom";
import MyGuestAnswersPreview from "../components/GuestAnswers/MyGuestAnswersPreview";
import MyDraftsPreview from "../components/Drafts/MyDraftsPreview";
import MyInvitationsPreview from "../components/Invitations/MyInvitationsPreview";
import { useSelector } from "react-redux";
import type { RootState } from "../../../api/redux/store";
import ProfileDashboardLayout from "../layouts/ProfileDashboardLayout";

const Register: FC = () => {
  const navigate = useNavigate();
  const { email } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  return (
    <ProfileDashboardLayout cardClassName="flex flex-col gap-[60px] sm:gap-[30px] md:gap-[60px]">
      <ProfileInfo />
      <ChangePassword />

      <MyGuestAnswersPreview />
      <MyDraftsPreview />
      <MyInvitationsPreview />

      <LogoutButton />
    </ProfileDashboardLayout>
  );
};

export default Register;
