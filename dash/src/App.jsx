import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DynamicRightClick from "./components/DynamicRightClick";
import { logout } from "./auth";
import CustomAlert from "./components/CustomAlert";
import Sidebar from "./components/Sidebar";
import MultiStepForm from "./components/MultiStepForm";

export default function App() {
  const [alert, setAlert] = useState(null);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const MAX_TAB_SWITCHES = 1; // Maximum allowed tab switches

  useEffect(() => {
    let preventNavigation = false;

    const blockRefresh = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      setAlert({
        title: "Action Blocked",
        message: "Page refresh is not allowed during this session.",
        buttons: [
          { 
            label: "Understood", 
            onClick: () => setAlert(null), 
            className: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          },
        ],
      });
      
      return false;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        preventNavigation = true;
        setTabSwitchCount(prev => {
          const newCount = prev + 1;
          
          if (newCount > MAX_TAB_SWITCHES) {
            // Show warning alert before logout
            setAlert({
              title: "Session Terminated",
              message: "Multiple tab switches detected. You will be logged out.",
              buttons: [
                { 
                  label: "OK", 
                  onClick: () => {
                    setAlert(null);
                    logout(); // Call the logout function
                    window.location.href = '/'; // Redirect to login
                  }, 
                  className: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                },
              ],
            });
          } else if (newCount === MAX_TAB_SWITCHES) {
            // Show warning for last attempt
            setAlert({
              title: "Final Warning",
              message: "One more tab switch will result in automatic logout.",
              buttons: [
                { 
                  label: "Understood", 
                  onClick: () => setAlert(null), 
                  className: "bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
                },
              ],
            });
          }
          
          return newCount;
        });
      } else {
        if (preventNavigation && tabSwitchCount <= MAX_TAB_SWITCHES) {
          window.focus();
          setAlert({
            title: "Tab Switch Detected",
            message: `Warning: You have switched tabs ${tabSwitchCount}/1 times. Further attempts will log you out.`,
            buttons: [
              { 
                label: "Understood", 
                onClick: () => setAlert(null), 
                className: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              },
            ],
          });
        }
      }
    };

    // Capture phase to prevent default browser behavior
    window.addEventListener("beforeunload", blockRefresh, { capture: true });
    document.addEventListener("visibilitychange", handleVisibilityChange, { capture: true });
    
    // Additional measures to prevent refresh
    window.onkeydown = (e) => {
      if ((e.key === 'r' || e.key === 'R') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        blockRefresh(e);
      }
    };

    // Prevent right-click refresh
    window.oncontextmenu = (e) => {
      e.preventDefault();
      return false;
    };

    return () => {
      window.removeEventListener("beforeunload", blockRefresh, { capture: true });
      document.removeEventListener("visibilitychange", handleVisibilityChange, { capture: true });
      window.onkeydown = null;
      window.oncontextmenu = null;
    };
  }, [tabSwitchCount]);

  return (
    <Router>
      <div className="min-h-screen" onBlur={() => window.focus()}>
        <Sidebar />
        <Routes>
    
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute element={
                <>
                  <Dashboard />
                  <DynamicRightClick />
                </>
              } />
            }
          />
           <Route path="/step-1" element={<MultiStepForm />} />
           <Route path="/step-2" element={<MultiStepForm />} />
        </Routes>
        {alert && <CustomAlert {...alert} onClose={() => setAlert(null)} />}
      </div>
    </Router>
  );
}