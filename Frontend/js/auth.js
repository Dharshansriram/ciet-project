/* =====================================================
   AUTHENTICATION LOGIC (BACKEND CONNECTED)
   ===================================================== */

/* ---------- SIGN UP ---------- */
async function signup() {
    const name = document.getElementById("name").value.trim();
    const rollNo = document.getElementById("roll").value.trim();
    const dept = document.getElementById("dept").value;
    const year = document.getElementById("year").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;
    const RollError = document.getElementById("rollError");
    const PasswordError = document.getElementById("passwordError");

    const errorDiv = document.getElementById("signupError");
    const rollRegex = /^(?=.*[A-Z])[A-ZO-9]+$/;

    errorDiv.innerText = "";

    // Validation
    // Empty field check
    if (!name || !rollNo || !dept || !year || !password || !confirm) {
        errorDiv.innerText = "❌ Please fill all fields";
        return;
    }
    if (!rollRegex.test(rollNo)) {
        RollError.innerText = "❌Roll Number must contain only CAPITAL letters and numbers";
        return;
    }
    // Roll number must be caps
    // if (rollNo !== rollNo.toUpperCase()) {
    //   errorDiv.innerText = "❌ Roll Number must be in CAPS";
    //  return;
    //  }

    if (password.length < 8) {
        PasswordError.innerText = "❌ Password must be at least 8 characters";
        return;
    }
    const special = /[!@#$%^&*]/;

    if (!special.test(password)) {
        PasswordError.innerText = "❌ Password must contain special character";
        return;
    }

    // Confirm password
    if (password !== confirm) {
        PasswordError.innerText = "❌ Passwords do not match";
        return;
    }
    try {
        // Backend API call
        const data = await apiRequest("/auth/register", "POST", {
            name,
            rollNo,
            dept,
            year,
            password
        });

        if (!data.success) {
            errorDiv.innerText = "❌ Roll number already registered";
            return;
        }
        switchToLogin();

        alert("✅ Account created successfully");


        // Save auth data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Show welcome animation
        showWelcome(data.user.name);

    } catch (err) {
        alert("Signup failed ❌ " + err.message);
    }
}


/* ---------- LOGIN ---------- */
async function login() {
    const rollNo = document.getElementById("roll").value.trim();
    const password = document.getElementById("password").value;

    if (!rollNo || !password) {
        alert("Enter Roll Number and Password");
        return;
    }

    try {
        // Backend API call
        const data = await apiRequest("/auth/login", "POST", {
            rollNo,
            password
        });

        // Save auth data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Show welcome animation
        showWelcome(data.user.name);

    } catch (err) {
        alert("Login failed ❌ " + err.message);
    }
}

/* =====================================================
   UI SWITCHING (SIGNUP <-> LOGIN)
   ===================================================== */

function switchToLogin() {
    const card = document.querySelector(".auth-card");
    card.classList.add("animate");

    setTimeout(() => {
        document.getElementById("authTitle").innerText = "Sign In";
        document.getElementById("authBtn").innerText = "Sign In";

        document.getElementById("name").style.display = "none";
        document.getElementById("dept").style.display = "none";
        document.getElementById("year").style.display = "none";
        document.getElementById("confirmPassword").style.display = "none";

        document.querySelector(".switch").innerHTML = `
      Don't have an account?
      <span onclick="switchToSignup()">Create Account</span>
    `;

        document.getElementById("authBtn").onclick = login;
    }, 400);

    setTimeout(() => card.classList.remove("animate"), 800);
}

function switchToSignup() {
    const card = document.querySelector(".auth-card");
    card.classList.add("animate");

    setTimeout(() => {
        document.getElementById("authTitle").innerText = "Create Account";
        document.getElementById("authBtn").innerText = "Create Account";

        document.getElementById("name").style.display = "block";
        document.getElementById("dept").style.display = "block";
        document.getElementById("year").style.display = "block";
        document.getElementById("confirmPassword").style.display = "block";

        document.querySelector(".switch").innerHTML = `
      Already have an account?
      <span onclick="switchToLogin()">Sign In</span>
    `;

        document.getElementById("authBtn").onclick = signup;
    }, 400);

    setTimeout(() => card.classList.remove("animate"), 800);
}

/* =====================================================
   WELCOME OVERLAY + REDIRECT
   ===================================================== */

function showWelcome(name) {
    const overlay = document.getElementById("welcomeOverlay");
    const msg = document.getElementById("welcomeMsg");

    msg.innerText = `Welcome, ${name}`;
    overlay.classList.add("show");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
}

/* =====================================================
   CURSOR FOLLOW EFFECT
   ===================================================== */

const cursorDot = document.querySelector(".cursor-dot");

let mouseX = 0;
let mouseY = 0;
let dotX = 0;
let dotY = 0;

const speed = 0.18;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    dotX += (mouseX - dotX) * speed;
    dotY += (mouseY - dotY) * speed;

    cursorDot.style.left = dotX + "px";
    cursorDot.style.top = dotY + "px";

    requestAnimationFrame(animateCursor);
}

animateCursor();

/* Cursor grow on hover */
document.querySelectorAll("input, select, button, span").forEach(el => {
    el.addEventListener("mouseenter", () => cursorDot.classList.add("active"));
    el.addEventListener("mouseleave", () => cursorDot.classList.remove("active"));
});