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
  await buscarTemperatura()
  try {
    const resposta = await fetch('https://api.github.com/users/Arthur-Llevy/repos', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer  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'
      },
    });

    const respostaJson = await resposta.json();

    for (const repositorio of respostaJson) {
      const linguagensUsadas = await fetch(repositorio.languages_url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer  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'
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

const buscarTemperatura = async () => {
  const resposta = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=-8.0584933&lon=-34.8848193&appid=158447d2aca67825055f12600b9e2815&lang=pt_br', {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const respostaJson = await resposta.json();
  document.getElementById('temperatura').innerText = respostaJson.main.temp - 273;
  console.log(respostaJson)
}


window.onload = buscarRepositorios;
