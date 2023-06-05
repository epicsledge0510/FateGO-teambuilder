//import * as firebase from "./firebase.js";
window.onload = (e) => {
  document.querySelector("#search").onclick = loadJsonFetch
  document.querySelector("#searchCE").onclick = loadJsonFetchCE
  let searchTerm = "search-name"
  if (localStorage.getItem(searchTerm) != undefined){
    document.querySelector("#results").innerHTML = localStorage.getItem(searchTerm);
  }
};
const nameField = document.querySelector("#searchterm");
const nameKey = "";
let resultsSection = document.querySelector("#results")

function saveData(favesNames, favesClass, favesRarity, favesImg){
  let listIDName = "name-list";
  let items = JSON.stringify(favesNames); 			// now it's a String
  localStorage.setItem(listIDName, favesNames);

  let listIDClass = "class-list";
  let items2 = JSON.stringify(favesClass); 			// now it's a String
  localStorage.setItem(listIDClass, favesClass);

  let listIDRarity = "rarity-list";
  let items3 = JSON.stringify(favesRarity); 			// now it's a String
  localStorage.setItem(listIDRarity, favesRarity);

  let listIDImg = "img-list";
  let items4 = JSON.stringify(favesImg); 			// now it's a String
  localStorage.setItem(listIDImg, favesImg);
}

function saveSearch(search){
    let searchTerm = "search-name";
    localStorage.setItem(searchTerm, search);
}

function loadJsonFetch() {
  let searchTerm = document.querySelector("#searchterm").value;
  if(searchTerm == ""){
    document.querySelector("#results").innerHTML = `<h1 class="subtitle">Please input a character to search!</h1>`;
  }
  else{
    document.querySelector("#search").innerHTML = "Loading results...";
    fetch(`https://api.atlasacademy.io/export/JP/nice_servant_lang_en.json`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then(text => {
          throw text;
        });
      })
      .then(json => {
        document.querySelector("#results").innerHTML = "";
        let i = 0;
        for (let key in json) {
          if (i < document.querySelector("#resultAmount").value) {
            if (json[key].name.toLowerCase().includes(searchTerm.toLowerCase())) {
              if (json[key].className == document.querySelector("#resultSelect").value || document.querySelector("#resultSelect").value == "any") {
                document.querySelector("#results").innerHTML += `
                  <div  class="column is-one-fourth-mobile is-one-fifth-desktop">
                    <div class="notification">
                      <fgo-servant data-name="${json[key].name}" data-class="${json[key].className}" data-rarity="${json[key].rarity}" data-img="${json[key].extraAssets.faces.ascension[1]}" data-card="${json[key].extraAssets.charaGraph.ascension[1]}";></fgo-servant>
                    </div>
                  </div>
                `;
              }
              if(i%5==0){
                document.querySelector("#results").innerHTML += `<p>`
              }
              i++;
            }
          }
        }
        if(document.querySelector("#results").innerHTML == ""){
          document.querySelector("#results").innerHTML = `<h1 class="subtitle">No Results Found!</h1>`
        }
        document.querySelector("#search").innerHTML = "Search characters";
        saveSearch(document.querySelector("#results").innerHTML);
      }).catch(error => {
        console.log(error);
      });
  }
}

function loadJsonFetchCE() {
  let searchTerm = document.querySelector("#searchterm").value;
  document.querySelector("#searchCE").innerHTML = "Loading results...";
  fetch(`https://api.atlasacademy.io/export/JP/nice_equip_lang_en.json`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.text().then(text => {
        throw text;
      });
    })
    .then(json => {
      document.querySelector("#results").innerHTML = "";
      let i = 0;
      for (let key in json) {
        if (i < document.querySelector("#resultAmount").value) {
          if (json[key].name.includes(searchTerm)) {
            document.querySelector("#results").innerHTML += `
                <div  class="column">
                  <div class="notification">
                    <fgo-essence data-name="${json[key].name}"  data-rarity="${json[key].rarity}" data-img="${json[key].extraAssets.faces.equip[json[key].id]}";></fgo-essence>
                  </div>
                </div>
              `;
            i++;
          }
        }
      }
      document.querySelector("#searchCE").innerHTML = "Search characters";
    }).catch(error => {
      console.log(error);
    });
}
export {saveData};