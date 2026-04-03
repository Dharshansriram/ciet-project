function Sidebar() {
  const pages = [
    { id:"dashboard",    label:"Dashboard"    },
    { id:"training",     label:"Training"     },
    { id:"certificates", label:"Certification"},
    { id:"leaderboard",  label:"Leaderboard"  },
    { id:"profile",      label:"Profile"      },
  ];

  const currentPage = location.hash.replace("#","") || "dashboard";

  const navButtons = pages.map(p => `
    <button onclick="navigate('${p.id}')"
      class="sidebar-nav-btn ${currentPage===p.id?'active':''}"
      id="nav-${p.id}">${p.label}</button>`).join("");

  return `
    <aside class="sidebar">
      <div class="sidebar-brand">
      <img src="assets/new_logo.png" 
style="
  width:100px;
  height:100px;
  border-radius:50%;
  background:#fff;
  padding:0px;
  
">
        <span>CIET Learning</span>
      </div>
      <nav class="sidebar-nav">${navButtons}</nav>
      <div style="flex:1;"></div>
      <div class="sidebar-footer">
        <div class="sidebar-user-chip">
          <span class="user-avatar">${(AppState.user?.name||'U')[0].toUpperCase()}</span>
          <span class="user-name">${AppState.user?.name||'Student'}</span>
        </div>
        <button onclick="showLogoutDialog()" class="sidebar-logout-btn">Logout</button>
      </div>
    </aside>`;
}

window._sidebarNavigate = function(page) {
  document.querySelectorAll(".sidebar-nav-btn").forEach(b => {
    b.classList.toggle("active", b.id === `nav-${page}`);
  });
};

window.showLogoutDialog = function() {
  const ex = document.getElementById("logoutModal");
  if (ex) ex.remove();
  const user = AppState.user?.name?.split(" ")[0] || "there";
  const modal = document.createElement("div");
  history.pushState(null,null, location.href);
  modal.id = "logoutModal";
  modal.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.75);
    backdrop-filter:blur(8px);display:flex;align-items:center;
    justify-content:center;z-index:99999;animation:modalFadeIn .25s ease;`;
  modal.innerHTML = `
    <div style="background:linear-gradient(135deg,#1e2d5a,#243461);
      border:1px solid rgba(201,162,39,0.3);border-radius:24px;
      padding:40px 36px;max-width:400px;width:90%;text-align:center;
      box-shadow:0 24px 64px rgba(0,0,0,0.5),0 0 0 1px rgba(201,162,39,0.1);">
      <h3 style="color:#f0d060;font-size:1.2rem;margin:0 0 10px;font-weight:700;">
        Confirm Logout
      </h3>
      <p style="color:#94a3b8;font-size:0.88rem;line-height:1.7;margin:0 0 18px;">
        Your progress and certificates are saved.<br>
        Come back anytime to continue learning.
      </p>
      <div style="background:rgba(201,162,39,0.08);border:1px solid rgba(201,162,39,0.18);
        border-radius:10px;padding:12px 14px;margin-bottom:20px;text-align:left;">
        <div style="font-size:11px;color:#c9a227;font-weight:600;letter-spacing:.4px;margin-bottom:6px;">SESSION</div>
        <div style="font-size:13px;color:#e2e8f0;line-height:1.7;">
          ${AppState.user?.name||"Student"} &nbsp;·&nbsp;
          ${(AppState.user?.dept||"").toUpperCase()} Year ${AppState.user?.year||""}<br>
          Roll No: ${AppState.user?.rollNo||"—"}
        </div>
      </div>
      <div style="display:flex;gap:10px;">
        <button onclick="document.getElementById('logoutModal').remove()"
          style="flex:1;background:linear-gradient(135deg,#c9a227,#b8860b);
          color:#0c1429;border:none;padding:12px;border-radius:10px;
          font-size:0.9rem;font-weight:700;cursor:pointer;">
          Stay
        </button>
        <button onclick="confirmLogout()"
          style="flex:1;background:rgba(255,255,255,0.06);color:#94a3b8;
          border:1px solid rgba(255,255,255,0.14);padding:12px;border-radius:10px;
          font-size:0.9rem;font-weight:600;cursor:pointer;">
          Logout
        </button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener("click", e => { if(e.target===modal) modal.remove(); });
};

window.confirmLogout = function() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.clear();
  history.pushState(null,null, location.href);
  window.location.href = "auth.html";
};
window.logoutUser = window.showLogoutDialog;

(function () {
  let _dashboardGuardActive = false;

  function isDashboard() {
    return (location.hash.replace("#", "") || "dashboard") === "dashboard";
  }

  // 🔥 Activate guard when reaching dashboard
  function handlePageChange() {
    if (isDashboard()) {
      _dashboardGuardActive = true;

      // Push initial state (VERY IMPORTANT)
      history.pushState({ guard: true }, "", location.href);
    } else {
      _dashboardGuardActive = false;
    }
  }

  window.addEventListener("load", handlePageChange);
  window.addEventListener("hashchange", handlePageChange);

  // 🚀 MAIN FIX — always trigger
  window.addEventListener("popstate", function () {
    if (isDashboard() && _dashboardGuardActive) {
      
      // 🔥 Push again so next back ALSO triggers
      history.pushState({ guard: true }, "", location.href);

      // ✅ Show modal EVERY TIME
      showLogoutDialog();
    }
  });
})();

