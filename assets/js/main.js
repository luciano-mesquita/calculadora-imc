// Capturar evento de submit do formulário
const form = document.querySelector('#formulario');

// Cancela o envio do formulário
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const inputPeso = e.target.querySelector('#peso'); // Pega o elemento completo
    const inputAltura = e.target.querySelector('#altura'); // Pega o elemento completo
    const peso = Number(inputPeso.value); // Pega valor do input e converte para tipo numérico
    const altura = Number(inputAltura.value);

    if (!peso) {
        setResultado('Peso inválido', false);
        return;
    }

    if (!altura) {
        setResultado('Altura inválida', false);
        return;
    }

    const imc = getImc(peso, altura);
    const nivelImc = getNivelIMC(imc);
    const msg = `Seu IMC é ${imc} (${nivelImc})`;

    setResultado(msg, true);
});

// Verifica e retorna o nível do IMC
function getNivelIMC(imc) {
    const nivel = [
        'ABAIXO DO PESO',
        'PESO NORMAL',
        'SOBREPESO',
        'OBESIDADE GRAU I',
        'OBESIDADE GRAU II',
        'OBESIDADE GRAU III'
    ];

    if (imc >= 39.9) return nivel[5]
    if (imc >= 34.9) return nivel[4];
    if (imc >= 29.9) return nivel[3];
    if (imc >= 24.9) return nivel[2];
    if (imc >= 18.5) return nivel[1];
    if (imc < 18.5) return nivel[0];
}

// Função específica para criar parágrafos
function criaP() {
    const p = document.createElement('p'); // Cria um elemento HTML
    return p;
}

// Função que calcula IMC
function getImc(peso, altura) {
    const imc = peso / (altura * altura);
    return imc.toFixed(2);
}

// Adiciona dados na página
function setResultado(msg, isValid) {
    const resultado = document.querySelector('#resultado'); // Pega o elemento e joga na variável
    resultado.innerHTML = ''; // Limpa o HTML, deixa a DIV em branco

    const p = criaP(); // Cria o elemento HTML

    // Adiciona a classe para mudar a cor conforme o retorno
    if (isValid) {
        p.classList.add('paragrafo-resultado');
    } else {
        p.classList.add('bad');
    }

    p.innerHTML = msg; // Adiciona a msg recebida por parâmetro dentro do HTML
    resultado.appendChild(p); // Adiciona o elemento criado ao elemento pai
}