const textarea = document.getElementById("textarea");
const fundoRetangularTexto = document.getElementById("fundo-retangular-texto");
const resultado = document.getElementById("resultado");
const botaoCopiar = document.getElementById("copiar");
const botaoLimpar = document.getElementById("limpar");


function expTextarea() {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

textarea.addEventListener('input', expTextarea);
expTextarea();

function criptografar(mensagem) {
    const segredo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    mensagem = mensagem.toLowerCase();
    for (let i = 0; i < segredo.length; i++) {
        mensagem = mensagem.replaceAll(segredo[i][0], segredo[i][1]);
    }
    return mensagem;
}

function desencriptar(mensagem) {
    const segredo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    mensagem = mensagem.toLowerCase();
    for (let i = 0; i < segredo.length; i++) {
        mensagem = mensagem.replaceAll(segredo[i][1], segredo[i][0]);
    }
    return mensagem;
}

function containsSpecialCharacters(str) {
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
    return specialCharPattern.test(str);
}

function botaoEncriptar() {
    const texto = textarea.value.trim();
    if (texto === "") {
        mostrarMensagemErro("Por favor, digite um texto antes de criptografar.");
    } else if (containsSpecialCharacters(texto)) {
        mostrarMensagemErro("O texto contém caracteres especiais. Por favor, remova-os antes de criptografar.");
    } else {
        const mensagemCriptografada = criptografar(texto);
        atualizarResultado(mensagemCriptografada);
    }
}

function botaoDesencriptar() {
    const texto = textarea.value.trim();
    if (texto === "") {
        mostrarMensagemErro("Por favor, digite um texto antes de descriptografar.");
    } else if (containsSpecialCharacters(texto)) {
        mostrarMensagemErro("O texto contém caracteres especiais. Por favor, remova-os antes de descriptografar.");
    } else {
        const mensagemDesencriptada = desencriptar(texto);
        atualizarResultado(mensagemDesencriptada);
    }
}

function atualizarResultado(mensagem) {
    fundoRetangularTexto.style.display = 'none';
    document.querySelector('.img-retangulo').style.visibility = 'hidden';
    resultado.style.display = 'block';
    resultado.innerHTML = mensagem;
    botaoCopiar.style.display = 'block';
    botaoLimpar.style.display = 'block';

    textarea.value = "";
}

function mostrarMensagemErro(mensagem) {
    fundoRetangularTexto.style.display = 'none';
    document.querySelector('.img-retangulo').style.visibility = 'hidden';
    resultado.style.display = 'block';
    resultado.innerHTML = mensagem;
    botaoCopiar.style.display = 'none';
}

function copiar() {
    const text = resultado.innerHTML;
    navigator.clipboard.writeText(text).then(() => {
        resultado.innerHTML = "Mensagem copiada";
        setTimeout(() => {
            resultado.style.display = 'none';
            fundoRetangularTexto.style.display = 'block';
            document.querySelector('.img-retangulo').style.visibility = 'visible';
            botaoCopiar.style.display = 'none';
            botaoLimpar.style.display = 'none';
        }, 2000);
    });
}

function limpar() {
    const text = resultado.innerHTML;
    document.getElementById('textarea').value = '';
    navigator.clipboard.writeText(text).then(() => {
        resultado.innerHTML = "Mensagem apagada";
        setTimeout(() => {
            resultado.style.display = 'none';
            fundoRetangularTexto.style.display = 'block';
            document.querySelector('.img-retangulo').style.visibility = 'visible';
            botaoCopiar.style.display = 'none';
            botaoLimpar.style.display = 'none';
        }, 2000);
    });
}

fundoRetangularTexto.style.display = 'flex';
