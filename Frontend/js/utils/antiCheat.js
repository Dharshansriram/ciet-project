/*************************************************
 * UNIFIED WARNING SYSTEM v4
 * All violations (tab-switch, phone, gaze, side-glance)
 * share ONE counter. 3 strikes = auto-submit.
 *************************************************/

window._unifiedViolations = 0;
const _MAX_VIOLATIONS = 3;
let _acActive = false;

/* ── Public ─────────────────────────────────── */
function startAntiCheat() {
    window._unifiedViolations = 0;
    _acActive = true;
    document.addEventListener("visibilitychange", _onVisChange);
    window.addEventListener("blur", _onBlur);
<<<<<<< HEAD
    window.addEventListener("popstate", _onBackAttempt);
    document.addEventListener("copy",  _blockCopy);
    document.addEventListener("paste", _blockCopy);
    document.addEventListener("contextmenu", e => _acActive && e.preventDefault());
    history.pushState(null, null, location.href);
}
    console.log("🛡️ Unified anti-cheat active");

=======
    document.addEventListener("copy",  _blockCopy);
    document.addEventListener("paste", _blockCopy);
    document.addEventListener("contextmenu", e => _acActive && e.preventDefault());
    console.log("🛡️ Unified anti-cheat active");
}
>>>>>>> cb6076f5ad69890d2218cf73b9a03da30f7ee954

function stopAntiCheat() {
    _acActive = false;
    document.removeEventListener("visibilitychange", _onVisChange);
    window.removeEventListener("blur", _onBlur);
<<<<<<< HEAD
    window.removeEventListener("popstate", _onBackAttempt);

=======
>>>>>>> cb6076f5ad69890d2218cf73b9a03da30f7ee954
    document.removeEventListener("copy",  _blockCopy);
    document.removeEventListener("paste", _blockCopy);
}

/* ── Handlers ───────────────────────────────── */
function _onVisChange() {
    if (!_acActive || document.visibilityState !== "hidden") return;
    recordUnifiedViolation("tab", "Switching tabs won't help — answers aren't out there.");
}
function _onBlur() {
    if (!_acActive) return;
    recordUnifiedViolation("tab", "Leaving the window? The clock is still ticking.");
}
<<<<<<< HEAD
function _onBackAttempt() {
    if (!_acActive) return;

    recordUnifiedViolation(
        "tab",
        "You cannot go back during the test!"
    );
    history.pushState(null, null, location.href);
    }

=======
>>>>>>> cb6076f5ad69890d2218cf73b9a03da30f7ee954
function _blockCopy(e) {
    if (!_acActive) return;
    e.preventDefault();
    recordUnifiedViolation("copy", "Copy/paste is disabled during the assessment.");
}

/* ── Core unified violation (called by webcamEngine too) ── */
window.recordUnifiedViolation = function(type, msg) {
    if (!_acActive && !window._webcamActive) return;
    window._unifiedViolations++;
    const n = window._unifiedViolations;
    const isLast = n >= _MAX_VIOLATIONS;

    showUnifiedWarning(type, msg, n, isLast);

    if (isLast) {
        stopAntiCheat();
        if (typeof stopWebcam === "function") stopWebcam();
        setTimeout(() => {
            if (typeof finishAssessment === "function") finishAssessment();
            else navigate("dashboard");
        }, 2500);
    }
};

/* ── Warning UI ─────────────────────────────── */
window.showUnifiedWarning = function(type, msg, count, isLast) {
    const old = document.getElementById("uniWarningToast");
    if (old) old.remove();

    const user = (typeof AppState !== "undefined" && AppState.user?.name)
        ? AppState.user.name.split(" ")[0] : "there";

    const configs = {
        tab:   { icon:"🚫", title:"TAB SWITCH",    c1:"#dc2626", c2:"#991b1b", glow:"rgba(220,38,38,.45)"  },
        copy:  { icon:"🚫", title:"COPY BLOCKED",  c1:"#dc2626", c2:"#991b1b", glow:"rgba(220,38,38,.45)"  },
        phone: { icon:"📱", title:"PHONE DETECTED",c1:"#b45309", c2:"#78350f", glow:"rgba(180,83,9,.45)"   },
        gaze:  { icon:"👁️", title:"FOCUS WARNING", c1:"#5b21b6", c2:"#3b0764", glow:"rgba(124,58,237,.45)"},
        side:  { icon:"🔍", title:"LOOKING AWAY",  c1:"#0e7490", c2:"#164e63", glow:"rgba(6,182,212,.45)"  },
    };
    const cfg = configs[type] || configs.tab;
    const remaining = _MAX_VIOLATIONS - count;

    const openers = {
        tab:   `Hey ${user}, I know you're smart — but stay on this tab!`,
        copy:  `Hey ${user}, no shortcuts allowed here!`,
        phone: `Hey ${user}, nice try — but put the phone down!`,
        gaze:  `Hey ${user}, eyes on the screen please!`,
        side:  `Hey ${user}, looking for answers nearby? Stay focused!`,
    };

    const toast = document.createElement("div");
    toast.id = "uniWarningToast";
    toast.innerHTML = `
      <div style="display:flex;align-items:flex-start;gap:10px;">
        <span style="font-size:24px;flex-shrink:0;margin-top:1px;">${cfg.icon}</span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:12px;font-weight:700;letter-spacing:.5px;opacity:.8;margin-bottom:3px;">${cfg.title}</div>
          <div style="font-size:13px;font-weight:600;margin-bottom:3px;">${openers[type]||openers.tab}</div>
          <div style="font-size:12px;opacity:.88;line-height:1.45;">${msg}${
            isLast ? " <b>Assessment is being submitted now.</b>"
            : remaining===1 ? " ⚠️ <b>Final warning</b> before auto-submit."
            : ""}</div>
        </div>
        <div style="flex-shrink:0;text-align:center;">
          <div style="background:rgba(255,255,255,${isLast?'.25':'.15'});
            padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;">
            ${isLast?"AUTO-SUBMIT":`${count}/${_MAX_VIOLATIONS}`}
          </div>
          ${!isLast?`<div style="font-size:10px;opacity:.7;margin-top:3px;">${remaining} left</div>`:""}
        </div>
      </div>`;
    toast.style.cssText = `
      position:fixed;top:20px;left:50%;transform:translateX(-50%);
      background:linear-gradient(135deg,${cfg.c1},${cfg.c2});
      color:#fff;padding:14px 18px;border-radius:14px;z-index:99999;
      box-shadow:0 8px 32px ${cfg.glow};
      animation:uniSlide .25s ease;max-width:480px;width:92vw;
      border:1px solid rgba(255,255,255,.18);`;
    document.body.appendChild(toast);

    if (!document.getElementById("uniStyles")) {
        const s = document.createElement("style");
        s.id = "uniStyles";
        s.textContent = `@keyframes uniSlide{from{opacity:0;transform:translateX(-50%) translateY(-16px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`;
        document.head.appendChild(s);
    }
    setTimeout(() => toast.remove && toast.remove(), 5500);
};
