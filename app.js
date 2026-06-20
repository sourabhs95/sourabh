// Add this helper function at the bottom of your app.js
function speak(text) {
  if ('speechSynthesis' in window) {
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    // Optional: Try to find a specific voice (e.g., an Indian English voice)
    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(v => v.lang.includes('en-IN'));
    if (indianVoice) utterance.voice = indianVoice;
    
    utterance.pitch = 1;
    utterance.rate = 0.9; // Slightly slower for clarity
    window.speechSynthesis.speak(utterance);
  }
}

// Update your handleChat function to call speak()
function handleChat(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('chat-input');
    const container = document.getElementById('msg-container');
    if(!input || !container) return;
    
    const msg = input.value.toLowerCase().trim();
    if (!msg) return;
    
    container.innerHTML += `<div style="text-align:right; margin:8px 0; color:#E2E8F0; padding:10px 14px; background:rgba(255,255,255,0.1); border-radius:12px 12px 0px 12px; display:inline-block; float:right; clear:both; border: 1px solid rgba(255,255,255,0.2);">${input.value}</div>`;
    
    let reply = "I am pondering this... Ask me about Sourabh's Experience, Skills, Projects, or Certifications.";
    
    if (msg === 'hi' || msg === 'hello' || msg.includes('hare krishna')) {
        reply = "Hare Krishna! How can I assist you with Sourabh's portfolio today?";
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
        reply = "You can email him at sourabhshet95@gmail.com or call +91 90 19 21 53 48.";
    }

    setTimeout(() => {
      container.innerHTML += `<div style="color:var(--gold); margin:8px 0; padding:10px 14px; background:rgba(255,215,0,0.1); border-radius:12px 12px 12px 0px; display:inline-block; float:left; clear:both; border: 1px solid rgba(255,215,0,0.2);"><b>Narada:</b> ${reply}</div>`;
      container.scrollTop = container.scrollHeight;
      
      // TRIGGER THE VOICE
      speak(reply);
      
    }, 400);

    input.value = '';
    container.scrollTop = container.scrollHeight;
  }
}
