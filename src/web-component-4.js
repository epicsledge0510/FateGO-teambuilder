const template = document.createElement("template");
template.innerHTML = `
<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
  </style>
  <img class="">
  <p>
  <span class="title is-4"></span>
  <h1 class="subtitle is-5""></h1>
  <h2 class="subtitle is-5"></h2>
  <h4></h4>
`;
class FGOTeam extends HTMLElement{
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
        this.shadowRoot.querySelector("img").src = img
        this.shadowRoot.querySelector("img").height = 362;
        this.shadowRoot.querySelector("img").width = 256;
        this.shadowRoot.querySelector("span").innerHTML = `${name}`;
        this.shadowRoot.querySelector("h1").innerHTML = `class: ${classID}`;
        this.shadowRoot.querySelector("h2").innerHTML = `Rarity: ${rarity}*`;
    }
    static get observedAttributes(){
      return ["data-name", "data-class", "data-rarity", "data-img"];
    }
    attributeChangedCallback(attributeName, oldVal, newVal){
      this.render();
    }
    disconnectedCallback(){
      this.span.onclick = null;
    }
  }
  

  customElements.define('fgo-team', FGOTeam);
