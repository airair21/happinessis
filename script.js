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

    document.getElementById('showbutton').addEventListener('click', function() {
        fetchManifestData();
    });
    

    //Input and submitting

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
        // fname: fname.value, age: age.value , emotion: emotion.value
        age: age.value, 
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

    ref.push(text);
    // console.log(text);

    alert("Your data has been submitted! Thank you!");
};

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




    // for (let i = 0; i < database.length; i++) {
    //     console.log('works??');
    
    //     let circleDiv = document.createElement('div');
    //     let bigBox = document.getElementById('container');
    //     let manifestValue = database[i].manifest; 
    
    //     circleDiv.innerText = manifestValue; 
    //     circleDiv.style.width = '10vw'; 
    //     circleDiv.style.height = '10vh';
    //     circleDiv.style.borderRadius = '50%';
    //     circleDiv.style.display = 'flex';
    //     circleDiv.style.alignItems = 'center';
    //     circleDiv.style.justifyContent = 'center';
    //     circleDiv.style.background = 'lightblue';
    //     circleDiv.style.margin = '1em';
    
    //     bigBox.append(circleDiv); 
    // }
    
        

// value/emotion

//get data from firebase once
// for (const key in data){
//     async function getOnce() {
//         try {
//             const snapshot = await ref.once("value");
//             const data = await snapshot.val();
        
//             //do whatever want twith data
//             // loging to console
//             console.log(data)
    
//         }   catch (error) {
//             console.error(error);
//         }
// }

// }





// $(function () {
//     var FIELDS_TEMPLATE = $('#age-templates').text();
//     var $form = $('#age-form');
//     var $fields = $form.find('.age-fields');

//     $form.on('click', '.add-age-fields', function () {
//         $fields.prepend($(FIELDS_TEMPLATE));
//     });

// });





$(function () {
    var FIELDS_TEMPLATE = $('#fields-templates').text();
    var $form = $('#manifest-form');
    var $fields = $form.find('.manifest-fields');

    $form.on('click', '.add-manifest-fields', function () {
        $fields.append($(FIELDS_TEMPLATE));
    });

    $form.on('click', '.remove-manifest-fields', function (event) {
        $(event.target).closest('.manifest-input-fields').remove();
    });
});

$(function () {
    var FIELDS_TEMPLATE = $('#fields-templates').text();
    var $form = $('#toyou-form');
    var $fields = $form.find('.toyou-fields');

    $form.on('click', '.add-toyou-fields', function () {
        $fields.append($(FIELDS_TEMPLATE));
    });

    $form.on('click', '.remove-toyou-fields', function (event) {
        $(event.target).closest('.toyou-input-fields').remove();
    });
});

$(function () {
    var FIELDS_TEMPLATE = $('#fields-templates').text();
    var $form = $('#toyou2-form');
    var $fields = $form.find('.toyou2-fields');

    $form.on('click', '.add-toyou2-fields', function () {
        $fields.append($(FIELDS_TEMPLATE));
    });

    $form.on('click', '.remove-toyou2-fields', function (event) {
        $(event.target).closest('.toyou2-input-fields').remove();
    });
});

$(function () {
    var FIELDS_TEMPLATE = $('#fields-templates').text();
    var $form = $('#toyou5-form');
    var $fields = $form.find('.toyou5-fields');

    $form.on('click', '.add-toyou5-fields', function () {
        $fields.append($(FIELDS_TEMPLATE));
    });

    $form.on('click', '.remove-toyou5-fields', function (event) {
        $(event.target).closest('.toyou5-input-fields').remove();
    });
});

$(function () {
    var FIELDS_TEMPLATE = $('#fields-templates').text();
    var $form = $('#toyou10-form');
    var $fields = $form.find('.toyou10-fields');

    $form.on('click', '.add-toyou10-fields', function () {
        $fields.append($(FIELDS_TEMPLATE));
    });

    $form.on('click', '.remove-toyou10-fields', function (event) {
        $(event.target).closest('.toyou10-input-fields').remove();
    });
});

$(function () {
    var FIELDS_TEMPLATE = $('#fields-templates').text();
    var $form = $('#purpose-form');
    var $fields = $form.find('.purpose-fields');

    $form.on('click', '.add-purpose-fields', function () {
        $fields.append($(FIELDS_TEMPLATE));
    });

    $form.on('click', '.remove-purpose-fields', function (event) {
        $(event.target).closest('.purpose-input-fields').remove();
    });
});

$(function () {
    var FIELDS_TEMPLATE = $('#fields-templates').text();
    var $form = $('#feeling-form');
    var $fields = $form.find('.feeling-fields');

    $form.on('click', '.add-feeling-fields', function () {
        $fields.append($(FIELDS_TEMPLATE));
    });

    $form.on('click', '.remove-feeling-fields', function (event) {
        $(event.target).closest('.feeling-input-fields').remove();
    });
});


