const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://digital-mandii-0.onrender.com/api";
let allProducts = [];

/* ===== Currency System ===== */

const currencyRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011
};

const currencySymbols = {
  INR: "₹",
  USD: "$",
  EUR: "€"
};

let selectedCurrency = localStorage.getItem("currency") || "INR";


/* ================= PAGE LOAD ================= */
document.addEventListener("DOMContentLoaded", () => {

  const currencySwitcher = document.getElementById("currencySwitcher");

  if (currencySwitcher) {
    currencySwitcher.value = selectedCurrency;

    currencySwitcher.addEventListener("change", function () {
      selectedCurrency = this.value;
      localStorage.setItem("currency", selectedCurrency);
      applyFilters();
    });
  }

  loadProducts();

  // Filters
  document.getElementById("categoryFilter")?.addEventListener("change", applyFilters);
  document.getElementById("typeFilter")?.addEventListener("change", applyFilters);
  document.getElementById("searchInput")?.addEventListener("input", applyFilters);

  // Navigation Buttons
  document.getElementById("btnProducts")?.addEventListener("click", () => {
    showSection("products");
    resetFilters();
  });

  document.getElementById("btnFarmers")?.addEventListener("click", () => {
    showSection("farmers");
  });

  document.getElementById("btnOrders")?.addEventListener("click", () => {
    showSection("orders");
  });

});


/* ================= SECTION SWITCH ================= */
function showSection(sectionId) {

  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });

  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.classList.add("active");
  }
}


/* ================= RESET FILTERS ================= */
function resetFilters() {

  const category = document.getElementById("categoryFilter");
  const type = document.getElementById("typeFilter");
  const search = document.getElementById("searchInput");

  if (category) category.value = "";
  if (type) type.value = "";
  if (search) search.value = "";

  applyFilters(); // show all products
}


/* ================= LOAD PRODUCTS ================= */
async function loadProducts() {
  try {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    allProducts = data;
    applyFilters();
  } catch (err) {
    console.error(err);
  }
}


/* ================= DISPLAY PRODUCTS ================= */
function displayProducts(products) {

  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!products.length) {
    grid.innerHTML = "<p>No products found</p>";
    return;
  }

  const symbol = currencySymbols[selectedCurrency];
  const rate = currencyRates[selectedCurrency];

  products.forEach(p => {

    const price = Number(p.price);
    const mrp = p.mrp ? Number(p.mrp) : null;

    const convertedPrice = (price * rate).toFixed(2);
    const convertedMrp = mrp ? (mrp * rate).toFixed(2) : null;

    let discount = 0;
    if (mrp && mrp > price) {
      discount = Math.round(((mrp - price) / mrp) * 100);
    }

    grid.innerHTML += `
      <div class="card">

        ${p.isNew ? `<span class="badge new">NEW</span>` : ""}
        ${p.isSurplus ? `<span class="badge surplus">SURPLUS</span>` : ""}

        <div class="product-img">
          <img src="${p.productImage || 'https://via.placeholder.com/200'}">
        </div>

        <div class="product-info">
          <h3>${p.name}</h3>

          <div class="price-box">
            ${convertedMrp ? `<span class="mrp">${symbol}${convertedMrp}</span>` : ""}
            <span class="price">${symbol}${convertedPrice}</span>
            ${discount ? `<span class="discount">${discount}% OFF</span>` : ""}
          </div>

          <p class="category">${p.category}</p>
          <p class="stock">${p.stock > 0 ? "In Stock" : "Out of Stock"}</p>
          
          <button onclick="viewProduct('${p._id}')">View Details</button>
          ${p.isSurplus ? `<button onclick="showSurplusInfo()">ℹ Info</button>` : ""}
          <button onclick="addToCart('${p._id}')">Add to Cart</button>
        </div>
      </div>
    `;
  });
}


/* ================= VIEW PRODUCT ================= */
function viewProduct(id) {
  localStorage.setItem("productId", id);
  window.location.href = "product-details.htm";
}


/* ================= ADD TO CART ================= */
function addToCart(productId) {

  fetch(`${API}/cart/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: "user123",
      productId,
      quantity: 1
    })
  })
    .then(res => res.json())
    .then(() => alert("Added to cart ✅"));
}


/* ================= APPLY FILTERS ================= */
function applyFilters() {

  let filtered = [...allProducts];

  const category = document.getElementById("categoryFilter")?.value;
  const type = document.getElementById("typeFilter")?.value;
  const search = document.getElementById("searchInput")?.value.toLowerCase() || "";

  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  if (type === "new") {
    filtered = filtered.filter(p => p.isNew);
  }

  if (type === "surplus") {
    filtered = filtered.filter(p => p.isSurplus);
  }

  if (search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search)
    );
  }

  displayProducts(filtered);
}


/* ================= SHIPPING PAGE ================= */
function openShipping() {
  window.location.href = "shipping-calculator.htm";
}
function showSurplusInfo(){
  alert(
`Surplus Product Information:

• Ye product extra stock me available hai.
• Discounted price par diya ja raha hai.
• Limited quantity ho sakti hai.
• Ho sakta hai packaging normal se different ho.

Surplus products best deal hote hain bulk buyers ke liye.`
  );
}
