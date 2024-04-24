const BASE_URL =
  "https://latest.currency-api.pages.dev/v1/currencies";

let from = document.querySelector("#from select");
let to = document.querySelector("#to select");
let btn = document.querySelector("#btn")
let msg = document.querySelector("#result")

const selections = document.querySelectorAll(".drop_down select");

for (selection of selections) {
    for (curr_code in countryList){

        let option = document.createElement("option");
        option.innerText = curr_code
        option.value = curr_code

        if (selection.name == 'from' && curr_code == 'USD'){
            option.selected = 'selected'
        }else if (selection.name == 'to' && curr_code == 'PKR'){
            option.selected = 'selected'
        }
        selection.append(option)
    }
    selection.addEventListener("change", (evt) => {
        update_flag(evt.target)
    })
}

const update_flag = (elm)=>{
    let curr_code = elm.value
    let country_code = countryList[curr_code]
    let new_src = `https://flagsapi.com/${country_code}/flat/64.png`
    let img = elm.parentElement.querySelector("img");
    img.src = new_src
}

let update_rate = async () => {
    let amount = document.querySelector(".amount");
    let amt_val = amount.value;

    if (amt_val === "" || amt_val <= 0) {
        amt_val = 1;
        amount.value = 1;
    }

    let from_ = from.value.toLowerCase()
    let to_ = to.value.toLowerCase()

    const URL = `${BASE_URL}/${from_}.json`

    let response = await fetch(URL)
    let data = await response.json()

    let result = (data[from_][to_]) * amt_val

    msg.innerText = `${amt_val} ${from.value}  =  ${result.toFixed(2)} ${to.value}`
}

window.addEventListener('load',  ()=> {
    update_rate()
})

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    update_rate()
});

