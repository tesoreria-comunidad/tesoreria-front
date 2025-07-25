import UserSessionCard from "@/components/common/UserSessionCard";
import { DataProvider } from "@/components/providers/DataProvider";
import { Route, Routes } from "react-router";
import { DashboardPage } from "../dashboard/DashboardPage";

export function MainPage() {
  return (
    <div>
      <DataProvider>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
        </Routes>
        <div className="absolute top-4 right-4">
          <UserSessionCard />
        </div>
      </DataProvider>
    </div>
  );
}
