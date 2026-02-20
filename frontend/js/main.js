import { loadLoginPage, initLoginEvents } from "./login.js";
import { loadRegisterPage, initRegisterEvents } from "./register.js";

const app = document.getElementById("app");

function navigateTo(page) {
    if (page === "login") {
        app.innerHTML = loadLoginPage();
        initLoginEvents();
        addLoginNavigation();
    }

    if (page === "register") {
        app.innerHTML = loadRegisterPage();
        initRegisterEvents();
        addRegisterNavigation();
    }
}


// LOGIN -> REGISTER

function addLoginNavigation() {
    const goToRegister = document.querySelector(".goToRegister");

    if (goToRegister) {
        goToRegister.addEventListener("click", (e) => {
            e.preventDefault();
            navigateTo("register");
        });
    }
}


// REGISTER -> LOGIN

function addRegisterNavigation() {
    const goToLogin = document.querySelector(".goToLogin");

    if (goToLogin) {
        goToLogin.addEventListener("click", (e) => {
            e.preventDefault();
            navigateTo("login");
        });
    }
}

// Cargar login al iniciar
navigateTo("login");

