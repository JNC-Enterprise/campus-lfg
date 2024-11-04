import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage  from "./pages/Home";
import Registration from "./pages/Registration";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Registration />} />
    </Routes>
  );
}

export default App;