const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");


// Error function
function error(input, message) {
    let formControl = input.parentElement;
    formControl.className = "form-control error"

    let small = formControl.querySelector('small');
    small.innerText = message
}

// Success function
function success(input) {
    let formControl = input.parentElement;
    formControl.className = "form-control success"
}

// Email Validation
function validateEmail(input) {
    const re = String(input.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

    if (!re){
        error(input, `Not a valid ${title(input)}` )
    }else {
        success(input)
    }
    };

// title case 
function title(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check length
function checkLength(input, min, max) {
    if (input.value.length < min || input.value.length > max) {
        error(input, `${title(input)} must be between ${min}-${max} charcters`)
    } else {
        success(input)
    }
}

// Check Password
function checkPassowrd(input1, input2) {
    if (input1.value === input2.value) {
        success(input2)
    } else (
        error(input2, `${title(input1)} does not match`)
    )
}

// Check Required fields
function checkFields(...fields) {
    fields.forEach((input) => {
        if (!input.value.trim()) {
            error(input, `${title(input)} is required.`);
        } else {
            checkLength(username, 4, 12);
            validateEmail(email)
            checkLength(password, 8, 20);
            checkPassowrd(password, password2)
        }
    });
}

// Event Listeners
form.addEventListener("submit", (e)=>{
    e.preventDefault();

    checkFields(username, email, password, password2);
});