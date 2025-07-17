import { Routes, Route } from "react-router";
import "./App.css";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { LoginPage } from "./pages/login/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
