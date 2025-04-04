// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1jslHXmb08Se0APqMo6lGwMTaubkpd3Q",
    authDomain: "happiness-is-api.firebaseapp.com",
    projectId: "happiness-is-api",
    storageBucket: "happiness-is-api.appspot.com",
    messagingSenderId: "619524571664",
    appId: "1:619524571664:web:741f1619443b4d281e4095",
    measurementId: "G-Z5J45S2NLT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const ref = database.ref("inputs");

// Function to fetch and display data
function fetchAndDisplayData() {
    // Fetch all document IDs under the "inputs" node
    ref.once('value')
        .then((snapshot) => {
            const inputs = snapshot.val();
            const documentIds = Object.keys(inputs); // Get all IDs as an array

            // Select a random ID
            const randomId = documentIds[Math.floor(Math.random() * documentIds.length)];

            // Fetch data for the random ID
            return ref.child(randomId).once('value');
        })
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                displayDataInDivs(data); // Display the data
            } else {
                document.getElementById('output').innerText = "No data found for the random ID!";
            }
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
            document.getElementById('output').innerText = "Error fetching data!";
        });
}

// Function to display data in individual divs with custom labels
function displayDataInDivs(data) {
    // Map field names to custom labels
    const fieldLabels = {
        age: "Age",
        currentYear: "Current Year",
        feeling: "How would you define happiness through a different emotion (ex: curiousity) or feeling (ex: peace of mind)?",
        manifest: "How does happiness manifest in your life? / Where does happiness show up in your life?",
        purpose: "How does happiness influence your sense of purpose?",
        toyou: "What is happiness to you right now?",
        toyou2: "What was happiness to you two years ago?",
        toyou5: "What was happiness to you five years ago?",
        toyou10: "What was happiness to you ten years ago?"
    };

    // Clear previous output
    document.getElementById('output').innerHTML = "";

    // Create a container for the two columns
    const columnsContainer = document.createElement('div');
    columnsContainer.classList.add('columns-container'); // Add a class for styling

    // Create the left column container
    const leftColumn = document.createElement('div');
    leftColumn.classList.add('left-column');

    // Create the right column container
    const rightColumn = document.createElement('div');
    rightColumn.classList.add('right-column');

    // Add age and currentYear to the left column
    if (data.hasOwnProperty('age')) {
        const ageDiv = document.createElement('div');
        ageDiv.classList.add('nopm'); // Add class to remove padding and margin
        ageDiv.innerHTML = `<strong>${fieldLabels['age']}:</strong> ${data['age']}`;
        leftColumn.appendChild(ageDiv);
    }

    if (data.hasOwnProperty('currentYear')) {
        const yearDiv = document.createElement('div');
        yearDiv.classList.add('nopm'); // Add class to remove padding and margin
        yearDiv.innerHTML = `<strong>${fieldLabels['currentYear']}:</strong> ${data['currentYear']}`;
        leftColumn.appendChild(yearDiv);
    }

    // Add feeling, manifest, and purpose to the left column
    const leftFields = ['feeling', 'manifest', 'purpose'];
    leftFields.forEach((field) => {
        if (data.hasOwnProperty(field)) {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${fieldLabels[field]}:</strong> <br><br> ${data[field]}`;
            leftColumn.appendChild(div);
        }
    });

    // Add toyou, toyou2, toyou5, and toyou10 to the right column
    const rightFields = ['toyou', 'toyou2', 'toyou5', 'toyou10'];
    rightFields.forEach((field) => {
        if (data.hasOwnProperty(field)) {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${fieldLabels[field]}:</strong> <br><br> ${data[field]}`;
            rightColumn.appendChild(div);
        }
    });

    // Append the left and right columns to the columns container
    columnsContainer.appendChild(leftColumn);
    columnsContainer.appendChild(rightColumn);

    // Append the columns container to the output
    document.getElementById('output').appendChild(columnsContainer);
}

// Run fetchAndDisplayData on page load
window.onload = fetchAndDisplayData;



document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('adddata').addEventListener('click', () => {
        window.location.href = 'form.html'; // Ensure the path is correct
    });
    document.getElementById('viewword').addEventListener('click', () => {
        window.location.href = 'association.html';
    });
    document.getElementById('viewgraph').addEventListener('click', () => {
        window.location.href = 'age.html';
    });
    document.getElementById('viewall').addEventListener('click', () => {
        window.location.href = 'cards.html';
    });
});

// Add event listener to the button
document.getElementById('fetchDataButton').addEventListener('click', fetchAndDisplayData);


