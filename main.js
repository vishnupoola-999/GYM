/**
 * To The Core Fitness - Main JS
 */

document.addEventListener('DOMContentLoaded', () => {
    initCoverPage();
    initRevealAnimations();
    initStickyHeader();
    initAppointmentWizard();
    initAIAssistant();
});

/**
 * Hide cover page after load
 */
function initCoverPage() {
    const cover = document.getElementById('cover-page');
    setTimeout(() => {
        cover.classList.add('hidden');
    }, 2000); // 2 seconds delay for the loader feel
}

/**
 * Advanced Scroll Reveal
 */
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(r => observer.observe(r));
}

/**
 * Sticky Header change on scroll
 */
function initStickyHeader() {
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

/**
 * Appointment Wizard Logic
 */
function initAppointmentWizard() {
    // We'll inject the wizard HTML dynamically if it doesn't exist
    const wizardMarkup = `
    <div id="appointment-modal" class="modal">
        <div class="modal-content glass">
            <span class="close-modal">&times;</span>
            <div id="wizard-step-1" class="wizard-step active">
                <h2>Step 1: Choose Your Program</h2>
                <div class="options-grid">
                    <button class="opt-btn" onclick="nextStep(2, 'Weight Loss')">Weight Loss</button>
                    <button class="opt-btn" onclick="nextStep(2, 'U-Lipolysis')">U-Lipolysis / EMS</button>
                    <button class="opt-btn" onclick="nextStep(2, 'Personal Training')">Personal Training</button>
                    <button class="opt-btn" onclick="nextStep(2, 'Pilates')">Pilates / Yoga</button>
                </div>
            </div>
            <div id="wizard-step-2" class="wizard-step">
                <h2>Step 2: Preferred Time</h2>
                <div class="options-grid">
                    <button class="opt-btn" onclick="nextStep(3, 'Morning (7AM - 11AM)')">Morning</button>
                    <button class="opt-btn" onclick="nextStep(3, 'Afternoon (11AM - 4PM)')">Afternoon</button>
                    <button class="opt-btn" onclick="nextStep(3, 'Evening (4PM - 9PM)')">Evening</button>
                </div>
                <button class="back-link" onclick="nextStep(1)">← Back</button>
            </div>
            <div id="wizard-step-3" class="wizard-step">
                <h2>Step 3: Contact Details</h2>
                <form id="wizard-form" onsubmit="submitAppointment(event)">
                    <input type="text" placeholder="Full Name" required>
                    <input type="tel" placeholder="Phone Number" required>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Confirm Appointment</button>
                </form>
                <button class="back-link" onclick="nextStep(2)">← Back</button>
            </div>
            <div id="wizard-success" class="wizard-step">
                <div style="font-size: 4rem;">✅</div>
                <h2>Thank You!</h2>
                <p>We've received your request. Our team will contact you shortly to confirm your slot.</p>
                <button class="btn btn-primary" onclick="closeModal()">Close</button>
            </div>
        </div>
    </div>
    <style>
        .modal { display: none; position: fixed; z-index: 2000; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: 0.3s; }
        .modal.open { opacity: 1; pointer-events: auto; }
        .modal-content { padding: 40px; width: 95%; max-width: 500px; position: relative; text-align: center; border: 1px solid var(--accent-red); background: #0a0a0a; }
        .close-modal { position: absolute; right: 20px; top: 20px; font-size: 1.5rem; cursor: pointer; color: var(--accent-red); }
        .wizard-step { display: none; }
        .wizard-step.active { display: block; animation: fadeIn 0.4s ease; }
        .wizard-step h2 { font-size: 1.5rem; margin-bottom: 20px; color: var(--white); }
        .options-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin: 30px 0; }
        .opt-btn { padding: 18px; border: 1px solid var(--gray-800); background: rgba(255,255,255,0.05); border-radius: 4px; cursor: pointer; transition: 0.2s; font-weight: 700; font-size: 0.9rem; color: var(--white); text-transform: uppercase; font-family: 'Syne', sans-serif; letter-spacing: 0.1em; }
        .opt-btn:hover { background: var(--accent-red); color: var(--bg-deep); border-color: var(--accent-red); }
        .back-link { border: none; background: none; color: var(--gray-400); margin-top: 25px; cursor: pointer; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; }
        #wizard-form input { width: 100%; padding: 18px; margin-bottom: 15px; border-radius: 4px; border: 1px solid var(--gray-800); background: #111; color: white; font-size: 1rem; font-family: 'Inter', sans-serif; }
        #wizard-form input::placeholder { color: #555; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    </style>
    `;
    
    document.body.insertAdjacentHTML('beforeend', wizardMarkup);
    
    const modal = document.getElementById('appointment-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    closeBtn.onclick = closeModal;
    window.onclick = (e) => { if (e.target == modal) closeModal(); };
}

function openWizard() {
    const modal = document.getElementById('appointment-modal');
    modal.classList.add('open');
    modal.style.display = 'flex';
    nextStep(1);
}

function closeModal() {
    const modal = document.getElementById('appointment-modal');
    modal.classList.remove('open');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

function nextStep(step, val) {
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
    
    if (step === 1) document.getElementById('wizard-step-1').classList.add('active');
    if (step === 2) document.getElementById('wizard-step-2').classList.add('active');
    if (step === 3) document.getElementById('wizard-step-3').classList.add('active');
    if (step === 'success') document.getElementById('wizard-success').classList.add('active');
    
    if (val) console.log('Stored selection:', val); // In a real app, store this in a hidden field
}

function submitAppointment(e) {
    e.preventDefault();
    nextStep('success');
}

/**
 * AI FAQ Assistant Logic
 */
function initAIAssistant() {
    const aiMarkup = `
    <div id="ai-chat-bubble" class="chat-bubble" onclick="toggleChat()">
        <span>💬</span>
    </div>
    <div id="ai-chat-window" class="chat-window glass">
        <div class="chat-header">
            <h4>Core Assistant</h4>
            <span onclick="toggleChat()" style="cursor:pointer;">×</span>
        </div>
        <div id="chat-body" class="chat-body">
            <div class="msg bot">Hello! I'm your health assistant. Ask me about our timings, location, or services!</div>
        </div>
        <div class="chat-input">
            <input type="text" id="ai-input" placeholder="Type a message..." onkeypress="handleChatKey(event)">
            <button onclick="sendChat()">Send</button>
        </div>
    </div>
    <style>
        .chat-bubble { position: fixed; bottom: 30px; right: 30px; width: 60px; height: 60px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; cursor: pointer; box-shadow: 0 0 30px var(--accent-glow); z-index: 1000; transition: 0.3s; border: none; }
        .chat-bubble:hover { transform: scale(1.1); }
        .chat-window { position: fixed; bottom: 100px; right: 30px; width: 320px; height: 450px; display: none; flex-direction: column; z-index: 1000; overflow: hidden; animation: slideUp 0.3s ease; border-radius: 12px; }
        .chat-header { padding: 15px; background: #111; color: var(--accent); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--glass-border); }
        .chat-header h4 { font-family: 'Syne', sans-serif; font-size: 0.8rem; letter-spacing: 0.1em; }
        .chat-body { flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: rgba(0,0,0,0.9); }
        .msg { padding: 10px 15px; border-radius: 8px; max-width: 80%; font-size: 0.85rem; font-family: 'Inter', sans-serif; }
        .msg.bot { background: var(--gray-800); align-self: flex-start; color: var(--white); }
        .msg.user { background: var(--accent); align-self: flex-end; color: var(--bg-deep); font-weight: 600; }
        .chat-input { padding: 10px; display: flex; gap: 5px; border-top: 1px solid var(--glass-border); background: #111; }
        .chat-input input { flex: 1; border: none; padding: 10px; background: transparent; outline: none; color: white; font-size: 0.9rem; }
        .chat-input button { border: none; background: var(--accent); color: var(--bg-deep); padding: 5px 15px; border-radius: 4px; cursor: pointer; font-weight: 700; font-family: 'Syne', sans-serif; text-transform: uppercase; font-size: 0.7rem; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    </style>
    `;
    
    document.body.insertAdjacentHTML('beforeend', aiMarkup);
}

function toggleChat() {
    const chat = document.getElementById('ai-chat-window');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

function handleChatKey(e) { if (e.key === 'Enter') sendChat(); }

function sendChat() {
    const input = document.getElementById('ai-input');
    const msg = input.value.trim();
    if (!msg) return;
    
    appendMsg(msg, 'user');
    input.value = '';
    
    // Simple response logic
    setTimeout(() => {
        let response = "I'm not sure about that, but I can help you book a consultation!";
        const lowMsg = msg.toLowerCase();
        if (lowMsg.includes('timing') || lowMsg.includes('hours') || lowMsg.includes('open')) {
            response = "We are open Mon-Sat, 7:00 AM to 9:00 PM.";
        } else if (lowMsg.includes('location') || lowMsg.includes('address') || lowMsg.includes('where')) {
            response = "We are located at Hira Cottage Building, Raja Ram Mohan Roy Road, Charni Road, Mumbai.";
        } else if (lowMsg.includes('service') || lowMsg.includes('treatment') || lowMsg.includes('do')) {
            response = "We offer weight loss, U-Lipolysis, EMS, Pilates, and strength training.";
        }
        appendMsg(response, 'bot');
    }, 600);
}

function appendMsg(text, type) {
    const body = document.getElementById('chat-body');
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerText = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
}

// Global functions for inline handlers
window.openWizard = openWizard;
window.closeModal = closeModal;
window.nextStep = nextStep;
window.submitAppointment = submitAppointment;
window.toggleChat = toggleChat;
window.handleChatKey = handleChatKey;
window.sendChat = sendChat;
