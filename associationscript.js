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



function fetchManifestData() {
    database.ref('inputs')  // Changed from 'manifest' to 'inputs' to match where data is being stored
        .once('value')
        .then(snapshot => {
            let data = snapshot.val();
            if (data) {
                let manifestArray = Object.values(data)
                    .map(item => item?.manifest) // Safely access manifest property
                    .filter(manifest => manifest); // Filter out undefined or null values

                // Split each manifest string by commas and flatten the resulting arrays
                let newArray = manifestArray.flatMap(manifest => manifest.split(','));

                // Now newArray contains all individual values
                displayCircles(newArray);
            } else {
                console.log("No data found");
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}



// CREATE AN ARRAY FOR EACH ONE

    function displayCircles(manifestArray) {
    
        let bigBox = document.getElementById('container');
    
        manifestArray.forEach(manifestArray => {
            let circleDiv = document.createElement('div');
            circleDiv.classList.add('circle');
            circleDiv.innerText = manifestArray; 
            bigBox.append(circleDiv);
        });
    }
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



ref.on('value', (snapshot)=> {
    console.log(snapshot.val());
    // console.log(snapshot.manifest)
    }, (errorObject) => {
        console.log("NAUR");
    });








// Embedded dataset
let data = [{"id":1,"name":"joaquin","instance":"creating work proud of","color":"#d9a5ea"},{"id":2,"name":"joaquin","instance":"family","color":"#d9a5ea"},{"id":3,"name":"joaquin","instance":"spending time with family","color":"#d9a5ea"},{"id":4,"name":"joaquin","instance":"food","color":"#d9a5ea"},{"id":5,"name":"joaquin","instance":"my mom’s food","color":"#d9a5ea"},{"id":6,"name":"joaquin","instance":"being grateful for being able to eat it","color":"#d9a5ea"},{"id":7,"name":"caroline","instance":"enjoyment of activities","color":"#58b6e0"},{"id":8,"name":"caroline","instance":"music sounds better","color":"#58b6e1"},{"id":9,"name":"caroline","instance":"shows are more entertaining","color":"#58b6e2"},{"id":10,"name":"caroline","instance":"conversations are more fun","color":"#58b6e3"},{"id":11,"name":"caroline","instance":"more motivation","color":"#58b6e4"},{"id":12,"name":"caroline","instance":"but also relax","color":"#58b6e5"},{"id":13,"name":"caroline","instance":"time with friends and loved ones","color":"#58b6e6"},{"id":14,"name":"caroline","instance":"petting cats","color":"#58b6e7"},{"id":15,"name":"caroline","instance":"a good baked good","color":"#58b6e8"},{"id":16,"name":"caroline","instance":"when something you’ve been working on turns out well; a day when you have magic hands and everything goes right","color":"#58b6e9"},{"id":17,"name":"chloe","instance":"contentment kind of happiness","color":"#d129c1"},{"id":18,"name":"chloe","instance":"—> peace","color":"#d129c2"},{"id":19,"name":"chloe","instance":"supper giddy","color":"#d129c3"},{"id":20,"name":"chloe","instance":"—> smiley","color":"#d129c4"},{"id":21,"name":"chloe","instance":"*physical response","color":"#d129c5"},{"id":22,"name":"chloe","instance":"conscious","color":"#d129c6"},{"id":23,"name":"emma","instance":"think about bright side","color":"#c16f50"},{"id":24,"name":"emma","instance":"try to be positive","color":"#c16f51"},{"id":25,"name":"emma","instance":"glass half full","color":"#c16f52"},{"id":26,"name":"emma","instance":"able to find humor in the situation","color":"#c16f53"},{"id":27,"name":"emma","instance":"active practice; state of mind","color":"#c16f54"},{"id":28,"name":"emma","instance":"my friends and family","color":"#c16f55"},{"id":29,"name":"emma","instance":"people","color":"#c16f56"},{"id":30,"name":"emma","instance":"talking with them","color":"#c16f57"},{"id":31,"name":"emma","instance":"joking with them","color":"#c16f58"},{"id":32,"name":"emma","instance":"i am the happiest when i am with people","color":"#c16f59"},{"id":33,"name":"emma","instance":"humor","color":"#c16f60"},{"id":34,"name":"joe","instance":"good movie","color":"#08e76c"},{"id":35,"name":"joe","instance":"good manga","color":"#08e76c"},{"id":36,"name":"joe","instance":"anime","color":"#08e76c"},{"id":37,"name":"joe","instance":"movie tropes","color":"#08e76c"},{"id":38,"name":"joe","instance":"angst","color":"#08e76c"},{"id":39,"name":"joe","instance":"taking city people back into rural area trope","color":"#08e76c"},{"id":40,"name":"joe","instance":"shonun","color":"#08e76c"},{"id":41,"name":"joe","instance":"tornement arcs, training stories","color":"#08e76c"},{"id":42,"name":"joe","instance":"best friend becomes ultimate villain","color":"#08e76c"},{"id":43,"name":"joe","instance":"media consumption","color":"#08e76c"},{"id":44,"name":"joe","instance":"cat videos","color":"#08e76c"},{"id":45,"name":"joe","instance":"cooking","color":"#08e76c"},{"id":46,"name":"joe","instance":"baking","color":"#08e76c"},{"id":47,"name":"joe","instance":"esp sticking hand into dough","color":"#08e76c"},{"id":48,"name":"joe","instance":"watching baked goods rise","color":"#08e76c"},{"id":49,"name":"joe","instance":"eating good food","color":"#08e76c"},{"id":50,"name":"joe","instance":"stringiness of pasta cheese","color":"#08e76c"},{"id":51,"name":"nisha","instance":"when room is cold have you have fluffy blanket and you just took a shower and you burrito yourself","color":"#d99cd2"},{"id":52,"name":"henry","instance":"in quiet","color":"#8b0f46"},{"id":53,"name":"henry","instance":"sit down and not something i have to do on behalf of others","color":"#8b0f47"},{"id":54,"name":"henry","instance":"take time for myself","color":"#8b0f48"},{"id":55,"name":"henry","instance":"waking up and not having to do any chores","color":"#8b0f49"},{"id":56,"name":"henry","instance":"nostalgia - experiencing things i got to enjoy as a kid again","color":"#8b0f50"},{"id":57,"name":"michelle","instance":"a little sweet treat","color":"#b7fecc"},{"id":58,"name":"michelle","instance":"treating myself to small things throughout the day","color":"#b7fecc"},{"id":59,"name":"michelle","instance":"walk down street and see dogs (or other animal)","color":"#b7fecc"},{"id":60,"name":"michelle","instance":"roommate’s pets","color":"#b7fecc"},{"id":61,"name":"michelle","instance":"instantly go home and look for pets","color":"#b7fecc"},{"id":62,"name":"michelle","instance":"friends, seeing them","color":"#b7fecc"},{"id":63,"name":"ella","instance":"laughter","color":"#ed8c02"},{"id":64,"name":"ella","instance":"dance","color":"#ed8c03"},{"id":65,"name":"ella","instance":"sex","color":"#ed8c04"},{"id":66,"name":"ella","instance":"food","color":"#ed8c05"},{"id":67,"name":"ella","instance":"self compassion","color":"#ed8c06"},{"id":68,"name":"ella","instance":"unexpectedly having a tampon i didn’t think i had but i needed","color":"#ed8c07"},{"id":69,"name":"shannon","instance":"through my fiends and making them laugh","color":"#bb4edf"},{"id":70,"name":"shannon","instance":"their laughter","color":"#bb4edf"},{"id":71,"name":"shannon","instance":"serendipitous moments","color":"#bb4edf"},{"id":72,"name":"shannon","instance":"union square union holiday market eating yearly roomate empanadas looking at fat pigeons on a bench","color":"#bb4edf"},{"id":73,"name":"jen","instance":"spending time alone","color":"#162718"},{"id":74,"name":"jen","instance":"journaling","color":"#162719"},{"id":75,"name":"jen","instance":"do what i want to do","color":"#162720"},{"id":76,"name":"gabriella","instance":"through my childhood dog","color":"#9c8500"},{"id":77,"name":"gabriella","instance":"pictures of my childhood dog from my dad that i get while i’m away","color":"#9c8501"},{"id":78,"name":"gabriella","instance":"running","color":"#9c8502"},{"id":79,"name":"gabriella","instance":"running outside","color":"#9c8503"},{"id":80,"name":"gabriella","instance":"hike","color":"#9c8504"},{"id":81,"name":"gabriella","instance":"good at it, miserable, now trying to fix it","color":"#9c8505"},{"id":82,"name":"gabriella","instance":"brings faith that things can change","color":"#9c8506"},{"id":83,"name":"gabriella","instance":"i will not be stuck in an old version of myself, where i was faster but so much more depressed","color":"#9c8507"},{"id":84,"name":"gabriella","instance":"grateful for opportunity to be slow, but still get where i’m going","color":"#9c8508"},{"id":85,"name":"gabriella","instance":"happiness is hope","color":"#9c8509"},{"id":86,"name":"gabriella","instance":"if i feel stuck, it can’t feel happy","color":"#9c8510"},{"id":87,"name":"gabriella","instance":"things have to be changing and in flux for me to interesting","color":"#9c8511"},{"id":88,"name":"gabriella","instance":"cooking for people","color":"#9c8512"},{"id":89,"name":"gabriella","instance":"i enjoy the act of plating and have people say it looks good","color":"#9c8513"},{"id":90,"name":"gabriella","instance":"domestic pleasure","color":"#9c8514"},{"id":91,"name":"bafa person","instance":"curiosity","color":"#6ca518"},{"id":92,"name":"bafa person","instance":"about something or someone","color":"#6ca519"},{"id":93,"name":"bafa person","instance":"curiosity gets fulfilled","color":"#6ca520"},{"id":94,"name":"bafa person","instance":"satisfying to know something","color":"#6ca521"},{"id":95,"name":"bafa person","instance":"process of someone. turning from npc to real person","color":"#6ca522"},{"id":96,"name":"emily","instance":"human connection","color":"#59526b"},{"id":97,"name":"emily","instance":"talking with people about what makes them happy","color":"#59526b"},{"id":98,"name":"emily","instance":"food","color":"#59526b"},{"id":99,"name":"emily","instance":"sex","color":"#59526b"},{"id":100,"name":"ren","instance":"community","color":"#403cb6"},{"id":101,"name":"eigo","instance":"if you’re a person that can enjoy life everything is happy","color":"#6a7fe0"},{"id":102,"name":"eigo","instance":"mental model","color":"#6a7fe1"},{"id":103,"name":"eigo","instance":"system of operation","color":"#6a7fe2"},{"id":104,"name":"eigo","instance":"focus on good stuff","color":"#6a7fe3"},{"id":105,"name":"lara","instance":"whenever i’m not second guessing or doubting","color":"#ddad7c"},{"id":106,"name":"lara","instance":"decision paralysis kills me ocd related","color":"#ddad7c"},{"id":107,"name":"lara","instance":"do something without thinking about correct thing or doing something then feel at peace","color":"#ddad7c"},{"id":108,"name":"lara","instance":"peace of mind is happiness","color":"#ddad7c"},{"id":109,"name":"lara","instance":"satisfaction is not happiness","color":"#ddad7c"},{"id":110,"name":"minsoo","instance":"food","color":"#0214a5"},{"id":111,"name":"minsoo","instance":"love folding laundry while watching tv","color":"#0214a6"},{"id":112,"name":"minsoo","instance":"gives me a brain break","color":"#0214a7"},{"id":113,"name":"minsoo","instance":"in korean term called 소학행 — small but sure happiness","color":"#0214a8"},{"id":114,"name":"luke","instance":"pfttt","color":"#fa9c1e"},{"id":115,"name":"luke","instance":"continuing to be curious","color":"#fa9c1e"},{"id":116,"name":"luke","instance":"doing banal repetitive task and youtube going on woman lecture fourth dimensional typology, understood nothing, ok what’s typology","color":"#fa9c1e"},{"id":117,"name":"luke","instance":"sent me down rabbit hole","color":"#fa9c1e"},{"id":118,"name":"vanessa","instance":"famously pessimistic","color":"#4904bb"},{"id":119,"name":"vanessa","instance":"matcha tarts","color":"#4904bb"},{"id":120,"name":"vanessa","instance":"momentarily it gives happiness","color":"#4904bb"},{"id":121,"name":"vanessa","instance":"sensation of it","color":"#4904bb"},{"id":122,"name":"vanessa","instance":"the fact that you don’t have to overthink about what makes you happy","color":"#4904bb"},{"id":123,"name":"vanessa","instance":"you do it and you know","color":"#4904bb"},{"id":124,"name":"vanessa","instance":"anything you think about does not happy","color":"#4904bb"},{"id":125,"name":"vanessa","instance":"anything sweet","color":"#4904bb"},{"id":126,"name":"vanessa","instance":"hot pot","color":"#4904bb"},{"id":127,"name":"vanessa","instance":"spending money","color":"#4904bb"},{"id":128,"name":"vanessa","instance":"shopping outlets","color":"#4904bb"},{"id":129,"name":"vanessa","instance":"water with fruits","color":"#4904bb"},{"id":130,"name":"vanessa","instance":"rewarding is not happiness","color":"#4904bb"},{"id":131,"name":"vanessa","instance":"sound of high heels on a marble floor","color":"#4904bb"},{"id":132,"name":"alice","instance":"eating","color":"#5a2053"},{"id":133,"name":"alice","instance":"having food, it’s nice","color":"#5a2054"},{"id":134,"name":"alice","instance":"eating chinese food","color":"#5a2055"},{"id":135,"name":"alice","instance":"hotpot","color":"#5a2056"},{"id":136,"name":"alice","instance":"with fam and friends","color":"#5a2057"},{"id":137,"name":"alice","instance":"sharing with them","color":"#5a2058"},{"id":138,"name":"alice","instance":"having handmade homemade ingredients","color":"#5a2059"},{"id":139,"name":"alice","instance":"connecting with people and eating and enjoying what others made for you","color":"#5a2060"},{"id":140,"name":"alice","instance":"japan","color":"#5a2061"},{"id":141,"name":"alice","instance":"cream puff","color":"#5a2062"},{"id":142,"name":"lulu","instance":"food","color":"#a76a8b"},{"id":143,"name":"lulu","instance":"most of time eat alone joy","color":"#a76a8b"},{"id":144,"name":"lulu","instance":"but when i eat wit my friend","color":"#a76a8b"},{"id":145,"name":"lulu","instance":"eating with roommate happiness don’t know how to describe","color":"#a76a8b"},{"id":146,"name":"lulu","instance":"telepathy happiness communicate when eat together, same wavelength","color":"#a76a8b"},{"id":147,"name":"lulu","instance":"watching her enjoy it makes me enjoy it","color":"#a76a8b"},{"id":148,"name":"lulu","instance":"live mukbang","color":"#a76a8b"},{"id":149,"name":"lulu","instance":"in my surroundings","color":"#a76a8b"},{"id":150,"name":"lulu","instance":"friends","color":"#a76a8b"},{"id":151,"name":"lulu","instance":"when i’m laying on my bed about to go to sleep and cat sits on my upper chest","color":"#a76a8b"},{"id":152,"name":"lulu","instance":"feels like im being cared about and he wants me","color":"#a76a8b"},{"id":153,"name":"lulu","instance":"when i game","color":"#a76a8b"},{"id":154,"name":"lulu","instance":"buildup of excitement and trying so hard and tension you feeling gets let go","color":"#a76a8b"},{"id":155,"name":"lulu","instance":"every time i beat him in speed i have to jump up","color":"#a76a8b"},{"id":156,"name":"lulu","instance":"walking around neighborhood of apartment","color":"#a76a8b"},{"id":157,"name":"lulu","instance":"walking on a good sunny day","color":"#a76a8b"},{"id":158,"name":"lulu","instance":"or night when lights are lit up","color":"#a76a8b"},{"id":159,"name":"lulu","instance":"beautiful","color":"#a76a8b"},{"id":160,"name":"lulu","instance":"satisfying is happiness","color":"#a76a8b"},{"id":161,"name":"lulu","instance":"satisfaction brings happiness","color":"#a76a8b"},{"id":162,"name":"lulu","instance":"first sip of panera broccoli cheddar soup on cold winter day","color":"#a76a8b"},{"id":163,"name":"lulu","instance":"the sip of freezing ice cold water while you’re parched after a nap","color":"#a76a8b"},{"id":164,"name":"lulu","instance":"glass of cold milk after hot spring (onsen)","color":"#a76a8b"},{"id":165,"name":"lulu","instance":"when you walk out the airport after you land and the first whiff of air smells like home","color":"#a76a8b"},{"id":166,"name":"lulu","instance":"strawberry shortcake but when the bite has strawberry cake and whipped cream and the strawberry is not too big it’s like a half or quarter","color":"#a76a8b"},{"id":167,"name":"oliver","instance":"in the little things","color":"#15f811"},{"id":168,"name":"oliver","instance":"clear blue sky","color":"#15f812"},{"id":169,"name":"oliver","instance":"sunlight on skin","color":"#15f813"},{"id":170,"name":"oliver","instance":"birds chips ping","color":"#15f814"},{"id":171,"name":"oliver","instance":"leaves changing","color":"#15f815"},{"id":172,"name":"oliver","instance":"breath of fresh air","color":"#15f816"},{"id":173,"name":"oliver","instance":"waking up to be alive","color":"#15f817"},{"id":174,"name":"oliver","instance":"experiencing the day","color":"#15f818"},{"id":175,"name":"oliver","instance":"music that’s it that happiness","color":"#15f819"},{"id":176,"name":"helen","instance":"when i win a game","color":"#21126e"},{"id":177,"name":"helen","instance":"3d modeling- pain in the process but in end happiness","color":"#21126e"},{"id":178,"name":"helen","instance":"my mom says i love you","color":"#21126e"},{"id":179,"name":"jenny","instance":"in my bed","color":"#583b20"},{"id":180,"name":"jenny","instance":"when i know i an get ten hours of sleep","color":"#583b21"},{"id":181,"name":"jenny","instance":"wake up and feel great","color":"#583b22"},{"id":182,"name":"jenny","instance":"friendships","color":"#583b23"},{"id":183,"name":"jenny","instance":"the feeling of finding your people","color":"#583b24"},{"id":184,"name":"jenny","instance":"sitting around and thinking life is great","color":"#583b25"},{"id":185,"name":"jenny","instance":"sunny days","color":"#583b26"},{"id":186,"name":"brooke","instance":"through art making","color":"#abfacc"},{"id":187,"name":"brooke","instance":"my dog","color":"#abfacc"},{"id":188,"name":"brooke","instance":"i love him so much","color":"#abfacc"},{"id":189,"name":"brooke","instance":"very cute even though pain in ass","color":"#abfacc"},{"id":190,"name":"brooke","instance":"making art","color":"#abfacc"},{"id":191,"name":"brooke","instance":"riso printing and publishing","color":"#abfacc"},{"id":192,"name":"brooke","instance":"drawing","color":"#abfacc"},{"id":193,"name":"brooke","instance":"when not making art affects mood all around and perception","color":"#abfacc"},{"id":194,"name":"alyssa","instance":"about to go home","color":"#c6efc1"},{"id":195,"name":"alyssa","instance":"see my friends","color":"#c6efc2"},{"id":196,"name":"alyssa","instance":"when i stay up working my roomate stays up working even though he has nothing to do to parallel play","color":"#c6efc3"},{"id":197,"name":"alyssa","instance":"my cats","color":"#c6efc4"},{"id":198,"name":"alyssa","instance":"when i wash my sheets and then sleep in bed","color":"#c6efc5"},{"id":199,"name":"alyssa","instance":"eat something","color":"#c6efc6"},{"id":200,"name":"alyssa","instance":"trader joes soup dumplings","color":"#c6efc7"},{"id":201,"name":"alyssa","instance":"garlic bread","color":"#c6efc8"},{"id":202,"name":"alyssa","instance":"i like garlic","color":"#c6efc9"},{"id":203,"name":"alyssa","instance":"i like that thing","color":"#c6efc10"},{"id":204,"name":"alyssa","instance":"when you go to restaurant and you get the warm bread in cloth with the butter","color":"#c6efc11"},{"id":205,"name":"alyssa","instance":"me and all my friends go all my god and we appreciate it","color":"#c6efc12"}]
;


// Initialize variables
let bubbles = [];
let connections = [];
let searchInput;
let filteredBubbles = [];
let filteredConnections = [];
let clickedInstance = null;

// List of common words to exclude from connections
const COMMON_WORDS = new Set(['and', 'i', 'to', 'the', 'a', 'of', 'in', 'it', 'is', 'that', 'with', 'for', 'on', 'are', 'as', 'be', 'at', 'or', 'was', 'but', 'not', 'you', 'this', 'have', 'he', 'she', 'we', 'they', 'my', 'your', 'their', 'our', 'me', 'him', 'her', 'us', 'them', 'when']);

function setup() {
createCanvas(windowWidth, windowHeight);
console.log(data);

initializeBubbles();
establishConnections();

searchInput = createInput();
searchInput.position(88, 88);
searchInput.size(222);
searchInput.attribute('placeholder', 'Search...');
searchInput.input(filterBubbles);

let clearButton = createButton('Clear');
clearButton.position(220, 10);
clearButton.mousePressed(() => {
searchInput.value('');
clickedInstance = null;
filterBubbles();
});
}

// function initializeBubbles() {
//     for (let i = 0; i < data.length; i++) {
//         let bubble = {
//             instance: data[i].instance,
//             color: data[i].color,
//             id: data[i].id, 
//             x: random(width),
//             y: random(height),
//             connections: 0,
//             diameter: calculateBubbleDiameter(data[i].instance) // Calculate diameter based on text
//         };
//         bubbles.push(bubble);
//     }
//     filteredBubbles = bubbles;
//     filteredConnections = connections;
// }

function fetchManifestData() {
    database.ref('inputs')
        .once('value')
        .then(snapshot => {
            let data = snapshot.val();
            if (data) {
                // Extract the `manifest` property from each object and filter out null/undefined values
                let manifestArray = Object.values(data)
                    .map(item => item?.manifest) // Safely access manifest property
                    .filter(manifest => manifest); // Filter out undefined or null values

                // Split each manifest string by commas and flatten the resulting arrays
                let newArray = manifestArray.flatMap(manifest => manifest.split(','));

                // Now newArray contains all individual values
                initializeBubbles(newArray); // Call initializeBubbles with newArray
            } else {
                console.log("No data found");
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Define initializeBubbles as a separate function
function initializeBubbles(newArray) {
    // Clear existing bubbles
    bubbles = [];

    // Iterate over the newArray to create bubbles
    for (let i = 0; i < newArray.length; i++) {
        let bubble = {
            instance: newArray[i], // Use the current manifest value
            color: getRandomColor(), // Assign a random color
            id: i, // Use the index as the ID (or generate a unique ID)
            x: random(width), // Random x position within the canvas
            y: random(height), // Random y position within the canvas
            connections: 0, // Initialize connections to 0
            diameter: calculateBubbleDiameter(newArray[i]) // Calculate diameter based on text
        };
        bubbles.push(bubble);
    }

    // Update filteredBubbles and filteredConnections
    filteredBubbles = bubbles;
    filteredConnections = connections;
}

// Helper function to generate a random color
function getRandomColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Helper function to calculate bubble diameter based on text length
function calculateBubbleDiameter(text) {
    const baseSize = 50; // Base size for the bubble
    const sizeMultiplier = 5; // Adjust based on text length
    return baseSize + (text.length * sizeMultiplier);
}



function calculateBubbleDiameter(instance) {
// Set a fixed font size
textSize(6);
textAlign(CENTER, CENTER);

// Split the text into words
let words = instance.split(' ');
let maxLineWidth = 0;
let lineHeight = textSize() * 1.2; // Line height (120% of font size)

// Calculate the maximum line width
let currentLine = '';
for (let word of words) {
let testLine = currentLine === '' ? word : currentLine + ' ' + word;
let testWidth = textWidth(testLine);

// If the line fits within a reasonable width, add the word
if (testWidth <= 111) { // Max line width for a bubble
currentLine = testLine;
} else {
// Start a new line
maxLineWidth = max(maxLineWidth, textWidth(currentLine));
currentLine = word;
}
}
maxLineWidth = max(maxLineWidth, textWidth(currentLine));

// Calculate the number of lines
let numLines = Math.ceil(textWidth(instance) / maxLineWidth);

// Calculate the required diameter
let padding = 20; // Padding around the text
let diameter = max(maxLineWidth, numLines * lineHeight) + padding;

return diameter;
}

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

function shareWords(instanceA, instanceB) {
// Split instances into words and filter out common words
let wordsA = instanceA
.toLowerCase()
.split(' ')
.filter(word => !COMMON_WORDS.has(word)); // Exclude common words
let wordsB = instanceB
.toLowerCase()
.split(' ')
.filter(word => !COMMON_WORDS.has(word)); // Exclude common words

// Check if any remaining words are shared
return wordsA.some(word => wordsB.includes(word));
}

function filterBubbles() {
let searchTerm = searchInput.value().toLowerCase();
if (searchTerm === '' && clickedInstance === null) {
// Show all bubbles and connections if no search term and no clicked instance
filteredBubbles = bubbles;
filteredConnections = connections;
} else {
// Filter bubbles based on search term or clicked instance
filteredBubbles = bubbles.filter(bubble =>
bubble.instance.toLowerCase().includes(searchTerm) ||
bubble.id === clickedInstance
);

// Find connections involving the filtered bubbles
filteredConnections = connections.filter(conn => {
let bubbleA = conn[0];
let bubbleB = conn[1];
return (
filteredBubbles.includes(bubbleA) || filteredBubbles.includes(bubbleB)
);
});

// Add connected bubbles to the filteredBubbles array
for (let conn of filteredConnections) {
let bubbleA = conn[0];
let bubbleB = conn[1];
if (!filteredBubbles.includes(bubbleA)) filteredBubbles.push(bubbleA);
if (!filteredBubbles.includes(bubbleB)) filteredBubbles.push(bubbleB);
}
}
draw();
}

function draw() {
background(100);

// Draw connections for filtered bubbles
for (let conn of filteredConnections) {
let bubbleA = conn[0];
let bubbleB = conn[1];
strokeWeight(map(bubbleA.connections, 1, 6, 0.5, 2));
stroke(lerpColor(color(bubbleA.color), color(0), map(bubbleA.connections, 1, max(bubbleA.connections, bubbleB.connections), 0, 1)));
line(bubbleA.x, bubbleA.y, bubbleB.x, bubbleB.y);
}

// Draw filtered bubbles
for (let bubble of filteredBubbles) {
fill(bubble.color);
noStroke();
ellipse(bubble.x, bubble.y, bubble.diameter, bubble.diameter);
drawTextBlock(bubble);

// Highlight the clicked bubble
if (bubble.id === clickedInstance) {
stroke(255, 0, 0);
noFill();
ellipse(bubble.x, bubble.y, bubble.diameter + 10, bubble.diameter + 10);
}
}
}

function drawTextBlock(bubble) {
fill(0);
textSize(12);
textAlign(CENTER, CENTER);

let words = bubble.instance.split(' ');
let lines = [];
let currentLine = words[0];

// Split the text into lines that fit within the bubble
for (let i = 1; i < words.length; i++) {
let word = words[i];
let testLine = currentLine + ' ' + word;
let testWidth = textWidth(testLine);

if (testWidth <= bubble.diameter * 0.8) { // 80% of bubble diameter
currentLine = testLine;
} else {
lines.push(currentLine);
currentLine = word;
}
}
lines.push(currentLine);

// Calculate the starting Y position for the text
let lineHeight = textSize() * 1.2;
let totalHeight = lines.length * lineHeight;
let y = bubble.y - (totalHeight / 2) + (lineHeight / 2);

// Draw each line of text
for (let line of lines) {
text(line, bubble.x, y);
y += lineHeight;
}
}
function mouseDragged() {
for (let bubble of bubbles) {
if (dist(mouseX, mouseY, bubble.x, bubble.y) < bubble.diameter / 2) {
// Move the bubble
bubble.x = mouseX;
bubble.y = mouseY;

// Prevent overlapping with other bubbles
for (let otherBubble of bubbles) {
if (otherBubble !== bubble && checkCollision(bubble, otherBubble)) {
// Move the other bubble away
let angle = atan2(otherBubble.y - bubble.y, otherBubble.x - bubble.x);
let distance = (bubble.diameter + otherBubble.diameter) / 2;
otherBubble.x = bubble.x + cos(angle) * distance;
otherBubble.y = bubble.y + sin(angle) * distance;
}
}
}
}
}

function checkCollision(bubbleA, bubbleB) {
// Check if two bubbles are colliding
let distance = dist(bubbleA.x, bubbleA.y, bubbleB.x, bubbleB.y);
return distance < (bubbleA.diameter + bubbleB.diameter) / 2;
}

function windowResized() {
resizeCanvas(windowWidth, windowHeight);
repositionBubbles();
draw();
}

function repositionBubbles() {
let scaleX = width / windowWidth;
let scaleY = height / windowHeight;

for (let bubble of bubbles) {
bubble.x *= scaleX;
bubble.y *= scaleY;
}
}

function mouseClicked() {
let clickedBubble = null;

// Check if a bubble was clicked
for (let bubble of filteredBubbles) {
if (dist(mouseX, mouseY, bubble.x, bubble.y) < bubble.diameter / 2) {
clickedBubble = bubble;
break;
}
}

if (clickedBubble) {
// If a bubble is clicked, update the clicked instance
clickedInstance = clickedBubble.id;
searchInput.value(clickedBubble.instance);
} else {
// If clicking outside a bubble, reset the view
clickedInstance = null;
searchInput.value('');
}

// Trigger the filtering logic
filterBubbles();
}