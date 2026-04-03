const isDashboard = (location.hash.replace("#", "") || "dashboard") === "dashboard";


// ── Initialize Socket.IO — live backend ──
window.socket = io("https://backendciet.onrender.com");

socket.on("connect", () => {
    console.log("Connected to Real-time Backend");
});

document.getElementById("app").innerHTML = `
  ${Sidebar()}
  <main class="main" id="mainContent"></main>
`;

// Mobile sidebar helpers
window.toggleSidebar = function() {
    document.querySelector(".sidebar").classList.toggle("open");
    document.getElementById("sidebarOverlay").classList.toggle("open");
};
window.closeSidebar = function() {
    document.querySelector(".sidebar").classList.remove("open");
    document.getElementById("sidebarOverlay").classList.remove("open");
};

function navigate(page) {
    if (!AppState.user && page !== "dashboard") {
        window.location.href = "auth.html";
        return;
    }

    const sessionActive = AppState.session &&
        AppState.session.questions.length > 0 &&
        !AppState.isSubmitting &&
        AppState.mode === "workout" &&
        AppState.timerStarted === true;

    if (sessionActive && page !== "assessment" && page !== "results") {
        return;
    }

    closeSidebar();
    history.pushState({ page }, "", "#" + page);

    if (typeof window._sidebarNavigate === "function") {
        window._sidebarNavigate(page);
    }

    loadPage(page);
}
/* =====================================================
   PAGE LOADER – decides which page to render
   ===================================================== */
function loadPage(page) {
    const main = document.getElementById("mainContent");

    if (page === "dashboard") {
        main.innerHTML = DashboardPage();
    } else if (page === "training") {
        main.innerHTML = TrainingPage();
    } else if (page === "assessment") {
        main.innerHTML = AssessmentPage();
    } else if (page === "certificates") {
        main.innerHTML = CertificatesPage();
    } else if (page === "leaderboard") {
        main.innerHTML = LeaderboardPage();
    } else if (page === "profile") {
        main.innerHTML = ProfilePage();
    }  else if (page === "about") {
  main.innerHTML = AboutPage();
  }
    else if (page === "results") {
        // Clear session so post-result navigation isn't blocked
        if (AppState.session) {
            AppState.session.questions = [];
            AppState.timerStarted = false;
        }
        main.innerHTML = ResultsPage();
    } else {
        main.innerHTML = `
      <h2>Page Not Found</h2>
      <p>The requested page does not exist.</p>
    `;
    }
}


window.onpopstate = function(event) {
    const page = event.state?.page || "dashboard";

    // 🔥 DASHBOARD GUARD LOGIC
    if (page === "dashboard") {
        // push again so back keeps triggering
        history.pushState({ page: "dashboard" }, "", "#dashboard");

        // prevent duplicate modal
        if (!document.getElementById("logoutModal")) {
            showLogoutDialog();
        }

        return; // ❌ stop further navigation
    }

    // ✅ normal navigation
    if (typeof window._sidebarNavigate === "function") {
        window._sidebarNavigate(page);
    }

    loadPage(page);
};


const pageFromURL = location.hash.replace("#", "") || "dashboard";
loadPage(pageFromURL);

if (pageFromURL === "dashboard") {
    history.replaceState({ page: "dashboard" }, "", "#dashboard");
}
history.replaceState({ page: pageFromURL }, "", "#" + pageFromURL);


function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
  }
}

function setupThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  toggle.checked = document.body.classList.contains("dark");

  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}