/* ═══════════════════════════════════════════
   DEFAULT DATA
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

const SANSKRIT = {
  'About Me': 'मम परिचयः',
  'Skills & Expertise': 'कौशल्यानि',
  'Work Experience': 'कार्यानुभवः',
  'Projects': 'परियोजनाः',
  'Sourabh Satish Shet': 'सौरभ सतीश शेट',
  'Pricing & Quotation Specialist': 'मूल्य-उद्धरण विशेषज्ञः',
  '📍 Yelahanka, Bangalore · Electronics Components Supply Chain': '📍 येलहंका, बंगळूरु · इलेक्ट्रॉनिक्स आपूर्ति श्रृंखला'
};

let isTranslated = false;
let siteData = {};

/* ═══════════════════════════════════════════
   INITIALIZATION & DATA
════════════════════════════════════════════ */
function loadData() {
  try {
    // V5 forces a fresh start to fix browser cache bugs
    const saved = localStorage.getItem('sourabh_v5_data');
    if (saved) {
      siteData = JSON.parse(saved);
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
    siteData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveData() {
  localStorage.setItem('sourabh_v5_data', JSON.stringify(siteData));
}

function enterSite() {
  const ws = document.getElementById('welcome-screen');
  const ms = document.getElementById('main-site');
  if(ws) {
    ws.style.opacity = '0';
    ws.style.transform = 'scale(1.05)';
    ws.style.transition = 'all 0.8s cubic-bezier(0.4,0,0.2,1)';
    setTimeout(() => {
      ws.classList.add('hidden');
      if(ms) ms.classList.remove('hidden');
      document.body.style.overflow = 'auto';
      initSite();
    }, 800);
  } else {
    initSite();
  }
}
document.body.style.overflow = 'hidden';

function initSite() {
  // FORCE CHAKRA LOGO VIA JS TO FIX HTML CACHING
  const adminBtn = document.querySelector('.admin-btn');
  if (adminBtn) {
    adminBtn.innerHTML = '☸';
    adminBtn.style.fontSize = '20px';
    adminBtn.style.padding = '4px 14px';
    adminBtn.style.background = 'transparent';
    adminBtn.style.border = '1px solid var(--gold)';
    adminBtn.style.borderRadius = '20px';
    adminBtn.style.color = 'var(--gold)';
  }

  loadData();
  renderAllUI();
  
  const yr = document.getElementById('year');
  if(yr) yr.textContent = new Date().getFullYear();
  
  initReveal();
  initNavScroll();
  setTimeout(() => { 
    const cb = document.getElementById('chat-body');
    if(cb) cb.classList.remove('hidden'); 
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

function toggleTranslation() {
  isTranslated = !isTranslated;
  const tBtn = document.querySelector('.translate-btn');
  if(tBtn) tBtn.classList.toggle('active', isTranslated);
  
  const swaps = [
    { id: 'hero-name', en: 'Sourabh Satish Shet', sk: SANSKRIT['Sourabh Satish Shet'] },
    { id: 'hero-title', en: 'Pricing & Quotation Specialist', sk: SANSKRIT['Pricing & Quotation Specialist'] },
    { id: 'hero-location', en: '📍 Yelahanka, Bangalore · Electronics Components Supply Chain', sk: SANSKRIT['📍 Yelahanka, Bangalore · Electronics Components Supply Chain'] },
    { id: 'about-title', en: 'About Me', sk: SANSKRIT['About Me'] },
    { id: 'skills-title', en: 'Skills & Expertise', sk: SANSKRIT['Skills & Expertise'] },
    { id: 'exp-title', en: 'Work Experience', sk: SANSKRIT['Work Experience'] },
    { id: 'projects-title', en: 'Projects', sk: SANSKRIT['Projects'] },
    { id: 'hero-sanskrit', en: 'सौरभ सतीश शेट', sk: 'Sourabh Satish Shet' }
  ];
  swaps.forEach(({ id, en, sk }) => {
    const el = document.getElementById(id);
    if (el) el.textContent = isTranslated ? sk : en;
  });
  showToast(isTranslated ? '🕉 संस्कृत भाषायाम् अनुवादितम्' : '🌐 Switched back to English');
}

/* ═══════════════════════════════════════════
   ADMIN PANEL: INSTANT SYNC LOGIC
════════════════════════════════════════════ */
function openAdmin() { 
  const ov = document.getElementById('admin-overlay');
  if(ov) ov.classList.remove('hidden'); 
}
function closeAdmin() { 
  const ov = document.getElementById('admin-overlay');
  if(ov) ov.classList.add('hidden'); 
}

function checkAdminPass() {
  const pass = document.getElementById('admin-pass');
  if (pass && pass.value === 'sourabh@2025') {
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-content').classList.remove('hidden');
    loadAdminUI();
  } else { 
    showToast('❌ Wrong password!'); 
  }
}

function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const t = document.getElementById(tabId);
  if(t) t.classList.remove('hidden');
  if(btn) btn.classList.add('active');
}

function loadAdminUI() {
  const ap1 = document.getElementById('about-edit-p1');
  const ap2 = document.getElementById('about-edit-p2');
  if(ap1) ap1.value = siteData.about.p1;
  if(ap2) ap2.value = siteData.about.p2;

  const mkList = (arr, tKey, dFunc) => arr.map((item, i) => `<div class="admin-item"><span>${item[tKey]}</span><button class="admin-item-del" onclick="${dFunc}(${i})">🗑</button></div>`).join('');
  
  const sl = document.getElementById('skills-admin-list');
  if(sl) sl.innerHTML = mkList(siteData.skills, 'title', 'delSkill');
  
  const el = document.getElementById('exp-admin-list');
  if(el) el.innerHTML = mkList(siteData.experience, 'role', 'delExp');
  
  const al = document.getElementById('achievements-admin-list');
  if(al) al.innerHTML = mkList(siteData.achievements, 'title', 'delAch');
  
  const cl = document.getElementById('certs-admin-list');
  if(cl) cl.innerHTML = mkList(siteData.certifications, 'title', 'delCert');
  
  const pl = document.getElementById('projects-admin-list');
  if(pl) pl.innerHTML = mkList(siteData.projects, 'title', 'delProj');
}

// INSTANT SAVE FUNCTION
function syncAndSave() {
  const ap1 = document.getElementById('about-edit-p1');
  const ap2 = document.getElementById('about-edit-p2');
  if(ap1 && ap2) {
    siteData.about.p1 = ap1.value;
    siteData.about.p2 = ap2.value;
  }
  saveData();
  renderAllUI();
  loadAdminUI();
}

// Add Functions
function addSkillCategory() {
  const t = document.getElementById('new-skill-cat').value.trim();
  const i = document.getElementById('new-skill-items').value.split(',').map(s=>s.trim()).filter(Boolean);
  if(t) { 
    siteData.skills.push({icon:'🔹', title:t, items:i}); 
    document.getElementById('new-skill-cat').value=''; 
    document.getElementById('new-skill-items').value=''; 
    syncAndSave();
    showToast("✅ Skill Added");
  } else { showToast("⚠️ Title required"); }
}

function addExperience() {
  const r = document.getElementById('new-exp-role').value.trim();
  const c = document.getElementById('new-exp-company').value.trim();
  const pts = document.getElementById('new-exp-points').value.split(',').map(s=>s.trim()).filter(Boolean);
  if(r && c) { 
    siteData.experience.push({
      role: r, 
      company: c, 
      period: document.getElementById('new-exp-period').value, 
      location: document.getElementById('new-exp-location').value, 
      points: pts
    }); 
    document.getElementById('new-exp-role').value=''; 
    document.getElementById('new-exp-company').value=''; 
    document.getElementById('new-exp-points').value=''; 
    syncAndSave();
    showToast("✅ Experience Added");
  } else { showToast("⚠️ Role & Company required"); }
}

function addAchievement() {
  const t = document.getElementById('new-ach-title').value.trim();
  if(t) { 
    siteData.achievements.push({icon:'✨', title:t, desc:document.getElementById('new-ach-desc').value}); 
    document.getElementById('new-ach-title').value=''; 
    document.getElementById('new-ach-desc').value=''; 
    syncAndSave();
    showToast("✅ Achievement Added");
  } else { showToast("⚠️ Title required"); }
}

function addCertification() {
  const t = document.getElementById('new-cert-title').value.trim();
  if(t) { 
    siteData.certifications.push({icon:'🎓', title:t, org:document.getElementById('new-cert-org').value, year:document.getElementById('new-cert-year').value}); 
    document.getElementById('new-cert-title').value=''; 
    syncAndSave();
    showToast("✅ Certification Added");
  } else { showToast("⚠️ Title required"); }
}

function addProject() {
  const t = document.getElementById('new-proj-title').value.trim();
  const tg = document.getElementById('new-proj-tags').value.split(',').map(s=>s.trim()).filter(Boolean);
  if(t) { 
    siteData.projects.push({title:t, desc:document.getElementById('new-proj-desc').value, tags:tg, link:document.getElementById('new-proj-link').value}); 
    document.getElementById('new-proj-title').value=''; 
    document.getElementById('new-proj-desc').value=''; 
    syncAndSave();
    showToast("✅ Project Added");
  } else { showToast("⚠️ Title required"); }
}

// Delete Functions
function delSkill(i) { siteData.skills.splice(i,1); syncAndSave(); showToast("🗑 Deleted"); }
function delExp(i) { siteData.experience.splice(i,1); syncAndSave(); showToast("🗑 Deleted"); }
function delAch(i) { siteData.achievements.splice(i,1); syncAndSave(); showToast("🗑 Deleted"); }
function delCert(i) { siteData.certifications.splice(i,1); syncAndSave(); showToast("🗑 Deleted"); }
function delProj(i) { siteData.projects.splice(i,1); syncAndSave(); showToast("🗑 Deleted"); }

// Save & Reset
function saveAll() {
  syncAndSave();
  closeAdmin();
  showToast('💾 Saved successfully!');
}

function resetAll() {
  if (confirm('Reset to defaults? Cannot be undone.')) {
    localStorage.removeItem('sourabh_v5_data');
    loadData();
    syncAndSave();
    showToast('↺ Reset to default');
  }
}

/* ═══════════════════════════════════════════
   NARADA CHATBOT
════════════════════════════════════════════ */
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
  t.classList.remove('hidden');
  clearTimeout(toastTimer); 
  toastTimer = setTimeout(() => t.classList.add('hidden'), 3000);
}
