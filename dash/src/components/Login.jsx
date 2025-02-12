import React, { useState } from "react";
import { login } from "../auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked"); // Debugging line

    const success = await login(username, password);
    console.log("Login success:", success); // Debugging line

    if (success) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Label className="text-2xl font-bold">Login</Label>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit">Login</Button>
      </form>

    </div>
  );
};

export default Login;
