const projetosContainer = document.querySelector('.projetos__container');1
const mensagemDepoimento = document.querySelector('.depoimento blockquote');1
const nomeDepoimento = document.querySelector('.depoimento p');1


const depoimentos = [];
let contadorDepoimento = 0;

fetch("http://127.0.0.1:5500/assets/db/projetos.json")
  .then((response) => {response.json()
  .then((dados) => {dados.projetos.map((projeto) => {

    let article = document.createElement('article');
    article.classList.add('projeto');

    let projetoHtml = `
      <img class="projeto__img" src="${projeto.imagem}" alt="Projeto realizado em ${projeto.localidade}">
      <h4 class="projeto__tipo">${projeto.nome}</h4>
      <h3 class="projeto__localidade tituloH3">${projeto.localidade}</h3>
    `;

    article.innerHTML = projetoHtml;

    projetosContainer.appendChild(article);

  })})
})

async function chamaDepoimentos() {
  await fetch("http://127.0.0.1:5500/assets/db/depoimentos.json")
    .then((response) => {response.json()
    .then((dados) => {dados.depoimentos.map((depoimento) => {
      depoimentos.push(depoimento);
    })});
  })

  setInterval(() => {
    contadorDepoimento++;
    if (depoimentos.length <= contadorDepoimento) contadorDepoimento = 0;

    mensagemDepoimento.innerHTML = '"' + depoimentos[contadorDepoimento].mensagem + '"';
    nomeDepoimento.innerHTML = depoimentos[contadorDepoimento].nome;
  }, 30000);
}

chamaDepoimentos()
