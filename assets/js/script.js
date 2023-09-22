// Elementos seção Projetos
const projetosContainer = document.querySelector('.projetos__container');
let listaProjetosJson;
let listaProjetos;

// Elementos seção Depoimentos
const mensagemDepoimento = document.querySelector('.depoimento blockquote');
const nomeDepoimento = document.querySelector('.depoimento p');
const setaEsquerda = document.querySelector('.seta-esquerda');
const setaDireita = document.querySelector('.seta-direita');
const depoimentos = [];
let contadorDepoimento = 0;

// Elementos seção Modal Projetos
const modalProjetos = document.querySelector('.modalProjetos');
const fecharModalProjetos = document.querySelector('.fecharModalProjetos');
const modalProjetosImagem = document.querySelector('.modalProjetos__imagem');
const setaEsquerdaModalProjetos = document.querySelector('.modalProjetos .seta-esquerda');
const setaDireitaModalProjetos = document.querySelector('.modalProjetos .seta-direita');
let quantImagens;
let dataProjetoId;
let contImagem = 1;
let intervalId;



// Funções seção Depoimentos
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
  clearInterval(intervalId);
})


// Funções seção Projeto e Modal Projetos
async function chamaProjetos() {
  await fetch("https://isaacnreis.github.io/sl-home/assets/db/projetos.json")
    .then((response) => {response.json()
    .then((dados) => {dados.projetos.map((projeto) => {

      listaProjetosJson = dados.projetos;

      let article = document.createElement('article');
      article.classList.add('projeto');
      article.setAttribute('data-projeto', projeto.id);

      let projetoHtml = `
        <img class="projeto__img" data-projeto="${projeto.id}" src="${projeto.imagem}" alt="Projeto realizado em ${projeto.localidade}">
        <h4 class="projeto__tipo" data-projeto="${projeto.id}">${projeto.nome}</h4>
        <h3 class="projeto__localidade tituloH3" data-projeto="${projeto.id}">${projeto.localidade}</h3>
      `;

      article.innerHTML = projetoHtml;
      projetosContainer.appendChild(article);

      listaProjetos = document.querySelectorAll('.projeto');

      listaProjetos.forEach(projetoExibicao => {
        projetoExibicao.addEventListener('click', (evento) => {
          
          dataProjetoId = projetoExibicao.getAttribute('data-projeto');
          if (dataProjetoId == projeto.id) {
            
            quantImagens = projeto.imagens.length
            
            modalProjetosImagem.innerHTML = `<img src="${projeto.imagem}" alt="Imagem do projeto">`;
            // Passa as imagens dos projetos automaticamnete a cada 30 segundos
            intervalId = setInterval(() => {
              modalProjetosImagem.innerHTML = `<img src="${projeto.imagens[contImagem]}" alt="Imagem do projeto">`;
              contImagem++;
              if (contImagem == quantImagens) contImagem = 1;
            }, 300000)

          }

          modalProjetos.style.display = 'flex'
        })
      });
      
    })})
  })
}

function alteraProjeto() {
  listaProjetosJson.forEach((projetoJson) => {
    if (dataProjetoId == projetoJson.id) {
      modalProjetosImagem.innerHTML = `<img src="${projetoJson.imagens[contImagem]}" alt="Imagem do projeto">`;
    }
  })
}

chamaProjetos();

setaEsquerdaModalProjetos.addEventListener('click', () => {
  if (contImagem != 0) {
    contImagem--;
  } else {
    contImagem = quantImagens - 1;
  }
  
  alteraProjeto();
  console.log('seta esquerda')
})

setaDireitaModalProjetos.addEventListener('click', () => {
  if (quantImagens > (contImagem+1)) {
    contImagem++;
  } else {
    contImagem = 0;
  }

  alteraProjeto();
  console.log('seta direita')
})
