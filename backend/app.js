document.addEventListener("DOMContentLoaded", () => {


    // BOTON RECORDARME 


    const savedUser = localStorage.getItem("user") || sessionStorage.getItem("user");

    if (savedUser) {
        const user = JSON.parse(savedUser);

        if (user.role === "vet") {
            window.location.href = "dashboard-vet.html";
        } else {
            window.location.href = "dashboard-user.html";
        }
        return;
    }


    //  CAMBIO ENTRE EL LOGIN / REGISTER


    const loginView = document.getElementById("loginView");
    const registerView = document.getElementById("registerView");

    const goToRegisterBtn = document.querySelector(".goToRegister");
    const goToLoginBtn = document.querySelector(".goToLogin");

    if (goToRegisterBtn) {
        goToRegisterBtn.addEventListener("click", (e) => {
            e.preventDefault();
            loginView.classList.add("hidden");
            registerView.classList.remove("hidden");
        });
    }

    if (goToLoginBtn) {
        goToLoginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            registerView.classList.add("hidden");
            loginView.classList.remove("hidden");
        });
    }


    // LOGIN


    const loginForm = document.querySelector("#loginView #loginForm");
    const loginMessage = document.querySelector("#loginView #formMessage");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = loginForm.querySelector("#email").value.trim();
            const password = loginForm.querySelector("#password").value.trim();
            const rememberMe = loginForm.querySelector("#rememberMe").checked;

            if (!email || !password) {
                showMessage(loginMessage, "Todos los campos son obligatorios", false);
                return;
            }

            try {
                const response = await fetch("http://localhost:4000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    showMessage(loginMessage, data.message, false);
                    return;
                }

                // Guardar sesión
                if (rememberMe) {
                    localStorage.setItem("user", JSON.stringify(data));
                } else {
                    sessionStorage.setItem("user", JSON.stringify(data));
                }

                showMessage(loginMessage, "Login exitoso ✔", true);

                setTimeout(() => {
                    if (data.role === "vet") {
                        window.location.href = "dashboard-vet.html";
                    } else {
                        window.location.href = "dashboard-user.html";
                    }
                }, 1200);

            } catch (error) {
                showMessage(loginMessage, "Error conectando con el servidor", false);
            }
        });
    }

    // REGISTER


    const registerForm = document.querySelector("#registerView #registerForm");
    const registerMessage = document.querySelector("#registerView #formMessage");

    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = registerForm.querySelector("#name").value.trim();
            const email = registerForm.querySelector("#email").value.trim();
            const password = registerForm.querySelector("#password").value.trim();
            const confirmPassword = registerForm.querySelector("#confirmPassword").value.trim();
            const role = registerForm.querySelector("input[name='role']:checked");

            if (!name || !email || !password || !confirmPassword || !role) {
                showMessage(registerMessage, "Todos los campos son obligatorios", false);
                return;
            }

            if (password !== confirmPassword) {
                showMessage(registerMessage, "Las contraseñas no coinciden", false);
                return;
            }

            try {
                const response = await fetch("http://localhost:4000/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        role: role.value
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    showMessage(registerMessage, data.message, false);
                    return;
                }

                showMessage(registerMessage, "Registro exitoso ✔", true);

                setTimeout(() => {
                    registerView.classList.add("hidden");
                    loginView.classList.remove("hidden");
                }, 1200);

            } catch (error) {
                showMessage(registerMessage, "Error conectando con el servidor", false);
            }
        });
    }

});


// FUNCION PA LOS MENSAJES


function showMessage(element, message, success) {
    element.classList.remove("hidden");
    element.classList.remove("bg-red-100", "text-red-700", "bg-green-100", "text-green-700");

    if (success) {
        element.classList.add("bg-green-100", "text-green-700");
    } else {
        element.classList.add("bg-red-100", "text-red-700");
    }

    element.textContent = message;
}
