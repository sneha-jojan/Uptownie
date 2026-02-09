function showSignup() {
  document.getElementById("loginForm").classList.remove("active");
  document.getElementById("signupForm").classList.add("active");
}

function showLogin() {
  document.getElementById("signupForm").classList.remove("active");
  document.getElementById("loginForm").classList.add("active");
}

/* ================= SIGN UP ================= */
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.querySelector("#signupForm input[type='text']").value.trim();
  let email = document.querySelector("#signupForm input[type='email']").value.trim();
  let password = document.querySelector("#signupForm input[type='password']").value;

  if (name.length < 3) {
    alert("Enter valid name");
    return;
  }

  if (!/^[^ ]+@[^ ]+\.[a-z]{2,}$/.test(email)) {
    alert("Enter valid email");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  // ❌ Check already registered
  if (localStorage.getItem(email)) {
    alert("Email already registered. Please login.");
    showLogin();
    return;
  }

  let userData = {
    name: name,
    email: email,
    password: password
  };

  localStorage.setItem(email, JSON.stringify(userData));

  alert("Signup successful! Please login.");
  showLogin();
});

/* ================= SIGN IN ================= */
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.querySelector("#loginForm input[type='email']").value.trim();
  let password = document.querySelector("#loginForm input[type='password']").value;

  let storedUser = localStorage.getItem(email);

  if (!storedUser) {
    alert("Email not registered. Please sign up first.");
    showSignup();
    return;
  }

  let userData = JSON.parse(storedUser);

  if (userData.password !== password) {
    alert("Incorrect password");
    return;
  }

  // ✅ LOGIN SUCCESS
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("loggedInUser", email);

  alert("Login successful! Welcome " + userData.name);

  let redirect = localStorage.getItem("redirectAfterLogin");
  if (redirect) {
    localStorage.removeItem("redirectAfterLogin");
    window.location.href = redirect;
  } else {
    window.location.href = "home.html";
  }
});
