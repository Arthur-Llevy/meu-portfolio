const carousel = document.querySelector('.carrossel');
const botaoAnterior = document.querySelector('.botao-anterior');
const botaoProximo = document.querySelector('.botao-proximo');


let indiceAtual = 0;
let totalCards = 0; 
const cardsParaMostrar = 3;

const atualizarCarrossel = () => {
  const larguraCard = carousel.querySelector('.card')?.clientWidth + 20;
  if (!larguraCard) return; 
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
  try {
    const resposta = await fetch('https://api.github.com/users/Arthur-Llevy/repos', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
    });

    const respostaJson = await resposta.json();

    for (const repositorio of respostaJson) {
      const linguagensUsadas = await fetch(repositorio.languages_url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
      });

      const linguagensUsadasJson = await linguagensUsadas.json();
      const titulo = document.createElement('p');
      titulo.innerText = repositorio.name;

      const link = document.createElement('a');
      link.href = repositorio.html_url;
      link.target = '_blank';

      const githubImagem = document.createElement('img');
      githubImagem.setAttribute('src', './imagens/black-github.svg');

      link.appendChild(githubImagem);

      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      card.appendChild(titulo);
      card.appendChild(link);

      carousel.appendChild(card);
    }

    totalCards = document.querySelectorAll('.card').length;
    atualizarCarrossel();
  } catch (error) {
    console.error('Erro ao buscar repositórios:', error);
  }
};

window.onload = buscarRepositorios;
