import React, { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";

const CustomAlert = ({ title, message, buttons, onClose }) => {
  const alertRef = useRef(null);

  useEffect(() => {
    if (alertRef.current) {
      alertRef.current.focus();
    }

    const handleTab = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, []);

  if (!title) return null;

  return (
    <div 
      ref={alertRef}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]"
      tabIndex={-1}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-[90vw] animate-in fade-in duration-200">
        <div className="flex items-center mb-4">
          <AlertTriangle className="text-yellow-500 mr-2 h-6 w-6" />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="flex justify-end space-x-3">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.onClick}
              className={`${btn.className} transition-colors duration-200 font-medium`}
              autoFocus={index === 0}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;