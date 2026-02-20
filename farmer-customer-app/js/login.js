import * as api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    if (role === "admin") {
      alert("Admin login is restricted here!");
      return;
    }

    try {
      const users = await api.fetchFarmers();

      if (!Array.isArray(users)) {
        alert("Server error. Try again later.");
        return;
      }

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        alert("Invalid username or password!");
        return;
      }

      // Save login session
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", "user");

      alert("Login successful!");

      window.location.href = "user.html";

    } catch (error) {
      console.error("Login error:", error);
      alert("Server not responding. Please try later.");
    }
  });
});
