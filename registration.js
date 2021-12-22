const email = document.getElementById("email");
const emailError = document.querySelector(".email-error");

function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "You need to enter an e-mail address"
  }
  else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an e-mail address"
  }
  else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}`;
  }
  emailError.className = "error active";
}

email.addEventListener("input", () => {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
  }
  else {
    showEmailError();
  }
});

const country = document.getElementById("country");
const countryError = document.querySelector(".country-error");

function showCountryError() {
    if (country.value === "") {
        countryError.textContent = "You need to enter a country"
    }
    countryError.className = "error active";
}

country.addEventListener("input", () => {
    if (country.value !== "") {
        countryError.textContent = "";
        countryError.className = "error";
    }
    else {
        showCountryError();
    }
})

const zip = document.getElementById("zip");
const zipError = document.querySelector(".zip-error");

function showZipError() {
    if (zip.value < 1000 || zip.value > 4000) {
        zipError.textContent = "You need to enter a zip code between 1000 and 4000"
    }
    zipError.className = "error active";
}

zip.addEventListener("input", () => {
    if(zip.value >= 1000 && zip.value <= 4000) {
        zipError.textContent = "";
        zipError.className = "error";
    }
    else {
        showZipError();
    }
})

const password = document.getElementById("password");
const passwordConfirm = document.getElementById("password-confirm");
const passwordError = document.querySelector(".password-confirm-error");

function checkPassword() {
    if (password.value === passwordConfirm.value) {
        return true;
    }
    return false;
    
}

function showPasswordError() {
    if (password.validity.patternMismatch) {
        passwordError.textContent = "Password must contain one number and one alphabetic character"
    }
    else if (password.validity.tooShort) {
        passwordError.textContent = `Password should be at least ${password.minLength} characters; you entered ${password.value.length}`;
    }
    passwordError.className = "error active";

}
passwordConfirm.addEventListener("input", () => {
    if (checkPassword() && password.validity.valid) {
        passwordError.textContent = "";
        passwordError.className = "error"
    }
    else if (!checkPassword()) {
        passwordError.textContent = "Password does not match"
        passwordError.className = "error active";
    }
    else {
        showPasswordError();
    }
})

password.addEventListener("input", () => {
    if (password.validity.valid) {
        passwordError.textContent = "";
        passwordError.className = "error"
    }
    else {
        showPasswordError();
    }
})

const submit = document.querySelector(".login button") 

function checkFields() {
    if (password.validity.valid && checkPassword() && zip.value >= 1000 && zip.value <= 4000 && country.value !== "" && email.validity.valid) {
        return true;
    }
        return false;
    
}

submit.addEventListener("click", () => {
    if (checkFields()) {
        alert("Submitted registration");
        email.value = "";
        country.value = "";
        zip.value = "";
        password.value = "";
        passwordConfirm.value = "";
    }
    else {
        alert("Field(s) entered incorrectly");
    }
})

