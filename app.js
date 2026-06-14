/* ═══════════════════════════════════════════
   CLOUD DATABASE KEYS (GET THESE FROM JSONBIN.IO)
════════════════════════════════════════════ */
const BIN_ID = 'PASTE_YOUR_BIN_ID_HERE';
const API_KEY = 'PASTE_YOUR_API_KEY_HERE';

/* ═══════════════════════════════════════════
   DEFAULT DATA & STATE
════════════════════════════════════════════ */
const DEFAULT_DATA = {
  about: {
    p1: 'Detail-oriented Pricing & Quotation Specialist with expertise in end-to-end RFQ processing and quote management for electronics components. B.Tech in Electronics & Communication Engineering with 1+ years of experience at Mouser Electronics.',
    p2: 'Managing daily workflows through IQS application and multiple sourcing portals (Global, Matrix). Skilled in BOM scrubbing, pricing analysis, margin optimization, and tracking critical supply chain parameters including lead times, country of origin, and MOQ requirements.'
  },
  skills: [
    { icon: '📦', title: 'Supply Chain & Quoting', items: ['RFQ Processing & Management', 'Quote Development', 'Multi-Portal Management', 'IQS Application', 'BOM Scrubbing', 'Lead Time Analysis'] },
    { icon: '📊', title: 'Pricing & Analytics', items: ['Pricing Analysis & Optimization', 'Margin Calculation', 'Customer-Specific Pricing Rules', 'Vendor Pricing'] },
    { icon: '🔩', title: 'Component & Tech Knowledge', items: ['Component Identification', 'Obsolescence Management', 'Product Lifecycle Analysis', 'Technical Datasheet Analysis'] },
    { icon: '💻', title: 'Tools & Technology', items: ['Microsoft Office Suite', 'Power BI', 'Database Management', 'Python'] }
  ],
  experience: [
    { company: 'Mouser Electronics (TTI Inc)', role: 'Specialist I – Quote Management', period: 'September 2024 – Present', location: 'Bengaluru, India', points: [
        'Processed high-volume RFQs daily from multiple sourcing portals including Global and Matrix platforms.',
        'Configured customer RFQs in IQS tool by setting quote parameters and technical specifications.',
        'Performed BOM scrubbing and data validation to identify unresolved part numbers.',
        'Calculated competitive pricing margins by applying customer-specific rule sets.',
        'Managed supply chain parameters including lead time analysis and MOQ.',
        'Awarded Rising Star Award (2025) and Star Performer of Q1 2026.'
      ] }
  ],
  achievements: [
    { icon: '⭐', title: 'Rising Star Award 2025', desc: 'Awarded at Mouser Electronics for exceptional performance in quote processing accuracy and efficiency.' },
    { icon: '🏆', title: 'Star Performer Q1 2026', desc: 'Recognized for consistently meeting critical turnaround deadlines and delivering high-quality quotations.' },
    { icon: '🎯', title: 'SPOC for Complex BOM Scrubbing', desc: 'Served as the go-to Single Point of Contact for complex BOM scrubbing processes.' }
  ],
  certifications: [
    { icon: '📊', title: 'Business Analytics with Excel & Power BI', org: 'Simplilearn', year: '2024' },
    { icon: '📈', title: 'Data Analytics', org: 'Accenture (Forage)', year: '2024' },
    { icon: '🔵', title: 'Power BI Analytics', org: 'J2J Institute', year: '2024' }
  ],
  projects: [
    { title: 'BOM Scrubbing Automation', desc: 'Developed a systematic approach for scrubbing Bills of Materials (BOMs), streamlining the identification and resolution of unresolved part numbers.', tags: ['Excel', 'IQS', 'Process Improvement'], link: '' },
    { title: 'Pricing Margin Optimization', desc: 'Analyzed and applied customer-specific pricing rule sets to consistently deliver competitive margins while maintaining profitability.', tags: ['Pricing Analysis', 'Excel', 'Data Analytics'], link: '' },
    { title: 'Supply Chain Data Dashboard', desc: 'Built Power BI dashboards to visualize lead times, country of origin data, and MOQ trends.', tags: ['Power BI', 'Data Analytics', 'Supply Chain'], link: '' }
  ]
};

let siteData = {};

// EDIT STATE TRACKER
let editState = { skill: -1, exp: -1, ach: -1, cert: -1, proj: -1 };

/* ═══════════════════════════════════════════
   CLOUD INITIALIZATION & DATA
════════════════════════════════════════════ */
async function loadData() {
  if (BIN_ID === 'PASTE_YOUR_BIN_ID_HERE') {
    console.warn("Using default data. Please add JSONBin keys to sync across devices.");
    siteData = JSON.parse(JSON.stringify(DEFAULT_DATA));
    return;
  }

  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { 'X-Master-Key': API_KEY }
    });
    
    if (response.ok) {
      const data = await response.json();
      siteData = data.record;
      // Failsafes to prevent crashes
      if(!Array.isArray(siteData.skills)) siteData.skills = [...DEFAULT_DATA.skills];
      if(!Array.isArray(siteData.experience)) siteData.experience = [...DEFAULT_DATA.experience];
      if(!Array.isArray(siteData.achievements)) siteData.achievements = [...DEFAULT_DATA.achievements];
      if(!Array.isArray(siteData.certifications)) siteData.certifications = [...DEFAULT_DATA.certifications];
      if(!Array.isArray(siteData.projects)) siteData.projects = [...DEFAULT_DATA.projects];
      if(!siteData.about) siteData.about = {...DEFAULT_DATA.about};
    } else {
      siteData = JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
  } catch (e) {
    console.error("Cloud load failed", e);
    siteData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

async function saveData() {
  if (BIN_ID === 'PASTE_YOUR_BIN_ID_HERE') return; // Skips if no key added

  try {
    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY
      },
      body: JSON.stringify(siteData)
    });
  } catch (e) {
    console.error("Failed to save to cloud", e);
    showToast('⚠️ Cloud save failed. Check connection.');
  }
}

function enterSite() {
  const ws = document.getElementById('welcome-screen');
  const ms = document.getElementById('main-site');
  if(ws) {
    ws.style.opacity = '0';
    setTimeout(() => {
      ws.style.display = 'none';
      if(ms) ms.style.display = 'block';
      document.body.style.overflow = 'auto';
      initSite();
    }, 800);
  }
}
document.body.style.overflow = 'hidden';

async function initSite() {
  await loadData(); // Wait for cloud data to download
  renderAllUI();
  
  const yr = document.getElementById('year');
  if(yr) yr.textContent = new Date().getFullYear();
  
  initReveal();
  initNavScroll();
  setTimeout(() => { 
    const cb = document.getElementById('chat-body');
    if(cb) cb.style.display = 'block'; 
  }, 1500);
}

/* ═══════════════════════════════════════════
   RENDER EXACT ORIGINAL UI
════════════════════════════════════════════ */
function renderAllUI() {
  const p1 = document.getElementById('about-p1');
  const p2 = document.getElementById('about-p2');
  if(p1) p1.textContent = siteData.about.p1;
  if(p2) p2.textContent = siteData.about.p2;

  const sc = document.getElementById('skills-container');
  if(sc) sc.innerHTML = siteData.skills.map(cat => `
    <div class="skill-category reveal visible">
      <div class="skill-cat-title"><span class="skill-cat-icon">${cat.icon || '🔹'}</span>${cat.title}</div>
      <div class="skill-tags">${cat.items.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
    </div>`).join('');

  const ec = document.getElementById('experience-container');
  if(ec) ec.innerHTML = siteData.experience.map(exp => `
    <div class="timeline-item reveal visible">
      <div class="timeline-header">
        <div class="timeline-company">${exp.company}</div>
        <div class="timeline-role">${exp.role}</div>
        <div class="timeline-period">📅 ${exp.period} · 📍 ${exp.location}</div>
      </div>
      <ul class="timeline-points">${exp.points.map(p => `<li>${p}</li>`).join('')}</ul>
    </div>`).join('');

  const ac = document.getElementById('achievements-container');
  if(ac) ac.innerHTML = siteData.achievements.map(a => `
    <div class="achievement-card reveal visible">
      <div class="achievement-icon">${a.icon || '✨'}</div>
      <div class="achievement-title">${a.title}</div>
      <div class="achievement-desc">${a.desc}</div>
    </div>`).join('');

  const cc = document.getElementById('certs-container');
  if(cc) cc.innerHTML = siteData.certifications.map(c => `
    <div class="cert-card reveal visible">
      <span class="cert-icon">${c.icon || '🎓'}</span>
      <div>
        <div class="cert-title">${c.title}</div>
        <div class="cert-org">${c.org}</div>
        <div class="cert-year">${c.year}</div>
      </div>
    </div>`).join('');

  const pc = document.getElementById('projects-container');
  if(pc) pc.innerHTML = siteData.projects.map(p => {
    const tags = p.tags && p.tags.length ? p.tags.map(t => `<span class="project-tag">${t}</span>`).join('') : '';
    const link = p.link ? `<a href="${p.link}" class="project-link" target="_blank">View Project →</a>` : '';
    return `
      <div class="project-card reveal visible">
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-tags">${tags}</div>
        ${link}
      </div>`;
  }).join('');
}

/* ═══════════════════════════════════════════
   SCROLL REVEAL & NAV
════════════════════════════════════════════ */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function initNavScroll() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if(!nav) return;
    if (window.scrollY > 50) nav.style.padding = '8px 48px';
    else nav.style.padding = '14px 48px';
  });
}

function toggleNav() { 
  const links = document.querySelector('.nav-links');
  if(links) links.classList.toggle('open'); 
}

/* ═══════════════════════════════════════════
   ADMIN PANEL: CLOUD SYNC LOGIC
════════════════════════════════════════════ */
function openAdmin() { 
  const ov = document.getElementById('admin-overlay');
  if(ov) ov.style.display = 'flex'; 
}
function closeAdmin() { 
  const ov = document.getElementById('admin-overlay');
  if(ov) ov.style.display = 'none'; 
}

function checkAdminPass() {
  const pass = document.getElementById('admin-pass');
  if (pass && pass.value === 'sourabh@2025') {
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-content').style.display = 'block';
    loadAdminUI();
  } else { 
    showToast('❌ Wrong password!'); 
  }
}

function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-content').forEach(t => {
    t.style.display = 'none';
    t.classList.remove('active');
  });
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  
  const target = document.getElementById(tabId);
  if(target) {
    target.style.display = 'block';
    target.classList.add('active');
  }
  if(btn) btn.classList.add('active');
}

function loadAdminUI() {
  const ap1 = document.getElementById('about-edit-p1');
  const ap2 = document.getElementById('about-edit-p2');
  if(ap1) ap1.value = siteData.about.p1;
  if(ap2) ap2.value = siteData.about.p2;

  const mkList = (arr, tKey, editFunc, delFunc) => arr.map((item, i) => `
    <div class="admin-item">
      <span>${item[tKey]}</span>
      <div>
        <button onclick="${editFunc}(${i})" style="background:none; border:none; cursor:pointer; font-size:16px; margin-right:10px;" title="Edit">✏️</button>
        <button onclick="${delFunc}(${i})" style="background:none; border:none; color:#ff4444; cursor:pointer; font-size:16px;" title="Delete">🗑</button>
      </div>
    </div>`).join('');
  
  const sl = document.getElementById('skills-admin-list');
  if(sl) sl.innerHTML = mkList(siteData.skills, 'title', 'editSkill', 'delSkill');
  
  const el = document.getElementById('exp-admin-list');
  if(el) el.innerHTML = mkList(siteData.experience, 'role', 'editExp', 'delExp');
  
  const al = document.getElementById('achievements-admin-list');
  if(al) al.innerHTML = mkList(siteData.achievements, 'title', 'editAch', 'delAch');
  
  const cl = document.getElementById('certs-admin-list');
  if(cl) cl.innerHTML = mkList(siteData.certifications, 'title', 'editCert', 'delCert');
  
  const pl = document.getElementById('projects-admin-list');
  if(pl) pl.innerHTML = mkList(siteData.projects, 'title', 'editProj', 'delProj');
}

async function syncAndSave() {
  showToast('⏳ Syncing to cloud...');
  await saveData(); // Uploads to JSONBin
  renderAllUI();
  loadAdminUI();
  showToast('✅ Cloud Sync Complete!');
}

function saveAbout() {
  const ap1 = document.getElementById('about-edit-p1');
  const ap2 = document.getElementById('about-edit-p2');
  if(ap1 && ap2) {
    siteData.about.p1 = ap1.value;
    siteData.about.p2 = ap2.value;
  }
  syncAndSave();
}

/* ─── SKILLS ─── */
function editSkill(i) {
  const item = siteData.skills[i];
  document.getElementById('new-skill-cat').value = item.title;
  document.getElementById('new-skill-items').value = item.items.join(', ');
  editState.skill = i;
  document.getElementById('btn-skill').textContent = "Update Skill";
  showToast("✏️ Editing: " + item.title);
}
function saveSkill() {
  const t = document.getElementById('new-skill-cat').value.trim();
  const i = document.getElementById('new-skill-items').value.split(',').map(s=>s.trim()).filter(Boolean);
  if(!t) return showToast("⚠️ Title required");
  
  if(editState.skill > -1) {
    siteData.skills[editState.skill].title = t;
    siteData.skills[editState.skill].items = i;
    editState.skill = -1;
    document.getElementById('btn-skill').textContent = "+ Save Skill";
  } else {
    siteData.skills.push({icon:'🔹', title:t, items:i});
  }
  document.getElementById('new-skill-cat').value=''; document.getElementById('new-skill-items').value=''; 
  syncAndSave();
}
function delSkill(i) { siteData.skills.splice(i,1); syncAndSave(); }

/* ─── EXPERIENCE ─── */
function editExp(i) {
  const item = siteData.experience[i];
  document.getElementById('new-exp-role').value = item.role;
  document.getElementById('new-exp-company').value = item.company;
  document.getElementById('new-exp-period').value = item.period;
  document.getElementById('new-exp-location').value = item.location;
  document.getElementById('new-exp-points').value = item.points.join(', ');
  editState.exp = i;
  document.getElementById('btn-exp').textContent = "Update Experience";
  showToast("✏️ Editing: " + item.role);
}
function saveExperience() {
  const r = document.getElementById('new-exp-role').value.trim();
  const c = document.getElementById('new-exp-company').value.trim();
  const p = document.getElementById('new-exp-period').value;
  const l = document.getElementById('new-exp-location').value;
  const pts = document.getElementById('new-exp-points').value.split(',').map(s=>s.trim()).filter(Boolean);
  if(!r || !c) return showToast("⚠️ Role & Company required");
  
  if(editState.exp > -1) {
    siteData.experience[editState.exp] = {role: r, company: c, period: p, location: l, points: pts};
    editState.exp = -1;
    document.getElementById('btn-exp').textContent = "+ Save Experience";
  } else {
    siteData.experience.push({role: r, company: c, period: p, location: l, points: pts}); 
  }
  document.getElementById('new-exp-role').value=''; document.getElementById('new-exp-company').value=''; document.getElementById('new-exp-period').value=''; document.getElementById('new-exp-location').value=''; document.getElementById('new-exp-points').value=''; 
  syncAndSave();
}
function delExp(i) { siteData.experience.splice(i,1); syncAndSave(); }

/* ─── ACHIEVEMENTS ─── */
function editAch(i) {
  const item = siteData.achievements[i];
  document.getElementById('new-ach-title').value = item.title;
  document.getElementById('new-ach-desc').value = item.desc;
  editState.ach = i;
  document.getElementById('btn-ach').textContent = "Update Achievement";
  showToast("✏️ Editing: " + item.title);
}
function saveAchievement() {
  const t = document.getElementById('new-ach-title').value.trim();
  const d = document.getElementById('new-ach-desc').value.trim();
  if(!t) return showToast("⚠️ Title required");
  
  if(editState.ach > -1) {
    siteData.achievements[editState.ach].title = t;
    siteData.achievements[editState.ach].desc = d;
    editState.ach = -1;
    document.getElementById('btn-ach').textContent = "+ Save Achievement";
  } else {
    siteData.achievements.push({icon:'✨', title:t, desc:d}); 
  }
  document.getElementById('new-ach-title').value=''; document.getElementById('new-ach-desc').value=''; 
  syncAndSave();
}
function delAch(i) { siteData.achievements.splice(i,1); syncAndSave(); }

/* ─── CERTIFICATIONS ─── */
function editCert(i) {
  const item = siteData.certifications[i];
  document.getElementById('new-cert-title').value = item.title;
  document.getElementById('new-cert-org').value = item.org;
  document.getElementById('new-cert-year').value = item.year;
  editState.cert = i;
  document.getElementById('btn-cert').textContent = "Update Certification";
  showToast("✏️ Editing: " + item.title);
}
function saveCertification() {
  const t = document.getElementById('new-cert-title').value.trim();
  const o = document.getElementById('new-cert-org').value.trim();
  const y = document.getElementById('new-cert-year').value.trim();
  if(!t) return showToast("⚠️ Title required");

  if(editState.cert > -1) {
    siteData.certifications[editState.cert].title = t;
    siteData.certifications[editState.cert].org = o;
    siteData.certifications[editState.cert].year = y;
    editState.cert = -1;
    document.getElementById('btn-cert').textContent = "+ Save Certification";
  } else {
    siteData.certifications.push({icon:'🎓', title:t, org:o, year:y}); 
  }
  document.getElementById('new-cert-title').value=''; document.getElementById('new-cert-org').value=''; document.getElementById('new-cert-year').value='';
  syncAndSave();
}
function delCert(i) { siteData.certifications.splice(i,1); syncAndSave(); }

/* ─── PROJECTS ─── */
function editProj(i) {
  const item = siteData.projects[i];
  document.getElementById('new-proj-title').value = item.title;
  document.getElementById('new-proj-desc').value = item.desc;
  document.getElementById('new-proj-tags').value = item.tags.join(', ');
  document.getElementById('new-proj-link').value = item.link || '';
  editState.proj = i;
  document.getElementById('btn-proj').textContent = "Update Project";
  showToast("✏️ Editing: " + item.title);
}
function saveProject() {
  const t = document.getElementById('new-proj-title').value.trim();
  const d = document.getElementById('new-proj-desc').value.trim();
  const tg = document.getElementById('new-proj-tags').value.split(',').map(s=>s.trim()).filter(Boolean);
  const l = document.getElementById('new-proj-link').value.trim();
  if(!t) return showToast("⚠️ Title required");

  if(editState.proj > -1) {
    siteData.projects[editState.proj] = {title:t, desc:d, tags:tg, link:l};
    editState.proj = -1;
    document.getElementById('btn-proj').textContent = "+ Save Project";
  } else {
    siteData.projects.push({title:t, desc:d, tags:tg, link:l}); 
  }
  document.getElementById('new-proj-title').value=''; document.getElementById('new-proj-desc').value=''; document.getElementById('new-proj-tags').value=''; document.getElementById('new-proj-link').value=''; 
  syncAndSave();
}
function delProj(i) { siteData.projects.splice(i,1); syncAndSave(); }

async function resetAll() {
  if (confirm('Reset all cloud data to defaults? Cannot be undone.')) {
    siteData = JSON.parse(JSON.stringify(DEFAULT_DATA));
    await syncAndSave();
    showToast('↺ Reset to default');
  }
}

/* ═══════════════════════════════════════════
   NARADA CHATBOT
════════════════════════════════════════════ */
function toggleChat() { 
  const cb = document.getElementById('chat-body');
  if(cb) {
    if(cb.style.display === 'none' || cb.classList.contains('hidden')) {
      cb.style.display = 'block';
      cb.classList.remove('hidden');
    } else {
      cb.style.display = 'none';
    }
  }
}

function handleChat(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('chat-input');
    const container = document.getElementById('msg-container');
    if(!input || !container) return;
    
    const msg = input.value.toLowerCase().trim();
    if (!msg) return;
    
    container.innerHTML += `<div style="text-align:right; margin:8px 0; color:#555; padding:8px; background:#f0f0f0; border-radius:8px; display:inline-block; float:right; clear:both;">${input.value}</div>`;
    
    let reply = "I am pondering this... Ask me about Sourabh's Experience, Skills, Projects, or Certifications.";
    
    if (msg === 'hi' || msg === 'hello' || msg.includes('hare krishna')) {
        reply = "Hare Krishna! 🙏 How can I assist you with Sourabh's portfolio today?";
    } else if (msg.includes('skill') || msg.includes('know')) {
        reply = "Sourabh specializes in: " + siteData.skills.map(s => s.title).join(', ') + ".";
    } else if (msg.includes('experience') || msg.includes('work') || msg.includes('job')) {
        reply = `He currently works at ${siteData.experience[0].company} as a ${siteData.experience[0].role}.`;
    } else if (msg.includes('project')) {
        reply = `He has built impactful projects like: ${siteData.projects.map(p=>p.title).join(', ')}.`;
    } else if (msg.includes('certif')) {
        reply = `He holds certifications in: ${siteData.certifications.map(c=>c.title).join(', ')}.`;
    } else if (msg.includes('achieve') || msg.includes('award')) {
        reply = `His achievements include: ${siteData.achievements.map(a=>a.title).join(', ')}.`;
    } else if (msg.includes('contact') || msg.includes('email') || msg.includes('hire')) {
        reply = "You can email him at sourabhshet95@gmail.com or call +91 9019215348.";
    }

    setTimeout(() => {
      container.innerHTML += `<div style="color:var(--gold-dark); margin:8px 0; padding:8px; background:rgba(201,168,76,0.1); border-radius:8px; display:inline-block; float:left; clear:both;"><b>Narada:</b> ${reply}</div>`;
      container.scrollTop = container.scrollHeight;
    }, 400);

    input.value = '';
    container.scrollTop = container.scrollHeight;
  }
}

/* ═══════════════════════════════════════════
   TOAST
════════════════════════════════════════════ */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg; 
  t.style.display = 'block';
  clearTimeout(toastTimer); 
  toastTimer = setTimeout(() => t.style.display = 'none', 3000);
}
