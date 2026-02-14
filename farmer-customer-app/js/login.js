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

  // ✅ Check user in backend
  const users = await api.fetchFarmers(); // ya koi API jisme users/username ho
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    alert("Invalid username or password!");
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("role", role);

  window.location.href = "user.htm";
});
