// js/products.js
import { fetchProducts, createProduct, deleteProduct } from "./api.js";

const section = document.getElementById("products");

export async function renderProducts() {
  section.innerHTML = `
    <h2>➕ Add Product</h2>

    <form id="productForm" enctype="multipart/form-data">
      <input name="name" placeholder="Product Name" required />
      <input name="category" placeholder="Category" required />
      <input name="price" type="number" placeholder="Price" required />
      <input name="stock" type="number" placeholder="Stock" required />

      <input name="farmerName" placeholder="Farmer Name" required />
      <input name="farmerAddress" placeholder="Farmer Address" required />
      <input name="sourcePlace" placeholder="Source Place" required />

      <label>📦 Product Image</label>
      <input type="file" name="productImage" required />

      <label>👨‍🌾 Farmer Image</label>
      <input type="file" name="farmerImage" required />

      <button type="submit">Add Product</button>
    </form>

    <hr/>

    <h2>📋 Products List</h2>
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>Product</th>
          <th>Name</th>
          <th>Farmer</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="productsTable"></tbody>
    </table>
  `;

  /* ================= ADD PRODUCT ================= */
document.getElementById("productForm").onsubmit = async e => {
  e.preventDefault();

  const formData = new FormData(e.target);

  await createProduct(formData);

  alert("✅ Product added");
  renderProducts();
};


  /* ================= LOAD PRODUCTS ================= */
  const products = await fetchProducts();

  document.getElementById("productsTable").innerHTML =
    products.map(p => `
      <tr>
        <td>
          <img src="${p.productImage}" width="60"><br/>
          <img src="${p.farmerImage}" width="40">
        </td>
        <td>${p.name}</td>
        <td>
          ${p.farmerName}<br/>
          <small>${p.sourcePlace}</small>
        </td>
        <td>₹${p.price}</td>
        <td>${p.stock}</td>
        <td>
          <button onclick="deleteProductById('${p._id}')">❌ Delete</button>
        </td>
      </tr>
    `).join("");

  /* ================= DELETE ================= */
  window.deleteProductById = async id => {
    await deleteProduct(id);
    renderProducts();
  };
}
