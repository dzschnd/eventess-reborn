import type { FC } from "react";
import { FileText, MailOpen, MessagesSquare, UserCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
};

const navItems: NavItem[] = [
  {
    to: "/profile",
    label: "Профиль",
    icon: UserCircle,
    end: true,
  },
  {
    to: "/profile/drafts",
    label: "Мои черновики",
    icon: FileText,
  },
  {
    to: "/profile/invitations",
    label: "Мои приглашения",
    icon: MailOpen,
  },
  {
    to: "/profile/guest-answers",
    label: "Ответы гостей",
    icon: MessagesSquare,
  },
];

const ProfileNavigation: FC = () => {
  return (
    <nav className="hidden w-full self-start rounded-[32px] bg-white p-4 shadow-[0_18px_50px_rgba(33,33,33,0.06)] sm:flex sm:w-[260px] sm:min-w-[260px] sm:max-w-[260px] sm:flex-col sm:gap-2 md:p-5">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            clsx(
              "group flex h-[48px] items-center gap-2 rounded-[18px] px-3 transition-all duration-200 ease-out",
              isActive
                ? "bg-[#f3f3f5]"
                : "hover:bg-[#f7f7f8] hover:shadow-[0_8px_18px_rgba(33,33,33,0.04)]",
            )
          }
        >
          {({ isActive }) => {
            const Icon = item.icon;

            return (
              <>
                <span
                  className={clsx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-[12px] transition-colors duration-200",
                    isActive ? "bg-white" : "group-hover:bg-white",
                  )}
                >
                  <Icon
                    size={22}
                    strokeWidth={1.7}
                    className={clsx(
                      "transition-colors duration-200",
                      isActive
                        ? "text-[#555555]"
                        : "text-[#777777] group-hover:text-[#555555]",
                    )}
                  />
                </span>
                <span
                  className={clsx(
                    "whitespace-nowrap font-primary text-400 leading-[1.4] text-[#555555] transition-colors duration-200",
                    isActive ? "font-medium" : "font-normal",
                  )}
                >
                  {item.label}
                </span>
              </>
            );
          }}
        </NavLink>
      ))}
    </nav>
  );
};

export default ProfileNavigation;
