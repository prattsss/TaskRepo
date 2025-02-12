

import React, { useState, useEffect } from "react";
import { Edit, Trash } from "lucide-react";
export default function UserList({ users, deleteUser, editUser }) {
    const [role, setRole] = useState(null);
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("token") || "{}");
      setRole(storedUser.role || "user"); 
      console.log("ROLE:", storedUser.role); 
    }, []);
  const handleContextMenu = (event) => {
    if (role !== "admin") {
      event.preventDefault();
    }
  };

  return (
<>
<div className="w-2/3 mx-auto bg-white p-4 shadow-md rounded-md">
      <h2 className="text-xl font-bold">ROLE : {role} {role === 'user' ? `(Right click on list won't work)` : ''}</h2>
      {users.length <= 2 ? (
        <p className="text-gray-500">No users added yet.</p>
      ) : (
        <ul>
          {users.slice(2).map((user) => (
            <li key={user.id} className="flex justify-between items-center p-2 border-b" onContextMenu={handleContextMenu}>
              <span>{user.name} - {user.email}</span>
              <div>
                <button onClick={() => editUser(user)} className="text-blue-500 mr-2">
                  <Edit size={18} />
                </button>
                <button onClick={() => deleteUser(user.id)} className="text-red-500">
                  <Trash size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
</>
  );
}
