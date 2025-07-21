import { Routes, Route } from "react-router";
import "./App.css";
import { LoginPage } from "./pages/login/LoginPage";
import { SessionProvider } from "./components/providers/SessionProvider";
import { MainPage } from "./pages/main/MainPage";

function App() {
  return (
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
  );
}

export default App;
