const form = document.getElementById("loginForm");
const messageBox = document.getElementById("formMessage");


document.addEventListener("DOMContentLoaded", () => {
    const savedUser =
        localStorage.getItem("user") || sessionStorage.getItem("user");

    if (savedUser) {
        const user = JSON.parse(savedUser);

        if (user.role === "vet") {
            window.location.href = "dashboard-vet.html";
        } else {
            window.location.href = "dashboard-user.html";
        }
    }


    const rememberedUser = localStorage.getItem("user");
    if (rememberedUser) {
        const user = JSON.parse(rememberedUser);
        document.getElementById("email").value = user.email || "";
        document.getElementById("rememberMe").checked = true;
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    clearMessage();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const rememberMe = document.getElementById("rememberMe").checked;

    let errors = [];

    if (!email) {
        errors.push("El correo electrónico es obligatorio");
    } else if (!validateEmail(email)) {
        errors.push("El correo electrónico no es válido");
    }

    if (!password) {
        errors.push("La contraseña es obligatoria");
    }

    if (errors.length > 0) {
        showError(errors);
        return;
    }

    try {
        const response = await fetch("http://localhost:4000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            showError([data.message]);
            return;
        }


        if (rememberMe) {
            localStorage.setItem("user", JSON.stringify(data));
        } else {
            sessionStorage.setItem("user", JSON.stringify(data));
        }

        showSuccess("Login exitoso. Redirigiendo...");

        setTimeout(() => {
            if (data.role === "vet") {
                window.location.href = "dashboard-vet.html";
            } else {
                window.location.href = "dashboard-user.html";
            }
        }, 1500);

    } catch (error) {
        showError(["Error conectando con el servidor"]);
    }
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showError(errors) {
    messageBox.classList.remove("hidden");
    messageBox.classList.remove("bg-green-100", "text-green-700");
    messageBox.classList.add("bg-red-100", "text-red-700");

    messageBox.innerHTML = errors.map(error => `<div>• ${error}</div>`).join("");
}

function showSuccess(message) {
    messageBox.classList.remove("hidden");
    messageBox.classList.remove("bg-red-100", "text-red-700");
    messageBox.classList.add("bg-green-100", "text-green-700");

    messageBox.textContent = message;
}

function clearMessage() {
    messageBox.classList.add("hidden");
    messageBox.innerHTML = "";
}
