window.onload = (e) => {
    document.querySelector("#rollbtn").onclick = roll;
};
function rollChoose(html){
    for (let i = 0; i < 11; i++) {
        let result = Math.floor(Math.random() * 99);
        console.log(result);
        if (result >= 55) {
            let drop = Math.floor(Math.random() * 336);
            console.log(drop);
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
                    html += `
                    <div  class="column">
                            <div class="notification">
                                <fgo-servant data-name="${json[drop].name}" data-class="${json[drop].className}" data-rarity="${json[drop].rarity}" data-img="${json[drop].extraAssets.faces.ascension[1]}";></fgo-servant>
                            </div>
                        </div>
                    `;

                }).catch(error => {
                    console.log(error);
                });
        } else {
            let drop = Math.floor(Math.random() * 1563)
            console.log(drop);
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
                    if (result >= 51 && result <= 54) {
                        if (json[drop].rarity == "5") {
                            html += `
                                        <div  class="column">
                                            <div class="notification">
                                            <fgo-essence data-name="${json[drop].name}"  data-rarity="${json[drop].rarity}" data-img="${json[drop].extraAssets.faces.equip[json[drop].id]}";></fgo-essence>
                                            </div>
                                        </div>
                                    `;

                        } else {
                            for (let x = 0; x < 1; x + 0) {
                                let drop = Math.floor(Math.random() * 1563);
                                if (json[drop].rarity == "5") {
                                    html += `
                                        <div  class="column">
                                            <div class="notification">
                                            <fgo-essence data-name="${json[drop].name}"  data-rarity="${json[drop].rarity}" data-img="${json[drop].extraAssets.faces.equip[json[drop].id]}";></fgo-essence>
                                            </div>
                                        </div>
                                    `;
                                    x++;
                                }
                            }
                        }
                    } else if (result <= 50 && result >= 49) {
                        if (json[drop].rarity == "4") {
                            html += `
                                        <div  class="column">
                                            <div class="notification">
                                            <fgo-essence data-name="${json[drop].name}"  data-rarity="${json[drop].rarity}" data-img="${json[drop].extraAssets.faces.equip[json[drop].id]}";></fgo-essence>
                                            </div>
                                        </div>
                                    `;

                        } else {
                            for (let x = 0; x < 1; x + 0) {
                                let drop = Math.floor(Math.random() * 1563)
                                if (json[drop].rarity == "4") {
                                    html += `
                                        <div  class="column">
                                            <div class="notification">
                                            <fgo-essence data-name="${json[drop].name}"  data-rarity="${json[drop].rarity}" data-img="${json[drop].extraAssets.faces.equip[json[drop].id]}";></fgo-essence>
                                            </div>
                                        </div>
                                    `;
                                    x++;
                                }
                            }
                        }
                    } else {
                        if (json[drop].rarity == "3") {
                            html += `
                                        <div  class="column">
                                            <div class="notification">
                                            <fgo-essence data-name="${json[drop].name}"  data-rarity="${json[drop].rarity}" data-img="${json[drop].extraAssets.faces.equip[json[drop].id]}";></fgo-essence>
                                            </div>
                                        </div>
                                    `;
                        } else {
                            for (let x = 0; x < 1; x + 0) {
                                let drop = Math.floor(Math.random() * 1563)
                                if (json[drop].rarity == "3") {
                                    html += `
                                        <div  class="column">
                                            <div class="notification">
                                            <fgo-essence data-name="${json[drop].name}"  data-rarity="${json[drop].rarity}" data-img="${json[drop].extraAssets.faces.equip[json[drop].id]}";></fgo-essence>
                                            </div>
                                        </div>
                                    `;
                                    x++;
                                }
                            }
                        }
                    }

                }).catch(error => {
                    console.log(error);
                });
        }
    }
    document.querySelector("#results").innerHTML = html;
}
function roll() {
    document.querySelector("#results").innerHTML = "";
    let html = "";
    rollChoose(html);
}