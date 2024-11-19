const carousel = document.querySelector('.carrossel');
const botaoAnterior = document.querySelector('.botao-anterior');
const botaoProximo = document.querySelector('.botao-proximo');

let indiceAtual = 0;
let totalCards = 0; 
const cardsParaMostrar = 3;

const atualizarCarrossel = () => {
  const larguraCard = carousel.querySelector('.card').clientWidth + 20; 
  carousel.style.transform = `translateX(-${indiceAtual * larguraCard}px)`;
};

botaoAnterior.addEventListener('click', () => {
  if (indiceAtual > 0) {
    indiceAtual--;
    atualizarCarrossel();
  }
});

botaoProximo.addEventListener('click', () => {
  if (indiceAtual < totalCards - cardsParaMostrar) {
    indiceAtual++;
    atualizarCarrossel();
  }
});

const buscarRepositorios = async () => {
  const resposta = await fetch('https://api.github.com/users/Arthur-Llevy/repos', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const respostaJson = await resposta.json();

  respostaJson.forEach(async (repositorio) => {
       let titulo = document.createElement('p');
    titulo.innerText = repositorio.name;

    

    let link = document.createElement('a');
    link.href = repositorio.html_url;
    link.target = '_blank'

    let githubImagem = document.createElement('img');
    githubImagem.setAttribute('src', './imagens/black-github.svg')
    
    link.appendChild(githubImagem);

    let card = document.createElement('div');
    card.setAttribute('class', 'card');

    card.appendChild(titulo);
    card.appendChild(link)

    carousel.appendChild(card);
  });

  totalCards = document.querySelectorAll('.card').length;
  atualizarCarrossel(); 
};

window.onload = buscarRepositorios;
