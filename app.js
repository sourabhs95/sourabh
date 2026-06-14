const DEFAULT_DATA = {
  skills: [
    { icon: '📦', title: 'Supply Chain & Quoting', items: ['RFQ Processing', 'Quote Development'] },
    { icon: '📊', title: 'Pricing & Analytics', items: ['Pricing Analysis', 'Margin Calculation'] }
  ],
  experience: [
    { company: 'Mouser Electronics (TTI Inc)', role: 'Specialist I – Quote Management', period: 'September 2024 – Present', location: 'Bengaluru, India', points: ['Processed high-volume RFQs daily.', 'Performed BOM scrubbing.'] }
  ],
  achievements: [
    { icon: '⭐', title: 'Rising Star Award 2025', desc: 'Awarded at Mouser Electronics.' }
  ],
  certifications: [
    { icon: '📊', title: 'Business Analytics with Excel & Power BI', org: 'Simplilearn', year: '2024' }
  ],
  projects: [
    { title: 'BOM Scrubbing Automation', desc: 'Developed a systematic approach for scrubbing BOMs.', tags: ['Excel', 'IQS'] }
  ],
  about: {
    p1: 'Detail-oriented Pricing & Quotation Specialist with expertise in end-to-end RFQ processing and quote management for electronics components.',
    p2: 'Managing daily workflows through IQS application and multiple sourcing portals.'
  }
};

let siteData = loadData();

function loadData() {
  try {
    const saved = localStorage.getItem('sourabh_portfolio');
    return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_DATA));
  } catch { return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
}

function saveData() {
  localStorage.setItem('sourabh_portfolio', JSON.stringify(siteData));
}

function enterSite() {
  const ws = document.getElementById('welcome-screen');
  const ms = document.getElementById('main-site');
  if(ws) ws.classList.add('hidden');
  if(ms) ms.classList.remove('hidden');
  document.body.style.overflow = 'auto';
  initSite();
}
document.body.style.overflow = 'hidden';

function initSite() {
  // FORCE OVERWRITE ANY UNCHANGED ADMIN BUTTON TEXTS TO CHAKRA LOGO
  const adminBtn = document.getElementById('admin-trigger-btn');
  if (adminBtn) adminBtn.innerHTML = "☸";

  renderSkills();
  renderExperience();
  renderAchievements();
  renderCertifications();
  renderProjects();
  
  const p1 = document.getElementById('about-p1');
  const p2 = document.getElementById('about-p2');
  if (p1) p1.textContent = siteData.about.p1;
  if (p2) p2.textContent = siteData.about.p2;

  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
  
  setTimeout(() => {
    const cb = document.getElementById('chat-body');
    if (cb) cb.classList.remove('hidden');
  }, 1000);
}

function renderSkills() {
  const c = document.getElementById('skills-container');
  if (!c) return;
  c.innerHTML = siteData.skills.map(cat => `
    <div class="skill-category">
      <div><b>${cat.icon} ${cat.title}</b></div>
      <div>${cat.items.map(s => `<span class="skill-tag" style="margin-right:5px;background:#eee;padding:2px 5px;">${s}</span>`).join('')}</div>
    </div>
  `).join('');
}

function renderExperience() {
  const c = document.getElementById('experience-container');
  if (!c) return;
  c.innerHTML = siteData.experience.map(exp => `
    <div class="timeline-item">
      <h3>${exp.company} - ${exp.role}</h3>
      <p><sub>${exp.period} | ${exp.location}</sub></p>
      <ul>${exp.points.map(p => `<li>${p}</li>`).join('')}</ul>
    </div>
  `).join('');
}

function renderAchievements() {
  const c = document.getElementById('achievements-container');
  if (!c) return;
  c.innerHTML = siteData.achievements.map(a => `
    <div class="achievement-card"><h4>${a.icon} ${a.title}</h4><p>${a.desc}</p></div>
  `).join('');
}

function renderCertifications() {
  const c = document.getElementById('certs-container');
  if (!c) return;
  c.innerHTML = siteData.certifications.map(cert => `
    <div class="cert-card"><b>${cert.icon} ${cert.title}</b> - ${cert.org} (${cert.year})</div>
  `).join('');
}

function renderProjects() {
  const c = document.getElementById('projects-container');
  if (!c) return;
  c.innerHTML = siteData.projects.map(p => `
    <div class="project-card"><h4>${p.title}</h4><p>${p.desc}</p></div>
  `).join('');
}

/* ADMIN ACTIONS */
function openAdmin() { 
  const overlay = document.getElementById('admin-overlay');
  if(overlay) overlay.classList.remove('hidden'); 
}
function closeAdmin() { 
  const overlay = document.getElementById('admin-overlay');
  if(overlay) overlay.classList.add('hidden'); 
}

function checkAdminPass() {
  const pw = document.getElementById('admin-pass').value;
  if (pw === 'sourabh@2025') {
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-content').classList.remove('hidden');
    loadAdminData();
  } else { showToast('❌ Wrong password!'); }
}

function loadAdminData() {
  const sl = document.getElementById('skills-admin-list');
  if(sl) sl.innerHTML = siteData.skills.map((cat, i) => `<div class="admin-item"><span>${cat.title}</span><button onclick="deleteSkillCat(${i})">🗑</button></div>`).join('');

  const ex = document.getElementById('exp-admin-list');
  if(ex) ex.innerHTML = siteData.experience.map((e, i) => `<div class="admin-item"><span>${e.role}</span><button onclick="deleteExperience(${i})">🗑</button></div>`).join('');

  const pl = document.getElementById('projects-admin-list');
  if(pl) pl.innerHTML = siteData.projects.map((p, i) => `<div class="admin-item"><span>${p.title}</span><button onclick="deleteProject(${i})">🗑</button></div>`).join('');

  const cl = document.getElementById('certs-admin-list');
  if(cl) cl.innerHTML = siteData.certifications.map((c, i) => `<div class="admin-item"><span>${c.title}</span><button onclick="deleteCert(${i})">🗑</button></div>`).join('');

  const al = document.getElementById('achievements-admin-list');
  if(al) al.innerHTML = siteData.achievements.map((a, i) => `<div class="admin-item"><span>${a.title}</span><button onclick="deleteAchievement(${i})">🗑</button></div>`).join('');

  const ap1 = document.getElementById('about-edit-p1');
  const ap2 = document.getElementById('about-edit-p2');
  if(ap1) ap1.value = siteData.about.p1;
  if(ap2) ap2.value = siteData.about.p2;
}

function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const targetTab = document.getElementById(tabId);
  if(targetTab) targetTab.classList.add('active');
  if(btn) btn.classList.add('active');
}

function addSkillCategory() {
  const cat = document.getElementById('new-skill-cat').value.trim();
  const items = document.getElementById('new-skill-items').value.split(',').map(s => s.trim()).filter(Boolean);
  if (!cat) return;
  siteData.skills.push({ icon: '🔹', title: cat, items });
  loadAdminData(); saveAll(true);
}
function deleteSkillCat(i) { siteData.skills.splice(i, 1); loadAdminData(); saveAll(true); }

function addExperience() {
  const role = document.getElementById('new-exp-role').value.trim();
  const company = document.getElementById('new-exp-company').value.trim();
  if (!role || !company) return;
  siteData.experience.push({ role, company, period: document.getElementById('new-exp-period').value, location: document.getElementById('new-exp-location').value, points: document.getElementById('new-exp-points').value.split(',') });
  loadAdminData(); saveAll(true);
}
function deleteExperience(i) { siteData.experience.splice(i, 1); loadAdminData(); saveAll(true); }

function addProject() {
  const title = document.getElementById('new-proj-title').value.trim();
  if (!title) return;
  siteData.projects.push({ title, desc: document.getElementById('new-proj-desc').value, tags: [] });
  loadAdminData(); saveAll(true);
}
function deleteProject(i) { siteData.projects.splice(i, 1); loadAdminData(); saveAll(true); }

function addCertification() {
  const title = document.getElementById('new-cert-title').value.trim();
  if (!title) return;
  siteData.certifications.push({ icon: '🎓', title, org: document.getElementById('new-cert-org').value, year: document.getElementById('new-cert-year').value });
  loadAdminData(); saveAll(true);
}
function deleteCert(i) { siteData.certifications.splice(i, 1); loadAdminData(); saveAll(true); }

function addAchievement() {
  const title = document.getElementById('new-ach-title').value.trim();
  if (!title) return;
  siteData.achievements.push({ icon: '✨', title, desc: document.getElementById('new-ach-desc').value });
  loadAdminData(); saveAll(true);
}
function deleteAchievement(i) { siteData.achievements.splice(i, 1); loadAdminData(); saveAll(true); }

function saveAbout() {
  siteData.about.p1 = document.getElementById('about-edit-p1').value;
  siteData.about.p2 = document.getElementById('about-edit-p2').value;
  saveAll(true);
}

function saveAll(silent = false) {
  saveData();
  renderSkills();
  renderExperience();
  renderProjects();
  renderCertifications();
  renderAchievements();
  
  const p1 = document.getElementById('about-p1');
  const p2 = document.getElementById('about-p2');
  if(p1) p1.textContent = siteData.about.p1;
  if(p2) p2.textContent = siteData.about.p2;

  if (!silent) closeAdmin();
}

function toggleChat() {
  const cb = document.getElementById('chat-body');
  if(cb) cb.classList.toggle('hidden');
}

function handleChat(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('chat-input');
    const container = document.getElementById('msg-container');
    if(!input || !container) return;
    const msg = input.value.toLowerCase().trim();
    if (!msg) return;
    
    container.innerHTML += `<div style="text-align:right; margin:4px; color:#333;">${input.value}</div>`;
    let reply = "Ask me about Sourabh's Experience, Skills, or Projects.";
    
    if (msg === 'hi' || msg === 'hello' || msg.includes('krishna')) {
        reply = "Hare Krishna! 🙏 How can I assist you with Sourabh's portfolio today?";
    } else if (msg.includes('skill')) {
        reply = "Skills: " + siteData.skills.map(s => s.title).join(', ');
    } else if (msg.includes('experience') || msg.includes('work')) {
        reply = "Experience: Working at " + siteData.experience.map(e => e.company).join(', ');
    }
    
    setTimeout(() => {
      container.innerHTML += `<div style="color:brown; margin:4px;"><b>Narada:</b> ${reply}</div>`;
    }, 300);
    input.value = '';
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 2000);
}
