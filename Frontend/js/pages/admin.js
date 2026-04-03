// js/pages/admin.js

let socket;

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Tabs
    switchTab('monitoring');

    // 2. Initialize Socket.io Connection
    initSocket();

    // 3. Load initial Analytics data
    loadAnalytics();
});

function switchTab(tabId) {
    document.querySelectorAll('.admin-view').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.admin-tab').forEach(el => el.classList.remove('active'));

    document.getElementById(`view-${tabId}`).classList.add('active');
    document.getElementById(`tab-${tabId}`).classList.add('active');
}

function initSocket() {
    // Connecting to backend exactly like normal API
    socket = io("https://backendciet.onrender.com");

    socket.on("connect", () => {
        console.log("🟢 Admin Connected to Real-time Monitoring Server");
    });

    socket.on("active_students", (students) => {
        updateLiveTable(students);
    });

    socket.on("disconnect", () => {
        console.log("🔴 Disconnected from Real-time Server");
    });
}

function updateLiveTable(students) {
    document.getElementById("live-count").innerText = students.length;

    const tbody = document.getElementById("live-table-body");

    if (students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #666;">No students currently active.</td></tr>`;
        return;
    }

    tbody.innerHTML = students.map(s => {
        const elapsedMinutes = Math.floor((Date.now() - s.startTime) / 60000);
        return `
            <tr>
                <td><strong>${s.name}</strong></td>
                <td>${s.rollNo} / ${s.dept ? s.dept.toUpperCase() : "N/A"}</td>
                <td><span style="text-transform: capitalize;">${s.assessmentType || "Aptitude"}</span></td>
                <td>${elapsedMinutes} mins</td>
                <td><span class="status-badge active-exam">Testing</span></td>
            </tr>
        `;
    }).join("");
}

async function loadAnalytics() {
    try {
        const res = await apiRequest("/admin/analytics");
        if (res.success) {
            const data = res.data;

            document.getElementById("total-attempts").innerText = data.totalAttempts;
            document.getElementById("avg-score").innerText = data.avgScore + "%";
            document.getElementById("total-certs").innerText = data.totalCertificates;

            // Render Dept Stats
            const deptTbody = document.getElementById("dept-stats-body");
            if (data.deptStats.length === 0) {
                deptTbody.innerHTML = `<tr><td colspan="3">No data available yet.</td></tr>`;
            } else {
                deptTbody.innerHTML = data.deptStats.map(d => `
                    <tr>
                        <td style="text-transform: uppercase;"><strong>${d.dept}</strong></td>
                        <td>${d.avgScore}%</td>
                        <td>${d.attempts}</td>
                    </tr>
                `).join("");
            }

            // Render Top Students
            const topList = document.getElementById("top-students-list");
            if (data.topStudents.length === 0) {
                topList.innerHTML = `<li>No top students yet.</li>`;
            } else {
                topList.innerHTML = data.topStudents.map((s, idx) => `
                    <li>
                        <span>
                            <strong style="color: #eab308; margin-right: 10px;">#${idx + 1}</strong>
                            ${s.name} (${s.dept ? s.dept.toUpperCase() : ""})
                        </span>
                        <strong>${s.score}%</strong>
                    </li>
                `).join("");
            }
        }
    } catch (err) {
        console.error("Failed to load analytics:", err);
    }
}

function logoutAdmin() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "auth.html";
}
