let userCertificates = [];
let _currentCertIndex = 0;

async function loadUserCertificates() {
  const user = AppState.user;
  if (!user || !user.id) return [];
  try {
    const res = await apiRequest(`/certificate/${user.id}`);
    return res.certificates || [];
  } catch (err) {
    console.error("Cert load error:", err.message);
    return [];
  }
}

function CertificatesPage() {
  setTimeout(async () => {
    userCertificates = await loadUserCertificates();
    renderCertificatesGrid();
    if (AppState.lastResult?.certificate && userCertificates.length > 0) {
      setTimeout(() => openCertModal(0), 400);
    }
  }, 80);

  return `
    <div class="certificates-page">
      <div class="cert-top">
        <div class="cert-hero">
          <h2>🎓 Your Certificates</h2>
          <p>Earn certificates by completing <strong>Workout</strong> assessments with <strong>60%+</strong> to unlock your achievement certificate.</p>
        </div>
      </div>
      <div class="cert-tracks-grid" id="certContainer">
        <p style="padding:24px;color:#6b7280;grid-column:1/-1">Loading certificates…</p>
      </div>

      <div id="certModal" style="
        display:none;position:fixed;inset:0;z-index:9999;
        background:rgba(0,0,0,0.85);backdrop-filter:blur(6px);
        align-items:center;justify-content:center;" onclick="if(event.target===this)closeCertModal()">
        <div style="max-width:880px;width:95%;padding:20px;background:#111827;
          border-radius:16px;position:relative;border:1px solid rgba(201,162,39,0.25);
          box-shadow:0 0 60px rgba(201,162,39,0.12);">
          <button onclick="closeCertModal()" style="
            position:absolute;top:14px;right:16px;z-index:10;
            background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);
            color:#94a3b8;width:34px;height:34px;border-radius:50%;
            font-size:17px;cursor:pointer;line-height:1;">✕</button>
          <canvas id="certCanvas" style="width:100%;border-radius:10px;display:block;
            box-shadow:0 0 40px rgba(201,162,39,0.15);"></canvas>
          <div style="display:flex;gap:12px;margin-top:16px;">
            <button onclick="downloadCertPDF()" style="flex:1;padding:14px;border:none;
              border-radius:10px;cursor:pointer;font-size:15px;font-weight:700;
              background:linear-gradient(135deg,#b8860b,#c9a227,#b8860b);color:#0c1429;
              letter-spacing:0.3px;transition:opacity .2s;" onmouseover="this.style.opacity='.85'"
              onmouseout="this.style.opacity='1'">⬇ Download PDF</button>
            <button onclick="downloadCertPNG()" style="flex:1;padding:14px;border:none;
              border-radius:10px;cursor:pointer;font-size:15px;font-weight:600;
              background:rgba(255,255,255,0.06);color:#e2e8f0;
              border:1px solid rgba(255,255,255,0.12);transition:opacity .2s;"
              onmouseover="this.style.opacity='.7'" onmouseout="this.style.opacity='1'">🖼 Save PNG</button>
          </div>
        </div>
      </div>
    </div>`;
}

function renderCertificatesGrid() {
  const container = document.getElementById("certContainer");
  if (!container) return;
  if (!userCertificates || userCertificates.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:56px 20px;">
        <div style="font-size:4rem;margin-bottom:16px;">🎓</div>
        <h3 style="color:#1f2937;margin-bottom:8px;">No Certificates Yet</h3>
        <p style="color:#6b7280;font-size:14px;margin-bottom:28px;">
          Complete a <strong>Workout</strong> assessment with a score of <strong>60%+</strong> to earn one.
        </p>
        <button onclick="navigate('training')" style="
          background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;
          border:none;padding:13px 36px;border-radius:50px;font-size:14px;
          font-weight:700;cursor:pointer;">🚀 Start Workout</button>
      </div>`;
    return;
  }
  container.innerHTML = userCertificates.map((cert, i) => `
    <div class="cert-track-card">
      <div class="track-header">
        <div class="track-title">
          <span class="track-icon">📜</span>
          <h3 style="color:#1f2937;">${cert.assessmentName || "Assessment Certificate"}</h3>
        </div>
        <span class="track-chip">${cert.grade || "A"}</span>
      </div>
      <div class="tier-body" style="padding:10px 0;">
        <p style="font-size:13px;color:#555;margin:3px 0;">👤 ${cert.userName || AppState.user?.name || ""}</p>
        <p style="font-size:13px;color:#555;margin:3px 0;">🏛 ${(cert.dept||"").toUpperCase()} · Year ${cert.year||"—"}</p>
        <p style="font-size:13px;color:#666;margin:3px 0 14px;">
          Score: <b style="color:#4f46e5">${cert.score}%</b> &nbsp;·&nbsp;
          ${new Date(cert.issueDate).toLocaleDateString("en-IN")}</p>
        <div style="display:flex;gap:8px;">
          <button class="cert-primary-btn" style="flex:1;" onclick="openCertModal(${i})">View</button>
          <button class="cert-primary-btn" style="flex:1;" onclick="openCertModal(${i},true)">⬇ Download</button>
        </div>
      </div>
    </div>`).join("");
}

/* ═══════════════════════════════════════
   CANVAS CERTIFICATE RENDERER
   Pure canvas — no image, no overlap.
═══════════════════════════════════════ */
function openCertModal(index, autoDownload = false) {
  _currentCertIndex = index;
  const cert = userCertificates[index];
  const user = AppState.user;
  if (!cert || !user) return;
  document.getElementById("certModal").style.display = "flex";
  drawCertificate(document.getElementById("certCanvas"), {
    name:       cert.userName  || user.name  || "Student",
    dept:       (cert.dept     || user.dept  || "").toUpperCase(),
    year:       String(cert.year || user.year || ""),
    rollNo:     cert.rollNo    || user.rollNo || "",
    assessment: cert.assessmentName || "Aptitude Assessment",
    score:      cert.score,
    grade:      cert.grade || "A",
    date:       new Date(cert.issueDate).toLocaleDateString("en-IN",
                  { day:"2-digit", month:"long", year:"numeric" }),
  });
  if (autoDownload) setTimeout(downloadCertPDF, 1200);
}

function drawCertificate(canvas, d) {
  const W = 1100, H = 780;
  canvas.width = W; canvas.height = H;
  const c = canvas.getContext("2d");

  // ── Helpers ──
  function rr(x,y,w,h,r,fill,stroke,sw){
    c.beginPath();
    c.moveTo(x+r,y);c.lineTo(x+w-r,y);c.quadraticCurveTo(x+w,y,x+w,y+r);
    c.lineTo(x+w,y+h-r);c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    c.lineTo(x+r,y+h);c.quadraticCurveTo(x,y+h,x,y+h-r);
    c.lineTo(x,y+r);c.quadraticCurveTo(x,y,x+r,y);c.closePath();
    if(fill){c.fillStyle=fill;c.fill();}
    if(stroke){c.strokeStyle=stroke;c.lineWidth=sw;c.stroke();}
  }

  function divider(cx,y,len){
    const g=c.createLinearGradient(cx-len/2,0,cx+len/2,0);
    g.addColorStop(0,"transparent");g.addColorStop(0.2,"#c9a227");
    g.addColorStop(0.8,"#c9a227");g.addColorStop(1,"transparent");
    c.strokeStyle=g;c.lineWidth=1.5;
    c.beginPath();c.moveTo(cx-len/2,y);c.lineTo(cx-16,y);c.stroke();
    c.beginPath();c.moveTo(cx+16,y);c.lineTo(cx+len/2,y);c.stroke();
    c.fillStyle="#c9a227";
    c.beginPath();c.moveTo(cx,y-7);c.lineTo(cx+10,y);c.lineTo(cx,y+7);c.lineTo(cx-10,y);c.closePath();c.fill();
  }

  function corners(){
    [[40,40,0],[W-40,40,Math.PI/2],[W-40,H-40,Math.PI],[40,H-40,Math.PI*1.5]].forEach(([x,y,rot])=>{
      c.save();c.translate(x,y);c.rotate(rot);
      c.strokeStyle="#c9a227";c.lineWidth=2;
      c.beginPath();c.moveTo(0,40);c.lineTo(0,0);c.lineTo(40,0);c.stroke();
      c.beginPath();c.arc(8,8,3,0,Math.PI*2);c.fillStyle="rgba(201,162,39,0.6)";c.fill();
      c.restore();
    });
  }

  function sigBlock(cx,y,role,sub){
    c.strokeStyle="rgba(201,162,39,0.5)";c.lineWidth=1;
    c.beginPath();c.moveTo(cx-85,y-26);c.lineTo(cx+85,y-26);c.stroke();
    c.strokeStyle="#c9a227";c.lineWidth=1.5;
    c.beginPath();c.moveTo(cx-42,y-28);c.bezierCurveTo(cx-18,y-52,cx+16,y-48,cx+40,y-28);c.stroke();
    c.font="bold 17px Georgia,serif";c.fillStyle="#c9a227";c.textAlign="center";c.fillText(role,cx,y-4);
    c.font="13px Arial,sans-serif";c.fillStyle="rgba(201,162,39,0.7)";c.fillText(sub,cx,y+14);
  }

  // ── 1. Background ──
  const bg=c.createLinearGradient(0,0,W,H);
  bg.addColorStop(0,"#1a2750");bg.addColorStop(0.5,"#243461");bg.addColorStop(1,"#1a2750");
  c.fillStyle=bg;c.fillRect(0,0,W,H);

  // ── 2. Watermark ──
  c.globalAlpha=0.03;c.font="bold 200px Georgia,serif";c.fillStyle="#c9a227";
  c.textAlign="center";c.fillText("CIET",W/2,H/2+65);c.globalAlpha=1;

  // ── 3. Borders ──
  const bm=24;
  rr(bm,bm,W-bm*2,H-bm*2,18,null,"#c9a227",2.5);
  rr(bm+6,bm+6,W-(bm+6)*2,H-(bm+6)*2,14,null,"rgba(201,162,39,0.3)",1);

  corners();

  // ── 4. Logo (loads async on top of everything) ──
  const logoY=108, logoR=66;
  c.beginPath();c.arc(W/2,logoY,logoR+9,0,Math.PI*2);
  c.strokeStyle="rgba(201,162,39,0.3)";c.lineWidth=1;c.stroke();
  c.beginPath();c.arc(W/2,logoY,logoR,0,Math.PI*2);
  c.fillStyle="#ffffff";c.fill();
  c.strokeStyle="#c9a227";c.lineWidth=2.5;c.stroke();

  const logoImg=new Image();
  logoImg.onload=()=>{
    c.save();
    c.beginPath();c.arc(W/2,logoY,logoR-2,0,Math.PI*2);c.clip();
    const ls=logoR*1.96;
    c.drawImage(logoImg,W/2-ls/2,logoY-ls/2,ls,ls);
    c.restore();
    c.beginPath();c.arc(W/2,logoY,logoR,0,Math.PI*2);
    c.strokeStyle="#c9a227";c.lineWidth=2.5;c.stroke();
  };
  logoImg.src="assets/new_logo.png";

  // ── 5. College name (ABOVE first divider) ──
  c.font="bold 15px Arial,sans-serif";
  c.fillStyle="#c9a227";c.textAlign="center";
  c.letterSpacing="2px";
  c.fillText("COIMBATORE INSTITUTE OF ENGINEERING AND TECHNOLOGY",W/2,196);
  c.letterSpacing="0px";

  // ── 6. Divider 1 ──
  divider(W/2,214,460);

  // ── 7. Certificate title ──
  c.font="italic bold 52px Georgia,serif";
  c.fillStyle="#ffffff";c.textAlign="center";
  c.shadowColor="rgba(255,255,255,0.12)";c.shadowBlur=14;
  c.fillText("Certificate of Achievement",W/2,280);
  c.shadowBlur=0;

  // ── 8. Divider 2 ──
  divider(W/2,304,340);

  // ── 9. Awarded to ──
  c.font="16px Georgia,serif";c.fillStyle="#8ea5c4";
  c.fillText("This certificate is proudly awarded to",W/2,336);

  // ── 10. Student name ──
  c.shadowColor="#c9a227";c.shadowBlur=24;
  c.font="bold 62px Georgia,serif";c.fillStyle="#f0d060";
  c.fillText(d.name,W/2,406);
  c.shadowBlur=0;

  // Name underline
  const nw=Math.min(c.measureText(d.name).width+60,580);
  const ug=c.createLinearGradient(W/2-nw/2,0,W/2+nw/2,0);
  ug.addColorStop(0,"transparent");ug.addColorStop(0.15,"#c9a227");
  ug.addColorStop(0.85,"#c9a227");ug.addColorStop(1,"transparent");
  c.strokeStyle=ug;c.lineWidth=1.5;
  c.beginPath();c.moveTo(W/2-nw/2,422);c.lineTo(W/2+nw/2,422);c.stroke();

  // ── 11. Info pill ──
  rr(W/2-360,434,720,48,24,"rgba(255,255,255,0.04)","rgba(201,162,39,0.2)",1);
  c.font="16px Arial,sans-serif";c.fillStyle="#94a3b8";c.textAlign="center";
  c.fillText(
    `Dept: ${d.dept}   ·   Year: ${d.year}   ·   Roll No: ${d.rollNo}`,
    W/2, 463
  );

  // ── 12. Description ──
  c.font="17px Arial,sans-serif";c.fillStyle="#7a8fa8";
  c.fillText("for successfully completing the",W/2,502);

  c.font="bold 26px Arial,sans-serif";c.fillStyle="#e2e8f0";
  c.fillText(d.assessment,W/2,534);

  c.font="16px Arial,sans-serif";c.fillStyle="#7a8fa8";
  c.fillText("at Coimbatore Institute of Engineering and Technology",W/2,558);

  // ── 13. Score badge ──
  const bW=400, bH=68, bX=W/2-bW/2, bY=578;
  const bbg=c.createLinearGradient(bX,bY,bX+bW,bY);
  bbg.addColorStop(0,"#192d5e");bbg.addColorStop(1,"#0c1a38");
  rr(bX,bY,bW,bH,34,bbg,"#c9a227",1.5);

  // Score % (left)
  c.font="10px Arial,sans-serif";c.fillStyle="#6b7fa0";c.textAlign="left";
  c.fillText("SCORE",bX+24,bY+18);
  c.font="bold 32px Georgia,serif";c.fillStyle="#f0d060";
  c.fillText(`${d.score}%`,bX+20,bY+52);

  // Divider line
  c.strokeStyle="rgba(201,162,39,0.3)";c.lineWidth=1;
  c.beginPath();c.moveTo(bX+125,bY+14);c.lineTo(bX+125,bY+54);c.stroke();

  // Assessment (middle)
  c.font="10px Arial,sans-serif";c.fillStyle="#6b7fa0";c.textAlign="left";
  c.fillText("ASSESSMENT",bX+138,bY+18);
  c.font="bold 15px Arial,sans-serif";c.fillStyle="#dde5f0";
  const aName = d.assessment.replace(" Assessment","");
  c.fillText(aName,bX+138,bY+46);

  // Grade circle (right)
  const gradeColor=d.grade==="A+"?"#22c55e":d.grade==="A"?"#4ade80":
    d.grade==="B"?"#60a5fa":d.grade==="C"?"#facc15":"#f87171";
  const gcx=bX+bW-44, gcy=bY+bH/2;
  c.beginPath();c.arc(gcx,gcy,25,0,Math.PI*2);
  c.fillStyle=gradeColor+"25";c.fill();
  c.strokeStyle=gradeColor;c.lineWidth=2;c.stroke();
  c.font="bold 22px Georgia,serif";c.fillStyle=gradeColor;
  c.textAlign="center";c.textBaseline="middle";c.fillText(d.grade,gcx,gcy);
  c.textBaseline="alphabetic";

  // ── 14. Date ──
  c.font="15px Georgia,serif";c.fillStyle="#8ea5c4";c.textAlign="center";
  c.fillText(`Date of Certification: ${d.date}`,W/2,666);

  // ── 15. Bottom divider ──
  divider(W/2,682,560);

  // ── 16. Signatures ──
  sigBlock(W/2-210,736,"Dean","Academic Affairs");
  sigBlock(W/2+210,736,"Principal","CIET");
}


function closeCertModal() {
  document.getElementById("certModal").style.display = "none";
}

function downloadCertPDF() {
  const canvas=document.getElementById("certCanvas");
  const cert=userCertificates[_currentCertIndex];
  const name=cert?.userName||AppState.user?.name||"Student";
  if(!canvas||canvas.width===0){alert("Certificate not ready.");return;}
  const imgEl=document.createElement("img");
  imgEl.src=canvas.toDataURL("image/jpeg",0.97);
  imgEl.style.cssText="width:100%;display:block;";
  const wrap=document.createElement("div");
  wrap.style.cssText="margin:0;padding:0;background:#0c1429;";
  wrap.appendChild(imgEl);
  if(typeof html2pdf!=="undefined"){
    html2pdf().set({
      margin:0,filename:`${name}_CIET_Certificate.pdf`,
      image:{type:"jpeg",quality:0.97},
      html2canvas:{scale:2,logging:false,useCORS:true},
      jsPDF:{unit:"in",format:[14.1,10],orientation:"landscape"}
    }).from(wrap).save();
  } else { downloadCertPNG(); }
}

function downloadCertPNG() {
  const canvas=document.getElementById("certCanvas");
  const cert=userCertificates[_currentCertIndex];
  const name=cert?.userName||AppState.user?.name||"Student";
  const link=document.createElement("a");
  link.download=`${name}_CIET_Certificate.png`;
  link.href=canvas.toDataURL("image/png");
  link.click();
}
