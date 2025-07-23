import { Route, Routes } from "react-router";
import { DashboardPage } from "../dashboard/DashboardPage";
import UserSessionCard from "@/components/common/UserSessionCard";

export function MainPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/pepe" element={<>pepe</>} />
      </Routes>
      <div className="absolute top-4 right-4">
        <UserSessionCard />
      </div>
    </div>
  );
}
