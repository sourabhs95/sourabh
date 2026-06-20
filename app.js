console.log("Site is currently undergoing maintenance. Will be back soon!");

// Pre-load voices to prevent delay
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

let isSpeakingLoopActive = false;

function startAnnouncementLoop() {
    // Prevent multiple loops from starting if user clicks multiple times
    if (isSpeakingLoopActive) return;
    isSpeakingLoopActive = true;
    
    // Hide the instruction prompt
    const prompt = document.getElementById('audio-prompt');
    if (prompt) prompt.style.display = 'none';

    function speakMessage() {
        if (!('speechSynthesis' in window)) return;
        
        // Stop any current speech before starting new one
        window.speechSynthesis.cancel();
        
        const textToSay = "Thank you. We will be back soon.";
        const utterance = new SpeechSynthesisUtterance(textToSay);
        
        // Try to find an Indian English voice for aesthetic consistency, fallback to default if not found
        const voices = window.speechSynthesis.getVoices();
        const indianVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India'));
        if (indianVoice) utterance.voice = indianVoice;
        
        utterance.pitch = 1.0;
        utterance.rate = 0.9; // Slightly slower, more professional pace
        
        // When this specific announcement finishes, wait 3 seconds, then play it again
        utterance.onend = function() {
            setTimeout(speakMessage, 3000); 
        };
        
        window.speechSynthesis.speak(utterance);
    }
    
    // Start the loop immediately upon interaction
    speakMessage();
}

// Browsers require a user interaction to play audio. 
// We attach listeners to the entire document body so it triggers on their first click or tap.
document.body.addEventListener('click', startAnnouncementLoop, { once: true });
document.body.addEventListener('touchstart', startAnnouncementLoop, { once: true });
