import { Route, Routes } from "react-router";
import { DashboardPage } from "../dashboard/DashboardPage";

export function MainPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/pepe" element={<>pepe</>} />
      </Routes>
    </div>
  );
}
