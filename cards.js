// Your existing Firebase configuration and initialization
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

// Function to hide a card for X hours
function hideCardForHours(cardId, hours = 4) {
    const now = new Date();
    const hiddenUntil = new Date(now.getTime() + hours * 60 * 60 * 1000);
    localStorage.setItem(`hidden_${cardId}`, hiddenUntil.toISOString());
}

// Function to check if card should be hidden
function isCardHidden(cardId) {
    const hiddenUntil = localStorage.getItem(`hidden_${cardId}`);
    if (!hiddenUntil) return false;
    
    const now = new Date();
    const hiddenTime = new Date(hiddenUntil);
    return now < hiddenTime;
}

// Function to save card as PNG
function saveCardAsPNG(cardElement) {
    return new Promise((resolve) => {
        html2canvas(cardElement).then(canvas => {
            const link = document.createElement('a');
            link.download = `happiness-card-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            resolve();
        });
    });
}

// Function to create confirmation modal
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
    
    // Handle button clicks
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.confirm-btn').addEventListener('click', async () => {
        modal.querySelector('.confirm-btn').textContent = 'Saving...';
        await saveCardAsPNG(cardElement);
        hideCardForHours(cardId);
        cardElement.style.display = 'none';
        document.body.removeChild(modal);
    });
}

// Modified renderCards function
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
            <p><strong>Feeling:</strong> ${item.feeling}</p>
            <p><strong>Manifesting:</strong> ${item.manifest}</p>
            <p><strong>Life Purpose:</strong> ${item.purpose}</p>
            <br>
            <div class="toyou-section">
                <p><strong>Current Year:</strong> ${item.currentYear}</p>
                <p><strong>To You:</strong> ${item.toyou}</p>
                <p><strong>To You ×2:</strong> ${item.toyou2}</p>
                <p><strong>To You ×5:</strong> ${item.toyou5}</p>
                <p><strong>To You ×10:</strong> ${item.toyou10}</p>
            </div>
        `;
        
        card.addEventListener('click', () => {
            showConfirmationModal(card, cardId);
        });
        
        container.appendChild(card);
    });
}

// Add this CSS (either in your stylesheet or in a <style> tag)
const style = document.createElement('style');
style.textContent = `
    .confirmation-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    
    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        max-width: 300px;
        width: 100%;
    }
    
    .modal-buttons {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
    }
    
    .modal-buttons button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    .cancel-btn {
        background: #f1f1f1;
    }
    
    .confirm-btn {
        background: #4CAF50;
        color: white;
    }
`;
document.head.appendChild(style);

// Add html2canvas library for saving as PNG
const script = document.createElement('script');
script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
document.head.appendChild(script);

// Your existing shuffleArray and dataRef.on code...
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

dataRef.on('value', (snapshot) => {
    const data = snapshot.val();
    const dataArray = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
    renderCards(dataArray);
}, (error) => {
    console.error("Error reading data: ", error);
    container.innerHTML = '<div class="loading">Error loading data. Please try again later.</div>';
});

