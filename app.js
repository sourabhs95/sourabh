// --- 1. DEFAULT DATA ---
const DEFAULT_DATA = {
  about: {
    p1: "Detail-oriented Pricing & Quotation Specialist with expertise in RFQ processing.",
    p2: "Managing daily workflows through IQS and optimizing margins."
  },
  skills: [
    { title: "Supply Chain", items: ["RFQ Processing", "BOM Scrubbing"] },
    { title: "Analytics", items: ["Pricing Analysis", "Power BI"] }
  ],
  experience: [
    { role: "Specialist I", company: "Mouser Electronics", period: "Sept 2024 - Present" }
  ],
  achievements: [
    { title: "Rising Star 2025", desc: "Awarded for exceptional accuracy." }
  ],
  certifications: [
    { title: "Power BI Analytics", org: "Simplilearn" }
  ],
  projects: [
    { title: "BOM Automation", desc: "Systematic approach for scrubbing BOMs." }
  ]
};

// --- 2. STATE MANAGEMENT ---
let siteData = {};

function initData() {
  try {
    const local = localStorage.getItem('sourabh_data_v2');
    if (local) {
      siteData = JSON.parse(local);
      // Fallbacks in case an array is missing
      if(!siteData.skills) siteData.skills = [];
      if(!siteData.experience) siteData.experience = [];
      if(!siteData.achievements) siteData.achievements = [];
      if(!siteData.certifications) siteData.certifications = [];
      if(!siteData.projects) siteData.projects = [];
      if(!siteData.about) siteData.about = DEFAULT_DATA.about;
    } else {
      siteData = JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
  } catch(e) {
    siteData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveData() {
  localStorage.setItem('sourabh_data_v2', JSON.stringify(siteData));
  renderAll(); // Auto-update UI on save
}

// --- 3. UI RENDERING ---
function enterSite() {
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('main-site').classList.remove('hidden');
  initData();
  renderAll();
  // Open Narada chatbot automatically after 1 second
  setTimeout(() => { document.getElementById('chat-body').classList.remove('hidden'); }, 1000);
}

function renderAll() {
  // About
  document.getElementById('about-p1').innerText = siteData.about.p1;
  document.getElementById('about-p2').innerText = siteData.about.p2;

  // Skills
  document.getElementById('skills-container').innerHTML = siteData.skills.map(s => 
    `<div class="card"><h4>${s.title}</h4><p>${s.items.join(', ')}</p></div>`
  ).join('');

  // Experience
  document.getElementById('experience-container').innerHTML = siteData.experience.map(e => 
    `<div class="card"><h4>${e.role}</h4><p><b>${e.company}</b> | ${e.period}</p></div>`
  ).join('');

  // Achievements
  document.getElementById('achievements-container').innerHTML = siteData.achievements.map(a => 
    `<div class="card"><h4>${a.title}</h4><p>${a.desc}</p></div>`
  ).join('');

  // Certifications
  document.getElementById('certs-container').innerHTML = siteData.certifications.map(c => 
    `<div class="card"><h4>${c.title}</h4><p>${c.org}</p></div>`
  ).join('');

  // Projects
  document.getElementById('projects-container').innerHTML = siteData.projects.map(p => 
    `<div class="card"><h4>${p.title}</h4><p>${p.desc}</p></div>`
  ).join('');
}

// --- 4. ADMIN PANEL ---
function openAdmin() { document.getElementById('admin-overlay').classList.remove('hidden'); }
function closeAdmin() { document.getElementById('admin-overlay').classList.add('hidden'); }

function checkAdminPass() {
  if (document.getElementById('admin-pass').value === 'sourabh@2025') {
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-content').classList.remove('hidden');
    refreshAdminLists();
  } else { showToast("❌ Wrong password"); }
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.getElementById(tabId).classList.remove('hidden');
}

function refreshAdminLists() {
  // About inputs
  document.getElementById('edit-about-p1').value = siteData.about.p1;
  document.getElementById('edit-about-p2').value = siteData.about.p2;

  // Lists
  const makeList = (arr, titleKey, delFunc) => arr.map((item, i) => `<div class="admin-item"><span>${item[titleKey]}</span><button onclick="${delFunc}(${i})">X</button></div>`).join('');
  
  document.getElementById('admin-list-skills').innerHTML = makeList(siteData.skills, 'title', 'delSkill');
  document.getElementById('admin-list-exp').innerHTML = makeList(siteData.experience, 'role', 'delExp');
  document.getElementById('admin-list-ach').innerHTML = makeList(siteData.achievements, 'title', 'delAch');
  document.getElementById('admin-list-cert').innerHTML = makeList(siteData.certifications, 'title', 'delCert');
  document.getElementById('admin-list-proj').innerHTML = makeList(siteData.projects, 'title', 'delProj');
}

// Admin Add Actions
function saveAbout() {
  siteData.about.p1 = document.getElementById('edit-about-p1').value;
  siteData.about.p2 = document.getElementById('edit-about-p2').value;
  saveData(); showToast("✅ About Saved!");
}

function addSkill() {
  const t = document.getElementById('add-skill-title').value;
  const i = document.getElementById('add-skill-items').value.split(',');
  if(t) { siteData.skills.push({title: t, items: i}); saveData(); refreshAdminLists(); showToast("✅ Added"); }
}
function addExp() {
  const r = document.getElementById('add-exp-role').value;
  const c = document.getElementById('add-exp-company').value;
  const p = document.getElementById('add-exp-period').value;
  if(r) { siteData.experience.push({role: r, company: c, period: p}); saveData(); refreshAdminLists(); showToast("✅ Added"); }
}
function addAch() {
  const t = document.getElementById('add-ach-title').value;
  const d = document.getElementById('add-ach-desc').value;
  if(t) { siteData.achievements.push({title: t, desc: d}); saveData(); refreshAdminLists(); showToast("✅ Added"); }
}
function addCert() {
  const t = document.getElementById('add-cert-title').value;
  const o = document.getElementById('add-cert-org').value;
  if(t) { siteData.certifications.push({title: t, org: o}); saveData(); refreshAdminLists(); showToast("✅ Added"); }
}
function addProj() {
  const t = document.getElementById('add-proj-title').value;
  const d = document.getElementById('add-proj-desc').value;
  if(t) { siteData.projects.push({title: t, desc: d}); saveData(); refreshAdminLists(); showToast("✅ Added"); }
}

// Admin Delete Actions
function delSkill(i) { siteData.skills.splice(i,1); saveData(); refreshAdminLists(); }
function delExp(i) { siteData.experience.splice(i,1); saveData(); refreshAdminLists(); }
function delAch(i) { siteData.achievements.splice(i,1); saveData(); refreshAdminLists(); }
function delCert(i) { siteData.certifications.splice(i,1); saveData(); refreshAdminLists(); }
function delProj(i) { siteData.projects.splice(i,1); saveData(); refreshAdminLists(); }

function resetData() {
  if(confirm("Wipe all data?")) {
    localStorage.removeItem('sourabh_data_v2');
    initData(); renderAll(); refreshAdminLists(); showToast("↺ Reset complete");
  }
}

// --- 5. NARADA CHATBOT ---
function toggleChat() {
  document.getElementById('chat-body').classList.toggle('hidden');
}

function handleChat(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('chat-input');
    const msg = input.value.toLowerCase().trim();
    if (!msg) return;

    const box = document.getElementById('msg-container');
    box.innerHTML += `<div class="msg-user">${input.value}</div>`;

    let reply = "I am pondering this. Ask about Skills, Experience, or Projects.";
    if (msg.includes('hi') || msg.includes('hello') || msg.includes('hare krishna')) {
      reply = "Hare Krishna! 🙏 How can I assist you with Sourabh's portfolio?";
    } else if (msg.includes('skill')) {
      reply = "Sourabh specializes in: " + siteData.skills.map(s => s.title).join(', ');
    } else if (msg.includes('experience') || msg.includes('work')) {
      reply = "He works as a " + siteData.experience[0].role + " at " + siteData.experience[0].company + ".";
    }

    setTimeout(() => {
      box.innerHTML += `<div class="msg-bot"><b>Narada:</b> ${reply}</div>`;
      box.scrollTop = box.scrollHeight;
    }, 400);

    input.value = '';
    box.scrollTop = box.scrollHeight;
  }
}

// --- 6. UTILS ---
function showToast(msg) {
  const t = document.getElementById('toast');
  t.innerText = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 2500);
}
