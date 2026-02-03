const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"; //! Exchange API

const inputbox = document.querySelector("#amountbox");
console.log(inputbox) //? accessing the text box

const dropdowns = document.querySelectorAll(".dropdown select");
console.log(dropdowns); //? accessing the dropdown menu's, fromselc and toselc

const bttn = document.querySelector("form button");

const from = document.querySelector("#fromselc");
const to = document.querySelector("#toselc");

const ourmsg = document.querySelector(".ratemsg p");
// for(let codes in countryList) {
//     console.log(codes, countryList[codes]); //todo: key and values.
// }


const exchangeCurr = async() => {
    let amountVal = inputbox.value;
    if(amountVal === "" || amountVal < 1) {
        amountVal = 1;
        inputbox.value = "1";
    }

    let fromCode = from.value; 
    let toCode = to.value
    const URL = `${baseUrl}/${fromCode.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCode.toLowerCase()][toCode.toLowerCase()];
    let finalrate = (amountVal * rate).toFixed(2);
    ourmsg.innerText = `${inputbox.value} ${fromCode} = ${finalrate} ${toCode}`;

}

window.addEventListener('load', (evt) => {
    exchangeCurr();
})

for(let selections of dropdowns) {
    for(let codes in countryList) {
        let newOptions = document.createElement("option");
        newOptions.innerText = codes
        newOptions.value = codes;
        if(selections.name === "fromselc" && codes === "USD") {
            newOptions.selected = "selected";
        }
        else if(selections.name === "toselc" && codes === "INR") {
            newOptions.selected = "selected";
        }
        selections.append(newOptions);
}

selections.addEventListener("change", (evt) => {
    updateFlag(evt.target);
})
}

const updateFlag = (element) => {
    let code = element.value;
    let countrycode = countryList[code];
    let newFlagSrc =  `https://flagsapi.com/${countrycode}/flat/64.png`;
    let ourimg = element.parentElement.querySelector("img");
    ourimg.src = newFlagSrc;
}

bttn.addEventListener("click",(evt) => {
    evt.preventDefault();
    exchangeCurr();
    
})
