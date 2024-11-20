let numeroSecreto = gerarNumeroSecreto();
let tentativas = [];

const mostrarSenha = () => {
    alert(`A senha era: ${numeroSecreto}`)
}

document.getElementById('botaoEnviarNumeros').addEventListener('click', function() {
    const tentativa = document.getElementById('inputNumeros').value;

    if (eTentativaValida(tentativa)) {
        const { bulls, cows } = checarTentativa(tentativa);
        tentativas.push({ tentativa, bulls, cows });
        mostrarResultado();

        if (bulls === 4) {
            alert("Parabéns, você adivinhou a senha!");
            resetarJogo();
        }

        document.getElementById('inputNumeros').value = '';
    } else {
        alert("É necessário que os quatro numeros digitados sejam diferentes.");
    }
});

function gerarNumeroSecreto() {
    let digitos = [];

    while (digitos.length < 4) {
        const digito = Math.floor(Math.random() * 10);
        if (!digitos.includes(digito)) {
            digitos.push(digito);
        }
    }

    return digitos.join('');
}

function eTentativaValida(tentativa) {
    return /^\d{4}$/.test(tentativa) && new Set(tentativa).size === 4;
}

function checarTentativa(tentativa) {
    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < tentativa.length; i++) {
        if (tentativa[i] === numeroSecreto[i]) {
            bulls++;
        } else if (numeroSecreto.includes(tentativa[i])) {
            cows++;
        }
    }

    return { bulls, cows };
}

function mostrarResultado() {
    const divResultado = document.getElementById('resultado');
    divResultado.innerHTML = '';

    for (let i = tentativas.length - 1; i >= 0; i--) {
        const tentativa1 = tentativas[i];
        let stringResulta = '';
        
        for (let j = 0; j < tentativa1.tentativa.length; j++) {
            const digito = tentativa1.tentativa[j];
            if (numeroSecreto[j] === digito) {
                stringResulta += `<span class="bull">${digito}</span>`;
            } else if (numeroSecreto.includes(digito)) {
                stringResulta += `<span class="cow">${digito}</span>`;
            } else {
                stringResulta += `<span>${digito}</span>`;
            }
        }

        divResultado.innerHTML += `<p>${stringResulta} - ${tentativa1.bulls} Bulls, ${tentativa1.cows} Cows</p>`;
    }
}

function resetarJogo() {
    tentativas = [];
    numeroSecreto = gerarNumeroSecreto();
    mostrarResultado();
}

let botaoResetar = document.getElementById('botaoResetar');

botaoResetar.addEventListener('click', () => {
    window.location.reload();
})