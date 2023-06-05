import * as firebase from "./firebase.js";
let items;
let items2;
let items3;
let items4;
window.onload = (e) => {
    loadData();
    document.querySelector("#clearbtn").onclick = clearData;
    document.querySelector("#pushbtn").onclick = pushData;
};
let resultsSection = document.querySelector("#results")

function loadData() {
    let listIDName = "name-list";
    items = localStorage.getItem(listIDName); // returns a String
    console.log(items);
    let listIDClass = "class-list";
    items2 = localStorage.getItem(listIDClass); // returns a String
    console.log(items2);
    let listIDRarity = "rarity-list";
    items3 = localStorage.getItem(listIDRarity); // returns a String
    console.log(items);
    let listIDImg = "img-list";
    items4 = localStorage.getItem(listIDImg); // returns a String
    console.log(items2);
    try {
        items = items.split(',');
        items2 = items2.split(',');
        items3 = items3.split(',');
        items4 = items4.split(',');
        console.log(items);
        console.log(items2);
        console.log(items3);
        console.log(items4);
    } catch {
        console.log("no locally stored favorites");
    }
    loadJsonFetch(items, items2)
}

function clearData() {
    localStorage.clear();
    document.querySelector("#results").innerHTML = "";
}

function loadJsonFetch(items, items2) {
    document.querySelector("#results").innerHTML = "";
    let i = 0;
    try{
        if(items.length <= 6){
            for (let obj in items) {
                document.querySelector("#results").innerHTML += `
                        <div  class="column">
                          <div class="notification">
                          <fgo-team data-name="${items[obj]}" data-class="${items2[obj]}" data-rarity="${items3[obj]}" data-img="${items4[obj]}";></fgo-team>
                          </div>
                        </div>
                    `
                i++;
            }
            document.querySelector("#results").innerHTML += `<`
        }
        else{
            document.querySelector("#results").innerHTML = "Team too big, please clear memory and rebuild team."
        }
    }
    catch{
        console.log("no locally stored favorites");
    }
}
function pushData(){
    firebase.writeTeamData(items, items2, items3, items4);
}