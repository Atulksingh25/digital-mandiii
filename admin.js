const API = "http://localhost:5000";

const productForm = document.getElementById("productForm");
const productTable = document.querySelector("#productTable tbody");

let editId = null;

/* ================= LOAD PRODUCTS ================= */
async function loadProducts() {
  try {
    const res = await fetch(`${API}/api/products`);
    const products = await res.json();

    productTable.innerHTML = "";

    products.forEach(p => {

      const discount = p.mrp
        ? Math.round(((p.mrp - p.price) / p.mrp) * 100)
        : 0;

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${p.name || "-"}</td>
        <td>${p.category || "-"}</td>
        <td>
          ₹${p.price || "-"}
          ${p.mrp ? `<br><small>MRP ₹${p.mrp}</small>` : ""}
          ${discount ? `<br><span style="color:red">${discount}% OFF</span>` : ""}
        </td>
        <td>${p.stock || "-"}</td>
        
        <td>
          ${p.farmer
            ? `${p.farmer.name || "-"} 
               (${p.farmer.address || "-"}, 
                ${p.farmer.sourcePlace || "-"})`
            : "-"}
        </td>
        <td>${p.isNew ? "✅" : "❌"}</td>
        <td>${p.isSurplus ? "✅" : "❌"}</td>
        <td>
          ${p.productImage
            ? `<img src="http://localhost:5000${p.productImage}" width="60">`
            : "No Image"}
        </td>
        <td>
          <button onclick="editProduct('${p._id}')">Edit</button>
          <button onclick="deleteProduct('${p._id}')">Delete</button>
        </td>
      `;

      productTable.appendChild(tr);
    });

  } catch (err) {
    console.error("Load error:", err);
  }
}

/* ================= ADD / UPDATE ================= */
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(productForm);

  formData.set("isNew", productForm.isNew.checked);
  formData.set("isSurplus", productForm.isSurplus.checked);

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

  productForm.name.value = product.name || "";
  productForm.category.value = product.category || "";
  productForm.price.value = product.price || "";
  productForm.mrp.value = product.mrp || "";
  productForm.stock.value = product.stock || "";
  productForm.description.value = product.description || "";

  productForm.farmerName.value = product.farmer?.name || "";
  productForm.farmerAddress.value = product.farmer?.address || "";
  productForm.sourcePlace.value = product.farmer?.sourcePlace || "";

  productForm.isNew.checked = product.isNew || false;
  productForm.isSurplus.checked = product.isSurplus || false;

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
loadProducts();
