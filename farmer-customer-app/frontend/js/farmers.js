import { addFarmer, deleteFarmer, fetchFarmers } from "./api.js";

const section = document.getElementById("farmers");
let farmersCache = []; // 🔥 local cache

export async function renderFarmers() {
  try {
    farmersCache = await fetchFarmers();
    drawTable();
    attachFormHandler();
  } catch (err) {
    console.error(err);
    section.innerHTML = "<p>Failed to load farmers</p>";
  }
}

/* ================= DRAW TABLE ================= */
function drawTable() {
  section.innerHTML = `
    <h2>👨‍🌾 Farmers</h2>

    <form id="addFarmerForm" enctype="multipart/form-data">
      <input name="name" placeholder="Name" required />
      <input name="city" placeholder="City" required />
      <input name="mobile" placeholder="Mobile" required />
      <input name="product" placeholder="Product" required />
      <input name="price" type="number" placeholder="Price" required />
      <input name="address" placeholder="Address" required />
      <input type="file" name="image" required />
      <button type="submit">Add Farmer</button>
    </form>

    <hr/>

    <table border="1" width="100%" cellpadding="8">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>City</th>
          <th>Mobile</th>
          <th>Product</th>
          <th>Price</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="farmersBody">
        ${farmersCache.map(rowHTML).join("")}
      </tbody>
    </table>
  `;
}

/* ================= SINGLE ROW ================= */
function rowHTML(f) {
  return `
    <tr id="row-${f._id}">
      <td>${f.photo ? `<img src="${f.photo}" width="60">` : "No Image"}</td>
      <td>${f.name}</td>
      <td>${f.city}</td>
      <td>${f.mobile}</td>
      <td>${f.product}</td>
      <td>₹${f.price}</td>
      <td>${f.address}</td>
      <td>
        <button onclick="deleteFarmerUI('${f._id}')">Delete</button>
      </td>
    </tr>
  `;
}

/* ================= ADD FARMER ================= */
function attachFormHandler() {
  const form = document.getElementById("addFarmerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const res = await addFarmer(formData);

    if (res.success) {
      // 🔥 NO REFRESH – DIRECT APPEND
      farmersCache.unshift(res.farmer);

      document
        .getElementById("farmersBody")
        .insertAdjacentHTML("afterbegin", rowHTML(res.farmer));

      form.reset();
      alert("Farmer added instantly 🚀");
    }
  });
}

/* ================= DELETE ================= */
window.deleteFarmerUI = async (id) => {
  if (!confirm("Delete farmer?")) return;

  const res = await deleteFarmer(id);
  if (res.success) {
    document.getElementById(`row-${id}`)?.remove();
    farmersCache = farmersCache.filter(f => f._id !== id);
  }
};
