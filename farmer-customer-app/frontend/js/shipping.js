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

const selectedCurrency = localStorage.getItem("currency") || "INR";


/* ===== Country Shipping Rates (Base INR) ===== */

const shippingRates = {
  India: { base: 200, perKg: 100 },
  USA: { base: 1200, perKg: 500 },
  UK: { base: 1000, perKg: 450 },
  UAE: { base: 800, perKg: 400 }
};


/* ===== Calculate Shipping ===== */

function calculateShipping(){

  const country = document.getElementById("country").value;
  const weight = Number(document.getElementById("weight").value);

  if(!weight || weight <= 0){
    alert("Enter valid weight");
    return;
  }

  const rate = shippingRates[country];

  let totalINR = rate.base + (weight * rate.perKg);

  // Convert Currency
  const converted = (totalINR * currencyRates[selectedCurrency]).toFixed(2);
  const symbol = currencySymbols[selectedCurrency];

  document.getElementById("result").innerHTML =
    `Shipping Cost: ${symbol}${converted}`;
}
