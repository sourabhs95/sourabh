/* ============================================================
   PORTFOLIO ENGINE
   Renders window.SITE_DATA into the page and powers the
   built-in admin / edit panel. No build step, no backend.
   ============================================================ */
(function(){
  "use strict";

  /* ---------- CHANGE THIS BEFORE PUBLISHING ---------- */
  const ADMIN_PASSWORD = "admin123";
  const STORAGE_KEY = "portfolio_data_v1";
  /* ---------------------------------------------------- */

  const DEFAULT_DATA = JSON.parse(JSON.stringify(window.SITE_DATA));
  let DATA = JSON.parse(JSON.stringify(window.SITE_DATA));
  let editMode = false;
  let unlocked = false;

  /* ---------- path helpers ---------- */
  function getPath(obj, path){
    return path.split(".").reduce((o,k)=> (o==null ? undefined : o[k]), obj);
  }
  function setPath(obj, path, value){
    const keys = path.split(".");
    let cur = obj;
    for(let i=0;i<keys.length-1;i++) cur = cur[keys[i]];
    cur[keys[keys.length-1]] = value;
  }

  function loadFromStorage(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(raw){ DATA = JSON.parse(raw); }
    }catch(e){ /* ignore corrupt storage */ }
  }

  /* ---------- generic element builders ---------- */
  function editableEl(tag, path, value, className){
    const el = document.createElement(tag);
    if(className) el.className = className;
    el.dataset.edit = path;
    el.textContent = value == null ? "" : value;
    el.contentEditable = editMode ? "true" : "false";
    el.addEventListener("input", ()=>{
      setPath(DATA, path, el.textContent.trim());
      if(path.startsWith("hero.")){ renderHeroContacts(); renderContactGrid(); }
    });
    return el;
  }
  function addBtn(label, fn){
    const b = document.createElement("button");
    b.type = "button"; b.className = "edit-add"; b.textContent = label;
    b.addEventListener("click", fn);
    return b;
  }
  function removeBtn(fn){
    const b = document.createElement("button");
    b.type = "button"; b.className = "edit-remove"; b.textContent = "✕"; b.title = "Remove";
    b.addEventListener("click", fn);
    return b;
  }
  function el(tag, className, text){
    const e = document.createElement(tag);
    if(className) e.className = className;
    if(text != null) e.textContent = text;
    return e;
  }

  /* ---------- static text fields ---------- */
  function fillStatic(id, path){
    const node = document.getElementById(id);
    if(!node) return;
    node.textContent = getPath(DATA, path);
    node.contentEditable = editMode ? "true" : "false";
    if(!node.dataset.bound){
      node.addEventListener("input", ()=> setPath(DATA, path, node.textContent.trim()));
      node.dataset.bound = "1";
    }
  }

  function renderHeroStatic(){
    fillStatic("heroEyebrow", "hero.eyebrow");
    fillStatic("heroName", "hero.name");
    fillStatic("heroTitle", "hero.title");
    fillStatic("heroSubtitle", "hero.subtitle");
    fillStatic("heroStatus", "hero.status");
    fillStatic("heroTagline", "hero.tagline");
    fillStatic("aboutHeading", "about.heading");
    fillStatic("aboutText", "about.text");
    fillStatic("footerText", "footer.text");
    document.title = DATA.meta.siteTitle;
  }

  function renderHeroContacts(){
    const wrap = document.getElementById("heroContacts");
    wrap.innerHTML = "";
    const h = DATA.hero;
    const items = [
      { text: h.location },
      { text: h.email, href: "mailto:" + h.email },
      { text: h.phone, href: "tel:" + h.phone.replace(/\s+/g,"") },
      { text: h.linkedinLabel, href: h.linkedin },
      { text: h.websiteLabel, href: h.website }
    ];
    items.forEach(it=>{
      const node = it.href ? document.createElement("a") : document.createElement("span");
      if(it.href){
        node.href = it.href;
        if(it.href.startsWith("http")){ node.target = "_blank"; node.rel = "noopener"; }
      }
      node.textContent = it.text;
      wrap.appendChild(node);
    });
  }

  function renderStats(){
    const wrap = document.getElementById("stats");
    wrap.innerHTML = "";
    DATA.stats.forEach((s, i)=>{
      const box = el("div", "stat");
      box.appendChild(editableEl("div", `stats.${i}.value`, s.value, "stat-value mono"));
      box.appendChild(editableEl("div", `stats.${i}.label`, s.label, "stat-label"));
      wrap.appendChild(box);
    });
  }

  function renderExperience(){
    const wrap = document.getElementById("experienceList");
    wrap.innerHTML = "";
    DATA.experience.forEach((exp, i)=>{
      const item = el("div", "experience-item");

      const head = el("div", "exp-head");
      head.appendChild(editableEl("h3", `experience.${i}.role`, exp.role, "exp-role"));
      const datesRow = el("div", "edit-row");
      datesRow.appendChild(editableEl("span", `experience.${i}.dates`, exp.dates, "exp-dates mono"));
      datesRow.appendChild(removeBtn(()=>{ DATA.experience.splice(i,1); rerender(); }));
      head.appendChild(datesRow);
      item.appendChild(head);

      item.appendChild(editableEl("p", `experience.${i}.company`, `${exp.company} · ${exp.location}`, "exp-company"));

      const ul = el("ul", "exp-bullets");
      exp.bullets.forEach((b, j)=>{
        const li = el("li");
        const row = el("div", "edit-row");
        row.appendChild(editableEl("span", `experience.${i}.bullets.${j}`, b));
        row.appendChild(removeBtn(()=>{ DATA.experience[i].bullets.splice(j,1); rerender(); }));
        li.appendChild(row);
        ul.appendChild(li);
      });
      item.appendChild(ul);
      item.appendChild(addBtn("+ add bullet", ()=>{ DATA.experience[i].bullets.push("New responsibility — click to edit."); rerender(); }));

      wrap.appendChild(item);
    });
    wrap.appendChild(addBtn("+ add role", ()=>{
      DATA.experience.push({ role:"New Role", company:"Company", location:"City, Country", dates:"Month Year — Present", bullets:["Click to edit this bullet."] });
      rerender();
    }));
  }

  function renderCompetencies(){
    const wrap = document.getElementById("competencyList");
    wrap.innerHTML = "";
    DATA.competencies.forEach((cat, i)=>{
      const card = el("div", "competency-card");
      card.appendChild(editableEl("h3", `competencies.${i}.category`, cat.category));
      const row = el("div", "tag-row");
      cat.items.forEach((tagText, j)=>{
        const chip = el("span", "edit-row");
        chip.style.display = "inline-flex";
        chip.appendChild(editableEl("span", `competencies.${i}.items.${j}`, tagText, "tag"));
        chip.appendChild(removeBtn(()=>{ DATA.competencies[i].items.splice(j,1); rerender(); }));
        row.appendChild(chip);
      });
      card.appendChild(row);
      card.appendChild(addBtn("+ add skill", ()=>{ DATA.competencies[i].items.push("New Skill"); rerender(); }));
      wrap.appendChild(card);
    });
  }

  function renderAchievements(){
    const wrap = document.getElementById("achievementList");
    wrap.innerHTML = "";
    DATA.achievements.forEach((a, i)=>{
      const card = el("div", "achievement-card");
      const metaRow = el("div", "edit-row");
      metaRow.appendChild(editableEl("div", `achievements.${i}.meta`, a.meta, "ach-meta mono"));
      metaRow.appendChild(removeBtn(()=>{ DATA.achievements.splice(i,1); rerender(); }));
      card.appendChild(metaRow);
      card.appendChild(editableEl("div", `achievements.${i}.title`, a.title, "ach-title"));
      card.appendChild(editableEl("div", `achievements.${i}.description`, a.description, "ach-desc"));
      wrap.appendChild(card);
    });
    wrap.appendChild(addBtn("+ add achievement", ()=>{
      DATA.achievements.push({ title:"New Achievement", meta:"Year", description:"Describe the achievement here." });
      rerender();
    }));
  }

  function renderCertifications(){
    const wrap = document.getElementById("certList");
    wrap.innerHTML = "";
    DATA.certifications.forEach((c, i)=>{
      const li = el("li");
      li.appendChild(editableEl("span", `certifications.${i}.name`, c.name));
      const issuerRow = el("span", "edit-row");
      issuerRow.appendChild(editableEl("span", `certifications.${i}.issuer`, c.issuer, "cert-issuer mono"));
      issuerRow.appendChild(removeBtn(()=>{ DATA.certifications.splice(i,1); rerender(); }));
      li.appendChild(issuerRow);
      wrap.appendChild(li);
    });
    const wrapBtn = el("li");
    wrapBtn.style.borderBottom = "none";
    wrapBtn.appendChild(addBtn("+ add certification", ()=>{
      DATA.certifications.push({ name:"New Certification", issuer:"Issuer" });
      rerender();
    }));
    wrap.appendChild(wrapBtn);
  }

  function renderEducation(){
    const wrap = document.getElementById("eduList");
    wrap.innerHTML = "";
    DATA.education.forEach((ed, i)=>{
      const item = el("div", "edu-item");
      const row = el("div", "edit-row");
      row.appendChild(editableEl("div", `education.${i}.degree`, ed.degree, "edu-degree"));
      row.appendChild(removeBtn(()=>{ DATA.education.splice(i,1); rerender(); }));
      item.appendChild(row);
      item.appendChild(editableEl("div", `education.${i}.school`, ed.school, "edu-school"));
      item.appendChild(editableEl("div", `education.${i}.dates`, ed.dates, "edu-dates mono"));
      wrap.appendChild(item);
    });
    wrap.appendChild(addBtn("+ add education", ()=>{
      DATA.education.push({ degree:"Degree", school:"Institution", dates:"Year — Year" });
      rerender();
    }));
  }

  function renderLanguages(){
    const wrap = document.getElementById("langList");
    wrap.innerHTML = "";
    DATA.languages.forEach((lang, i)=>{
      const chip = el("span", "edit-row");
      chip.style.display = "inline-flex";
      chip.appendChild(editableEl("span", `languages.${i}`, lang, "tag"));
      chip.appendChild(removeBtn(()=>{ DATA.languages.splice(i,1); rerender(); }));
      wrap.appendChild(chip);
    });
    wrap.appendChild(addBtn("+ add", ()=>{ DATA.languages.push("New Language"); rerender(); }));
  }

  function renderContactGrid(){
    const wrap = document.getElementById("contactGrid");
    wrap.innerHTML = "";
    const h = DATA.hero;
    const cells = [
      { label:"Email", value:h.email, href:"mailto:"+h.email },
      { label:"Phone", value:h.phone, href:"tel:"+h.phone.replace(/\s+/g,"") },
      { label:"Location", value:h.location },
      { label:"LinkedIn", value:h.linkedinLabel, href:h.linkedin },
      { label:"Portfolio", value:h.websiteLabel, href:h.website }
    ];
    cells.forEach(c=>{
      const cell = c.href ? document.createElement("a") : document.createElement("div");
      cell.className = "contact-cell";
      if(c.href){
        cell.href = c.href;
        if(c.href.startsWith("http")){ cell.target="_blank"; cell.rel="noopener"; }
      }
      cell.appendChild(el("div","contact-label", c.label));
      cell.appendChild(el("div","contact-value", c.value));
      wrap.appendChild(cell);
    });
  }

  function renderFooter(){
    const resumeBtn = document.getElementById("resumeBtn");
    if(resumeBtn && DATA.footer.resumeNote) resumeBtn.setAttribute("href", DATA.footer.resumeNote);
  }

  function reapplyEditMode(){
    document.body.classList.toggle("edit-mode", editMode);
    document.querySelectorAll("[data-edit]").forEach(n=>{ n.contentEditable = editMode ? "true" : "false"; });
  }

  function renderAll(){
    renderHeroStatic();
    renderHeroContacts();
    renderStats();
    renderExperience();
    renderCompetencies();
    renderAchievements();
    renderCertifications();
    renderEducation();
    renderLanguages();
    renderContactGrid();
    renderFooter();
    reapplyEditMode();
  }

  function rerender(){
    renderAll();
    rebuildRail();
    updateRailFill();
  }

  /* ---------- scroll reveal ---------- */
  function setupScrollReveal(){
    const targets = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){ entry.target.classList.add("is-visible"); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.15 });
    targets.forEach(t=> obs.observe(t));
  }

  /* ---------- stat counters ---------- */
  function setupCounters(){
    const values = document.querySelectorAll(".stat-value");
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting && !entry.target.dataset.counted){
          entry.target.dataset.counted = "1";
          countUp(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    values.forEach(v=> obs.observe(v));
  }
  function countUp(node){
    const text = node.textContent.trim();
    const match = text.match(/^(\d+)(.*)$/);
    if(!match) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const t0 = performance.now();
    const dur = 800;
    function tick(t){
      const p = Math.min(1, (t - t0) / dur);
      node.textContent = Math.floor(p * target) + suffix;
      if(p < 1) requestAnimationFrame(tick);
      else node.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  /* ---------- circuit rail ---------- */
  function rebuildRail(){
    const rail = document.getElementById("rail");
    const dotsWrap = document.getElementById("railDots");
    if(!rail || !dotsWrap) return;
    dotsWrap.innerHTML = "";
    const railTop = rail.getBoundingClientRect().top + window.scrollY;
    document.querySelectorAll("[data-rail-node]").forEach(node=>{
      const top = node.getBoundingClientRect().top + window.scrollY;
      const dot = el("div", "rail-dot");
      dot.style.top = Math.max(0, top - railTop + 60) + "px";
      const label = el("span", "rail-dot-label mono", node.dataset.railLabel);
      dot.appendChild(label);
      dotsWrap.appendChild(dot);
      const obs = new IntersectionObserver(([entry])=>{
        dot.classList.toggle("lit", entry.isIntersecting);
      }, { rootMargin: "-45% 0px -45% 0px" });
      obs.observe(node);
    });
  }
  function updateRailFill(){
    const fill = document.getElementById("railFill");
    if(!fill) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    fill.style.height = pct + "%";
  }
  function debounce(fn, ms){
    let h; return (...args)=>{ clearTimeout(h); h = setTimeout(()=>fn(...args), ms); };
  }

  /* ---------- admin panel ---------- */
  function setEditMode(on){
    editMode = on;
    document.getElementById("editModeToggle").checked = on;
    reapplyEditMode();
  }

  function setupAdmin(){
    const overlay = document.getElementById("adminOverlay");
    const lockView = document.getElementById("adminLock");
    const contentView = document.getElementById("adminContent");
    const pwInput = document.getElementById("adminPassword");
    const errEl = document.getElementById("adminError");
    const statusEl = document.getElementById("adminStatus");

    function openPanel(){
      overlay.classList.add("open");
      if(unlocked){ lockView.hidden = true; contentView.hidden = false; }
      else { lockView.hidden = false; contentView.hidden = true; pwInput.value = ""; errEl.textContent = ""; pwInput.focus(); }
    }
    function closePanel(){ overlay.classList.remove("open"); }

    document.getElementById("testpointBtn").addEventListener("click", openPanel);
    document.getElementById("adminCloseBtn").addEventListener("click", closePanel);
    overlay.addEventListener("click", (e)=>{ if(e.target === overlay) closePanel(); });
    document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closePanel(); });

    function tryUnlock(){
      if(pwInput.value === ADMIN_PASSWORD){
        unlocked = true;
        lockView.hidden = true;
        contentView.hidden = false;
        errEl.textContent = "";
      } else {
        errEl.textContent = "Incorrect password — try again.";
      }
    }
    document.getElementById("adminUnlockBtn").addEventListener("click", tryUnlock);
    pwInput.addEventListener("keydown", (e)=>{ if(e.key === "Enter") tryUnlock(); });

    document.getElementById("editModeToggle").addEventListener("change", (e)=> setEditMode(e.target.checked));

    document.getElementById("saveLocalBtn").addEventListener("click", ()=>{
      try{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA));
        statusEl.textContent = "Saved in this browser ✓";
      }catch(e){ statusEl.textContent = "Couldn't save — storage may be full or blocked."; }
    });

    document.getElementById("exportBtn").addEventListener("click", ()=>{
      const fileText = "window.SITE_DATA = " + JSON.stringify(DATA, null, 2) + ";\n";
      const blob = new Blob([fileText], { type: "text/javascript" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "data.js";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      statusEl.textContent = "Exported data.js — replace it in your GitHub repo and push.";
    });

    document.getElementById("importBtn").addEventListener("click", ()=> document.getElementById("importFile").click());
    document.getElementById("importFile").addEventListener("change", (e)=>{
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = ()=>{
        const parsed = parseImported(reader.result);
        if(parsed){
          DATA = parsed;
          rerender();
          statusEl.textContent = "Imported ✓ — click \"Save in this browser\" to keep previewing it.";
        } else {
          statusEl.textContent = "Couldn't read that file. Use a data.js or data.json export.";
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    });

    document.getElementById("resetBtn").addEventListener("click", ()=>{
      if(!confirm("Reset all content back to the original resume data? This clears your saved edits in this browser.")) return;
      DATA = JSON.parse(JSON.stringify(DEFAULT_DATA));
      try{ localStorage.removeItem(STORAGE_KEY); }catch(e){}
      rerender();
      statusEl.textContent = "Reset to original ✓";
    });
  }

  function parseImported(text){
    try{
      const trimmed = text.trim();
      if(trimmed.startsWith("{")) return JSON.parse(trimmed);
    }catch(e){ /* fall through */ }
    try{
      const match = text.match(/=\s*({[\s\S]*})\s*;?\s*$/);
      const objStr = match ? match[1] : text;
      return (new Function("return (" + objStr + ");"))();
    }catch(e){ return null; }
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", ()=>{
    loadFromStorage();
    renderAll();
    setupScrollReveal();
    setupCounters();
    rebuildRail();
    updateRailFill();
    setupAdmin();
    window.addEventListener("scroll", updateRailFill, { passive:true });
    window.addEventListener("resize", debounce(rebuildRail, 200));
    window.addEventListener("load", ()=>{ rebuildRail(); updateRailFill(); });
  });
})();
