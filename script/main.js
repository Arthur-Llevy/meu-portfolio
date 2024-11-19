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
      },
    });

    const respostaJson = await resposta.json();

    for (const repositorio of respostaJson) {
      const linguagensUsadas = await fetch(repositorio.languages_url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const linguagensUsadasJson = await linguagensUsadas.json();
      let span = document.createElement('span');
     
      for (let chave in linguagensUsadasJson) {
        span.innerText += " \n " + chave;
      }

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
      card.appendChild(span)
      card.appendChild(link);

      carousel.appendChild(card);
    }

    totalCards = document.querySelectorAll('.card').length;
    atualizarCarrossel();
  } catch (error) {
    console.error('Erro ao buscar repositórios:', error);
  }
};

const buscarFraseAleatoria = async () => {
  const resposta = await fetch('https://api.adviceslip.com/advice', {
  });

  const respostaJson = await resposta.json();
  document.getElementById('frase').innerText = respostaJson.slip.advice;;
  console.log(respostaJson)
}



window.onload = buscarRepositorios;

document.getElementById('menuHamburger').addEventListener('click', function() {
  const links = document.querySelector('.links');
  links.classList.toggle('active');
});

const linkElements = document.querySelectorAll('.links a');
linkElements.forEach(link => {
  link.addEventListener('click', function() {
      const linksContainer = document.querySelector('.links');
      linksContainer.classList.remove('active');
  });
});

document.addEventListener('click', function(event) {
  const menuHamburger = document.getElementById('menuHamburger');
  const linksContainer = document.querySelector('.links');

  if (!menuHamburger.contains(event.target) && !linksContainer.contains(event.target)) {
      linksContainer.classList.remove('active');
  }
});
