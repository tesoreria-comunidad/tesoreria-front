import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { UsersPage } from "@/pages/users/UsersPage";
import { LayoutDashboard, Users } from "lucide-react";
import type { JSX, ComponentType } from "react";

// routes.ts
type TRoute = {
  path: string;
  icon: ComponentType;
  element: JSX.Element;
};

export const routes: TRoute[] = [
  {
    path: "/",
    icon: LayoutDashboard,
    element: <DashboardPage />,
  },
  {
    path: "/dashboard",
    icon: LayoutDashboard,
    element: <DashboardPage />,
  },
  {
    path: "/users",
    icon: Users,
    element: <UsersPage />,
  },
];
