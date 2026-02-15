const form = document.getElementById("registerForm");
const messageBox = document.getElementById("formMessage");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    clearMessages();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const role = document.querySelector('input[name="role"]:checked')?.value;

    let errors = [];


    if (!name) {
        errors.push("El nombre es obligatorio");
    } else if (name.length < 3) {
        errors.push("El nombre debe tener al menos 3 caracteres");
    }

    if (!email) {
        errors.push("El correo electrónico es obligatorio");
    } else if (!validateEmail(email)) {
        errors.push("El correo electrónico no es válido");
    }


    if (!password) {
        errors.push("La contraseña es obligatoria");
    } else if (password.length < 8) {
        errors.push("La contraseña debe tener al menos 8 caracteres");
    } else if (!/(?=.*[A-Z])/.test(password)) {
        errors.push("La contraseña debe tener al menos una mayúscula");
    } else if (!/(?=.*[0-9])/.test(password)) {
        errors.push("La contraseña debe tener al menos un número");
    }


    if (!confirmPassword) {
        errors.push("Debes confirmar la contraseña");
    } else if (password !== confirmPassword) {
        errors.push("Las contraseñas no coinciden");
    }


    if (!role) {
        errors.push("Debes seleccionar cómo te unes a nosotros");
    }

    if (errors.length > 0) {
        showErrors(errors);
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                role
            })
        });

        const data = await response.json();

        if (!response.ok) {
            showErrors([data.message]);
            return;
        }

        showSuccess("Registro exitoso 🎉");

        setTimeout(() => {
            if (role === "vet") {
                window.location.href = "../views/ingresarVet.html";
            } else {
                window.location.href = "../views/ingresarOwner.html";
            }
        }, 1200);

    } catch (error) {
        showErrors(["Error conectando con el servidor"]);
    }
});



function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}



function showErrors(errors) {
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



function clearMessages() {
    messageBox.classList.add("hidden");
    messageBox.innerHTML = "";
}
