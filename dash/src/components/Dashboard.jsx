// src/components/Dashboard.js
import React from "react";
import { logout } from "../auth";
import { Button } from "@/components/ui/button";
const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to the protected page!</p>
      <Button onClick={logout} className="mt-4 absolute right-4 top-4">Logout</Button>
    </div>
  );
};

export default Dashboard;