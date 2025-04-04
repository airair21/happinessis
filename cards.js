// Firebase configuration and initialization
const firebaseConfig = {
    apiKey: "AIzaSyB1jslHXmb08Se0APqMo6lGwMTaubkpd3Q",
    authDomain: "happiness-is-api.firebaseapp.com",
    projectId: "happiness-is-api",
    storageBucket: "happiness-is-api.appspot.com",
    messagingSenderId: "619524571664",
    appId: "1:619524571664:web:741f1619443b4d281e4095",
    measurementId: "G-Z5J45S2NLT"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const dataRef = database.ref('inputs');
const container = document.getElementById('cardsContainer');
container.innerHTML = '<div class="loading">Loading happiness data...</div>';

// Utility functions
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function hideCardForHours(cardId, hours = 4) {
    const now = new Date();
    const hiddenUntil = new Date(now.getTime() + hours * 60 * 60 * 1000);
    localStorage.setItem(`hidden_${cardId}`, hiddenUntil.toISOString());
}

function isCardHidden(cardId) {
    const hiddenUntil = localStorage.getItem(`hidden_${cardId}`);
    if (!hiddenUntil) return false;
    return new Date() < new Date(hiddenUntil);
}

// Particle effect functions
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const particles = [];
    const particleCount = 30;
    
    // Your specified color palette
    const colorPalette = ['#ffcc32', '#ffd965', '#ffdf7f', '#ffecb2', '#fff2cc'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const size = 5 + Math.random() * 5;
        
        // Select a random color from your palette
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${rect.left + x}px;
            top: ${rect.top + y}px;
            pointer-events: none;
            z-index: 1000;
            transform: translate(-50%, -50%);
            will-change: transform, opacity;
        `;
        
        document.body.appendChild(particle);
        particles.push(particle);
    }
    return particles;
}

function animateParticles(particles) {
    particles.forEach((particle, index) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const rotation = Math.random() * 360;
        const sizeEnd = Math.random() * 0.5;
        
        const animation = particle.animate([
            { 
                transform: 'translate(0, 0) rotate(0deg) scale(1)',
                opacity: 1,
                filter: 'blur(0px)'
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${rotation}deg) scale(${sizeEnd})`,
                opacity: 0,
                filter: 'blur(2px)'
            }
        ], {
            duration: 800 + Math.random() * 400,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            delay: index * 20
        });
        
        animation.onfinish = () => particle.remove();
    });
}

// Card saving and display functions
async function saveCardAsPNG(cardElement) {
    return new Promise((resolve) => {
        html2canvas(cardElement).then(canvas => {
            const link = document.createElement('a');
            // link.download = `happiness-card-${Date.now()}.png`;
            let counter = localStorage.getItem('downloadCounter') || 0;
            counter++;
            localStorage.setItem('downloadCounter', counter);
            link.download = `happiness-card-${counter.toString().padStart(4, '0')}.png`;
            // Example: "happiness-card-0042.png"            
            link.href = canvas.toDataURL('image/png');
            link.click();
            resolve();
        });
    });
}

function showConfirmationModal(cardElement, cardId) {
    const modal = document.createElement('div');
    modal.className = 'confirmation-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <p>Take this card?</p>
            <div class="modal-buttons">
                <button class="cancel-btn">Cancel</button>
                <button class="confirm-btn">Yes, Take It</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.confirm-btn').addEventListener('click', async () => {
        modal.querySelector('.confirm-btn').textContent = 'Saving...';
        await saveCardAsPNG(cardElement);
        
        // Create and animate particles
        const particles = createParticles(cardElement);
        animateParticles(particles);
        
        // Fade out card
        cardElement.style.transition = 'opacity 0.3s ease';
        cardElement.style.opacity = '0';
        
        setTimeout(() => {
            hideCardForHours(cardId);
            cardElement.style.display = 'none';
            document.body.removeChild(modal);
        }, 300);
    });
}

// Main render function
function renderCards(data) {
    container.innerHTML = '';
    
    if (!data || data.length === 0) {
        container.innerHTML = '<div class="loading">No data found in the database.</div>';
        return;
    }

    const shuffledData = shuffleArray(data);
    
    shuffledData.forEach((item, index) => {
        const cardId = `card-${item.age}-${item.feeling}-${index}`;
        if (isCardHidden(cardId)) return;
        
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = cardId;
        
        card.innerHTML = `
            <p><strong>Age:</strong> ${item.age}</p>
            <p><strong>How would you define happiness through a different emotion or feeling?</strong> ${item.feeling}</p>
            <p><strong>How does happiness manifest in your life?</strong> ${item.manifest}</p>
            <p><strong>How does happiness influence your sense of purpose?</strong> ${item.purpose}</p>
            <br>
            <div class="toyou-section">
                <p><strong>Current Year:</strong> ${item.currentYear}</p>
                <p><strong>What is happiness to you right now?</strong> ${item.toyou}</p>
                <p><strong>2 years ago?</strong> ${item.toyou2}</p>
                <p><strong>5 years ago?</strong> ${item.toyou5}</p>
                <p><strong>10 years ago?</strong> ${item.toyou10}</p>
            </div>
        `;
        
        card.addEventListener('click', () => {
            showConfirmationModal(card, cardId);
        });
        
        container.appendChild(card);
    });
}

// Load html2canvas dynamically
const script = document.createElement('script');
script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
document.head.appendChild(script);

// Fetch data from Firebase
dataRef.on('value', (snapshot) => {
    const data = snapshot.val();
    const dataArray = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
    renderCards(dataArray);
}, (error) => {
    console.error("Error reading data: ", error);
    container.innerHTML = '<div class="loading">Error loading data. Please try again later.</div>';
});