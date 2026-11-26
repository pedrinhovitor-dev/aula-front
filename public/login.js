const formulario = document.getElementById("form-login");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const mensagemErro = document.getElementById("mensagem-erro");

    if (usuario === "admin" && senha === "admin") {
        sessionStorage.setItem("central-empresas-authenticated", "true");
        window.location.href = "index.html";

    } else {

        mensagemErro.textContent = "Usuário ou senha incorretos.";

    }

});