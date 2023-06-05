const template = document.createElement("template");
let favesNames = [];
let favesClass = [];
let favesRarity = [];
let favesImg = [];
let i = 0;
template.innerHTML = `
<style>
  :host{
    display: block;
    linear-gradient(
      rgba(70, 75, 71, 0.7),
      rgba(0, 0, 0, 0.7)
    );
    background-color: #B2BEB5;
  }
  span{
    color: #F76902;
    font-varient: small-caps;
    font-weight: bolder;
    font-family: sans-serif;
  }
  </style>
  <img>
  <p>
  <span></span>
  <h1></h1>
  <h2></h2>
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
    }
    connectedCallback(){
        this.render();
    }
    render(){
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "Altria";
        const classID = this.getAttribute('data-class') ? this.getAttribute('data-class'): "Saber";
        const rarity = this.getAttribute('data-rarity') ? this.getAttribute('data-rarity'): "5";
        const img = this.getAttribute('data-img') ? this.getAttribute('data-img') : "Nobody";
        const card = this.getAttribute('data-card') ? this.getAttribute('data-card') : "Nobody";
        this.shadowRoot.querySelector("img").src = img
        this.shadowRoot.querySelector("img").height = 40;
        this.shadowRoot.querySelector("img").width = 40;
        this.shadowRoot.querySelector("span").innerHTML = `${name}`;
        this.shadowRoot.querySelector("h2").innerHTML = `${rarity}*`;
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
