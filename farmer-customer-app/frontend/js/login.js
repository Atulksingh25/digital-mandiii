import { loginUser, registerUser } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await loginUser({ email, password });

    if (!res.token) {
      alert(res.message || "Login failed");
      return;
    }

    localStorage.setItem("token", res.token);
    localStorage.setItem("role", res.role);
    localStorage.setItem("name", res.name);

    alert("Login successful!");

    window.location.href = "user.html";
  });

  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    const res = await registerUser({ name, email, password });

    if (res.message !== "User registered successfully") {
      alert(res.message || "Registration failed");
      return;
    }

    alert("Registration successful! Please login.");
    registerForm.reset();
  });

});