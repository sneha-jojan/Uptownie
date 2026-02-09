document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  let isValid = true;

  document.querySelectorAll(".error").forEach(el => el.innerText = "");
  document.getElementById("successMsg").innerText = "";

  // Name validation
  if (name.length < 3) {
    document.getElementById("nameError").innerText = "Name must be at least 3 characters";
    isValid = false;
  }

  // Email validation
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
  if (!email.match(emailPattern)) {
    document.getElementById("emailError").innerText = "Enter a valid email address";
    isValid = false;
  }

  // Password validation
  if (password.length < 6) {
    document.getElementById("passwordError").innerText = "Password must be at least 6 characters";
    isValid = false;
  }

  // Confirm password
  if (password !== confirmPassword) {
    document.getElementById("confirmError").innerText = "Passwords do not match";
    isValid = false;
  }

  // Check if email already exists
  if (localStorage.getItem(email)) {
    document.getElementById("emailError").innerText = "Email already registered";
    isValid = false;
  }

  // Save data
  if (isValid) {
    let userData = {
      name: name,
      email: email,
      password: password
    };

    localStorage.setItem(email, JSON.stringify(userData));

    document.getElementById("successMsg").innerText =
      "Account created successfully! Redirecting to Sign In...";

    setTimeout(() => {
      window.location.href = "sign.html";
    }, 2000);
  }
});
localStorage.setItem("isLoggedIn", "true");

