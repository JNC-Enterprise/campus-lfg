import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage  from "./pages/Home";
import Registration from "./pages/Registration";
import Groups from "./pages/Groups";
import Settings from "./pages/Settings";
import About from "./pages/AboutUs";
import Account from "./pages/Account";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/groups/:gameName" element={<Groups />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/about" element={<About />}/>
      <Route path="/account" element={<Account />}/>
    </Routes>
  );
}

export default App;