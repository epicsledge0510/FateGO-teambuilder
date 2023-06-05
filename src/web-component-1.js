import * as app from "./main.js";
const template = document.createElement("template");
let favesNames = [];
let favesClass = [];
let favesRarity = [];
let favesImg = [];
let i = 0;
template.innerHTML = `
<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
</style>
  <img class="image is-128x128">
  <p>
  <span class="title is-4"></span>
  <h1 class="subtitle is-5""></h1>
  <h2 class="subtitle is-5"></h2>
  <button class="button is-link">Add to team</button>
  <h4></h4>
`;
class FGOServant extends HTMLElement{
    constructor(){
      super();
      this.attachShadow({mode:"open"});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      // put this at the end of the constructor
      if(!this.dataset.name) this.dataset.name = 1989;
      if(!this.dataset.classID) this.dataset.classID = "Bill & Ted";
      if(!this.dataset.rarity) this.dataset.rarity = 0;
      

      // This line of code will create an property named `span` for us, so that we don't have to keep calling this.shadowRoot.querySelector("span");
      this.span = this.shadowRoot.querySelector("span");
      this.img = this.shadowRoot.querySelector("img");
      this.h1 = this.shadowRoot.querySelector("h1");
      this.h2 = this.shadowRoot.querySelector("h2");
      this.btn = this.shadowRoot.querySelector("button");
    }
    connectedCallback(){
      this.btn.onclick = () => {
        if(i <= 5){
          const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "Altria";
          const classID = this.getAttribute('data-class') ? this.getAttribute('data-class'): "Saber";
          const rarity = this.getAttribute('data-rarity') ? this.getAttribute('data-rarity'): "5";
          const img = this.getAttribute('data-img') ? this.getAttribute('data-img') : "Nobody";
          const card = this.getAttribute('data-card') ? this.getAttribute('data-card') : "Altria";
          favesNames.push(name);
          favesClass.push(classID);
          favesRarity.push(rarity);
          favesImg.push(card);
          app.saveData(favesNames, favesClass, favesRarity, favesImg);
          this.shadowRoot.querySelector("button").innerHTML = `Added to team`;
          i++;
        }
        else{
          this.shadowRoot.querySelector("button").innerHTML = `team already full`;
        }
      }
        this.render();
    }
    render(){
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "Altria";
        const classID = this.getAttribute('data-class') ? this.getAttribute('data-class'): "Saber";
        const rarity = this.getAttribute('data-rarity') ? this.getAttribute('data-rarity'): "5";
        const img = this.getAttribute('data-img') ? this.getAttribute('data-img') : "Nobody";
        const card = this.getAttribute('data-card') ? this.getAttribute('data-card') : "Nobody";
        this.shadowRoot.querySelector("img").src = img
        this.shadowRoot.querySelector("img").height = 75;
        this.shadowRoot.querySelector("img").width = 75;
        this.shadowRoot.querySelector("span").innerHTML = `${name}`;
        this.shadowRoot.querySelector("h1").innerHTML = `class: ${classID}`;
        this.shadowRoot.querySelector("h2").innerHTML = `Rarity: ${rarity}*`;
    }
    static get observedAttributes(){
      return ["data-name", "data-class", "data-rarity", "data-img", "data-card"];
    }
    attributeChangedCallback(attributeName, oldVal, newVal){
      this.render();
    }
    disconnectedCallback(){
      this.span.onclick = null;
    }
  }
  

  customElements.define('fgo-servant', FGOServant);
