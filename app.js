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
        // Clean markdown formatting before speaking
        const cleanText = text.replace(/\*/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        const voices = window.speechSynthesis.getVoices();
        
        const indianVoice = voices.find(v => v.lang.includes('en-IN'));
        if (indianVoice) utterance.voice = indianVoice;
        
        utterance.pitch = 1;
        utterance.rate = 0.9; 
        window.speechSynthesis.speak(utterance);
    }
}

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
        
        // Show User Bubble
        container.innerHTML += `
            <div style="text-align:right; margin:8px 0; color:#E2E8F0; padding:10px 14px; background:rgba(255,255,255,0.1); border-radius:12px 12px 0px 12px; display:inline-block; float:right; clear:both; border: 1px solid rgba(255,255,255,0.2);">
                ${userMsg}
            </div>`;
        
        // Default Narada Response
        let reply = "I am Narada! Ask me about Sourabh's experience as a Pricing Specialist, or how to create your own AI agent.";
        
        if (msgLower.includes('website') || msgLower.includes('create ai') || msgLower.includes('build agent') || msgLower.includes('api')) {
            reply = "Scroll to the 'AI Sandbox'. Fill in your custom AI's name and persona. If you input your Gemini API Key, the AI will become truly alive! Click 'Spawn' to start chatting.";
        } else if (msgLower.includes('code') || msgLower.includes('download') || msgLower.includes('host') || msgLower.includes('export')) {
            reply = "After you spawn an agent in the Sandbox, click 'Export Code' in the chat box header. It gives you a PDF with the actual API logic and GitHub hosting instructions!";
        } else if (msgLower.includes('sourabh') || msgLower.includes('pricing') || msgLower.includes('experience')) {
            reply = "Sourabh is a Pricing & Quotation Specialist at Mouser Electronics in Bangalore, an expert in supply chain analytics, strategic margin optimization, and AI web integration.";
        } else if (msgLower.includes('hi') || msgLower.includes('hello')) {
            reply = "Hare Krishna! How can I guide your digital journey today?";
        }

        setTimeout(() => {
            // Show Bot Bubble
            container.innerHTML += `
                <div style="color:var(--gold); margin:8px 0; padding:10px 14px; background:rgba(255,215,0,0.1); border-radius:12px 12px 12px 0px; display:inline-block; float:left; clear:both; border: 1px solid rgba(255,215,0,0.2);">
                    <b>Narada:</b> ${reply}
                </div>`;
            container.scrollTop = container.scrollHeight;
            speak(reply); 
        }, 600);

        input.value = '';
        container.scrollTop = container.scrollHeight;
    }
}

// ==========================================
// AI FORGE (LIVE GEMINI API SANDBOX)
// ==========================================
let activeAgent = null; 

function spawnLiveAgent() {
    const name = document.getElementById('ai-name').value.trim() || 'CustomBot';
    const role = document.getElementById('ai-role').value.trim() || 'A helpful assistant.';
    const greeting = document.getElementById('ai-greeting').value.trim() || 'Hello! I am ready to assist you.';
    const apiKey = document.getElementById('ai-api-key').value.trim();

    activeAgent = { name, role, greeting, apiKey };

    document.getElementById('sandbox-title').innerHTML = apiKey ? `🟢 ${name} (Live via Gemini)` : `🟡 ${name} (Mock Mode)`;
    const chatBox = document.getElementById('sandbox-chat');
    
    chatBox.innerHTML = `<div class="sandbox-msg bot"><b>${name}:</b> ${greeting}</div>`;
    
    document.getElementById('sandbox-input').disabled = false;
    document.getElementById('sandbox-send-btn').disabled = false;
    document.getElementById('export-btn').style.display = 'inline-block';
    
    speak(greeting);
}

async function handleSandboxChat() {
    if(!activeAgent) return;
    
    const inputField = document.getElementById('sandbox-input');
    const userText = inputField.value.trim();
    if(!userText) return;

    const chatBox = document.getElementById('sandbox-chat');
    chatBox.innerHTML += `<div class="sandbox-msg user">${userText}</div>`;
    inputField.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    const loadId = 'load-' + Date.now();
    chatBox.innerHTML += `<div id="${loadId}" class="sandbox-msg bot" style="opacity:0.6;"><i>Thinking...</i></div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    // Call Real Gemini API if Key is provided
    if (activeAgent.apiKey) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${activeAgent.apiKey}`;
            const payload = {
                system_instruction: { parts: [{ text: activeAgent.role }] },
                contents: [{ parts: [{ text: userText }] }]
            };
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            const data = await response.json();
            document.getElementById(loadId).remove();
            
            if(data.error) {
                const err = "API Error: " + data.error.message;
                chatBox.innerHTML += `<div class="sandbox-msg bot" style="color:#ff6b6b"><b>System:</b> ${err}</div>`;
            } else {
                const aiReply = data.candidates[0].content.parts[0].text;
                const formattedReply = aiReply.replace(/\n/g, '<br>');
                chatBox.innerHTML += `<div class="sandbox-msg bot"><b>${activeAgent.name}:</b> ${formattedReply}</div>`;
                speak(aiReply);
            }
        } catch (e) {
            document.getElementById(loadId).remove();
            chatBox.innerHTML += `<div class="sandbox-msg bot" style="color:#ff6b6b"><b>System:</b> Network Error. Ensure your API key is correct.</div>`;
        }
    } else {
        // Fallback Mock Mode
        setTimeout(() => {
            document.getElementById(loadId).remove();
            let aiReply = `As ${activeAgent.name}, configured as "${activeAgent.role}", I acknowledge: "${userText}". (Add your Gemini API key to unlock real responses!)`;
            chatBox.innerHTML += `<div class="sandbox-msg bot"><b>${activeAgent.name}:</b> ${aiReply}</div>`;
            chatBox.scrollTop = chatBox.scrollHeight;
            speak(aiReply);
        }, 800);
    }
}

// ==========================================
// EXPORT MODAL & PDF GENERATION
// ==========================================
function openExportModal() { document.getElementById('export-overlay').style.display = 'flex'; }
function closeExportModal() { document.getElementById('export-overlay').style.display = 'none'; }

function switchHostMode(mode) {
    document.getElementById('tab-github').classList.remove('active');
    document.getElementById('tab-other').classList.remove('active');
    document.getElementById('host-github').style.display = 'none';
    document.getElementById('host-other').style.display = 'none';

    document.getElementById(`tab-${mode}`).classList.add('active');
    document.getElementById(`host-${mode}`).style.display = 'block';
}

function downloadAIPDF() {
    if(!activeAgent) return alert("Please spawn an agent in the Sandbox first!");

    document.getElementById('pdf-title').innerText = `${activeAgent.name} - Official Setup Guide`;
    document.getElementById('pdf-role').innerText = activeAgent.role;

    const keyToExport = activeAgent.apiKey ? activeAgent.apiKey : "YOUR_API_KEY_HERE";

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
    const API_KEY = "${keyToExport}";
    const PERSONA = "${activeAgent.role}";

    function speak(text) {
        const cleanText = text.replace(/\\*/g, '');
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(cleanText));
    }

    async function sendMessage() {
        const input = document.getElementById('userInput');
        const chat = document.getElementById('chat');
        const userText = input.value.trim();
        if(!userText) return;
        
        chat.innerHTML += \`<div class="msg user">\${userText}</div>\`;
        input.value = '';
        chat.scrollTop = chat.scrollHeight;
        
        const loadId = 'load-' + Date.now();
        chat.innerHTML += \`<div id="\${loadId}" class="msg bot" style="opacity:0.6;"><i>Thinking...</i></div>\`;
        chat.scrollTop = chat.scrollHeight;

        try {
            const response = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=\${API_KEY}\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: { parts: [{ text: PERSONA }] },
                    contents: [{ parts: [{ text: userText }] }]
                })
            });
            
            const data = await response.json();
            document.getElementById(loadId).remove();
            
            if(data.error) {
                chat.innerHTML += \`<div class="msg bot" style="color:red">API Error: \${data.error.message}</div>\`;
            } else {
                const aiReply = data.candidates[0].content.parts[0].text;
                const formatted = aiReply.replace(/\\n/g, '<br>');
                chat.innerHTML += \`<div class="msg bot">\${formatted}</div>\`;
                speak(aiReply);
            }
        } catch (e) {
            document.getElementById(loadId).remove();
            chat.innerHTML += \`<div class="msg bot" style="color:red">Network Error. Check API Key.</div>\`;
        }
        chat.scrollTop = chat.scrollHeight;
    }
  </script>
</body>
</html>`;

    document.getElementById('pdf-code').innerHTML = generatedHTMLCode.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const element = document.getElementById('pdf-template');
    element.style.display = 'block';

    const opt = {
      margin:       10,
      filename:     `${activeAgent.name.replace(/\s+/g, '_')}_Code_Guide.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        element.style.display = 'none'; 
        alert("PDF Downloaded successfully! Check your downloads folder.");
    });
}

// ==========================================
// ADMIN PANEL LOGIC (Dynamic Password)
// ==========================================
function openAdmin() { 
    document.getElementById('admin-overlay').style.display = 'flex'; 
}

function closeAdmin() { 
    document.getElementById('admin-overlay').style.display = 'none'; 
    document.getElementById('admin-login').style.display = 'block';
    document.getElementById('admin-content').style.display = 'none';
    document.getElementById('admin-pass').value = '';
    document.getElementById('new-admin-pass').value = '';
}

function checkAdminPass() {
    const inputPass = document.getElementById('admin-pass').value;
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
    
    localStorage.setItem('siteAdminPassword', newPass);
    alert("Password successfully updated! Please remember it for next time.");
    document.getElementById('new-admin-pass').value = '';
}
