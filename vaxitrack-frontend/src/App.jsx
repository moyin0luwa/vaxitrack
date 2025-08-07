// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import CreateVaccine from "./pages/CreateVaccine";
import DispenseVaccine from "./pages/DispenseVaccine";
import UserDashboard from "./pages/UserDashboard";
// (Later: import CreateVaccine, DispenseVaccine, UserLogin)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/create-vaccine" element={<CreateVaccine />} />
        <Route path="/dispense-vaccine" element={<DispenseVaccine />} />
        <Route path="/user-dashboard/:userId" element={<UserDashboard />} />
        {/* Future routes go here */}
      </Routes>
    </Router>
  );
}
export default App;
