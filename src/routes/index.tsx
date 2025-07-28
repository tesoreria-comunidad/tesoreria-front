import type { TRole } from "@/constants/role.constants";
import { BeneficiarioPage } from "@/pages/beneficiario/BeneficiarioPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { FamilyPage } from "@/pages/family/FamilyPage";
import RamasDetailPage from "@/pages/ramas/RamasDetailPage";
import { RamasPage } from "@/pages/ramas/RamasPage";
import { UsersPage } from "@/pages/users/UsersPage";
import {
  ContactRound,
  HomeIcon,
  LayoutDashboard,
  Trees,
  Users,
} from "lucide-react";
import type { JSX } from "react";

// routes.ts
type TRoute = {
  path: string;
  name: string;
  icon: JSX.Element;
  element: JSX.Element;
  rolesAccess?: TRole[];
  sidebarContent: boolean;
};

export const routes: TRoute[] = [
  {
    path: "/",
    name: "",
    icon: <HomeIcon className="size-4" />,
    element: <DashboardPage />,
    rolesAccess: ["MASTER", "DIRIGENTE"],
    sidebarContent: false,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <LayoutDashboard className="size-4" />,
    element: <DashboardPage />,
    rolesAccess: ["MASTER", "DIRIGENTE"],
    sidebarContent: true,
  },
  {
    path: "/users",
    name: "Usuarios",
    icon: <Users className="size-4" />,
    element: <UsersPage />,
    rolesAccess: ["MASTER", "DIRIGENTE"],
    sidebarContent: true,
  },
  {
    path: "/ramas",
    name: "Ramas",
    icon: <Trees className="size-4" />,
    element: <RamasPage />,
    rolesAccess: ["MASTER", "DIRIGENTE"],
    sidebarContent: true,
  },
  {
    path: "/ramas/:ramaId",
    name: "Ramas",
    icon: <Trees className="size-4" />,
    element: <RamasDetailPage />,
    rolesAccess: ["MASTER", "DIRIGENTE"],
    sidebarContent: false,
  },
  {
    path: "/beneficiario",
    name: "Beneficiarios",
    icon: <Trees className="size-4" />,
    element: <BeneficiarioPage />,
    rolesAccess: ["BENEFICIARIO"],
    sidebarContent: true,
  },
  {
    path: "/family",
    name: "Familia",
    icon: <ContactRound className="size-4" />,
    element: <FamilyPage />,
    rolesAccess: ["BENEFICIARIO", "MASTER", "DIRIGENTE"],
    sidebarContent: true,
  },
];
