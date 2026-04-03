function AboutPage() {
  setTimeout(() => {
    // Scroll reveal for dev cards inside SPA
    const cards = document.querySelectorAll(".dev-card");
    function reveal() {
      const trigger = window.innerHeight * 0.85;
      cards.forEach(c => {
        if (c.getBoundingClientRect().top < trigger) c.classList.add("show");
      });
    }
    window.addEventListener("scroll", reveal);
    reveal();

    // Animate stat counters
    const strip = document.querySelector(".stats-strip");
    if (strip) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          e.target.querySelectorAll(".stat-num").forEach(n => {
            const val = parseInt(n.textContent);
            const suf = n.textContent.replace(/[0-9]/g,'');
            let c = 0;
            const step = Math.ceil(val / 40);
            const t = setInterval(() => {
              c += step;
              if (c >= val) { c = val; clearInterval(t); }
              n.textContent = c + suf;
            }, 40);
          });
          io.unobserve(e.target);
        });
      });
      io.observe(strip);
    }
  }, 100);

  return `
  <style>
    .about-spa { font-family: 'DM Sans', 'Segoe UI', sans-serif; color: #1a1f36; }

    /* HERO */
    .spa-hero {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2744 100%);
      border-radius: 20px;
      padding: 56px 32px;
      text-align: center;
      position: relative;
      overflow: hidden;
      margin-bottom: 40px;
    }
    .spa-hero-grid {
      position:absolute;inset:0;
      background-image: linear-gradient(rgba(201,162,39,.07) 1px,transparent 1px),
        linear-gradient(90deg,rgba(201,162,39,.07) 1px,transparent 1px);
      background-size:55px 55px;
      border-radius:20px;
    }
    .spa-hero-content { position:relative;z-index:1; }
    .spa-hero img {
      width:80px;height:80px;border-radius:50%;background:#fff;
      padding:5px;object-fit:contain;
      border:3px solid rgba(201,162,39,.6);
      box-shadow:0 0 30px rgba(201,162,39,.3);
      margin-bottom:18px;
    }
    .spa-hero h1 {
      font-family:'Playfair Display','Georgia',serif;
      font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;
      color:#fff;line-height:1.2;margin-bottom:12px;
    }
    .spa-hero h1 span {
      background:linear-gradient(90deg,#c9a227,#f0d060);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    }
    .spa-hero p { color:rgba(255,255,255,.65);font-size:15px;line-height:1.7;max-width:520px;margin:0 auto 18px; }
    .spa-badge {
      display:inline-block;background:rgba(201,162,39,.15);
      border:1px solid rgba(201,162,39,.35);color:#c9a227;
      padding:7px 20px;border-radius:50px;font-size:12px;font-weight:700;letter-spacing:.5px;
    }

    /* CARD */
    .spa-card {
      background:#fff;border-radius:18px;padding:36px 40px;
      box-shadow:0 4px 30px rgba(0,0,0,.07);
      border:1px solid rgba(0,0,0,.05);
      transition:transform .3s,box-shadow .3s;
    }
    .spa-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.11);}
    .spa-card p{font-size:15px;line-height:1.85;color:#374151;margin-bottom:16px;}
    .spa-card p:last-child{margin-bottom:0;}

    /* STATS */
    .spa-stats {
      display:grid;grid-template-columns:repeat(4,1fr);gap:16px;
      background:linear-gradient(135deg,#0f172a,#1e293b);
      border-radius:18px;padding:36px 28px;text-align:center;
      margin-top:32px;position:relative;overflow:hidden;
    }
    .spa-stats::before{
      content:'';position:absolute;inset:0;
      background:radial-gradient(circle at 50% 50%,rgba(201,162,39,.08) 0%,transparent 70%);
    }
    .stat-item{position:relative;}
    .stat-num{
      font-family:'Playfair Display','Georgia',serif;
      font-size:2rem;font-weight:900;color:#f0d060;line-height:1;
    }
    .stat-label{font-size:12px;color:rgba(255,255,255,.6);margin-top:5px;font-weight:500;}

    /* SEC HEADER */
    .spa-sec{margin-top:52px;}
    .spa-eyebrow{
      display:inline-block;font-size:10px;font-weight:700;
      letter-spacing:2.5px;text-transform:uppercase;color:#c9a227;margin-bottom:8px;
    }
    .spa-sec-title{
      font-family:'Playfair Display','Georgia',serif;
      font-size:clamp(1.4rem,2.5vw,1.9rem);font-weight:700;color:#0f172a;
    }
    .spa-line{
      width:44px;height:3px;
      background:linear-gradient(90deg,#c9a227,#f0d060);
      border-radius:99px;margin:10px 0 0;
    }

    /* FEATURES */
    .spa-features{
      display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;
      margin-top:24px;
    }
    .feature-item{
      background:#fff;padding:20px 14px;border-radius:14px;
      text-align:center;font-weight:600;font-size:13px;color:#1e293b;
      border:1px solid rgba(0,0,0,.06);
      box-shadow:0 2px 10px rgba(0,0,0,.05);transition:all .3s;cursor:default;
    }
    .feature-item .feat-icon{display:block;font-size:24px;margin-bottom:8px;}
    .feature-item:hover{
      background:linear-gradient(135deg,#0f172a,#1e3a5f);color:#fff;
      transform:translateY(-4px) scale(1.03);
      box-shadow:0 12px 28px rgba(15,23,42,.25);
    }

    /* OFFICE */
    .spa-office{display:grid;grid-template-columns:2fr 1fr;gap:24px;margin-top:24px;}
    .spa-map{border-radius:14px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.12);}
    .spa-loc{
      background:#fff;padding:24px;border-radius:14px;
      box-shadow:0 4px 24px rgba(0,0,0,.07);
      border:1px solid rgba(0,0,0,.05);transition:transform .3s;
    }
    .spa-loc:hover{transform:translateY(-4px);}
    .spa-loc h3{
      font-family:'Playfair Display','Georgia',serif;
      font-size:1rem;margin-bottom:12px;color:#0f172a;
    }
    .spa-loc p{font-size:13px;color:#475569;line-height:1.9;margin:0;}
    .spa-phone{margin-top:12px!important;font-weight:700;color:#0f172a!important;font-size:14px!important;}

    /* TEAM */
    .spa-team-grid{
      display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:28px;
    }
    .dev-card{
      background:#fff;border-radius:18px;padding:32px 22px;text-align:center;
      box-shadow:0 4px 24px rgba(0,0,0,.07);border:1px solid rgba(0,0,0,.05);
      opacity:0;transform:translateY(36px);
      transition:opacity .7s ease,transform .7s ease,box-shadow .3s;
      position:relative;overflow:hidden;
    }
    .dev-card::before{
      content:'';position:absolute;top:0;left:0;right:0;height:3px;
      background:linear-gradient(90deg,#c9a227,#f0d060);
      transform:scaleX(0);transform-origin:left;transition:transform .4s;
    }
    .dev-card:hover::before{transform:scaleX(1);}
    .dev-card:hover{box-shadow:0 14px 44px rgba(0,0,0,.12);transform:translateY(-6px)!important;}
    .dev-card.show{opacity:1;transform:translateY(0);}
    .devImg-wrap{position:relative;display:inline-block;margin-bottom:16px;}
    .devImg{
      width:90px;height:90px;border-radius:50%;object-fit:cover;
      border:3px solid transparent;
      background:linear-gradient(#fff,#fff) padding-box,
        linear-gradient(135deg,#c9a227,#f0d060) border-box;
      box-shadow:0 6px 20px rgba(201,162,39,.25);
      transition:transform .3s,box-shadow .3s;
    }
    .devImg:hover{transform:scale(1.09);box-shadow:0 10px 28px rgba(201,162,39,.38);}
    .dev-online{
      position:absolute;bottom:3px;right:3px;
      width:14px;height:14px;background:#22c55e;
      border-radius:50%;border:2px solid #fff;
      box-shadow:0 0 8px rgba(34,197,94,.5);
    }
    .dev-name-main{
      font-family:'Playfair Display','Georgia',serif;
      font-size:1.1rem;font-weight:700;color:#0f172a;margin-bottom:5px;
    }
    .dev-role{
      display:inline-block;
      background:linear-gradient(135deg,rgba(201,162,39,.1),rgba(240,208,96,.1));
      border:1px solid rgba(201,162,39,.3);color:#92681a;
      font-size:11px;font-weight:700;padding:4px 12px;
      border-radius:50px;margin-bottom:12px;
    }
    .dev-bio{font-size:12px;color:#64748b;line-height:1.65;margin-bottom:14px;}
    .dev-skills{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;}
    .dev-skill-tag{
      background:#f1f5f9;color:#475569;
      font-size:10px;font-weight:600;padding:3px 9px;border-radius:6px;
      transition:background .2s,color .2s;
    }
    .dev-card:hover .dev-skill-tag{background:#0f172a;color:#c9a227;}

    /* BUILT BANNER */
    .built-banner{
      margin-top:32px;
      background:linear-gradient(135deg,#0f172a,#1a2750);
      border-radius:16px;padding:28px 32px;
      display:flex;align-items:center;justify-content:space-between;
      flex-wrap:wrap;gap:16px;
      border:1px solid rgba(201,162,39,.2);
    }
    .built-text h3{
      font-family:'Playfair Display','Georgia',serif;
      color:#f0d060;font-size:1.1rem;margin-bottom:4px;
    }
    .built-text p{color:rgba(255,255,255,.6);font-size:13px;line-height:1.6;}
    .built-badge{
      background:rgba(201,162,39,.15);border:1px solid rgba(201,162,39,.3);
      color:#c9a227;padding:10px 22px;border-radius:50px;
      font-size:13px;font-weight:700;white-space:nowrap;
    }

    @media(max-width:768px){
      .spa-stats{grid-template-columns:repeat(2,1fr);}
      .spa-office{grid-template-columns:1fr;}
      .spa-team-grid{grid-template-columns:1fr;max-width:360px;margin-left:auto;margin-right:auto;}
      .spa-card{padding:24px 20px;}
    }
  </style>

  <div class="about-spa">

    <!-- Hero -->
    <div class="spa-hero">
      <div class="spa-hero-grid"></div>
      <div class="spa-hero-content">
        <img src="assets/new_logo.png" alt="CIET">
        <h1>About Our<br><span>E-Learning Platform</span></h1>
        <p>A modern digital environment for learning, practicing, and evaluating technical skills — built by students, for students.</p>
        <span class="spa-badge">🎓 CIET · Coimbatore</span>
      </div>
    </div>

    <!-- About Card -->
    <div class="spa-card">
      <p>Our College E-Learning Platform is designed to provide students with a modern digital environment for learning, practicing, and evaluating their technical and analytical skills. The platform enables students to take interactive assessments, practice aptitude and programming questions, and track their progress in preparation for academic success and placement opportunities.</p>
      <p>By combining intuitive design with modern web technologies, the system offers a smooth and engaging learning experience. Students can access structured assessments, time-based quizzes, and skill development resources from anywhere.</p>
    </div>

    <!-- Stats -->
    <div class="spa-stats stats-strip">
      <div class="stat-item"><div class="stat-num">50+</div><div class="stat-label">Students Enrolled</div></div>
      <div class="stat-item"><div class="stat-num">100+</div><div class="stat-label">Questions Available</div></div>
      <div class="stat-item"><div class="stat-num">2</div><div class="stat-label">Assessment Tracks</div></div>
      <div class="stat-item"><div class="stat-num">1+</div><div class="stat-label">Month in Development</div></div>
    </div>

    <!-- Features -->
    <div class="spa-sec">
      <span class="spa-eyebrow">What we offer</span>
      <h2 class="spa-sec-title">Key Features</h2>
      <div class="spa-line"></div>
      <div class="spa-features">
        <div class="feature-item"><span class="feat-icon">🧮</span>Aptitude Practice</div>
        <div class="feature-item"><span class="feat-icon">💻</span>Coding Assessments</div>
        <div class="feature-item"><span class="feat-icon">⏱️</span>Timed Exams</div>
        <div class="feature-item"><span class="feat-icon">📈</span>Skill Development</div>
        <div class="feature-item"><span class="feat-icon">📊</span>Progress Tracking</div>
        <div class="feature-item"><span class="feat-icon">🎯</span>Placement Prep</div>
      </div>
    </div>

    <!-- Office -->
    <div class="spa-sec">
      <span class="spa-eyebrow">Find us here</span>
      <h2 class="spa-sec-title">Head Office</h2>
      <div class="spa-line"></div>
      <div class="spa-office">
        <div class="spa-map">
          <iframe src="https://www.google.com/maps?q=Vellimalai+Pattinam+Thondamuthur+Narasipuram+Coimbatore&output=embed"
            width="100%" height="300" style="border:0;display:block;" loading="lazy"></iframe>
        </div>
        <div class="spa-loc">
          <h3>Office Location</h3>
          <p>Coimbatore Institute of Engineering and Technology<br>
          Vellimalai Pattinam<br>Post Thondamuthur via<br>Narasipuram<br>Coimbatore, Tamil Nadu 641109</p>
          <p class="spa-phone">📞 +91 9790038605</p>
        </div>
      </div>
    </div>

    <!-- Team -->
    <div class="spa-sec">
      <span class="spa-eyebrow">The people behind it</span>
      <h2 class="spa-sec-title">Meet the Developers</h2>
      <div class="spa-line"></div>
      <p style="color:#64748b;font-size:13px;margin-top:10px;line-height:1.7;">
        Built over <strong>1+ month</strong> of dedication — every line of code, every pixel, every feature crafted with care.
      </p>
      <div class="spa-team-grid">

        <div class="dev-card">
          <div class="devImg-wrap">
            <img src="assets/img.png" class="devImg" alt="Ganapathy">
            <div class="dev-online"></div>
          </div>
          <div class="dev-name-main">Ganapathy</div>
          <div class="dev-role">UI & Frontend Developer</div>
          <p class="dev-bio">Crafted the entire look and feel — every screen, animation, and user interaction from the ground up.</p>
          <div class="dev-skills">
            <span class="dev-skill-tag">HTML/CSS</span>
            <span class="dev-skill-tag">JavaScript</span>
            <span class="dev-skill-tag">UI Design</span>
            <span class="dev-skill-tag">Animations</span>
          </div>
        </div>

        <div class="dev-card" style="transition-delay:.15s;">
          <div class="devImg-wrap">
            <img src="assets/img.png" class="devImg" alt="Dharaneesh">
            <div class="dev-online"></div>
          </div>
          <div class="dev-name-main">Dharaneesh</div>
          <div class="dev-role">Senior Developer</div>
          <p class="dev-bio">Led the overall architecture and development strategy, coordinating frontend and backend integration.</p>
          <div class="dev-skills">
            <span class="dev-skill-tag">Full Stack</span>
            <span class="dev-skill-tag">Architecture</span>
            <span class="dev-skill-tag">Node.js</span>
            <span class="dev-skill-tag">Leadership</span>
          </div>
        </div>

        <div class="dev-card" style="transition-delay:.3s;">
          <div class="devImg-wrap">
            <img src="assets/img.png" class="devImg" alt="Dharshansriram">
            <div class="dev-online"></div>
          </div>
          <div class="dev-name-main">Dharshansriram</div>
          <div class="dev-role">Backend & Database Developer</div>
          <p class="dev-bio">Built the server infrastructure, REST APIs, MongoDB schemas, and real-time WebSocket architecture.</p>
          <div class="dev-skills">
            <span class="dev-skill-tag">Node.js</span>
            <span class="dev-skill-tag">MongoDB</span>
            <span class="dev-skill-tag">REST API</span>
            <span class="dev-skill-tag">Socket.IO</span>
          </div>
        </div>

      </div>

      <!-- Built Banner -->
      <div class="built-banner">
        <div class="built-text">
          <h3>🚀 Built from scratch at CIET</h3>
          <p>1+ month of evenings and weekends poured into making this platform a reality for our college community.</p>
        </div>
        <div class="built-badge">© 2026 CIET · All rights reserved</div>
      </div>
    </div>

  </div>`;
}
