// frontend/js/login.js
import { loginUser } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {

  /* ================= LOGIN ================= */
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await loginUser({ email, password });

      if (!res.token) {
        alert(res.message || res.error || "Invalid credentials");
        return;
      }

      // Save login session
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("name", res.name);

      alert("Login successful!");

      // Redirect based on role
      if (res.role === "admin") {
        alert("Admin login restricted here!");
      } else {
        window.location.href = "user.html";
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Server not responding. Please try later.");
    }
  });

  /* ================= REGISTER ================= */
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("https://digital-mandii-0.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (res.status !== 201) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("✅ Registration successful! You can now login.");
      registerForm.reset();

    } catch (err) {
      console.error("Registration error:", err);
      alert("Server error. Try again later.");
    }
  });

});