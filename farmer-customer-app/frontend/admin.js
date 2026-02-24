/* ================= API CONFIG ================= */
const API =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://digital-mandii-0.onrender.com";

/* ================= ELEMENTS ================= */
const productForm = document.getElementById("productForm");
const productTable = document.querySelector("#productTable tbody");
const farmerSelect = document.getElementById("farmerSelect");

let editId = null;

/* ================= LOAD FARMERS ================= */
async function loadFarmers() {
  const res = await fetch(`${API}/api/farmers`);
  const farmers = await res.json();

  farmerSelect.innerHTML = '<option value="">Select Farmer</option>';

  farmers.forEach(f => {
    const option = document.createElement("option");
    option.value = f._id;
    option.textContent = f.name;
    farmerSelect.appendChild(option);
  });
}

/* ================= LOAD PRODUCTS ================= */
async function loadProducts() {
  const res = await fetch(`${API}/api/products`);
  const products = await res.json();

  productTable.innerHTML = "";

  products.forEach(p => {

    const discount = p.mrp
      ? Math.round(((p.mrp - p.price) / p.mrp) * 100)
      : 0;

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>
        ₹${p.price}
        ${p.mrp ? `<br><small>MRP ₹${p.mrp}</small>` : ""}
        ${discount ? `<br><span style="color:red">${discount}% OFF</span>` : ""}
      </td>
      <td>${p.stock}</td>
      <td>${p.farmer?.name || "-"}</td>
    <td>${p.isNew === true || p.isNew === "true" ? "✅" : "❌"}</td>
<td>${p.isSurplus === true || p.isSurplus === "true" ? "✅" : "❌"}</td>
      <td>
        ${p.productImage
          ? `<img src="${p.productImage}" width="60">`
          : "No Image"}
      </td>
      <td>
        <button onclick="editProduct('${p._id}')">Edit</button>
        <button onclick="deleteProduct('${p._id}')">Delete</button>
      </td>
    `;

    productTable.appendChild(tr);
  });
}

/* ================= ADD / UPDATE ================= */
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(productForm);
formData.set("isNew", productForm.isNew.checked ? "true" : "false");
formData.set("isSurplus", productForm.isSurplus.checked ? "true" : "false");

  let url = `${API}/api/products`;
  let method = "POST";

  if (editId) {
    url = `${API}/api/products/${editId}`;
    method = "PUT";
  }

  await fetch(url, {
    method,
    body: formData
  });

  productForm.reset();
  editId = null;
  loadProducts();
});

/* ================= EDIT ================= */
window.editProduct = async function(id) {
  const res = await fetch(`${API}/api/products/${id}`);
  const product = await res.json();

  editId = id;

  productForm.name.value = product.name;
  productForm.category.value = product.category;
  productForm.price.value = product.price;
  productForm.mrp.value = product.mrp;
  productForm.stock.value = product.stock;
  productForm.description.value = product.description;
  productForm.isNew.checked = product.isNew;
  productForm.isSurplus.checked = product.isSurplus;
  farmerSelect.value = product.farmer?._id || "";

  window.scrollTo(0, 0);
};

/* ================= DELETE ================= */
window.deleteProduct = async function(id) {
  if (!confirm("Delete this product?")) return;

  await fetch(`${API}/api/products/${id}`, {
    method: "DELETE"
  });

  loadProducts();
};

/* ================= INIT ================= */
loadFarmers();
loadProducts();