import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { RamasPage } from "@/pages/ramas/RamasPage";
import { UsersPage } from "@/pages/users/UsersPage";
import { LayoutDashboard, Trees, Users } from "lucide-react";
import type { JSX } from "react";

// routes.ts
type TRoute = {
  path: string;
  name: string;
  icon: JSX.Element;
  element: JSX.Element;
};

export const routes: TRoute[] = [
  {
    path: "/",
    name: "",
    icon: <LayoutDashboard className="size-4" />,
    element: <DashboardPage />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <LayoutDashboard className="size-4" />,
    element: <DashboardPage />,
  },
  {
    path: "/users",
    name: "Usuarios",
    icon: <Users className="size-4" />,
    element: <UsersPage />,
  },
  {
    path: "/ramas",
    name: "Ramas",
    icon: <Trees className="size-4" />,
    element: <RamasPage />,
  },
];
