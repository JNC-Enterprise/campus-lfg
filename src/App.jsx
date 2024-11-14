import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage  from "./pages/Home";
import Registration from "./pages/Registration";
import Groups from "./pages/Groups";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/groups/:gameName" element={<Groups />} />
      <Route path="/register" element={<Registration />} />
    </Routes>
  );
}

export default App;