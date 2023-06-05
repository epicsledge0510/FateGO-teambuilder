let database;
// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"; // TODO: Add SDKs for Firebase products that you want to use
import {
    getDatabase,
    ref,
    set,
    increment,
    onValue
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApMcZwGXt9pGlJpIcoeksvy5paYo-eXBc",
    authDomain: "fgo-teams.firebaseapp.com",
    projectId: "fgo-teams",
    storageBucket: "fgo-teams.appspot.com",
    messagingSenderId: "1088162380121",
    appId: "1:1088162380121:web:8a4b5dae31306a54e67448"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
window.onload = (e) => {
    document.querySelector("#cloudbtn").addEventListener('click', () => {
        document.querySelector("#cloudbtn").classList.toggle('is-loading');
      });
    document.querySelector("#cloudbtn").onclick = exportDownFaves;
    //i know this looks redundant, but it doesn't seem to load properly if i dont do it this way
};
const db = getDatabase();
const storageRef = ref(db, 'team');

function downloadFaves(snapshot) {
    let i = 0; 
    document.querySelector("#cloudteams").innerHTML = "";
    snapshot.forEach(team => {
        i++;
        const childKey = team.key;
        const childName = team.val().name;
        const childClass = team.val().chClass;
        const childRarity = team.val().rarity;
        const childCard = team.val().card;
        document.querySelector("#cloudteams").innerHTML += `
        <h1 class="subtitle">Team #${i}</h1>
        <div class="columns" id="team${i}">`
        for (let member in team.val().name) {
            document.querySelector(`#team${i}`).innerHTML += `
            <div class="column">
                <div class="notification">
                    <fgo-team data-name="${team.val().name[member]}" data-class="${childClass[member]}" data-rarity="${childRarity[member]}" data-img="${childCard[member]}";></fgo-team>
                </div>
            </div>`
        }
    });
    document.querySelector("#cloudbtn").classList.toggle('is-loading');
}

function exportDownFaves() {
    onValue(storageRef, downloadFaves);
}

function writeTeamData(name, chClass, rarity, card) {
    const db = getDatabase();
    set(ref(db, 'team/' + name), {
        name,
        chClass,
        rarity,
        card
    });
}
export {
    downloadFaves,
    writeTeamData,
    exportDownFaves
};