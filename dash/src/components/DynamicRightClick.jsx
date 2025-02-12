import React, { useState, useEffect } from "react";

const DynamicRightClick = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Read the role directly from localStorage
    const storedUser = JSON.parse(localStorage.getItem("token") || "{}");
    setRole(storedUser.role || "user"); // Default to "user" if no role is found

    console.log("🗄 Retrieved Role from Storage:", storedUser.role); // Debugging line
  }, []);

  const handleContextMenu = (event) => {
    if (role !== "admin") {
      event.preventDefault(); // Disable right-click for non-admin users
    }
  };

  return (
    <div>
      <h2>User Role: {role || "Loading..."}</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((id) => (
            <tr key={id} onContextMenu={handleContextMenu}>
              <td>{id}</td>
              <td>User {id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicRightClick;
