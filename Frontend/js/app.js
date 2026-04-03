if (!AppState.user) {
    window.location.href = "auth.html";
}

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
    // Block sidebar nav only during an ACTIVE (not submitted) workout assessment
    const sessionActive = AppState.session &&
        AppState.session.questions.length > 0 &&
        !AppState.isSubmitting &&
        AppState.mode === "workout" &&
        AppState.timerStarted === true;
    if (sessionActive && page !== "assessment" && page !== "results") {
        return; // ignore mid-assessment navigation
    }
    closeSidebar();
    history.pushState({ page }, "", "#" + page);
    if (typeof window._sidebarNavigate === "function") window._sidebarNavigate(page);
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
    if (event.state && event.state.page) {
        if (typeof window._sidebarNavigate === "function") window._sidebarNavigate(event.state.page);
        loadPage(event.state.page);
    }
};




const pageFromURL = location.hash.replace("#", "") || "dashboard";
loadPage(pageFromURL);

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