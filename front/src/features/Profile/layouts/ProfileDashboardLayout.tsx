import type { FC, ReactNode } from "react";
import clsx from "clsx";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ProfileNavigation from "../components/ProfileNavigation/index";

type ProfileDashboardLayoutProps = {
  children: ReactNode;
  cardClassName?: string;
};

const ProfileDashboardLayout: FC<ProfileDashboardLayoutProps> = ({
  children,
  cardClassName,
}) => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#f4f4f5]">
      <div className="flex flex-grow flex-col justify-between">
        <div className="flex w-full flex-col gap-6">
          <Header variant="profile" />
          <main className="w-full px-4 pb-[160px] md:px-[40px] md:pb-[120px]">
            <div className="mx-auto flex w-full max-w-[1146px] flex-col items-center justify-center sm:flex-row sm:items-start sm:gap-6">
              <ProfileNavigation />
              <section
                className={clsx(
                  "w-full min-w-0 max-w-[862px] flex-grow rounded-[32px] bg-white p-[30px] shadow-[0_18px_50px_rgba(33,33,33,0.06)]",
                  cardClassName,
                )}
              >
                {children}
              </section>
            </div>
          </main>
        </div>
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboardLayout;
