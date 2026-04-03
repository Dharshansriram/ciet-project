/*************************************************
 * WEBCAM ENGINE v4
 * Fast init, unified violation counter,
 * instant phone detection, side-glance detection.
 *************************************************/

let webcamStream    = null;
let isWebcamActive  = false;
window._webcamActive = false;

// Gaze timer
let _gazeTimer      = null;
const _GAZE_MS      = 12000;

// Side-glance
let _sideTimer      = null;
const _SIDE_MS      = 9000;

// Phone: INSTANT on first hit ≥ threshold magnitude
const _MOTION_MAG   = 3.0;
let _lastPhoneWarn  = 0;
const _PHONE_COOLDOWN = 8000; // don't spam same warning

async function startWebcam() {
    try {
        // Request with low constraints for faster init
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width:160, height:120, facingMode:"user" }
        });
        webcamStream = stream;
        isWebcamActive = true;
        window._webcamActive = true;

        const vid = document.getElementById("proctorWebcam");
        if (vid) { vid.srcObject = stream; vid.play().catch(()=>{}); }

        _startMonitoring();
        _requestMotionPermission();
        console.log("📷 Webcam active");
    } catch(err) {
        console.error("Webcam denied:", err);
        isWebcamActive = false;
        window._webcamActive = false;
    }
}

function attachWebcam() {
    if (!webcamStream || !isWebcamActive) return;
    const vid = document.getElementById("proctorWebcam");
    if (!vid) return;
    if (vid.srcObject !== webcamStream) {
        vid.srcObject = webcamStream;
        vid.play().catch(()=>{});
    }
    _resetGaze();
}

function stopWebcam() {
    isWebcamActive = false;
    window._webcamActive = false;
    _stopMonitoring();
    if (webcamStream) {
        webcamStream.getTracks().forEach(t => t.stop());
        webcamStream = null;
    }
    // Clear all video elements
    document.querySelectorAll("video").forEach(v => {
        if (v.srcObject) { v.srcObject = null; }
    });
    console.log("📷 Webcam stopped");
}

/* ── Monitoring ─────────────────────────────── */
function _startMonitoring() {
    document.addEventListener("mousemove", _onMouse);
    document.addEventListener("keydown",   _onActivity);
    document.addEventListener("click",     _onActivity);
    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", _onMotion, { passive:true });
    }
    _resetGaze();
}

function _stopMonitoring() {
    document.removeEventListener("mousemove", _onMouse);
    document.removeEventListener("keydown",   _onActivity);
    document.removeEventListener("click",     _onActivity);
    window.removeEventListener("devicemotion", _onMotion);
    if (_gazeTimer)  clearTimeout(_gazeTimer);
    if (_sideTimer)  clearTimeout(_sideTimer);
}

function _onActivity() {
    if (!isWebcamActive) return;
    _resetGaze();
}

function _onMouse(e) {
    if (!isWebcamActive) return;
    _resetGaze();
    // Side-glance: cursor at left or right 10% of viewport
    const vw = window.innerWidth;
    const edge = vw * 0.10;
    if (e.clientX < edge || e.clientX > vw - edge) {
        if (!_sideTimer) {
            _sideTimer = setTimeout(() => {
                if (typeof window.recordUnifiedViolation === "function") {
                    window.recordUnifiedViolation("side",
                        "Looking at another screen for answers? Keep your attention here.");
                }
                _sideTimer = null;
            }, _SIDE_MS);
        }
    } else {
        if (_sideTimer) { clearTimeout(_sideTimer); _sideTimer = null; }
    }
}

function _resetGaze() {
    if (_gazeTimer) clearTimeout(_gazeTimer);
    _gazeTimer = setTimeout(() => {
        if (!isWebcamActive) return;
        if (typeof window.recordUnifiedViolation === "function") {
            window.recordUnifiedViolation("gaze",
                "You appear to have looked away. Please focus on the screen.");
        }
    }, _GAZE_MS);
}

// INSTANT phone detection — fires immediately on first significant motion
function _onMotion(e) {
    if (!isWebcamActive) return;
    const acc = e.acceleration || e.accelerationIncludingGravity;
    if (!acc) return;
    const mag = Math.sqrt((acc.x||0)**2 + (acc.y||0)**2 + (acc.z||0)**2);
    // Two thresholds: immediate high-magnitude OR sustained low-magnitude
    if (mag > _MOTION_MAG) {
        const now = Date.now();
        if (now - _lastPhoneWarn > _PHONE_COOLDOWN) {
            _lastPhoneWarn = now;
            if (typeof window.recordUnifiedViolation === "function") {
                window.recordUnifiedViolation("phone",
                    "Mobile device motion detected. No phones during the assessment.");
            }
        }
    }
}

// Also request DeviceMotion permission on iOS 13+
async function _requestMotionPermission() {
    if (typeof DeviceMotionEvent !== "undefined" &&
        typeof DeviceMotionEvent.requestPermission === "function") {
        try {
            const result = await DeviceMotionEvent.requestPermission();
            if (result === "granted") {
                window.addEventListener("devicemotion", _onMotion, { passive:true });
            }
        } catch(e) { /* iOS permission denied or non-iOS */ }
    }
}
