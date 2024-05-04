const currencyEl_one = document.getElementById('currency-one'); 
const currencyEl_two = document.getElementById('currency-two');

const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rate and update the DOM
function calculate() {
    const currency_one = currencyEl_one.value.toLowerCase();
    const currency_two = currencyEl_two.value.toLowerCase();

    fetch(`https://latest.currency-api.pages.dev/v1/currencies/${currency_one}.json`)
    .then(res => res.json())
    .then(data => {
        const rate = data[currency_one][currency_two];

        rateEl.innerText = `1 ${currency_one.toUpperCase()} = ${rate} ${currency_two.toUpperCase()}`;

        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
};

// Event listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate)

calculate();

