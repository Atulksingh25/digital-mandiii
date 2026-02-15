import * as api from "./api.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if (role === "admin") {
    alert("Admin login is restricted here!");
    return;
  }

  try {
    // ✅ Fetch users from backend using api.js
    const users = await api.fetchFarmers();

    if (!Array.isArray(users)) {
      alert("Server error. Please try again.");
      return;
    }

    // ✅ Check user credentials
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      alert("Invalid username or password!");
      return;
    }

    // ✅ Save to localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);

    // ✅ Redirect
    window.location.href = "user.html";

  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Try again.");
  }
});
