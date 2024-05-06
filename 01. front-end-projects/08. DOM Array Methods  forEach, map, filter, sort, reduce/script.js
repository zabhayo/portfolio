const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
   let response = await fetch('https://randomuser.me/api');
   let data = await response.json();
   const user = data.results[0];

   const newUser = {
    name: `${user.name.title} ${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
   };

   addData(newUser);
};

function doubleMoney() {
    data = data.map((item) => {
        return {...item, money: item.money * 2}
    });
    updateDOM();
};

function millionairesOnly () {
    data = data.filter(item => { 
        return item.money > 1000000
    });

    console.log(data);

    updateDOM(data);
};

function sorting() {
    data = data.sort((a, b) => b.money - a.money);

    updateDOM();
};


function addData(obj) {
    data.push(obj);

    updateDOM();
};


function updateDOM(providedData = data) {
            
    main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;

    providedData.forEach((item) => {
        let person = document.createElement("div");
        person.className = 'person';
        person.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;

        main.appendChild(person)
    });
};

function formatMoney(number) {
    return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Event listeners
addUser.addEventListener('click', getRandomUser);
double.addEventListener('click', doubleMoney);
showMillionaires.addEventListener('click', millionairesOnly);
sort.addEventListener('click', sorting);
// calculateWealth.addEventListener('click', )