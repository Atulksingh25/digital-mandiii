const BASE_URL ="https://digital-mandii-0.onrender.com/api";

async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    return await res.json();
  } catch (err) {
    console.error(err);
    return { message: "Server error" };
  }
}

// ================= REGISTER =================
export async function registerUser(data) {
  return safeFetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// ================= LOGIN =================
export async function loginUser(data) {
  return safeFetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}