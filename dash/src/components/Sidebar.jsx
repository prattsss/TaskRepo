import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`h-screen bg-gray-800 text-white ${isCollapsed ? "w-16" : "w-60"} transition-all duration-300`}>
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && <span className="text-lg font-bold">My App</span>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-white">
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      <nav className="flex flex-col gap-4 p-4">
        <Link to="/step-1" className="hover:bg-gray-700 p-2 rounded-md flex items-center gap-2">
          <Menu size={20} /> {!isCollapsed && "Step 1"}
        </Link>
        <Link to="/step-2" className="hover:bg-gray-700 p-2 rounded-md flex items-center gap-2">
          <Menu size={20} /> {!isCollapsed && "Step 2"}
        </Link>
      </nav>
    </div>
  );
}
