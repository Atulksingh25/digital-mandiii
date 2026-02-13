document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  // For demo: admin login blocked, only users allowed
  if (role === "admin") {
    alert("Admin login is restricted here!");
    return;
  }

  // Simulate login success
  localStorage.setItem("username", username);
  localStorage.setItem("role", role);

  // Redirect to user dashboard
  window.location.href = "user.htm";
});
