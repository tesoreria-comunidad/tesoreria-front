import { Routes, Route } from "react-router";
import { LoginPage } from "./pages/login/LoginPage";
import { SessionProvider } from "./components/providers/SessionProvider";
import { MainPage } from "./pages/main/MainPage";
import { Alerts } from "./components/common/Alerts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ResetPasswordPage } from "./pages/reset-password/ResetPasswordPage";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen overflow-x-hidden">
        <Routes>
          <Route
            path="/*"
            element={
              <SessionProvider>
                <MainPage />
              </SessionProvider>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>

        <Alerts />
      </div>
    </QueryClientProvider>
  );
}

export default App;
