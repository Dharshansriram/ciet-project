/*************************************************
 * dsaGuard.js
 * Shows an "under construction" overlay when a
 * user tries to access any DSA feature.
 * NO existing code is modified here.
 *************************************************/
<<<<<<< HEAD
console.log("dsaGuard loaded");
=======

>>>>>>> cb6076f5ad69890d2218cf73b9a03da30f7ee954
function showDsaUnderConstruction() {
    // Remove any existing overlay
    const existing = document.getElementById("dsaOverlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "dsaOverlay";
    overlay.style.cssText = `
    position:fixed; inset:0; background:rgba(10,10,20,0.88);
    display:flex; align-items:center; justify-content:center;
    z-index:9999; animation:fadeInOverlay .25s ease;
  `;

    overlay.innerHTML = `
    <div style="
      background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);
      border:1px solid rgba(255,165,0,0.35);
      border-radius:20px; padding:48px 40px; max-width:480px;
      text-align:center; box-shadow:0 24px 60px rgba(0,0,0,.6);
      animation:slideUpOverlay .3s ease;
    ">
      <div style="font-size:3.5rem;margin-bottom:12px;">🚧</div>
      <h2 style="color:#f59e0b;font-size:1.5rem;margin:0 0 12px;">
        Coding Assessment Module
      </h2>
      <p style="color:#fbbf24;font-size:1rem;font-weight:600;margin:0 0 8px;">
        Work Under Construction
      </p>
      <p style="color:#94a3b8;font-size:0.9rem;margin:0 0 28px;line-height:1.6;">
        This feature will be available after <strong style="color:#f59e0b;">2 days</strong>.<br>
        Meanwhile, you can access the <strong style="color:#60a5fa;">Aptitude Assessment</strong>.
      </p>
      <button
        onclick="document.getElementById('dsaOverlay').remove()"
        style="
          background:linear-gradient(135deg,#f59e0b,#d97706);
          color:#000; border:none; padding:12px 32px;
          border-radius:50px; font-size:0.95rem; font-weight:700;
          cursor:pointer; transition:opacity .2s;
        "
        onmouseover="this.style.opacity='.85'"
        onmouseout="this.style.opacity='1'"
      >
        Got it ✓
      </button>
    </div>
  `;

    document.body.appendChild(overlay);
}

/* Inject keyframes once */
(function injectDsaStyles() {
    if (document.getElementById("dsaGuardStyles")) return;
    const s = document.createElement("style");
    s.id = "dsaGuardStyles";
    s.textContent = `
    @keyframes fadeInOverlay { from{opacity:0} to{opacity:1} }
    @keyframes slideUpOverlay { from{transform:translateY(30px);opacity:0} to{transform:none;opacity:1} }
  `;
    document.head.appendChild(s);
})();
<<<<<<< HEAD

=======
>>>>>>> cb6076f5ad69890d2218cf73b9a03da30f7ee954
