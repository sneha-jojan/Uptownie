/* ================= CART DATA ================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= ADD PRODUCT ================= */
function addToCart(id, name, price, image) {

  let item = cart.find(p => p.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      image: image,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart 🛒");
}

/* ================= CART COUNT (ICON) ================= */
function updateCartCount() {
  let count = cart.reduce((sum, item) => sum + item.qty, 0);
  let countEl = document.getElementById("cartCount");

  if (countEl) {
    countEl.innerText = count;
  }
}

/* ================= LOAD CART PAGE ================= */
function loadCartPage() {

  let container = document.getElementById("cartItems");
  let total = 0;

  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <p style="text-align:center;color:#777;">
        Your cart is empty 🛒
      </p>
    `;
    document.getElementById("cartTotal").innerText = 0;
    localStorage.setItem("totalAmount", 0);
    return;
  }

  cart.forEach(item => {
    total += item.price * item.qty;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" class="cart-img">

        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>

          <div class="qty-box">
            <button onclick="changeQty(${item.id}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById("cartTotal").innerText = total;
  localStorage.setItem("totalAmount", total);
}

/* ================= CHANGE QUANTITY ================= */
function changeQty(id, value) {

  cart = cart.map(item => {
    if (item.id === id) {
      item.qty += value;
    }
    return item;
  }).filter(item => item.qty > 0);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartPage();
  updateCartCount();
}

/* ================= CHECKOUT (LOGIN CHECK ADDED) ================= */
function goToCheckout() {

  if (cart.length === 0) {
    alert("Please add product to cart 🛒");
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  localStorage.setItem("totalAmount", total);

  // 🔐 LOGIN CHECK
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    localStorage.setItem("redirectAfterLogin", "checkout.html");
    window.location.href = "sign.html";
  } else {
    window.location.href = "cartsignup.html";
  }
}

/* ================= INIT ================= */
updateCartCount();
loadCartPage();
