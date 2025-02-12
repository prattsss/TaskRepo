


import React, { useState, useEffect } from "react";
import { logout } from "../util/auth";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import MultiStepForm from "./MultiStepForm";
import UserList from "./UserList";
import AES from "../AES";
import { fetchUsers, deleteUser as apiDeleteUser, addUserToDB } from "../util/api";
const Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    setEditData(null);
  };

  const addUser = async (userData) => {
    if (editData) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === userData.id ? userData : user
      ));
    } else {
      // Add new user
      console.log(userData)
      await addUserToDB(userData)
    }
    loadUsers(); // Reload users from server
  };

  const handleDelete = async (id, index) => {
    if (index < 2) {
      alert("This record cannot be deleted for security reasons.");
      return;
    }
    await apiDeleteUser(id);
    loadUsers();
  };
  const handleEdit = (user) => {
    setEditData(user);
    setIsFormOpen(true);
  };

  return (
    <>
      <div className="mt-4 absolute right-4 top-4 flex gap-4 ">
        <Button onClick={logout}>Logout</Button>
      </div>
      <div className="flex bg-gray-100">
        <Sidebar toggleForm={toggleForm} />
        <div className="flex-1 p-24">
          {isFormOpen ? (
            <MultiStepForm 
              addUser={addUser} 
              closeForm={toggleForm} 
              editData={editData} 
              toggleForm={toggleForm}
            />
          ) : (
            <UserList
              users={users}
              deleteUser={handleDelete}
              editUser={handleEdit}
            />
          )}
        </div>
   
      </div>
      <div className="w-1/2 mx-auto"> <AES /></div>
    </>
  );
};

export default Dashboard;