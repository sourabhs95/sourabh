/* ═══════════════════════════════════════════
   DEFAULT DATA
════════════════════════════════════════════ */
const DEFAULT_DATA = {
  about: {
    p1: 'Detail-oriented Pricing & Quotation Specialist with expertise in end-to-end RFQ processing and quote management for electronics components. B.Tech in Electronics & Communication Engineering with 1+ years of experience at Mouser Electronics.',
    p2: 'Managing daily workflows through IQS application and multiple sourcing portals (Global, Matrix). Skilled in BOM scrubbing, pricing analysis, margin optimization, and tracking critical supply chain parameters including lead times, country of origin, and MOQ requirements.'
  },
  skills: [
    { icon: '📦', title: 'Supply Chain & Quoting', items: ['RFQ Processing & Management', 'Quote Development', 'Multi-Portal Management (Global, Matrix)', 'IQS Application', 'BOM Scrubbing & Data Validation', 'Lead Time Analysis', 'Country of Origin Tracking', 'MOQ & Multiple Buy Management', 'Supplier Coordination'] },
    { icon: '📊', title: 'Pricing & Analytics', items: ['Pricing Analysis & Optimization', 'Margin Calculation', 'Customer-Specific Pricing Rules', 'Manufacturer Portal Navigation', 'Vendor Pricing', 'Data Integrity'] },
    { icon: '🔩', title: 'Component & Tech Knowledge', items: ['Component Identification', 'Obsolescence Management', 'Product Lifecycle Analysis', 'Cross-Reference & Alternate Part Sourcing', 'EOL Mitigation', 'NCNR Parts Handling', 'Technical Datasheet Analysis'] },
    { icon: '💻', title: 'Tools & Technology', items: ['Microsoft Office Suite (Excel, PowerPoint, Word, Teams)', 'Power BI', 'Database Management', 'Python', 'AI Workflow', 'Process Improvement'] }
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

/* ═══════════════════════════════════════════
   INITIALIZATION & DATA SYNC
════════════════════════════════════════════ */
function loadData() {
  try {
    const saved = localStorage.getItem('sourabh_portfolio_v3');
    if (saved) {
      siteData = JSON.parse(saved);
      if(!siteData.skills) siteData.skills = DEFAULT_DATA.skills;
      if(!siteData.experience) siteData.experience = DEFAULT_DATA.experience;
      if(!siteData.achievements) siteData.achievements = DEFAULT_DATA.achievements;
      if(!siteData.certifications) siteData.certifications = DEFAULT_DATA.certifications;
      if(!siteData.projects) siteData.projects = DEFAULT_DATA.projects;
      if(!siteData.about) siteData.about = DEFAULT_DATA.about;
    } else {
      siteData = JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
  } catch (e) {
    siteData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveData() {
  localStorage.setItem('sourabh_portfolio_v3', JSON.stringify(siteData));
  renderAll(); // Always render instantly upon saving
}

/* ═══════════════════════════════════════════
   SITE ENTRY & RENDER
════════════════════════════════════════════ */
function enterSite() {
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('main-site').classList.remove('hidden');
  document.body.style.overflow = 'auto';
  
  loadData();
  renderAll();
  
  document.getElementById('year').textContent = new Date().getFullYear();
  initReveal();
  
  // Open Narada chatbot automatically after entering
  setTimeout(() => { document.getElementById('chat-body').classList.remove('hidden'); }, 1500);
}

function renderAll() {
  // ABOUT
  const p1 = document.getElementById('about-p1');
  const p2 = document.getElementById('about-p2');
  if(p1) p1.textContent = siteData.about.p1;
  if(p2) p2.textContent = siteData.about.p2;

  // SKILLS
  const sc = document.getElementById('skills-container');
  if(sc) sc.innerHTML = siteData.skills.map(cat => `
    <div class="skill-category reveal visible">
      <div class="skill-cat-title"><span class="skill-cat-icon">${cat.icon}</span>${cat.title}</div>
      <div class="skill-tags">${cat.items.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
    </div>`).join('');

  // EXPERIENCE
  const ec = document.getElementById('experience-container');
  if(ec) ec.innerHTML = siteData.experience.map(exp => `
    <div class="timeline-item reveal visible">
      <div class="timeline-company">${exp.company}</div>
      <div class="timeline-role">${exp.role}</div>
      <div class="timeline-period">📅 ${exp.period} · 📍 ${exp.location}</div>
      <ul class="timeline-points">${exp.points.map(p => `<li>${p}</li>`).join('')}</ul>
    </div>`).join('');

  // ACHIEVEMENTS
  const ac = document.getElementById('achievements-container');
  if(ac) ac.innerHTML = siteData.achievements.map(a => `
    <div class="achievement-card reveal visible">
      <div class="achievement-icon">${a.icon}</div>
      <div class="achievement-title">${a.title}</div>
      <div class="achievement-desc">${a.desc}</div>
    </div>`).join('');

  // CERTIFICATIONS
  const cc = document.getElementById('certs-container');
  if(cc) cc.innerHTML = siteData.certifications.map(c => `
    <div class="cert-card reveal visible">
      <span class="cert-icon">${c.icon}</span>
      <div>
        <div class="cert-title">${c.title}</div>
        <div class="cert-org">${c.org}</div>
        <div class="cert-year">${c.year}</div>
      </div>
    </div>`).join('');

  // PROJECTS (With tags & link rendering properly mapped)
  const pc = document.getElementById('projects-container');
  if(pc) pc.innerHTML = siteData.projects.map(p => {
    const tagsHtml = p.tags && p.tags.length > 0 ? p.tags.map(t => `<span class="project-tag">${t}</span>`).join('') : '';
    const linkHtml = p.link ? `<a href="${p.link}" class="project-link" target="_blank">View Project →</a>` : '';
    return `
      <div class="project-card reveal visible">
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-tags">${tagsHtml}</div>
        ${linkHtml}
      </div>`;
  }).join('');
}

/* ═══════════════════════════════════════════
   ADMIN LOGIC (Instant Auto-Save)
════════════════════════════════════════════ */
function openAdmin() { document.getElementById('admin-overlay').classList.remove('hidden'); }
function closeAdmin() { document.getElementById('admin-overlay').classList.add('hidden'); }

function checkAdminPass() {
  if (document.getElementById('admin-pass').value === 'sourabh@2025') {
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-content').classList.remove('hidden');
    refreshAdminUI();
  } else { showToast('❌ Wrong password!'); }
}

function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.remove('hidden');
  if(btn) btn.classList.add('active');
}

function refreshAdminUI() {
  document.getElementById('edit-about-p1').value = siteData.about.p1;
  document.getElementById('edit-about-p2').value = siteData.about.p2;

  const mList = (arr, titleKey, delFunc) => arr.map((item, i) => `<div class="admin-item"><span>${item[titleKey]}</span><button class="admin-item-del" onclick="${delFunc}(${i})">🗑</button></div>`).join('');
  
  document.getElementById('admin-list-skills').innerHTML = mList(siteData.skills, 'title', 'delSkill');
  document.getElementById('admin-list-exp').innerHTML = mList(siteData.experience, 'role', 'delExp');
  document.getElementById('admin-list-ach').innerHTML = mList(siteData.achievements, 'title', 'delAch');
  document.getElementById('admin-list-cert').innerHTML = mList(siteData.certifications, 'title', 'delCert');
  document.getElementById('admin-list-proj').innerHTML = mList(siteData.projects, 'title', 'delProj');
}

// EDIT ABOUT
function saveAbout() {
  siteData.about.p1 = document.getElementById('edit-about-p1').value;
  siteData.about.p2 = document.getElementById('edit-about-p2').value;
  saveData(); showToast('✅ About Saved!');
}

// ADD ITEMS (Automatically syncs to UI)
function addSkill() {
  const t = document.getElementById('add-skill-cat').value;
  const i = document.getElementById('add-skill-items').value.split(',').map(s=>s.trim()).filter(Boolean);
  if(t) { siteData.skills.push({icon:'🔹', title: t, items: i}); document.getElementById('add-skill-cat').value=''; document.getElementById('add-skill-items').value=''; saveData(); refreshAdminUI(); showToast("✅ Added"); }
}
function addExp() {
  const r = document.getElementById('add-exp-role').value;
  const c = document.getElementById('add-exp-company').value;
  const p = document.getElementById('add-exp-period').value;
  const l = document.getElementById('add-exp-location').value;
  const pts = document.getElementById('add-exp-points').value.split(',').map(s=>s.trim()).filter(Boolean);
  if(r) { siteData.experience.push({role: r, company: c, period: p, location: l, points: pts}); saveData(); refreshAdminUI(); showToast("✅ Added"); }
}
function addAch() {
  const t = document.getElementById('add-ach-title').value;
  const d = document.getElementById('add-ach-desc').value;
  if(t) { siteData.achievements.push({icon:'✨', title: t, desc: d}); saveData(); refreshAdminUI(); showToast("✅ Added"); }
}
function addCert() {
  const t = document.getElementById('add-cert-title').value;
  const o = document.getElementById('add-cert-org').value;
  const y = document.getElementById('add-cert-year').value;
  if(t) { siteData.certifications.push({icon:'🎓', title: t, org: o, year: y}); saveData(); refreshAdminUI(); showToast("✅ Added"); }
}
function addProj() {
  const t = document.getElementById('add-proj-title').value;
  const d = document.getElementById('add-proj-desc').value;
  const tg = document.getElementById('add-proj-tags').value.split(',').map(s=>s.trim()).filter(Boolean);
  const l = document.getElementById('add-proj-link').value;
  if(t) { siteData.projects.push({title: t, desc: d, tags: tg, link: l}); document.getElementById('add-proj-title').value=''; document.getElementById('add-proj-desc').value=''; document.getElementById('add-proj-tags').value=''; document.getElementById('add-proj-link').value=''; saveData(); refreshAdminUI(); showToast("✅ Added"); }
}

// DELETE ITEMS (Automatically syncs to UI)
function delSkill(i) { siteData.skills.splice(i,1); saveData(); refreshAdminUI(); }
function delExp(i) { siteData.experience.splice(i,1); saveData(); refreshAdminUI(); }
function delAch(i) { siteData.achievements.splice(i,1); saveData(); refreshAdminUI(); }
function delCert(i) { siteData.certifications.splice(i,1); saveData(); refreshAdminUI(); }
function delProj(i) { siteData.projects.splice(i,1); saveData(); refreshAdminUI(); }

function resetData() {
  if (confirm('Reset all data to defaults? This cannot be undone.')) {
    localStorage.removeItem('sourabh_portfolio_v3');
    loadData(); renderAll(); refreshAdminUI(); showToast('↺ Reset to default');
  }
}

/* ═══════════════════════════════════════════
   NARADA CHATBOT
════════════════════════════════════════════ */
function toggleChat() { document.getElementById('chat-body').classList.toggle('hidden'); }

function handleChat(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('chat-input');
    const container = document.getElementById('msg-container');
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
    } else if (msg.includes('about')) {
        reply = siteData.about.p1;
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
   SCROLL & UTILS
════════════════════════════════════════════ */
function initReveal() {
  const obs = new IntersectionObserver(e => e.forEach(en => { if (en.isIntersecting) en.target.classList.add('visible'); }), { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.remove('hidden');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.add('hidden'), 3000);
}
