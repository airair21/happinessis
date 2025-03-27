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

// Global variables
let bubbles = [];
let connections = [];
let filteredBubbles = [];
let filteredConnections = [];
let clickedInstance = null;
let searchInput;

// List of common words to exclude from connections
const COMMON_WORDS = new Set(['and', 'i', 'to', 'the', 'a', 'of', 'in', 'it', 'is', 'that', 'with', 'for', 'on', 'are', 'as', 'be', 'at', 'or', 'was', 'but', 'not', 'you', 'this', 'have', 'he', 'she', 'we', 'they', 'my', 'your', 'their', 'our', 'me', 'him', 'her', 'us', 'them', 'when', ' ']);

// Create a Web Worker
let worker;
try {
    worker = new Worker('worker.js');
} catch (error) {
    console.error("Failed to create Web Worker:", error);
    worker = null; // Fallback to main thread
}

// Listen for messages from the Web Worker
if (worker) {
    worker.onmessage = function (event) {
        console.log("Main script received data from worker:", event.data); // Debugging

        let { filteredBubbles: newFilteredBubbles, filteredConnections: newFilteredConnections } = event.data;

        // Update the filtered bubbles and connections
        filteredBubbles = newFilteredBubbles;
        filteredConnections = newFilteredConnections;

        // Redraw the canvas
        draw();
    };
}

// Helper function to split text into words (excluding common words and punctuation)
function splitIntoWords(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .split(' ')
        .filter(word => word.trim() !== '' && !COMMON_WORDS.has(word)); // Exclude empty strings and common words
}

// Fetch data from Firebase
function fetchManifestData() {
    ref.once('value')
        .then(snapshot => {
            let data = snapshot.val();
            if (data) {
                // Extract the `manifest` property from each object and filter out null/undefined values
                let manifestArray = Object.values(data)
                    .map(item => item?.manifest) // Safely access manifest property
                    .filter(manifest => manifest); // Filter out undefined or null values

                // Split each manifest string by commas and flatten the resulting arrays
                let newArray = manifestArray.flatMap(manifest => manifest.split(','));

                // Assume newArrayP is another array you want to combine
                // let newArrayP = ["extra1", "extra2", "extra3"]; 
                    // Example additional array
                // let newArrayP = manifestArray.flatMap(purpose => purpose.split(','));
                // let newArrayF = manifestArray.flatMap(feeling => feeling.split(','));
                // let newArrayTY = manifestArray.flatMap(toyou => toyou.split(','));


                // Combine newArray and newArrayP using the spread operator
                // initializeBubbles([...newArray, ...newArrayP, ...newArrayF, ...newArrayTY]); // Call initializeBubbles with combined arrays
                initializeBubbles([...newArray]); 
            } else {
                console.log("No data found");
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Initialize bubbles
function initializeBubbles(dataArray) {
    // Clear existing bubbles
    bubbles = [];

    // Iterate over the dataArray to create bubbles
    for (let i = 0; i < dataArray.length; i++) {
        let manifestValue = dataArray[i].trim(); // Trim whitespace from the manifest value

        // Skip empty or whitespace-only values
        if (manifestValue === '') {
            continue;
        }

        let bubble = {
            instance: manifestValue, // Use the trimmed manifest value
            color: getRandomColor(), // Assign a random color
            id: i, // Use the index as the ID (or generate a unique ID)
            x: random(width), // Random x position within the canvas
            y: random(height), // Random y position within the canvas
            connections: 0, // Initialize connections to 0
            diameter: 30, // Start with a small diameter
            expandedDiameter: calculateBubbleDiameter(manifestValue), // Expanded diameter based on text
            isExpanded: false, // Bubble starts small
            vx: random(-1, 1), // Random x velocity
            vy: random(-1, 1) // Random y velocity
        };
        bubbles.push(bubble);
    }

    // Update filteredBubbles and filteredConnections
    filteredBubbles = bubbles;
    filteredConnections = connections;

    // Establish connections between bubbles
    establishConnections();
}

// Helper function to generate a random color
function getRandomColor() {
    // const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF'];
    const colors = ['#ffcc32', '#ffd965', '#ffdf7f', '#ffecb2', '#fff2cc'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Helper function to calculate bubble diameter based on text length
function calculateBubbleDiameter(text) {
    const minSize = 50; // Minimum bubble size
    const maxSize = 200; // Maximum bubble size
    const baseSize = 60; // Base size for the bubble
    const sizeMultiplier = 2; // Multiplier for text length

    // Calculate the diameter based on text length
    let diameter = baseSize + (text.length * sizeMultiplier); // Use text length for scaling

    // Constrain the diameter within the min and max sizes
    return constrain(diameter, minSize, maxSize);
}

// Establish connections between bubbles
function establishConnections() {
    connections = []; // Reset connections

    for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
            if (shareWords(bubbles[i].instance, bubbles[j].instance)) {
                connections.push([bubbles[i], bubbles[j]]);
                bubbles[i].connections++;
                bubbles[j].connections++;
            }
        }
    }
}

// Check if two bubbles share words
function shareWords(instanceA, instanceB) {
    // Split instances into words and filter out common words
    let wordsA = splitIntoWords(instanceA);
    let wordsB = splitIntoWords(instanceB);

    // Check if any remaining words are shared
    return wordsA.some(word => wordsB.includes(word));
}

// Filter bubbles based on search term
function filterBubbles() {
    let searchTerm = searchInput.value().toLowerCase();

    if (searchTerm === '' && clickedInstance === null) {
        // Show all bubbles and connections if no search term and no clicked instance
        filteredBubbles = bubbles;
        filteredConnections = connections;
    } else if (clickedInstance !== null) {
        // If a bubble is clicked, use the logic from mouseClicked to filter bubbles
        let clickedBubble = bubbles.find(bubble => bubble.id === clickedInstance);
        if (clickedBubble) {
            let clickedWords = splitIntoWords(clickedBubble.instance);

            filteredBubbles = bubbles.filter(bubble => {
                if (bubble === clickedBubble) return true; // Always include the clicked bubble

                let bubbleWords = splitIntoWords(bubble.instance);

                // Check if any words match between the clicked bubble and the current bubble
                return bubbleWords.some(word => clickedWords.includes(word));
            });

            filteredConnections = connections.filter(conn => {
                let bubbleA = conn[0];
                let bubbleB = conn[1];
                return filteredBubbles.includes(bubbleA) && filteredBubbles.includes(bubbleB);
            });
        }
    } else {
        // Filter bubbles based on search term
        filteredBubbles = bubbles.filter(bubble =>
            bubble.instance.toLowerCase().includes(searchTerm)
        );

        // Update filteredConnections to include only connections involving filteredBubbles
        filteredConnections = connections.filter(conn => {
            let bubbleA = conn[0];
            let bubbleB = conn[1];
            return filteredBubbles.includes(bubbleA) && filteredBubbles.includes(bubbleB);
        });
    }

    // Redraw the canvas
    draw();
}

// Update bubble positions
function updateBubblePositions() {
    for (let bubble of bubbles) {
        // Only move if not expanded (hovered or clicked)
        if (!bubble.isExpanded) {
            bubble.x += bubble.vx;
            bubble.y += bubble.vy;

            // Constrain the bubble within the canvas boundaries
            bubble.x = constrain(bubble.x, bubble.diameter / 2, width - bubble.diameter / 2);
            bubble.y = constrain(bubble.y, bubble.diameter / 2, height - bubble.diameter / 2);

            // Reverse direction if the bubble hits the canvas edge
            if (bubble.x <= bubble.diameter / 2 || bubble.x >= width - bubble.diameter / 2) {
                bubble.vx *= -1;
            }
            if (bubble.y <= bubble.diameter / 2 || bubble.y >= height - bubble.diameter / 2) {
                bubble.vy *= -1;
            }
        }
    }
}

// Draw bubbles and connections
function draw() {
    // background(210);
    background(55)

    // Update bubble positions
    updateBubblePositions();

    // Draw connections for filtered bubbles
    for (let conn of filteredConnections) {
        let bubbleA = conn[0];
        let bubbleB = conn[1];

        // Set stroke color to black
        // stroke(23, 23, 222); // Blue color
        // stroke('hsl(240, 34.70%, 29.40%)')
        // stroke (210,210,210)
        stroke (255,255,255)
        strokeWeight(map(bubbleA.connections, 1, 10, 0.5, 1)); // Adjust stroke weight based on connections
        line(bubbleA.x, bubbleA.y, bubbleB.x, bubbleB.y);

        // Apply filter invert if connections overlap
        // if (checkConnectionOverlap(conn)) {
        //     filter(INVERT);
        // }
    }

    // Draw filtered bubbles
    for (let bubble of filteredBubbles) {
        // Check if the mouse is over the bubble
        if (dist(mouseX, mouseY, bubble.x, bubble.y) < bubble.diameter / 2) {
            bubble.isExpanded = true; // Expand on hover
        } else if (bubble.id !== clickedInstance) {
            bubble.isExpanded = false; // Shrink if not clicked or hovered
        }

        // Set bubble diameter based on expansion state
        let currentDiameter = bubble.isExpanded ? bubble.expandedDiameter : bubble.diameter;

        fill(bubble.color);
        noStroke();
        ellipse(bubble.x, bubble.y, currentDiameter, currentDiameter);

        // Draw text if expanded
        if (bubble.isExpanded) {
            drawTextBlock(bubble);
        }

        // Highlight the clicked bubble
        if (bubble.id === clickedInstance) {
            stroke(255, 0, 0); // Red border for the clicked bubble
            noFill();
            ellipse(bubble.x, bubble.y, currentDiameter + 10, currentDiameter + 10);
        }
    }
}

// Check if connection lines overlap
function checkConnectionOverlap(conn) {
    for (let otherConn of filteredConnections) {
        if (conn !== otherConn && linesIntersect(conn, otherConn)) {
            return true;
        }
    }
    return false;
}

// Check if two lines intersect
function linesIntersect(connA, connB) {
    let x1 = connA[0].x, y1 = connA[0].y, x2 = connA[1].x, y2 = connA[1].y;
    let x3 = connB[0].x, y3 = connB[0].y, x4 = connB[1].x, y4 = connB[1].y;

    let denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom === 0) return false; // Lines are parallel

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

    return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
}

// Draw text inside bubbles
function drawTextBlock(bubble) {
    fill(0); // Text color
    textSize(12); // Fixed font size
    textAlign(CENTER, CENTER); // Center the text

    let words = bubble.instance.split(' ');
    let lines = [];
    let currentLine = words[0];

    // Calculate the maximum width of text that fits within the circle
    let maxWidth = bubble.expandedDiameter * 0.8; // 80% of the bubble diameter

    // Split the text into lines that fit within the circle
    for (let i = 1; i < words.length; i++) {
        let word = words[i];
        let testLine = currentLine + ' ' + word;
        let testWidth = textWidth(testLine);

        if (testWidth <= maxWidth) {
            // If the line fits within the circle, add the word to the current line
            currentLine = testLine;
        } else {
            // If the line doesn't fit, start a new line
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine); // Add the last line

    // Calculate the total height of the text block
    let lineHeight = textSize() * 1.2; // Line height (120% of font size)
    let totalHeight = lines.length * lineHeight;

    // Calculate the starting Y position for the text to center it vertically
    let y = bubble.y - (totalHeight / 2) + (lineHeight / 2);

    // Draw each line of text
    for (let line of lines) {
        text(line, bubble.x, y);
        y += lineHeight; // Move to the next line
    }
}

// Make bubbles moveable
function mouseDragged() {
    for (let bubble of bubbles) {
        if (dist(mouseX, mouseY, bubble.x, bubble.y) < bubble.diameter / 2) {
            // Stop the bubble's movement
            bubble.vx = 0;
            bubble.vy = 0;

            // Move the bubble
            bubble.x = mouseX;
            bubble.y = mouseY;

            // Constrain the bubble within the canvas boundaries
            bubble.x = constrain(bubble.x, bubble.diameter / 2, width - bubble.diameter / 2);
            bubble.y = constrain(bubble.y, bubble.diameter / 2, height - bubble.diameter / 2);

            // Prevent overlapping with other bubbles
            for (let otherBubble of bubbles) {
                if (otherBubble !== bubble && checkCollision(bubble, otherBubble)) {
                    // Move the other bubble away
                    let angle = atan2(otherBubble.y - bubble.y, otherBubble.x - bubble.x);
                    let distance = (bubble.diameter + otherBubble.diameter) / 2;
                    otherBubble.x = bubble.x + cos(angle) * distance;
                    otherBubble.y = bubble.y + sin(angle) * distance;

                    // Constrain the other bubble within the canvas boundaries
                    otherBubble.x = constrain(otherBubble.x, otherBubble.diameter / 2, width - otherBubble.diameter / 2);
                    otherBubble.y = constrain(otherBubble.y, otherBubble.diameter / 2, height - otherBubble.diameter / 2);
                }
            }
        }
    }
}

// Check if two bubbles are colliding
function checkCollision(bubbleA, bubbleB) {
    let distance = dist(bubbleA.x, bubbleA.y, bubbleB.x, bubbleB.y);
    return distance < (bubbleA.diameter + bubbleB.diameter) / 2;
}

// Handle window resizing
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    repositionBubbles();
    draw();
}

// Reposition bubbles when the window is resized
function repositionBubbles() {
    let scaleX = width / windowWidth;
    let scaleY = height / windowHeight;

    for (let bubble of bubbles) {
        bubble.x *= scaleX;
        bubble.y *= scaleY;

        // Constrain the bubble within the canvas boundaries
        bubble.x = constrain(bubble.x, bubble.diameter / 2, width - bubble.diameter / 2);
        bubble.y = constrain(bubble.y, bubble.diameter / 2, height - bubble.diameter / 2);
    }
}

// Handle mouse clicks
function mouseClicked() {
    let clickedBubble = null;

    // Check if a bubble was clicked (only check filteredBubbles)
    for (let bubble of filteredBubbles) {
        if (dist(mouseX, mouseY, bubble.x, bubble.y) < bubble.diameter / 2) {
            clickedBubble = bubble;
            break;
        }
    }

    if (clickedBubble) {
        console.log("Clicked Bubble:", clickedBubble.instance); // Debugging

        // Toggle expansion state
        clickedBubble.isExpanded = !clickedBubble.isExpanded;

        // Stop the bubble's movement if expanded
        if (clickedBubble.isExpanded) {
            clickedBubble.vx = 0;
            clickedBubble.vy = 0;
        }

        // Update clickedInstance
        clickedInstance = clickedBubble.isExpanded ? clickedBubble.id : null;

        // Update search input with the clicked bubble's text
        searchInput.value(clickedBubble.isExpanded ? clickedBubble.instance : '');

        // Send data to the Web Worker for filtering (if available)
        if (worker) {
            console.log("Main script sending data to worker:", { bubbles, connections, clickedBubble }); // Debugging
            worker.postMessage({ bubbles, connections, clickedBubble });
        } else {
            // Fallback to main thread
            console.log("Web Worker not available. Filtering in main thread."); // Debugging
            let { filteredBubbles: newFilteredBubbles, filteredConnections: newFilteredConnections } = filterBubblesInMainThread(bubbles, connections, clickedBubble);

            // Update the filtered bubbles and connections
            filteredBubbles = newFilteredBubbles;
            filteredConnections = newFilteredConnections;

            // Redraw the canvas
            draw();
        }
    } else {
        // If clicking outside a bubble, reset the view
        clickedInstance = null;
        searchInput.value('');
        filteredBubbles = bubbles;
        filteredConnections = connections;
        draw(); // Redraw the canvas immediately
    }
}

// Fallback filtering logic for main thread
function filterBubblesInMainThread(bubbles, connections, clickedBubble) {
    let clickedWords = splitIntoWords(clickedBubble.instance);

    let filteredBubbles = bubbles.filter(bubble => {
        if (bubble === clickedBubble) return true; // Always include the clicked bubble

        let bubbleWords = splitIntoWords(bubble.instance);

        // Check if any words match between the clicked bubble and the current bubble
        return bubbleWords.some(word => clickedWords.includes(word));
    });

    let filteredConnections = connections.filter(conn => {
        let bubbleA = conn[0];
        let bubbleB = conn[1];
        return filteredBubbles.includes(bubbleA) && filteredBubbles.includes(bubbleB);
    });

    return { filteredBubbles, filteredConnections };
}

// Setup the canvas and UI
function setup() {
    createCanvas(windowWidth, windowHeight);

    // background('rgba(210, 210, 210, 1)');
    // background(51);


    searchInput = createInput();
    searchInput.position(88, 88);
    searchInput.size(222);
    searchInput.attribute('placeholder', 'Search...');
    searchInput.input(filterBubbles); // Call filterBubbles when the input changes

    let clearButton = createButton('Clear');
    clearButton.position(320, 88);
    clearButton.mousePressed(() => {
        searchInput.value('');
        clickedInstance = null;
        filterBubbles(); // Call filterBubbles when the clear button is pressed
    });

    fetchManifestData(); // Fetch data from Firebase
}