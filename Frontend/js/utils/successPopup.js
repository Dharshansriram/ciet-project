/*************************************************
 * successPopup.js
 * Reusable popup utilities for the assessment flow.
 *************************************************/

/* ── Success Toast (auto-dismiss) ──────────────
   Used right after assessment submission.
─────────────────────────────────────────────── */
function showSuccessPopup(msg) {
    const old = document.getElementById("successPopup");
    if (old) old.remove();

    const popup = document.createElement("div");
    popup.id = "successPopup";
    popup.innerHTML = `
    <div class="sp-icon">🎉</div>
    <div class="sp-body">
      <p class="sp-title">Assessment Completed!</p>
      <p class="sp-msg">${msg || "You have successfully submitted your assessment."}</p>
    </div>
    <button class="sp-close" onclick="document.getElementById('successPopup').remove()">✕</button>
  `;
    popup.style.cssText = `
    position:fixed; top:24px; right:24px; z-index:99998;
    display:flex; align-items:center; gap:14px;
    background:linear-gradient(135deg,#065f46,#047857);
    color:#fff; padding:18px 22px; border-radius:16px;
    box-shadow:0 12px 40px rgba(5,150,105,.45);
    max-width:380px; animation:spSlideIn .35s cubic-bezier(.175,.885,.32,1.275);
    font-family:inherit;
  `;
    document.body.appendChild(popup);
    _injectSpStyles();

    // Auto-dismiss after 4 s
    setTimeout(() => {
        const el = document.getElementById("successPopup");
        if (el) {
            el.style.animation = "spSlideOut .3s ease forwards";
            setTimeout(() => el.remove(), 300);
        }
    }, 4000);
}

/* ── Certificate Modal (dismissible) ──────────
   Used when a certificate is generated.
─────────────────────────────────────────────── */
function showCertificatePopup(name, assessmentName, grade, score) {
    const old = document.getElementById("certPopupOverlay");
    if (old) old.remove();

    const overlay = document.createElement("div");
    overlay.id = "certPopupOverlay";
    overlay.style.cssText = `
    position:fixed; inset:0; background:rgba(0,0,0,.75);
    display:flex; align-items:center; justify-content:center;
    z-index:99999; animation:fadeInOverlay .25s ease;
  `;

    overlay.innerHTML = `
    <div style="
      background:linear-gradient(135deg,#1e1b4b,#312e81);
      border:1px solid rgba(167,139,250,.4);
      border-radius:24px; padding:48px 40px; max-width:440px;
      text-align:center; box-shadow:0 24px 60px rgba(0,0,0,.6);
      animation:slideUpOverlay .3s ease;
    ">
      <div style="font-size:4rem;margin-bottom:4px;">🏆</div>
      <h2 style="color:#a78bfa;font-size:1.4rem;margin:0 0 8px;">Certificate Earned!</h2>
      <div style="
        background:rgba(255,255,255,.06);border-radius:12px;
        padding:20px;margin:16px 0;text-align:left;
      ">
        <p style="color:#c4b5fd;margin:4px 0;font-size:.9rem;">
          <b>This certificate is awarded to</b>
        </p>
        <p style="color:#fff;font-size:1.2rem;font-weight:700;margin:6px 0;">${name}</p>
        <p style="color:#a5b4fc;font-size:.85rem;margin:4px 0;">
          for successfully completing the <b style="color:#fff;">${assessmentName}</b>
        </p>
        <p style="color:#86efac;font-size:1.1rem;font-weight:700;margin:12px 0 0;">
          Score: ${score} &nbsp;·&nbsp; Grade: ${grade}
        </p>
      </div>
      <button
        onclick="document.getElementById('certPopupOverlay').remove()"
        style="
          background:linear-gradient(135deg,#7c3aed,#6d28d9);
          color:#fff;border:none;padding:12px 32px;
          border-radius:50px;font-size:.95rem;font-weight:700;
          cursor:pointer;margin-top:4px;
        "
      >View Certificate 🎓</button>
    </div>
  `;

    document.body.appendChild(overlay);
    _injectSpStyles();
}

/* ── Style injection ─────────────────────────── */
function _injectSpStyles() {
    if (document.getElementById("spStyles")) return;
    const s = document.createElement("style");
    s.id = "spStyles";
    s.textContent = `
    @keyframes spSlideIn {
      from { opacity:0; transform:translateX(60px); }
      to   { opacity:1; transform:translateX(0); }
    }
    @keyframes spSlideOut {
      from { opacity:1; transform:translateX(0); }
      to   { opacity:0; transform:translateX(60px); }
    }
    @keyframes fadeInOverlay { from{opacity:0} to{opacity:1} }
    @keyframes slideUpOverlay {
      from { transform:translateY(30px);opacity:0 }
      to   { transform:none;opacity:1 }
    }
    .sp-icon { font-size:2rem; flex-shrink:0; }
    .sp-body { flex:1; }
    .sp-title { margin:0 0 4px; font-size:1rem; font-weight:700; }
    .sp-msg   { margin:0; font-size:.85rem; opacity:.85; }
    .sp-close {
      background:rgba(255,255,255,.15); border:none; color:#fff;
      width:28px; height:28px; border-radius:50%; cursor:pointer;
      font-size:.9rem; flex-shrink:0; align-self:flex-start;
    }
  `;
    document.head.appendChild(s);
}
