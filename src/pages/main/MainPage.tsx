import UserSessionCard from "@/components/common/UserSessionCard";
import { Route, Routes } from "react-router";
import { DashboardPage } from "../dashboard/DashboardPage";

export function MainPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
      <div className="absolute top-4 right-4">
        <UserSessionCard />
      </div>
    </div>
  );
}
