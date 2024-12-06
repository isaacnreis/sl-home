// Elementos seção Projetos
const projetosContainer = document.querySelector(".projetos__container");
let listaProjetosJson;
let listaProjetos;

// Elementos seção Depoimentos
const mensagemDepoimento = document.querySelector(".depoimento blockquote");
const nomeDepoimento = document.querySelector(".depoimento p");
const setaEsquerda = document.querySelector(".seta-esquerda");
const setaDireita = document.querySelector(".seta-direita");
const depoimentos = [];
let contadorDepoimento = 0;

// Elementos seção Modal Projetos
const modalProjetos = document.querySelector(".modalProjetos-container");
const fecharModalProjetos = document.querySelector(".fecharModalProjetos");
const modalProjetosImagem = document.querySelector(".modalProjetos__imagem");
const setaEsquerdaModalProjetos = document.querySelector(
  ".modalProjetos .seta-esquerda"
);
const setaDireitaModalProjetos = document.querySelector(
  ".modalProjetos .seta-direita"
);
let quantImagens;
let dataProjetoId;
let contImagem = 1;
let intervalId;

const menuMobile = document.querySelector(".cabecalho__navMobileMenu");
let showMenuMobile = false;
const cabecalhoMenuMobile = document.querySelector(
  ".show-cabecalho__navMobile"
);

menuMobile.addEventListener("click", () => {
  showMenuMobile = !showMenuMobile;
  if (showMenuMobile) {
    cabecalhoMenuMobile.style.display = "flex";
    setTimeout(() => {
      cabecalhoMenuMobile.style.height = " 6rem";
    }, 100);
  } else {
    cabecalhoMenuMobile.style.height = "0";
    setTimeout(() => {
      cabecalhoMenuMobile.style.display = "none";
    }, 100);
  }
});

// Funções seção Depoimentos
async function chamaDepoimentos() {
  await fetch(
    "https://isaacnreis.github.io/sl-home/assets/db/depoimentos.json"
  ).then((response) => {
    response.json().then((dados) => {
      dados.depoimentos.map((depoimento) => {
        depoimentos.push(depoimento);
      });
    });
  });

  // Altera os depoimentos a cada 30 segundos
  setInterval(() => {
    contadorDepoimento++;
    if (depoimentos.length <= contadorDepoimento) contadorDepoimento = 0;

    mensagemDepoimento.innerHTML =
      '"' + depoimentos[contadorDepoimento].mensagem + '"';
    nomeDepoimento.innerHTML = depoimentos[contadorDepoimento].nome;
  }, 3000);
}

chamaDepoimentos();

setaEsquerda.addEventListener("click", () => {
  if (contadorDepoimento != 0) {
    contadorDepoimento--;
  } else {
    contadorDepoimento = depoimentos.length - 1;
  }
  mensagemDepoimento.innerHTML =
    '"' + depoimentos[contadorDepoimento].mensagem + '"';
  nomeDepoimento.innerHTML = depoimentos[contadorDepoimento].nome;
  console.log("seta esquerda");
});

setaDireita.addEventListener("click", () => {
  if (depoimentos.length > contadorDepoimento + 1) {
    contadorDepoimento++;
  } else {
    contadorDepoimento = 0;
  }
  mensagemDepoimento.innerHTML =
    '"' + depoimentos[contadorDepoimento].mensagem + '"';
  nomeDepoimento.innerHTML = depoimentos[contadorDepoimento].nome;
  console.log("seta direita");
});

fecharModalProjetos.addEventListener("click", () => {
  modalProjetos.style.display = "none";
  clearInterval(intervalId);
});

// Funções seção Projeto e Modal Projetos
async function chamaProjetos() {
  await fetch(
    "https://isaacnreis.github.io/sl-home/assets/db/projetos.json"
  ).then((response) => {
    response.json().then((dados) => {
      dados.projetos.map((projeto) => {
        listaProjetosJson = dados.projetos;

        let article = document.createElement("article");
        article.classList.add("projeto");
        article.setAttribute("data-projeto", projeto.id);

        let projetoHtml = `
        <img class="projeto__img" data-projeto="${projeto.id}" src="${projeto.imagem}" alt="Projeto realizado em ${projeto.localidade}">
        <h4 class="projeto__tipo" data-projeto="${projeto.id}">${projeto.nome}</h4>
        <h3 class="projeto__localidade tituloH3" data-projeto="${projeto.id}">${projeto.localidade}</h3>
      `;

        article.innerHTML = projetoHtml;
        projetosContainer.appendChild(article);

        listaProjetos = document.querySelectorAll(".projeto");

        listaProjetos.forEach((projetoExibicao) => {
          projetoExibicao.addEventListener("click", (evento) => {
            dataProjetoId = projetoExibicao.getAttribute("data-projeto");
            if (dataProjetoId == projeto.id) {
              quantImagens = projeto.imagens.length;

              modalProjetosImagem.innerHTML = `<img src="${projeto.imagem}" alt="Imagem do projeto">`;
              // Passa as imagens dos projetos automaticamnete a cada 30 segundos
              intervalId = setInterval(() => {
                modalProjetosImagem.innerHTML = `<img src="${projeto.imagens[contImagem]}" alt="Imagem do projeto">`;
                contImagem++;
                if (contImagem == quantImagens) contImagem = 1;
              }, 300000);
            }

            modalProjetos.style.display = "flex";
          });
        });
      });
    });
  });
}

function alteraProjeto() {
  listaProjetosJson.forEach((projetoJson) => {
    if (dataProjetoId == projetoJson.id) {
      modalProjetosImagem.innerHTML = `<img src="${projetoJson.imagens[contImagem]}" alt="Imagem do projeto">`;
    }
  });
}

chamaProjetos();

setaEsquerdaModalProjetos.addEventListener("click", () => {
  if (contImagem != 0) {
    contImagem--;
  } else {
    contImagem = quantImagens - 1;
  }

  alteraProjeto();
  console.log("seta esquerda");
});

setaDireitaModalProjetos.addEventListener("click", () => {
  if (quantImagens > contImagem + 1) {
    contImagem++;
  } else {
    contImagem = 0;
  }

  alteraProjeto();
  console.log("seta direita");
});

// Funções para seção Simulador
const formSimulador = document.getElementById("simulador__form");
let valorPago = document.getElementById("valorPago");
let valorPagoSelecionado = document.getElementById("valorPagoSelecionado");
let taxaIluminacao = document.getElementById("taxaIluminacao");
let taxaIluminacaoSelecionado = document.getElementById(
  "taxaIluminacaoSelecionado"
);
let nome = document.getElementById("nomeSimulador");
let email = document.getElementById("emailSimulador");
let faseInstalacao;
let valorFaseInstalacao;
let novoValorFatura;
let economiaMensal;
let economiaAnual;
const modalSimuladorResultado = document.getElementById(
  "modalSimuladorResultado"
);
const modalSimuladorResultadoTextos = document.getElementById(
  "modalSimuladorResultado__textos"
);
const fecharModalResultadoSimulador = document.querySelector(
  ".fecharModalResultadoSimulador"
);

valorPago.addEventListener("input", () => {
  let valor = valorPago.value;
  valorPagoSelecionado.innerHTML = Number(valor).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
});

taxaIluminacao.addEventListener("input", () => {
  let valor = taxaIluminacao.value;
  taxaIluminacaoSelecionado.innerHTML = Number(valor).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
});

formSimulador.addEventListener("submit", (evento) => {
  evento.preventDefault();

  // Valore fornecidos pelo cliente
  //   Valor pago atualmente : valorPago
  //   Taxa de iluminação publica : taxaIluminacao
  //   Fase da instalação : faseInstalacao
  valorPago = parseFloat(valorPago.value);
  taxaIluminacao = parseFloat(taxaIluminacao.value);
  faseInstalacao = document.querySelector(
    'input[name="faseInstalacao"]:checked'
  ).value;

  // Formulas
  // x = taxaIluminacao + se (fase = monofásico; 30 *0,8; se (fase = bifásico; 50 * 0,8; se (fase = trifásico; 100*0,8)))
  // y = valorPago - x
  // z = y*12

  if (faseInstalacao == "monofasico") {
    valorFaseInstalacao = 30 * 0.8;
  } else if (faseInstalacao == "bifasico") {
    valorFaseInstalacao = 50 * 0.8;
  } else if (faseInstalacao == "trifasico") {
    valorFaseInstalacao = 100 * 0.8;
  }

  novoValorFatura = taxaIluminacao + valorFaseInstalacao;
  economiaMensal = valorPago - novoValorFatura;
  economiaAnual = economiaMensal * 12;

  novoValorFatura = Number(novoValorFatura).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  economiaMensal = Number(economiaMensal).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  economiaAnual = Number(economiaAnual).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  // Resultados
  //   Novo valor da fatura
  //   Economia mensal
  //   Economia anual

  modalSimuladorResultadoTextos.innerHTML = `
    <h1>Olá ${nome.value}, aqui estão os valores que irá economizar, não perca tempo, entre em contato agora mesmo!</h1>
    
    <div class="modalSimuladorResultado__texto">
      <i class="raio"></i>
      <div>
        <h2>Novo valor da fatura:</h2>
        <h3>${novoValorFatura}</h3>
      </div>
    </div>
    
    <div class="modalSimuladorResultado__texto">
      <i class="lampada"></i>
      <div>
        <h2>Economia Mensal:</h2>
        <h3>${economiaMensal}</h3>
      </div>
    </div>

    <div class="modalSimuladorResultado__texto">
      <i class="painel"></i>
      <div>      
        <h2>Economia Anual:</h2>
        <h3>${economiaAnual}</h3>
      </div>
    </div>
  `;

  modalSimuladorResultado.style.display = "flex";
});

fecharModalResultadoSimulador.addEventListener("click", () => {
  modalSimuladorResultado.style.display = "none";
});

// Botão Quero Fazer Uma Cotação
document.getElementById("send-whatsapp").addEventListener("click", function () {
  const phoneNumber = "5531993600722";
  const message = encodeURIComponent(
    "Olá, gostaria de mais informações sobre o seu produto."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, "_blank");
});
