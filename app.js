/* ═══════════════════════════════════════════
   DEFAULT DATA
════════════════════════════════════════════ */
const DEFAULT_DATA = {
  skills: [
    { icon: '📦', title: 'Supply Chain & Quoting', items: ['RFQ Processing & Management', 'Quote Development', 'Multi-Portal Management (Global, Matrix)', 'IQS Application', 'BOM Scrubbing & Data Validation', 'Lead Time Analysis', 'Country of Origin Tracking', 'MOQ & Multiple Buy Management', 'Supplier Coordination'] },
    { icon: '📊', title: 'Pricing & Analytics', items: ['Pricing Analysis & Optimization', 'Margin Calculation', 'Customer-Specific Pricing Rules', 'Manufacturer Portal Navigation', 'Vendor Pricing', 'Data Integrity'] },
    { icon: '🔩', title: 'Component & Tech Knowledge', items: ['Component Identification', 'Obsolescence Management', 'Product Lifecycle Analysis', 'Cross-Reference & Alternate Part Sourcing', 'EOL Mitigation', 'NCNR Parts Handling', 'Technical Datasheet Analysis'] },
    { icon: '💻', title: 'Tools & Technology', items: ['Microsoft Office Suite (Excel, PowerPoint, Word, Teams)', 'Power BI', 'Database Management', 'Python', 'AI Workflow', 'Process Improvement'] }
  ],
  experience: [
    {
      company: 'Mouser Electronics (TTI Inc)',
      role: 'Specialist I – Quote Management (QRG Representative)',
      period: 'September 2024 – Present',
      location: 'Bengaluru, India',
      points: [
        'Processed high-volume RFQs daily from multiple sourcing portals including Global and Matrix platforms, managing complete quote workflows for electronics components, assemblies, and specialized equipment.',
        'Configured customer RFQs in IQS tool by setting quote parameters, customer requirements, and technical specifications to ensure accurate processing workflow.',
        'Performed BOM scrubbing and data validation to identify unresolved part numbers, correct data inconsistencies, and maximize line-item capture for complete quotations.',
        'Extracted and analyzed pricing components from multiple manufacturer portals, evaluating real-time cost data, tiered pricing structures, and volume discounts to determine optimal pricing strategies.',
        'Calculated competitive pricing margins by applying customer-specific rule sets, evaluating supplier costs and lead times, and balancing profitability with market competitiveness.',
        'Managed supply chain parameters including lead time analysis, country of origin tracking for compliance, minimum buy quantities (MOQ), and multiple buy quantities to meet customer delivery requirements.',
        'Consolidated quote data by aggregating pricing, availability, lead times, country of origin, MOQ details, and technical specifications into customer-ready quotations.',
        'Served as Single Point of Contact (SPOC) for complex scrubbing processes and conducted lifecycle analysis to identify obsolete parts and recommend alternatives.',
        'Provided technical support to sales teams and regional customer service by troubleshooting IQS application issues and delivering training on quoting procedures.',
        'Awarded Rising Star Award (2025) and Star Performer of Q1 2026 for exceptional quote processing accuracy, efficiency, and consistent achievement of strict turnaround deadlines.'
      ]
    }
  ],
  achievements: [
    { icon: '⭐', title: 'Rising Star Award 2025', desc: 'Awarded at Mouser Electronics for exceptional performance in quote processing accuracy and efficiency within the first year of joining.' },
    { icon: '🏆', title: 'Star Performer Q1 2026', desc: 'Recognized for consistently meeting critical turnaround deadlines and delivering high-quality quotations that exceeded expectations.' },
    { icon: '🎯', title: 'SPOC for Complex BOM Scrubbing', desc: 'Served as the go-to Single Point of Contact for complex BOM scrubbing processes, streamlining workflows and reducing resolution time for unresolved part numbers across multiple portals.' }
  ],
  certifications: [
    { icon: '📊', title: 'Business Analytics with Excel & Power BI', org: 'Simplilearn', year: '2024' },
    { icon: '📈', title: 'Data Analytics', org: 'Accenture (Forage)', year: '2024' },
    { icon: '🔵', title: 'Power BI Analytics', org: 'J2J Institute', year: '2024' }
  ],
  projects: [
    { title: 'BOM Scrubbing Automation', desc: 'Developed a systematic approach for scrubbing Bills of Materials (BOMs), streamlining the identification and resolution of unresolved part numbers across Global and Matrix portals.', tags: ['Excel', 'IQS', 'Process Improvement'], link: '' },
    { title: 'Pricing Margin Optimization', desc: 'Analyzed and applied customer-specific pricing rule sets to consistently deliver competitive margins while maintaining profitability targets for Mouser Electronics.', tags: ['Pricing Analysis', 'Excel', 'Data Analytics'], link: '' },
    { title: 'Supply Chain Data Dashboard', desc: 'Built Power BI dashboards to visualize lead times, country of origin data, and MOQ trends, providing actionable insights for quote management decisions.', tags: ['Power BI', 'Data Analytics', 'Supply Chain'], link: '' }
  ],
  about: {
    p1: 'Detail-oriented Pricing & Quotation Specialist with expertise in end-to-end RFQ processing and quote management for electronics components. B.Tech in Electronics & Communication Engineering with 1+ years of experience at Mouser Electronics.',
    p2: 'Managing daily workflows through IQS application and multiple sourcing portals (Global, Matrix). Skilled in BOM scrubbing, pricing analysis, margin optimization, and tracking critical supply chain parameters including lead times, country of origin, and MOQ requirements.'
  }
};

const SANSKRIT = {
  'About Me': 'मम परिचयः',
  'Skills & Expertise': 'कौशल्यानि',
  'Work Experience': 'कार्यानुभवः',
  'Projects': 'परियोजनाः',
  'Sourabh Satish Shet': 'सौरभ सतीश शेट',
  'Pricing & Quotation Specialist': 'मूल्य-उद्धरण विशेषज्ञः',
  '📍 Yelahanka, Bangalore · Electronics Components Supply Chain': '📍 येलहंका, बंगळूरु · इलेक्ट्रॉनिक्स आपूर्ति श्रृंखला',
  'Detail-oriented Pricing & Quotation Specialist with expertise in end-to-end RFQ processing and quote management for electronics components. B.Tech in Electronics & Communication Engineering with 1+ years of experience at Mouser Electronics.': 'विस्तार-अभिमुखी मूल्य-उद्धरण विशेषज्ञः यः इलेक्ट्रॉनिक्स घटकानाम् RFQ प्रसंस्करणे निपुणः। B.Tech इलेक्ट्रॉनिक्स एवं संचार अभियांत्रिकी १+ वर्षस्य अनुभवेन सह।',
  'Managing daily workflows through IQS application and multiple sourcing portals (Global, Matrix). Skilled in BOM scrubbing, pricing analysis, margin optimization, and tracking critical supply chain parameters including lead times, country of origin, and MOQ requirements.': 'IQS अनुप्रयोगेन एवं बहुविध स्रोत-पोर्टल्स द्वारा दैनिक कार्यप्रवाहस्य प्रबंधनम्। BOM विश्लेषण, मूल्य-अनुकूलन, एवं आपूर्ति श्रृंखला प्रबंधने कुशलः।'
};

let isTranslated = false;
let siteData = loadData();

/* ═══════════════════════════════════════════
   LOAD / SAVE DATA
════════════════════════════════════════════ */
function loadData() {
  try {
    const saved = localStorage.getItem('sourabh_portfolio');
    return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_DATA));
  } catch { return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
}
function saveData() {
  localStorage.setItem('sourabh_portfolio', JSON.stringify(siteData));
}

/* ═══════════════════════════════════════════
   WELCOME → ENTER
════════════════════════════════════════════ */
function enterSite() {
  const ws = document.getElementById('welcome-screen');
  const ms = document.getElementById('main-site');
  ws.style.opacity = '0';
  ws.style.transform = 'scale(1.05)';
  ws.style.transition = 'all 0.8s cubic-bezier(0.4,0,0.2,1)';
  setTimeout(() => {
    ws.classList.add('hidden');
    ms.classList.remove('hidden');
    document.body.style.overflow = 'auto';
    initSite();
  }, 800);
}
document.body.style.overflow = 'hidden';

/* ═══════════════════════════════════════════
   INIT SITE
════════════════════════════════════════════ */
function initSite() {
  renderSkills();
  renderExperience();
  renderAchievements();
  renderCertifications();
  renderProjects();
  document.getElementById('year').textContent = new Date().getFullYear();
  initReveal();
  initNavScroll();
}

/* ═══════════════════════════════════════════
   RENDER FUNCTIONS
════════════════════════════════════════════ */
function renderSkills() {
  const c = document.getElementById('skills-container');
  c.innerHTML = siteData.skills.map(cat => `
    <div class="skill-category reveal">
      <div class="skill-cat-title"><span class="skill-cat-icon">${cat.icon}</span>${cat.title}</div>
      <div class="skill-tags">${cat.items.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
    </div>
  `).join('');
  triggerReveal();
}

function renderExperience() {
  const c = document.getElementById('experience-container');
  c.innerHTML = siteData.experience.map(exp => `
    <div class="timeline-item reveal">
      <div class="timeline-header">
        <div class="timeline-company">${exp.company}</div>
        <div class="timeline-role">${exp.role}</div>
        <div class="timeline-period">📅 ${exp.period} · 📍 ${exp.location}</div>
      </div>
      <ul class="timeline-points">${exp.points.map(p => `<li>${p}</li>`).join('')}</ul>
    </div>
  `).join('');
  triggerReveal();
}

function renderAchievements() {
  const c = document.getElementById('achievements-container');
  c.innerHTML = siteData.achievements.map(a => `
    <div class="achievement-card reveal">
      <div class="achievement-icon">${a.icon}</div>
      <div class="achievement-title">${a.title}</div>
      <div class="achievement-desc">${a.desc}</div>
    </div>
  `).join('');
  triggerReveal();
}

function renderCertifications() {
  const c = document.getElementById('certs-container');
  c.innerHTML = siteData.certifications.map(cert => `
    <div class="cert-card reveal">
      <span class="cert-icon">${cert.icon}</span>
      <div>
        <div class="cert-title">${cert.title}</div>
        <div class="cert-org">${cert.org}</div>
        <div class="cert-year">${cert.year}</div>
      </div>
    </div>
  `).join('');
  triggerReveal();
}

function renderProjects() {
  const c = document.getElementById('projects-container');
  c.innerHTML = siteData.projects.map(p => `
    <div class="project-card reveal">
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
      ${p.link ? `<a href="${p.link}" class="project-link" target="_blank">View Project →</a>` : ''}
    </div>
  `).join('');
  triggerReveal();
}

/* ═══════════════════════════════════════════
   SCROLL REVEAL & NAV & SANSKRIT
════════════════════════════════════════════ */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
function triggerReveal() {
  setTimeout(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
  }, 100);
}

function initNavScroll() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) nav.style.padding = '8px 48px';
    else nav.style.padding = '14px 48px';
  });
}
function toggleNav() { document.querySelector('.nav-links').classList.toggle('open'); }

function toggleTranslation() {
  isTranslated = !isTranslated;
  document.querySelector('.translate-btn').classList.toggle('active', isTranslated);
  const swaps = [
    { id: 'hero-name', en: 'Sourabh Satish Shet', sk: SANSKRIT['Sourabh Satish Shet'] },
    { id: 'hero-title', en: 'Pricing & Quotation Specialist', sk: SANSKRIT['Pricing & Quotation Specialist'] },
    { id: 'hero-location', en: '📍 Yelahanka, Bangalore · Electronics Components Supply Chain', sk: SANSKRIT['📍 Yelahanka, Bangalore · Electronics Components Supply Chain'] },
    { id: 'about-title', en: 'About Me', sk: SANSKRIT['About Me'] },
    { id: 'skills-title', en: 'Skills & Expertise', sk: SANSKRIT['Skills & Expertise'] },
    { id: 'exp-title', en: 'Work Experience', sk: SANSKRIT['Work Experience'] },
    { id: 'projects-title', en: 'Projects', sk: SANSKRIT['Projects'] },
    { id: 'about-p1', en: siteData.about.p1, sk: SANSKRIT[siteData.about.p1] || 'अनुवाद उपलब्धम् नास्ति…' },
    { id: 'about-p2', en: siteData.about.p2, sk: SANSKRIT[siteData.about.p2] || 'अनुवाद उपलब्धम् नास्ति…' },
    { id: 'hero-sanskrit', en: 'सौरभ सतीश शेट', sk: 'Sourabh Satish Shet' }
  ];
  swaps.forEach(({ id, en, sk }) => {
    const el = document.getElementById(id);
    if (el) el.textContent = isTranslated ? sk : en;
  });
  showToast(isTranslated ? '🕉 संस्कृत भाषायाम् अनुवादितम्' : '🌐 Switched back to English');
}

/* ═══════════════════════════════════════════
   ADMIN PANEL LOGIC (FIXED)
════════════════════════════════════════════ */
function openAdmin() { document.getElementById('admin-overlay').classList.remove('hidden'); }
function closeAdmin() { document.getElementById('admin-overlay').classList.add('hidden'); }

function checkAdminPass() {
  const pw = document.getElementById('admin-pass').value;
  if (pw === 'sourabh@2025') {
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-content').classList.remove('hidden');
    loadAdminData();
  } else { showToast('❌ Wrong password!'); }
}

function loadAdminData() {
  // Skills
  const sl = document.getElementById('skills-admin-list');
  sl.innerHTML = siteData.skills.map((cat, ci) => `
    <div class="admin-item"><span>${cat.icon} ${cat.title} (${cat.items.length} skills)</span><button class="admin-item-del" onclick="deleteSkillCat(${ci})">🗑</button></div>
  `).join('');

  // Projects
  const pl = document.getElementById('projects-admin-list');
  pl.innerHTML = siteData.projects.map((p, pi) => `
    <div class="admin-item"><span>${p.title}</span><button class="admin-item-del" onclick="deleteProject(${pi})">🗑</button></div>
  `).join('');

  // Certs
  const cl = document.getElementById('certs-admin-list');
  cl.innerHTML = siteData.certifications.map((c, ci) => `
    <div class="admin-item"><span>${c.icon} ${c.title} — ${c.org}</span><button class="admin-item-del" onclick="deleteCert(${ci})">🗑</button></div>
  `).join('');

  // Achievements
  const al = document.getElementById('achievements-admin-list');
  al.innerHTML = siteData.achievements.map((a, ai) => `
    <div class="admin-item"><span>${a.icon} ${a.title}</span><button class="admin-item-del" onclick="deleteAchievement(${ai})">🗑</button></div>
  `).join('');

  // About
  document.getElementById('about-edit-p1').value = siteData.about.p1;
  document.getElementById('about-edit-p2').value = siteData.about.p2;
}

function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  btn.classList.add('active');
}

// Add/Delete Skill
function addSkillCategory() {
  const cat = document.getElementById('new-skill-cat').value.trim();
  const items = document.getElementById('new-skill-items').value.split(',').map(s => s.trim()).filter(Boolean);
  if (!cat || items.length === 0) { showToast('⚠ Fill category & skills'); return; }
  siteData.skills.push({ icon: '🔹', title: cat, items });
  document.getElementById('new-skill-cat').value = ''; document.getElementById('new-skill-items').value = '';
  loadAdminData(); showToast('✅ Skill category added!');
}
function deleteSkillCat(i) { siteData.skills.splice(i, 1); loadAdminData(); showToast('🗑 Skill category removed'); }

// Add/Delete Project
function addProject() {
  const title = document.getElementById('new-proj-title').value.trim();
  const desc = document.getElementById('new-proj-desc').value.trim();
  const tags = document.getElementById('new-proj-tags').value.split(',').map(s => s.trim()).filter(Boolean);
  const link = document.getElementById('new-proj-link').value.trim();
  if (!title || !desc) { showToast('⚠ Title and description required'); return; }
  siteData.projects.push({ title, desc, tags, link });
  document.getElementById('new-proj-title').value = ''; document.getElementById('new-proj-desc').value = '';
  document.getElementById('new-proj-tags').value = ''; document.getElementById('new-proj-link').value = '';
  loadAdminData(); showToast('✅ Project added!');
}
function deleteProject(i) { siteData.projects.splice(i, 1); loadAdminData(); showToast('🗑 Project removed'); }

// Add/Delete Cert
function addCertification() {
  const title = document.getElementById('new-cert-title').value.trim();
  const org = document.getElementById('new-cert-org').value.trim();
  const year = document.getElementById('new-cert-year').value.trim();
  if (!title || !org) { showToast('⚠ Fill cert title and org'); return; }
  siteData.certifications.push({ icon: '🎓', title, org, year });
  document.getElementById('new-cert-title').value = ''; document.getElementById('new-cert-org').value = ''; document.getElementById('new-cert-year').value = '';
  loadAdminData(); showToast('✅ Certification added!');
}
function deleteCert(i) { siteData.certifications.splice(i, 1); loadAdminData(); showToast('🗑 Certification removed'); }

// Add/Delete Achievement
function addAchievement() {
  const title = document.getElementById('new-ach-title').value.trim();
  const desc = document.getElementById('new-ach-desc').value.trim();
  if (!title || !desc) { showToast('⚠ Fill title and desc'); return; }
  siteData.achievements.push({ icon: '✨', title, desc });
  document.getElementById('new-ach-title').value = ''; document.getElementById('new-ach-desc').value = '';
  loadAdminData(); showToast('✅ Achievement added!');
}
function deleteAchievement(i) { siteData.achievements.splice(i, 1); loadAdminData(); showToast('🗑 Achievement removed'); }

// Save All / About
function saveAbout() {
  siteData.about.p1 = document.getElementById('about-edit-p1').value;
  siteData.about.p2 = document.getElementById('about-edit-p2').value;
  document.getElementById('about-p1').textContent = siteData.about.p1;
  document.getElementById('about-p2').textContent = siteData.about.p2;
  showToast('✅ About text saved!');
}

function saveAll() {
  saveData(); // Commit to LocalStorage
  renderSkills();
  renderProjects();
  renderCertifications();
  renderAchievements(); // Refresh Achievement UI
  closeAdmin();
  showToast('💾 All changes saved successfully!');
}

function resetAll() {
  if (confirm('Reset all data to defaults? This cannot be undone.')) {
    localStorage.removeItem('sourabh_portfolio');
    siteData = JSON.parse(JSON.stringify(DEFAULT_DATA));
    loadAdminData();
    renderSkills(); renderProjects(); renderCertifications(); renderAchievements();
    showToast('↺ Reset to default data');
  }
}

/* ═══════════════════════════════════════════
   NARADA CHATBOT
════════════════════════════════════════════ */
function toggleChat() {
  document.getElementById('chat-body').classList.toggle('hidden');
}

function handleChat(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('chat-input');
    const container = document.getElementById('msg-container');
    const msg = input.value.toLowerCase();
    
    // User message
    container.innerHTML += `<div style="text-align:right; margin:8px 0; color:#555; padding:8px; background:#f0f0f0; border-radius:8px; display:inline-block; float:right; clear:both;">${input.value}</div>`;
    
    // Simple logic response based on siteData
    let reply = "I am pondering this... ask me about Pricing, Experience, Skills, or Projects.";
    if (msg.includes('skill')) reply = "Sourabh specializes in: " + siteData.skills.map(s => s.title).join(', ') + ".";
    else if (msg.includes('experience') || msg.includes('work')) reply = `He currently works at ${siteData.experience[0].company} as a ${siteData.experience[0].role}.`;
    else if (msg.includes('project')) reply = `He has worked on things like: ${siteData.projects.map(p=>p.title).join(', ')}.`;
    else if (msg.includes('contact') || msg.includes('email')) reply = "You can email him at sourabhshet95@gmail.com.";
    
    // Bot message
    setTimeout(() => {
      container.innerHTML += `<div style="color:var(--gold-dark); margin:8px 0; padding:8px; background:rgba(201,168,76,0.1); border-radius:8px; display:inline-block; float:left; clear:both;"><b>Narada:</b> ${reply}</div>`;
      container.scrollTop = container.scrollHeight;
    }, 400);

    input.value = '';
    container.scrollTop = container.scrollHeight;
  }
}

/* ═══════════════════════════════════════════
   UTILS
════════════════════════════════════════════ */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), 3000);
}

document.getElementById('admin-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeAdmin();
});
