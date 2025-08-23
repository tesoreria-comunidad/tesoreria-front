import { Routes, Route } from "react-router";
import { LoginPage } from "./pages/login/LoginPage";
import { SessionProvider } from "./components/providers/SessionProvider";
import { MainPage } from "./pages/main/MainPage";
import { Alerts } from "./components/common/Alerts";

function App() {
  return (
    <div className="h-screen overflow-x-hidden ">
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
      </Routes>

      <Alerts />
    </div>
  );
}

export default App;
