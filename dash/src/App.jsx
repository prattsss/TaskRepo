import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import CustomAlert from "./components/CustomAlert";
import { useNavigate } from "react-router-dom";
import AES from './AES'

const VisibilityHandler = ({ setAlert }) => {
  const navigate = useNavigate();
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prev) => {
          if (prev === 0) {
            setAlert({
              title: "Tab Switch Detected",
              message: `Warning: You have switched tabs ${prev + 1}/1 times. Further attempts will log you out.`,
              buttons: [{ label: "Understood", onClick: () => setAlert(null) }],
            });
            return prev + 1;
          } else {
            localStorage.removeItem("contextUserRole");
            navigate("/");
            return 0; 
          }
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [setAlert, navigate]);

  return null;
};

export default function App() {
  const [alert, setAlert] = useState(null);

  return (
    <Router>
      <VisibilityHandler setAlert={setAlert} />
      <div className="min-h-screen">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          {/* <Route path="/AES" element={<ProtectedRoute element={<AES />}/>} /> */}
        </Routes>
        {alert && <CustomAlert {...alert} onClose={() => setAlert(null)} />}
      </div>
    </Router>
  );
}
