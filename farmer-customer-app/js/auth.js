document.getElementById("loginForm").onsubmit = (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  if (email === "admin@gmail.com") {
    localStorage.setItem("role", "admin");
    location.href = "admin.htm";
  } else {
    localStorage.setItem("role", "user");
    location.href = "user.htm";
  }
};
