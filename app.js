// ==========================================
// CORE SITE NAVIGATION
// ==========================================
function enterSite() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('main-site').style.display = 'block';
    document.getElementById('year').textContent = new Date().getFullYear();
}

function toggleNav() {
    document.querySelector('.nav-links').classList.toggle('open');
}

// ==========================================
// GLOBAL TEXT-TO-SPEECH (TTS) FUNCTION
// ==========================================
function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        // Clean markdown or bolding artifacts before speaking
        const cleanText = text.replace(/\*/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        
        // Fetch voices and try to assign an Indian English voice
        const voices = window.speechSynthesis.getVoices();
        const indianVoice = voices.find(v => v.lang.includes('en-IN'));
        if (indianVoice) utterance.voice = indianVoice;
        
        utterance.pitch = 1;
        utterance.rate = 0.9; 
        window.speechSynthesis.speak(utterance);
    }
}

// Chrome/Safari quirk: ensure voices are loaded
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// ==========================================
// NARADA AI CHATBOT LOGIC (Your Profile Bot)
// ==========================================
function toggleChat() {
    const body = document.getElementById('chat-body');
    body.style.display = body.style.display === 'none' ? 'flex' : 'none';
}

function handleNaradaChat(e) {
    if (e.key === 'Enter') {
        const input = document.getElementById('chat-input');
        const container = document.getElementById('msg-container');
        if(!input.value.trim()) return;
        
        const userMsg = input.value;
        const msgLower = userMsg.toLowerCase();
        
        // 1. Display User Message
        container.innerHTML += `
            <div style="text-align:right; margin:8px 0; color:#E2E8F0; padding:10px 14px; background:rgba(255,255,255,0.1); border-radius:12px 12px 0px 12px; display:inline-block; float:right; clear:both; border: 1px solid rgba(255,255,255,0.2);">
                ${userMsg}
            </div>`;
        
        // 2. Determine Bot Response based on Profile Data
        let reply = "I am pondering this. Please ask me about Sourabh's work experience, his pricing skills, or how to contact him.";
        
        if (msgLower.includes('experience') || msgLower.includes('work') || msgLower.includes('job')) {
            reply = "Sourabh works as a Pricing & Quotation Specialist at Mouser Electronics in Bangalore. He manages complex B2B component quotations and automates pricing workflows.";
        } else if (msgLower.includes('skill') || msgLower.includes('tech') || msgLower.includes('excel')) {
            reply = "He is an expert in Supply Chain Analytics, Strategic Pricing, Advanced Excel, Power Query, and Competitor Analysis.";
        } else if (msgLower.includes('contact') || msgLower.includes('email') || msgLower.includes('phone') || msgLower.includes('hire')) {
            reply = "You can reach Sourabh via email at sourabhshet95@gmail.com, or call him directly at +91 9019215348.";
        } else if (msgLower.includes('admin') || msgLower.includes('edit') || msgLower.includes('login')) {
            reply = "To edit the site or change your password, click the Chakra symbol (☸) in the top right navigation bar to open the Admin Panel.";
        } else if (msgLower.includes('hi') || msgLower.includes('hello') || msgLower.includes('namaste')) {
            reply = "Hare Krishna! I am Narada, Sourabh's personal AI assistant. How may I guide you through his portfolio?";
        }

        // 3. Display Bot Response with slight delay to mimic thinking
        setTimeout(() => {
            container.innerHTML += `
                <div style="color:var(--gold); margin:8px 0; padding:10px 14px; background:rgba(255,215,0,0.1); border-radius:12px 12px 12px 0px; display:inline-block; float:left; clear:both; border: 1px solid rgba(255,215,0,0.2);">
                    <b>Narada:</b> ${reply}
                </div>`;
            container.scrollTop = container.scrollHeight;
            
            // Speak the reply aloud
            speak(reply); 
        }, 600);

        // Reset input field
        input.value = '';
        container.scrollTop = container.scrollHeight;
    }
}

// ==========================================
// ADMIN PANEL LOGIC (With Password Memory)
// ==========================================
function openAdmin() { 
    document.getElementById('admin-overlay').style.display = 'flex'; 
}

function closeAdmin() { 
    document.getElementById('admin-overlay').style.display = 'none'; 
    // Reset the panel UI back to login screen on close
    document.getElementById('admin-login').style.display = 'block';
    document.getElementById('admin-content').style.display = 'none';
    document.getElementById('admin-pass').value = '';
    document.getElementById('new-admin-pass').value = '';
}

function checkAdminPass() {
    const inputPass = document.getElementById('admin-pass').value;
    // Check localStorage for a custom password, otherwise use default 'admin123'
    const currentPassword = localStorage.getItem('siteAdminPassword') || 'admin123';
    
    if (inputPass === currentPassword) { 
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';
    } else {
        alert("Incorrect Password!");
    }
}

function changeAdminPass() {
    const newPass = document.getElementById('new-admin-pass').value.trim();
    
    if (newPass.length < 4) {
        alert("Please enter a password that is at least 4 characters long.");
        return;
    }
    
    // Save the new password to browser LocalStorage so it persists after refresh
    localStorage.setItem('siteAdminPassword', newPass);
    alert("Password successfully updated! Please remember it for next time.");
    document.getElementById('new-admin-pass').value = '';
}
