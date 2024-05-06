const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showmillionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculatewealth = document.getElementById('calculate-wealth');

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

function addData(obj) {
    data.push(obj);
};
