const projetosContainer = document.querySelector('.projetos__container');
let projetos;

const mensagemDepoimento = document.querySelector('.depoimento blockquote');
const nomeDepoimento = document.querySelector('.depoimento p');
const setaEsquerda = document.querySelector('.seta-esquerda');
const setaDireita = document.querySelector('.seta-direita');

const modalProjetos = document.querySelector('.modalProjetos');
const fecharModalProjetos = document.querySelector('.fecharModalProjetos');

const depoimentos = [];
let contadorDepoimento = 0;

async function chamaProjetos() {
  await fetch("https://isaacnreis.github.io/sl-home/assets/db/projetos.json")
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

      projetos = document.querySelectorAll('.projeto');
      console.log(projetos)

      projetos.forEach(projeto => {
        projeto.addEventListener('click', () => {
          modalProjetos.style.display = 'flex'
        })
      });
      
    })})
  })
}

chamaProjetos();

async function chamaDepoimentos() {
  await fetch("https://isaacnreis.github.io/sl-home/assets/db/depoimentos.json")
    .then((response) => {response.json()
    .then((dados) => {dados.depoimentos.map((depoimento) => {
      depoimentos.push(depoimento);
    })});
  })

  // Altera os depoimentos a cada 30 segundos
  setInterval(() => {
    contadorDepoimento++;
    if (depoimentos.length <= contadorDepoimento) contadorDepoimento = 0;

    mensagemDepoimento.innerHTML = '"' + depoimentos[contadorDepoimento].mensagem + '"';
    nomeDepoimento.innerHTML = depoimentos[contadorDepoimento].nome;
  }, 3000);
}

chamaDepoimentos()


setaEsquerda.addEventListener('click', () => {
  if (contadorDepoimento != 0) {
    contadorDepoimento--;
  } else {
    contadorDepoimento = depoimentos.length - 1;
  }
  mensagemDepoimento.innerHTML = '"' + depoimentos[contadorDepoimento].mensagem + '"';
  nomeDepoimento.innerHTML = depoimentos[contadorDepoimento].nome;
  console.log('seta esquerda')
})

setaDireita.addEventListener('click', () => {
  if (depoimentos.length > (contadorDepoimento+1)) {
    contadorDepoimento++;
  } else {
    contadorDepoimento = 0;
  }
  mensagemDepoimento.innerHTML = '"' + depoimentos[contadorDepoimento].mensagem + '"';
  nomeDepoimento.innerHTML = depoimentos[contadorDepoimento].nome;
  console.log('seta direita')
})

fecharModalProjetos.addEventListener('click', () => {
  modalProjetos.style.display = 'none'
})


