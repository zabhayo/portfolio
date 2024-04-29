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
function validateEmail(email) {
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)};

// Event Listeners
form.addEventListener("submit", (e)=>{
    e.preventDefault();

    if (!username.value) {
        error(username, "username required.");
    } else {
        success(username);
    }

    if (!email.value) {
        error(email, "Email required.");
    } else if (validateEmail(email.value)){
        success(email);
    } else {
        error(email, "Email not Valid")
    }

    if (!password.value) {
        error(password, "Password required.");
    } else {
        success(password);
    }

    if (!password2.value) {
        error(password2, "Password required.");
    } else if (password2.value) {
        if (password.value === password2.value) {
            success(password2)
        } else {
            error(password2, " Password does not match")
        }
    }
});