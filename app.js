// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Set dynamic year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Ensure text-to-speech voices load properly
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
});

// ==========================================
// TEXT-TO-SPEECH (TTS) ENGINE
// ==========================================
function speak(text) {
    if ('speechSynthesis' in window) {
        // Stop any currently playing audio
        window.speechSynthesis.cancel();
        
        // Clean text formatting so it sounds natural
        const cleanText = text.replace(/[*_~`]/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        
        // Fetch available voices
        const voices = window.speechSynthesis.getVoices();
        
        // Attempt to select an Indian English voice for aesthetic, fallback to default
        const indianVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India'));
        if (indianVoice) utterance.voice = indianVoice;
        
        utterance.pitch = 1.0;
        utterance.rate = 0.95; // Slightly slower for clarity
        
        // Speak!
        window.speechSynthesis.speak(utterance);
    }
}

// ==========================================
// NARADA AI CHATBOT LOGIC
// ==========================================
function toggleChat() {
    const chatWindow = document.getElementById('ai-chat-window');
    // Toggle display between none and flex
    if (chatWindow.style.display === 'flex') {
        chatWindow.style.display = 'none';
        window.speechSynthesis.cancel(); // Stop talking when closed
    } else {
        chatWindow.style.display = 'flex';
        // Auto-focus input when opened
        document.getElementById('user-input').focus();
    }
}

function handleChat() {
    const inputField = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-messages');
    const userText = inputField.value.trim();
    
    if(!userText) return;

    // 1. Display User Message
    chatBox.innerHTML += `<div class="msg user">${userText}</div>`;
    inputField.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // 2. Generate Logic/Response
    const lowerText = userText.toLowerCase();
    let reply = "I am processing that. You can ask me about Sourabh's pricing experience, his technical skills, or how to contact him.";

    // Simple keyword matching logic to act as the AI
    if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('namaste')) {
        reply = "Hari Om! I am Narada, Sourabh's voice AI. How may I assist you in exploring his portfolio today?";
    } else if (lowerText.includes('experience') || lowerText.includes('work') || lowerText.includes('job')) {
        reply = "Sourabh is a Pricing & Quotation Specialist at Mouser Electronics in Bangalore. He specializes in B2B component quotations, margin optimization, and supply chain analytics.";
    } else if (lowerText.includes('skill') || lowerText.includes('tech') || lowerText.includes('excel') || lowerText.includes('know')) {
        reply = "His core arsenal includes Strategic Pricing, Advanced Excel, Power Query, Data Visualization, and integrating AI models like Gemini into workflows.";
    } else if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('hire') || lowerText.includes('phone')) {
        reply = "You can reach Sourabh directly via email at sourabhshet95@gmail.com, or give him a call at +91 9019215348. He is always open to great opportunities.";
    } else if (lowerText.includes('who are you') || lowerText.includes('narada') || lowerText.includes('ai')) {
        reply = "I am Narada, a custom voice-enabled AI assistant built natively into this website to guide you through Sourabh's professional journey.";
    }

    // 3. Display Bot Response with a slight "thinking" delay
    setTimeout(() => {
        chatBox.innerHTML += `<div class="msg bot"><b>Narada:</b> ${reply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
        
        // 4. Trigger Text-to-Speech
        speak(reply);
    }, 600);
}
