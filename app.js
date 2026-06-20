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
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        
        // Use an Indian accent for Narada if available
        const indianVoice = voices.find(v => v.lang.includes('en-IN'));
        if (indianVoice) utterance.voice = indianVoice;
        
        utterance.pitch = 1;
        utterance.rate = 0.9; 
        window.speechSynthesis.speak(utterance);
    }
}

// Ensure voices load correctly on startup
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// ==========================================
// NARADA AI CHATBOT LOGIC
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
        
        // Show user message bubble
        container.innerHTML += `
            <div style="text-align:right; margin:8px 0; color:#E2E8F0; padding:10px 14px; background:rgba(255,255,255,0.1); border-radius:12px 12px 0px 12px; display:inline-block; float:right; clear:both; border: 1px solid rgba(255,255,255,0.2);">
                ${userMsg}
            </div>`;
        
        // Default Narada Response
        let reply = "I am Narada! Ask me about Sourabh's experience, or how to create and download your own AI agent.";
        
        // Intelligent routing based on keywords
        if (msgLower.includes('website') || msgLower.includes('create ai') || msgLower.includes('build agent')) {
            reply = "Scroll up to the 'AI Sandbox'. Fill in your custom AI's name and role, and click 'Spawn'. Once created, you can chat with it immediately on the right side!";
        } else if (msgLower.includes('code') || msgLower.includes('download') || msgLower.includes('host') || msgLower.includes('pdf')) {
            reply = "After you spawn an agent in the Sandbox, click the 'Export Code' button in the top right of the chat box. It will give you a PDF with the code, flow diagrams, and GitHub hosting instructions!";
        } else if (msgLower.includes('admin') || msgLower.includes('edit')) {
            reply = "To access the secure admin panel, click the Chakra symbol (☸) in the top right navigation bar.";
        } else if (msgLower.includes('hi') || msgLower.includes('hello')) {
            reply = "Hare Krishna! How can I guide your digital journey today?";
        }

        // Simulate thinking delay
        setTimeout(() => {
            container.innerHTML += `
                <div style="color:var(--gold); margin:8px 0; padding:10px 14px; background:rgba(255,215,0,0.1); border-radius:12px 12px 12px 0px; display:inline-block; float:left; clear:both; border: 1px solid rgba(255,215,0,0.2);">
                    <b>Narada:</b> ${reply}
                </div>`;
            container.scrollTop = container.scrollHeight;
            speak(reply); // Trigger Voice Output
        }, 600);

        input.value = '';
        container.scrollTop = container.scrollHeight;
    }
}

// ==========================================
// AI FORGE & INLINE SANDBOX LOGIC
// ==========================================
let activeAgent = null; // Stores current custom AI details

function spawnLiveAgent() {
    const name = document.getElementById('ai-name').value.trim() || 'CustomBot';
    const role = document.getElementById('ai-role').value.trim() || 'A helpful assistant.';
    const greeting = document.getElementById('ai-greeting').value.trim() || 'Hello! I am ready to assist you.';

    // Save state
    activeAgent = { name, role, greeting };

    // Update Sandbox UI
    document.getElementById('sandbox-title').innerHTML = `🤖 ${name} (Active)`;
    const chatBox = document.getElementById('sandbox-chat');
    
    // Inject first bot message
    chatBox.innerHTML = `<div class="sandbox-msg bot"><b>${name}:</b> ${greeting}</div>`;
    
    // Enable inputs
    document.getElementById('sandbox-input').disabled = false;
    document.getElementById('sandbox-send-btn').disabled = false;
    document.getElementById('sandbox-input').focus();
    
    // Show Export Button 
    document.getElementById('export-btn').style.display = 'inline-block';

    speak(greeting);
}

function handleSandboxChat() {
    if(!activeAgent) return;
    
    const inputField = document.getElementById('sandbox-input');
    const userText = inputField.value.trim();
    if(!userText) return;

    const chatBox = document.getElementById('sandbox-chat');

    // Add User Message
    chatBox.innerHTML += `<div class="sandbox-msg user">${userText}</div>`;
    inputField.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulate AI response based on Persona
    setTimeout(() => {
        let aiReply = `As ${activeAgent.name}, operating under the persona "${activeAgent.role}", I acknowledge: "${userText}". (Host me on your own server to add API functionality!)`;
        
        chatBox.innerHTML += `<div class="sandbox-msg bot"><b>${activeAgent.name}:</b> ${aiReply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
        speak(aiReply);
    }, 800);
}

// ==========================================
// EXPORT MODAL & PDF GENERATION
// ==========================================
function openExportModal() {
    document.getElementById('export-overlay').style.display = 'flex';
}

function closeExportModal() {
    document.getElementById('export-overlay').style.display = 'none';
}

function switchHostMode(mode) {
    // Toggle active tabs
    document.getElementById('tab-github').classList.remove('active');
    document.getElementById('tab-other').classList.remove('active');
    document.getElementById('host-github').style.display = 'none';
    document.getElementById('host-other').style.display = 'none';

    // Activate selected tab
    document.getElementById(`tab-${mode}`).classList.add('active');
    document.getElementById(`host-${mode}`).style.display = 'block';
}

function downloadAIPDF() {
    if(!activeAgent) {
        alert("Please spawn an agent in the Sandbox first!");
        return;
    }

    // Set Data in the hidden PDF HTML template
    document.getElementById('pdf-title').innerText = `${activeAgent.name} - Official Setup Guide`;
    document.getElementById('pdf-role').innerText = activeAgent.role;

    // Generate the raw HTML string for the user to copy/host
    const generatedHTMLCode = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${activeAgent.name} - AI Agent</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #0f172a; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .chat-container { background: #1e293b; width: 400px; height: 600px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); display: flex; flex-direction: column; overflow: hidden; }
    .header { background: #0A9396; padding: 20px; text-align: center; font-size: 1.2rem; font-weight: bold; border-bottom: 2px solid #FFD700; }
    .messages { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
    .msg { padding: 12px; border-radius: 12px; max-width: 80%; line-height: 1.4; }
    .bot { background: #334155; align-self: flex-start; border-bottom-left-radius: 0; border: 1px solid rgba(10,147,150,0.3); }
    .user { background: #0A9396; align-self: flex-end; border-bottom-right-radius: 0; }
    .input-area { display: flex; padding: 15px; background: #0f172a; border-top: 1px solid #334155; }
    input { flex: 1; padding: 10px; border-radius: 8px; border: none; background: #1e293b; color: white; outline: none; }
    button { background: #FFD700; color: #000; border: none; padding: 10px 20px; margin-left: 10px; border-radius: 8px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="chat-container">
    <div class="header">🤖 ${activeAgent.name}</div>
    <div class="messages" id="chat">
      <div class="msg bot">${activeAgent.greeting}</div>
    </div>
    <div class="input-area">
      <input type="text" id="userInput" placeholder="Ask something..." onkeypress="if(event.key==='Enter') sendMessage()" />
      <button onclick="sendMessage()">Send</button>
    </div>
  </div>

  <script>
    // Persona injected: "${activeAgent.role}"
    function speak(text) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }

    function sendMessage() {
        const input = document.getElementById('userInput');
        const chat = document.getElementById('chat');
        if(!input.value.trim()) return;
        
        chat.innerHTML += \`<div class="msg user">\${input.value}</div>\`;
        
        // Mock offline response
        const reply = "I am ${activeAgent.name}. You said: " + input.value;
        
        setTimeout(() => {
            chat.innerHTML += \`<div class="msg bot">\${reply}</div>\`;
            chat.scrollTop = chat.scrollHeight;
            speak(reply);
        }, 1000);
        
        input.value = '';
        chat.scrollTop = chat.scrollHeight;
    }
  </script>
</body>
</html>`;

    // Replace brackets so HTML tags show up as raw text inside the PDF code block
    document.getElementById('pdf-code').innerHTML = generatedHTMLCode.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Grab the hidden template element
    const element = document.getElementById('pdf-template');
    element.style.display = 'block'; // Temporarily reveal it so html2pdf can render it

    // html2pdf Configuration
    const opt = {
      margin:       10,
      filename:     `${activeAgent.name.replace(/\s+/g, '_')}_Code_Guide.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate, Save, and Clean up
    html2pdf().set(opt).from(element).save().then(() => {
        element.style.display = 'none'; // Hide it again
        alert("PDF Downloaded successfully! Check your downloads folder for the code and instructions.");
    });
}

// ==========================================
// ADMIN PANEL LOGIC
// ==========================================
function openAdmin() {
    document.getElementById('admin-overlay').style.display = 'flex';
}

function closeAdmin() {
    document.getElementById('admin-overlay').style.display = 'none';
    // Reset login form on close
    document.getElementById('admin-login').style.display = 'block';
    document.getElementById('admin-content').style.display = 'none';
    document.getElementById('admin-pass').value = '';
}

function checkAdminPass() {
    const pass = document.getElementById('admin-pass').value;
    if (pass === 'admin123') { // Simple mockup password
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';
    } else {
        alert("Incorrect Password!");
    }
}
