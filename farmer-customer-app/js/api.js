// frontend/js/api.js
const BASE_URL = "https://digital-mandii-backend2.onrender.com/api";

/* ================= HELPER ================= */
async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return { success: false, error: "Invalid server response" };
    }
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/* ================= FARMERS ================= */
export async function fetchFarmers() {
  const response = await fetch("https://digital-mandii-backend2.onrender.com/api/farmers");
  return await response.json();
}

export async function createFarmer(formData) {
  return safeFetch(`${BASE_URL}/farmers`, {
    method: "POST",
    body: formData
  });
}

export async function deleteFarmer(id) {
  return safeFetch(`${BASE_URL}/farmers/${id}`, {
    method: "DELETE"
  });
}

/* ================= PRODUCTS ================= */
export async function fetchProducts() {
  return safeFetch(`${BASE_URL}/products`);
}

export async function createProduct(formData) {
  return safeFetch(`${BASE_URL}/products`, {
    method: "POST",
    body: formData
  });
}

export async function deleteProduct(id) {
  return safeFetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE"
  });
}

/* ================= ORDERS ================= */
export async function fetchOrders() {
  return safeFetch(`${BASE_URL}/orders`);
}

export async function createOrder(orderData) {
  return safeFetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  });
}



export async function deleteOrder(id) {
  return safeFetch(`${BASE_URL}/orders/${id}`, {
    method: "DELETE"
  });
}
