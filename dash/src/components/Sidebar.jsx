import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Label } from "@/components/ui/label";
export default function Sidebar({ toggleForm }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    toggleForm()
    setIsFormOpen(!isFormOpen);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="absolute top-7 left-6">
        <button className="text-gray-800" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-64"}`}>
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-white" onClick={() => setIsOpen(false)}>
          <X size={28} />
        </button>

        <h2 className="text-xl font-bold mb-6">Menu</h2>

        {/* Open Form Button */}
        <Label
          onClick={openForm}
          className="bg-blue-500 text-white px-4 py-2 w-full rounded-md"
        >
          {isFormOpen ? "Close Form" : "Open Form"}
        </Label>

      </div>
    </>
  );
}


