// Pre-load voices to ensure they are ready
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

let isSpeakingLoopActive = false;

function startMaintenanceAnnouncement() {
    if (!('speechSynthesis' in window)) return;
    
    // Stop any existing speech
    window.speechSynthesis.cancel();
    
    const textToSay = "Thank you. The site is under maintenance. We will be back soon.";
    const utterance = new SpeechSynthesisUtterance(textToSay);
    
    // Assign an Indian English voice if available
    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India'));
    if (indianVoice) utterance.voice = indianVoice;
    
    utterance.pitch = 1.0;
    utterance.rate = 0.9;
    
    // Loop the message every 5 seconds
    utterance.onend = function() {
        setTimeout(() => {
            window.speechSynthesis.speak(utterance);
        }, 5000); 
    };
    
    window.speechSynthesis.speak(utterance);
    isSpeakingLoopActive = true;
}

// 1. ATTEMPT AUTOPLAY IMMEDIATELY ON LOAD
window.addEventListener('load', () => {
    startMaintenanceAnnouncement();
});

// 2. SILENT BACKUP: If the browser blocked the autoplay, the first click anywhere will start it.
document.body.addEventListener('click', () => {
    if (!isSpeakingLoopActive && !window.speechSynthesis.speaking) {
        startMaintenanceAnnouncement();
    }
}, { once: true });

document.body.addEventListener('touchstart', () => {
    if (!isSpeakingLoopActive && !window.speechSynthesis.speaking) {
        startMaintenanceAnnouncement();
    }
}, { once: true });
