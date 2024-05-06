// Selecting DOM elements
const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');

// Data array to hold user information
let data = [];

// Get random user data from API
getRandomUser();
getRandomUser();

async function getRandomUser() {
    let response = await fetch('https://randomuser.me/api');
    let data = await response.json();
    const user = data.results[0];

    // Extract user's name and assign a random money value
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser); // Add new user to the data array
};

// Add new user to the data array
function addData(obj) {
    data.push(obj);
    updateDOM();
};

// Double the money for all users
function doubleMoney() {
    data = data.map((item) => {
        return { ...item, money: item.money * 2 }
    });
    updateDOM();
};

// Filter and display only millionaires
function millionairesOnly() {
    data = data.filter(item => item.money > 1000000);
    updateDOM(data);
};

// Sort users by wealth
function sorting() {
    data = data.sort((a, b) => b.money - a.money);
    updateDOM();
};

// Calculate and display total wealth
function totalWealth() {
    const totalWealth = data.reduce((accum, curval) => accum + curval.money, 0);

    // Create element to display total wealth
    let total = document.createElement("h3");
    total.className = 'person';
    total.innerHTML = `<strong>Total Wealth:</strong> $${formatMoney(totalWealth)}`;

    main.appendChild(total);
};

// Update the DOM with provided data
function updateDOM(providedData = data) {
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

    providedData.forEach((item) => {
        let person = document.createElement("div");
        person.className = 'person';
        person.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;

        main.appendChild(person);
    });
};

// Format money to include commas
function formatMoney(number) {
    return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Event listeners
addUser.addEventListener('click', getRandomUser);
double.addEventListener('click', doubleMoney);
showMillionaires.addEventListener('click', millionairesOnly);
sort.addEventListener('click', sorting);
calculateWealth.addEventListener('click', totalWealth);
