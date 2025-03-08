// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//dont want to share with other people
const firebaseConfig = {
    apiKey: "AIzaSyB1jslHXmb08Se0APqMo6lGwMTaubkpd3Q",
    authDomain: "happiness-is-api.firebaseapp.com",
    projectId: "happiness-is-api",
    storageBucket: "happiness-is-api.firebasestorage.app",
    messagingSenderId: "619524571664",
    appId: "1:619524571664:web:741f1619443b4d281e4095",
    measurementId: "G-Z5J45S2NLT"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const ref = database.ref("inputs");
// const fname = document.getElementById('fname');
const age = document.getElementById('age');
// const emotion = document.getElementById('emotion');
const manifest = document.getElementById('manifest');
const toyou = document.getElementById('toyou');
const toyou2 = document.getElementById('toyou2');
const toyou5 = document.getElementById('toyou5');
const toyou10 = document.getElementById('toyou10');
const purpose = document.getElementById('purpose');
const feeling = document.getElementById('feeling');

const pushbutton = document.getElementById('pushbutton'); 

// const manifestArray = Object.values(data)



// parse out data


// function fetchManifestData() {
//     database.ref('manifests') 
//         .once('value')
//          .then(snapshot => {
//           let data = snapshot.val();
//           console.log("Data from Firebase:", data); // Log the data to inspect its structure

//             if (data) {
//                 let manifestArray = Object.values(data); 
//                 // let manifestArray = Object.values(data).map(item => item.manifest);
//                 displayCircles(manifestArray);
//             } else {
//                 console.log("BLEHHH");
//             }
//         })
//         .catch(error => console.error("Error fetching data:", error));
//     }


// Store the reference (aka the key that's the label for the data) in a variable







// function fetchManifestData() {
//     database.ref('inputs')  // Changed from 'manifest' to 'inputs' to match where data is being stored
//         .once('value')
//         .then(snapshot => {
//             let data = snapshot.val();
//             if (data) {
//                 let manifestArray = Object.values(data)
//                     .map(item => item?.manifest) // Safely access manifest property
//                     .filter(manifest => manifest); // Filter out undefined or null values

//                 // Split each manifest string by commas and flatten the resulting arrays
//                 let newArray = manifestArray.flatMap(manifest => manifest.split(','));

//                 // Now newArray contains all individual values
//                 displayCircles(newArray);
//             } else {
//                 console.log("No data found");
//             }
//         })
//     .catch(error => console.error("Error fetching data:", error));
// }



// CREATE AN ARRAY FOR EACH ONE

// function displayCircles(manifestArray) {

//     let bigBox = document.getElementById('container');

//     manifestArray.forEach(manifestArray => {
//         let circleDiv = document.createElement('div');
//         circleDiv.classList.add('circle');
//         circleDiv.innerText = manifestArray; 
//         bigBox.append(circleDiv);
//     });
// }
function displayCircles(toyou) {

    let bigBox = document.getElementById('container');

    toyou.forEach(toyou => {
        let circleDiv = document.createElement('div');
        circleDiv.classList.add('circle');
        circleDiv.innerText = toyou; 
        bigBox.append(circleDiv);
    });
}
function displayCircles(toyou2) {

    let bigBox = document.getElementById('container');

    toyou2.forEach(toyou2 => {
        let circleDiv = document.createElement('div');
        circleDiv.classList.add('circle');
        circleDiv.innerText = toyou2; 
        bigBox.append(circleDiv);
    });
}
function displayCircles(toyou5) {

    let bigBox = document.getElementById('container');

    toyou5.forEach(toyou5 => {
        let circleDiv = document.createElement('div');
        circleDiv.classList.add('circle');
        circleDiv.innerText = toyou5; 
        bigBox.append(circleDiv);
    });
}
function displayCircles(toyou10) {

    let bigBox = document.getElementById('container');

    toyou10.forEach(toyou10 => {
        let circleDiv = document.createElement('div');
        circleDiv.classList.add('circle');
        circleDiv.innerText = toyou10; 
        bigBox.append(circleDiv);
    });
}
function displayCircles(purpose) {

    let bigBox = document.getElementById('container');

    purpose.forEach(purpose => {
        let circleDiv = document.createElement('div');
        circleDiv.classList.add('circle');
        circleDiv.innerText = purpose; 
        bigBox.append(circleDiv);
    });
}
function displayCircles(feeling) {

    let bigBox = document.getElementById('container');

    feeling.forEach(feeling => {
        let circleDiv = document.createElement('div');
        circleDiv.classList.add('circle');
        circleDiv.innerText = feeling; 
        bigBox.append(circleDiv);
    });
}



document.getElementById('showbutton').addEventListener('click', function() {
    fetchManifestData();
});


    //Input and submitting

// pushbutton.onclick = function (event) {
//     event.preventDefault();

    // const manifestValues = [];
    // document.querySelectorAll('.manifest').forEach(input => {
    //     manifestValues.push(input.value);
    // });
    // const toyouValues = [];
    // document.querySelectorAll('.toyou').forEach(input => {
    //     toyouValues.push(input.value);
    // });
    // const toyou2Values = [];
    // document.querySelectorAll('.toyou2').forEach(input => {
    //     toyou2Values.push(input.value);
    // });
    // const toyou5Values = [];
    // document.querySelectorAll('.toyou5').forEach(input => {
    //     toyou5Values.push(input.value);
    // });
    // const toyou10Values = [];
    // document.querySelectorAll('.toyou10').forEach(input => {
    //     toyou10Values.push(input.value);
    // });
    // const purposeValues = [];
    // document.querySelectorAll('.purpose').forEach(input => {
    //     purposeValues.push(input.value);
    // });
    // const feelingValues = [];
    // document.querySelectorAll('.feeling').forEach(input => {
    //     feelingValues.push(input.value);
    // });

    const text = {
        // fname: fname.value, age: age.value , emotion: emotion.value
        // age: age.value, 
        manifest: manifestValues.join(', '), 
        toyou: toyouValues.join(', '), 
        toyou2: toyou2Values.join(', '), 
        toyou5: toyou5Values.join(', '), 
        toyou10: toyou10Values.join(', '), 
        purpose: purposeValues.join(', '), 
        feeling: feelingValues.join(', ')
    };


    // LOG CURRENT YEAR AS NEW OBJECT VALUE



    // emotion.value = "";

    // ref.push(text);
    // console.log(text);

    // alert("Your data has been submitted! Thank you!");
;

// ref.on("value", (snapshot) => {
//     //get data from firebase
//     const data = snapshot.val();
// })


ref.on('value', (snapshot)=> {
console.log(snapshot.val());
// console.log(snapshot.manifest)
}, (errorObject) => {
    console.log("NAUR");
});






// P5 START

// Initialize variables
let bubbles = []; // Declare bubbles at the top of the script
let connections = [];
let filteredBubbles = [];
let filteredConnections = [];
let clickedInstance = null;

// List of common words to exclude from connections
const COMMON_WORDS = new Set(['and', 'i', 'to', 'the', 'a', 'of', 'in', 'it', 'is', 'that', 'with', 'for', 'on', 'are', 'as', 'be', 'at', 'or', 'was', 'but', 'not', 'you', 'this', 'have', 'he', 'she', 'we', 'they', 'my', 'your', 'their', 'our', 'me', 'him', 'her', 'us', 'them', 'when']);

// Canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// DOM elements
const searchInput = document.getElementById('search-input');
const clearButton = document.getElementById('clear-button');

// Initialize canvas size
function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Fetch data and initialize bubbles
function fetchManifestData() {
    database.ref('inputs')
        .once('value')
        .then(snapshot => {
            let data = snapshot.val();
            if (data) {
                let manifestArray = Object.values(data)
                    .map(item => item?.manifest)
                    .filter(manifest => manifest);
                let newArray = manifestArray.flatMap(manifest => manifest.split(','));
                initializeBubbles(newArray); // Pass the data to initializeBubbles
            } else {
                console.log("No data found");
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Initialize bubbles with fetched data
function initializeBubbles(manifestArray) {
    bubbles = []; // Clear existing bubbles
    for (let i = 0; i < manifestArray.length; i++) {
        let bubble = {
            instance: manifestArray[i],
            color: '#cccccc',
            id: i,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            connections: 0,
            diameter: calculateBubbleDiameter(manifestArray[i])
        };
        bubbles.push(bubble);
    }
    filteredBubbles = bubbles;
    filteredConnections = connections;
    establishConnections();
    draw();
}

// Display circles in the DOM
function displayCircles(dataArray, containerId) {
    let bigBox = document.getElementById(containerId);
    bigBox.innerHTML = '';
    dataArray.forEach(item => {
        let circleDiv = document.createElement('div');
        circleDiv.classList.add('circle');
        circleDiv.innerText = item;
        bigBox.append(circleDiv);
    });
}

// Event listener for fetching data
document.getElementById('showbutton').addEventListener('click', function () {
    fetchManifestData();
});

// Ensure DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    const pushbutton = document.getElementById('pushbutton');
    if (pushbutton) {
        pushbutton.onclick = function (event) {
            event.preventDefault();

            const manifestValues = [];
            document.querySelectorAll('.manifest').forEach(input => {
                manifestValues.push(input.value);
            });
            const toyouValues = [];
            document.querySelectorAll('.toyou').forEach(input => {
                toyouValues.push(input.value);
            });
            const toyou2Values = [];
            document.querySelectorAll('.toyou2').forEach(input => {
                toyou2Values.push(input.value);
            });
            const toyou5Values = [];
            document.querySelectorAll('.toyou5').forEach(input => {
                toyou5Values.push(input.value);
            });
            const toyou10Values = [];
            document.querySelectorAll('.toyou10').forEach(input => {
                toyou10Values.push(input.value);
            });
            const purposeValues = [];
            document.querySelectorAll('.purpose').forEach(input => {
                purposeValues.push(input.value);
            });
            const feelingValues = [];
            document.querySelectorAll('.feeling').forEach(input => {
                feelingValues.push(input.value);
            });

            const text = {
                age: age.value,
                manifest: manifestValues.join(', '),
                toyou: toyouValues.join(', '),
                toyou2: toyou2Values.join(', '),
                toyou5: toyou5Values.join(', '),
                toyou10: toyou10Values.join(', '),
                purpose: purposeValues.join(', '),
                feeling: feelingValues.join(', ')
            };

            ref.push(text);
            alert("Your data has been submitted! Thank you!");
        };
    } else {
        console.error("Pushbutton element not found!");
    }
});





// Initialize bubbles CHANGE DATA
// function initializeBubbles() {
//     for (let i = 0; i < data.length; i++) {
//       let bubble = {
//         instance: data[i].manifest, // Use 'manifest' instead of 'instance'
//         instance: fetchManifestData().manifestArray,
//         color: data[i].color || '#cccccc', // Default color if not provided
//         // id: data[i].id || i,               // Default ID if not provided
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         connections: 0,
//         diameter: calculateBubbleDiameter(data[i].manifest) // Use 'manifest' for diameter calculation
//       };
//       bubbles.push(bubble);
//     }
//     filteredBubbles = bubbles;
//     filteredConnections = connections;
// }

// Calculate bubble diameter based on text
function calculateBubbleDiameter(instance) {
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  let words = instance.split(' ');
  let maxLineWidth = 0;
  let lineHeight = 14.4; // 12px * 1.2

  let currentLine = '';
  for (let word of words) {
    let testLine = currentLine === '' ? word : currentLine + ' ' + word;
    let testWidth = ctx.measureText(testLine).width;

    if (testWidth <= 111) {
      currentLine = testLine;
    } else {
      maxLineWidth = Math.max(maxLineWidth, ctx.measureText(currentLine).width);
      currentLine = word;
    }
  }
  maxLineWidth = Math.max(maxLineWidth, ctx.measureText(currentLine).width);

  let numLines = Math.ceil(ctx.measureText(instance).width / maxLineWidth);
  let padding = 20;
  let diameter = Math.max(maxLineWidth, numLines * lineHeight) + padding;

  return diameter;
}

// Establish connections between bubbles
function establishConnections() {
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

// Check if two instances share words
function shareWords(instanceA, instanceB) {
  let wordsA = instanceA
    .toLowerCase()
    .split(' ')
    .filter(word => !COMMON_WORDS.has(word));
  let wordsB = instanceB
    .toLowerCase()
    .split(' ')
    .filter(word => !COMMON_WORDS.has(word));
  return wordsA.some(word => wordsB.includes(word));
}

// Filter bubbles based on search term or clicked instance
function filterBubbles() {
  let searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === '' && clickedInstance === null) {
    filteredBubbles = bubbles;
    filteredConnections = connections;
  } else {
    filteredBubbles = bubbles.filter(bubble =>
      bubble.instance.toLowerCase().includes(searchTerm) ||
      bubble.id === clickedInstance
    );

    filteredConnections = connections.filter(conn => {
      let bubbleA = conn[0];
      let bubbleB = conn[1];
      return (
        filteredBubbles.includes(bubbleA) || filteredBubbles.includes(bubbleB)
      );
    });

    for (let conn of filteredConnections) {
      let bubbleA = conn[0];
      let bubbleB = conn[1];
      if (!filteredBubbles.includes(bubbleA)) filteredBubbles.push(bubbleA);
      if (!filteredBubbles.includes(bubbleB)) filteredBubbles.push(bubbleB);
    }
  }
  draw();
}

// Draw the visualization
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw connections
  for (let conn of filteredConnections) {
    let bubbleA = conn[0];
    let bubbleB = conn[1];
    ctx.beginPath();
    ctx.moveTo(bubbleA.x, bubbleA.y);
    ctx.lineTo(bubbleB.x, bubbleB.y);
    ctx.strokeStyle = `rgba(0, 0, 0, ${Math.min(1, bubbleA.connections / 6)})`;
    ctx.lineWidth = Math.max(0.5, bubbleA.connections / 3);
    ctx.stroke();
  }

  // Draw bubbles
  for (let bubble of filteredBubbles) {
    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubble.diameter / 2, 0, Math.PI * 2);
    ctx.fillStyle = bubble.color;
    ctx.fill();

    // Draw text
    drawTextBlock(bubble);

    // Highlight clicked bubble
    if (bubble.id === clickedInstance) {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
}

// Draw text inside a bubble
function drawTextBlock(bubble) {
  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  let words = bubble.instance.split(' ');
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    let word = words[i];
    let testLine = currentLine + ' ' + word;
    let testWidth = ctx.measureText(testLine).width;

    if (testWidth <= bubble.diameter * 0.8) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  let lineHeight = 14.4;
  let totalHeight = lines.length * lineHeight;
  let y = bubble.y - (totalHeight / 2) + (lineHeight / 2);

  for (let line of lines) {
    ctx.fillText(line, bubble.x, y);
    y += lineHeight;
  }
}

// Event listeners
searchInput.addEventListener('input', filterBubbles);
clearButton.addEventListener('click', () => {
  searchInput.value = '';
  clickedInstance = null;
  filterBubbles();
});

canvas.addEventListener('mousedown', (e) => {
  let rect = canvas.getBoundingClientRect();
  let mouseX = e.clientX - rect.left;
  let mouseY = e.clientY - rect.top;

  for (let bubble of filteredBubbles) {
    let distance = Math.sqrt((mouseX - bubble.x) ** 2 + (mouseY - bubble.y) ** 2);
    if (distance < bubble.diameter / 2) {
      clickedInstance = bubble.id;
      searchInput.value = bubble.instance;
      filterBubbles();
      break;
    }
  }
});

// Initialize
initializeCanvas();
initializeBubbles();
establishConnections();
draw();

// Handle window resize
window.addEventListener('resize', () => {
  initializeCanvas();
  draw();
});