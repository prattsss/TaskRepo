import axios from "axios";

export const login = async (username, password) => {
  try {
    console.log("Attempting login for:", username);

    const response = await axios.get(`http://localhost:5000/users?username=${username}`);
    console.log("Login API Response:", response.data);

    if (response.data.length > 0 && response.data[0].password === password) {
      const user = response.data[0];

      // Store the correct role in localStorage
      localStorage.setItem("token", JSON.stringify({ username: user.username, role: user.role }));

      console.log("Stored token:", localStorage.getItem("token")); // Debugging line

      return true;
    } else {
      console.log("Invalid credentials");
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
  return false;
};


;

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};
