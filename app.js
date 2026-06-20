// --- Core Site Navigation ---
function enterSite() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('main-site').style.display = 'block';
    
    // Automatically set the current year in the footer
    document.getElementById('year').textContent = new Date().getFullYear();
}

function toggleNav() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('open');
}

// --- Narada AI Chatbot Logic ---
function toggleChat() {
    const body = document.getElementById('chat-body');
    body.style.display = body.style.display === 'none' ? 'flex' : 'none';
}

function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        
        const voices = window.speechSynthesis.getVoices();
        // Try to find an Indian English voice for aesthetic
        const indianVoice = voices.find(v => v.lang.includes('en-IN'));
        if (indianVoice) utterance.voice = indianVoice;
        
        utterance.pitch = 1;
        utterance.rate = 0.9; 
        window.speechSynthesis.speak(utterance);
    }
}

function handleChat(e) {
    if (e.key === 'Enter') {
        const input = document.getElementById('chat-input');
        const container = document.getElementById('msg-container');
        if(!input || !container || !input.value.trim()) return;
        
        const userMsg = input.value;
        const msgLower = userMsg.toLowerCase().trim();
        
        // Append User Message
        container.innerHTML += `
            <div style="text-align:right; margin:8px 0; color:#E2E8F0; padding:10px 14px; background:rgba(255,255,255,0.1); border-radius:12px 12px 0px 12px; display:inline-block; float:right; clear:both; border: 1px solid rgba(255,255,255,0.2);">
                ${userMsg}
            </div>`;
        
        let reply = "I am pondering this... Ask me about Sourabh's Experience, Skills, or Projects.";
        
        // Simple mock responses
        if (msgLower.includes('hi') || msgLower.includes('hello')) {
            reply = "Hare Krishna! How can I assist you with Sourabh's portfolio today?";
        } else if (msgLower.includes('skill')) {
            reply = "Sourabh specializes in Pricing Analytics, Quotation Strategy, and AI Web Integration.";
        } else if (msgLower.includes('experience')) {
            reply = "He brings years of dedicated experience in supply chain electronics and dynamic pricing structures.";
        } else if (msgLower.includes('contact')) {
            reply = "You can email him at sourabhshet95@gmail.com.";
        }

        setTimeout(() => {
            // Append Bot Message
            container.innerHTML += `
                <div style="color:var(--gold); margin:8px 0; padding:10px 14px; background:rgba(255,215,0,0.1); border-radius:12px 12px 12px 0px; display:inline-block; float:left; clear:both; border: 1px solid rgba(255,215,0,0.2);">
                    <b>Narada:</b> ${reply}
                </div>`;
            container.scrollTop = container.scrollHeight;
            speak(reply); // Trigger Voice
        }, 400);

        input.value = '';
        container.scrollTop = container.scrollHeight;
    }
}

// Ensure voices are loaded (browser quirk)
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// --- AI Agent Generator Logic ---
function generateAIAgent() {
    const name = document.getElementById('ai-name').value || 'Custom AI';
    const role = document.getElementById('ai-role').value || 'You are a helpful assistant.';
    const greeting = document.getElementById('ai-greeting').value || 'Hello! How can I help you?';

    // This generates a full, standalone HTML document the user can host on GitHub Pages.
    // It includes the Web Speech API and connects to a mock/frontend logic (or they can insert an OpenAI key).
    const generatedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} - AI Agent</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .chat-container { background: #1e293b; width: 400px; height: 600px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); display: flex; flex-direction: column; overflow: hidden; border: 1px solid #334155; }
    .header { background: #3b82f6; padding: 20px; text-align: center; font-size: 1.2rem; font-weight: bold; }
    .messages { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
    .msg { padding: 12px; border-radius: 12px; max-width: 80%; line-height: 1.4; }
    .bot { background: #334155; align-self: flex-start; border-bottom-left-radius: 0; }
    .user { background: #3b82f6; align-self: flex-end; border-bottom-right-radius: 0; }
    .input-area { display: flex; padding: 15px; background: #0f172a; border-top: 1px solid #334155; }
    input { flex: 1; padding: 10px; border-radius: 8px; border: none; background: #1e293b; color: white; outline: none; }
    button { background: #3b82f6; color: white; border: none; padding: 10px 20px; margin-left: 10px; border-radius: 8px; cursor: pointer; font-weight: bold; }
    button:hover { background: #2563eb; }
  </style>
</head>
<body>
  <div class="chat-container">
    <div class="header">🤖 ${name}</div>
    <div class="messages" id="chat">
      <div class="msg bot">${greeting}</div>
    </div>
    <div class="input-area">
      <input type="text" id="userInput" placeholder="Ask something..." onkeypress="if(event.key==='Enter') sendMessage()" />
      <button onclick="sendMessage()">Send</button>
    </div>
  </div>

  <script>
    // System Prompt injected from Forge: "${role}"
    function speak(text) {
        const u = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(u);
    }

    function sendMessage() {
        const input = document.getElementById('userInput');
        const chat = document.getElementById('chat');
        if(!input.value.trim()) return;
        
        chat.innerHTML += \`<div class="msg user">\${input.value}</div>\`;
        
        // Mock AI Logic (Replace with OpenAI/Gemini fetch request if needed)
        const reply = "I am ${name}. You configured me to act as: ${role}. I am currently operating offline, but you can link my code to an API!";
        
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

    // Encode HTML tags so they display safely in the <pre> block
    const safeHTML = generatedHTML.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    document.getElementById('generated-code-block').innerHTML = safeHTML;
    
    alert("AI Agent Code Generated! Scroll to the code box to copy it.");
}

function copyGeneratedCode() {
    const code = document.getElementById('generated-code-block').innerText;
    if(!code.trim()) {
        alert("Please generate an agent first!");
        return;
    }
    
    navigator.clipboard.writeText(code).then(() => {
        alert("Code copied to clipboard! You can now paste this into your GitHub index.html file.");
    }).catch(err => {
        alert("Failed to copy text: " + err);
    });
}
