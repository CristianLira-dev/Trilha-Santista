const card = document.querySelector(".card");
const loader = document.querySelector(".loader");
const libras = document.querySelector("#Vlibras");

if (card && loader) {
  setTimeout(() => {
    card.classList.remove("hide");
    if (libras) libras.classList.remove("hide");
    loader.classList.add("hide");
  }, 1200);
}

const chuva = document.querySelector("#chuva span");
const textRisco = document.querySelector("#aviso-chuva");
const DARK_TEXT_COLOR = "#2d3524";

// Define o clima da cidade base desta página de trilha.
const cidade = "Mongagua";

const getWeatherData = async () => {
  if (!textRisco) return null;

  try {
    const apiKey = "5723b489974e4b659f904203241910";
    const apiWeatherURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cidade}&days=1&lang=pt`;

    const res = await fetch(apiWeatherURL);
    if (!res.ok) {
      throw new Error(`Erro: ${res.status} - ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    textRisco.innerText = `Erro: ${error.message}`;
    return null;
  }
};

function applyWeatherTextStyles() {
  if (textRisco) {
    textRisco.style.color = DARK_TEXT_COLOR;
    textRisco.style.fontWeight = "500";
  }

  if (chuva) {
    chuva.style.color = DARK_TEXT_COLOR;
    chuva.style.fontWeight = "500";
  }
}

const showWeatherInfo = async () => {
  if (!textRisco || !chuva) return;

  const data = await getWeatherData();
  if (!data) {
    textRisco.innerText = "Não foi possível obter dados do clima.";
    applyWeatherTextStyles();
    return;
  }

  if (data.forecast && data.forecast.forecastday) {
    const chanceDeChuva = data.forecast.forecastday[0].day.daily_chance_of_rain;
    chuva.innerText = `${chanceDeChuva}%`;

    const cloud = document.querySelector("#nuvem-clima");

    if (chanceDeChuva > 0) {
      if (chanceDeChuva < 50) {
        textRisco.innerText = "Risco de chuva";
        if (cloud) {
          cloud.style.filter =
            "brightness(0) saturate(100%) invert(23%) sepia(15%) saturate(1005%) hue-rotate(46deg) brightness(90%) contrast(90%)";
        }
      } else if (chanceDeChuva >= 50 && chanceDeChuva < 70) {
        textRisco.innerText = "Chance alta de chuva";
        if (cloud) {
          cloud.style.filter =
            "brightness(0) saturate(100%) invert(10%) sepia(65%) saturate(2103%) hue-rotate(345deg) brightness(97%) contrast(112%)";
        }
      } else {
        textRisco.innerText = "Irá chover nessa trilha hoje";
        if (cloud) {
          cloud.style.filter =
            "brightness(0) saturate(100%) invert(10%) sepia(65%) saturate(2103%) hue-rotate(345deg) brightness(97%) contrast(112%)";
        }
      }
    } else {
      textRisco.innerText = "Sem previsão de chuva";
    }

    applyWeatherTextStyles();
  } else {
    textRisco.innerText = "Dados de previsão não disponíveis.";
    applyWeatherTextStyles();
setTimeout(() => {
  card.classList.remove("hide");
  libras.classList.remove("hide");
  loader.classList.add("hide");
}, 1200)
//faz um setTimeOut para o loader no inicio na tela


const chuva = document.querySelector("#chuva span");
const textRisco = document.querySelector("#aviso-chuva");

//define o clima tempo da cidade "Mongagua" pois fica no centro da baixada santista e facilita no uso da API
const cidade = 'Mongagua';



const getWeatherData = async () => {
  try {
    const apiKey = "5723b489974e4b659f904203241910"; //pega a chave da Api do weather api
    const apiWeatherURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cidade}&days=1&lang=pt`;


    const res = await fetch(apiWeatherURL); //tranfere ao resultado da api (JSON) para a variavel

    if (!res.ok) { //verifica o resultado a api 
      throw new Error(`Erro: ${res.status} - ${res.statusText}`);
    }

    
  //pega o resultado de data  que esta em JSON e transfere para string
    const data = await res.json();
    console.log("Dados da API:", data); 
    return data;
  } catch (error) { //exibe o erro na API
    console.error("Erro ao buscar dados da API:", error);
    textRisco.innerText = `Erro: ${error.message}`;
  }
};



const showWeatherInfo = async () => {
  const data = await getWeatherData();

  if (!data) {  //verifica o resultado a api mas agora sem ser em JSON
    textRisco.innerText = "Não foi possível obter dados do clima.";
    return;
  }

  if (data.forecast && data.forecast.forecastday) { //verifica o resultado de probabilidade de chuva

    const chanceDeChuva = data.forecast.forecastday[0].day.daily_chance_of_rain; //transforma o resultado em uma variavel
    
    chuva.innerText = `${chanceDeChuva}%`; //escreve a porcentagem na tela

    const cloud = document.querySelector("#nuvem-clima");
    
    if (chanceDeChuva > 0) {
      if (chanceDeChuva < 50) { //verifica se a porcentagem é menor que 50% se sim aparece o texto e troca a cor da nuvem
        textRisco.innerText = "Risco de chuva";
        textRisco.style.color = "#2d3524";
        textRisco.style.fontWeight = "500";
        chuva.style.color = "#2d3524";
        chuva.style.fontWeight = "500";
        cloud.style.filter = "brightness(0) saturate(100%) invert(23%) sepia(15%) saturate(1005%) hue-rotate(46deg) brightness(90%) contrast(90%)";
      } else if (chanceDeChuva >= 50 && chanceDeChuva < 70) { //verifica se a porcentagem é maior que 50% e menor que 70% se sim aparece o texto e troca a cor da nuvem
        textRisco.innerText = "Chance alta de chuva";
        textRisco.style.color = "#2d3524";
        textRisco.style.fontWeight = "500";
        chuva.style.color = "#2d3524";
        chuva.style.fontWeight = "500";
        cloud.style.filter = "brightness(0) saturate(100%) invert(10%) sepia(65%) saturate(2103%) hue-rotate(345deg) brightness(97%) contrast(112%)";
      } else { //caso seja maior que 70% aparece outro texto mas mantem a cor da nuvem
        textRisco.innerText = "Irá chover nessa trilha hoje";
        textRisco.style.color = "#2d3524";
        textRisco.style.fontWeight = "500";
        chuva.style.color = "#2d3524";
        chuva.style.fontWeight = "500";
        cloud.style.filter = "brightness(0) saturate(100%) invert(10%) sepia(65%) saturate(2103%) hue-rotate(345deg) brightness(97%) contrast(112%)";
      }
    } else { //caso a porcemtagem seja igual a 0
      textRisco.innerText = "Sem previsão de chuva";
      textRisco.style.color = "#2d3524";
      textRisco.style.fontWeight = "500";
      chuva.style.color = "#2d3524";
      chuva.style.fontWeight = "500";    }
  } else { //caso não consiga encontrar dados na API
    textRisco.innerText = "Dados de previsão não disponíveis.";
  }
};

window.addEventListener("load", showWeatherInfo);

// Seleciona os elementos da página relacionados aos comentários e à história
const coments = document.querySelector("#comentarios");
const history = document.querySelector("#historia");
const comentsPeople = document.querySelector("#comentarios-pessoas");

if (coments && history && comentsPeople) {
  coments.addEventListener("click", () => {
    if (coments.classList.contains("far")) {
      coments.classList.remove("far");
      coments.classList.add("fas");
      history.classList.remove("d-flex");
      history.classList.add("hide");
      comentsPeople.classList.remove("hide");
    } else if (coments.classList.contains("fas")) {
      coments.classList.remove("fas");
      coments.classList.add("far");
      history.classList.remove("hide");
      history.classList.add("d-flex");
      comentsPeople.classList.add("hide");
    }
  });

  coments.addEventListener("click", () => {
    const target = document.getElementById("targetComents");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
}

const verMaisBtn = document.querySelector("#ver-mais");
const moreComments = document.querySelector("#more-comments");

if (verMaisBtn && moreComments) {
  verMaisBtn.addEventListener("click", () => {
    if (moreComments.classList.contains("hide")) {
      moreComments.classList.remove("hide");
      verMaisBtn.textContent = "Ver menos";
    } else {
      moreComments.classList.add("hide");
      verMaisBtn.textContent = "Ver mais";
    }
  });
}

// ----------------- Lightbox das imagens da trilha -----------------
function setupTrailLightbox() {
  const images = document.querySelectorAll(".image-gallery .carousel-img");
  if (!images.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "trail-lightbox hide";
  lightbox.innerHTML = `
    <button class="trail-lightbox-close" aria-label="Fechar imagem ampliada">×</button>
    <img class="trail-lightbox-image" src="" alt="Imagem ampliada da trilha">
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector(".trail-lightbox-image");
  const closeBtn = lightbox.querySelector(".trail-lightbox-close");

  const close = () => lightbox.classList.add("hide");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt || "Imagem ampliada da trilha";
      lightbox.classList.remove("hide");
    });
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });
}

// ----------------- Favoritos + Modal de feedback -----------------
function getSavedCards() {
  const saved = localStorage.getItem("savedCards");
  return saved ? JSON.parse(saved) : [];
}

function setSavedCards(cards) {
  localStorage.setItem("savedCards", JSON.stringify(cards));
}

function showFavoriteStatusModal(message) {
  let modal = document.getElementById("favoriteStatusModal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "favoriteStatusModal";
    modal.className = "favorite-status-modal hide";
    modal.innerHTML = `<div class="favorite-status-content"></div>`;
    document.body.appendChild(modal);
  }

  const content = modal.querySelector(".favorite-status-content");
  content.textContent = message;

  modal.classList.remove("hide");
  clearTimeout(window.__favoriteModalTimeout);
  window.__favoriteModalTimeout = setTimeout(() => {
    modal.classList.add("hide");
  }, 1800);
}

async function setupTrailFavoriteButton() {
  const pageName = decodeURIComponent(window.location.pathname.split("/").pop() || "");
  const iconsContainer = document.querySelector(".icons");
  if (!pageName || !iconsContainer) return;

  try {
    const response = await fetch("./trilhas.json");
    if (!response.ok) return;

    const trilhas = await response.json();
    const trilhaAtual = trilhas.find((item) => item.link === pageName);
    if (!trilhaAtual) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "trail-fav-btn";
    button.setAttribute("aria-label", "Salvar trilha nos favoritos");
    button.innerHTML = `<i class="fa-regular fa-bookmark"></i>`;

    const icon = button.querySelector("i");

    const isSaved = () => getSavedCards().some((card) => card.name === trilhaAtual.titulo);

    const syncIcon = () => {
      if (isSaved()) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        button.classList.add("saved");
      } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        button.classList.remove("saved");
      }
    };

    button.addEventListener("click", () => {
      const savedCards = getSavedCards();
      const index = savedCards.findIndex((card) => card.name === trilhaAtual.titulo);

      if (index >= 0) {
        savedCards.splice(index, 1);
        setSavedCards(savedCards);
        showFavoriteStatusModal("Trilha removida dos favoritos.");
      } else {
        savedCards.push({
          name: trilhaAtual.titulo,
          image: trilhaAtual.imagem,
          link: trilhaAtual.link,
        });
        setSavedCards(savedCards);
        showFavoriteStatusModal("Trilha salva com sucesso nos favoritos.");
      }

      syncIcon();
    });

    iconsContainer.appendChild(button);
    syncIcon();
  } catch (error) {
    console.error("Não foi possível carregar favoritos da trilha:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupTrailLightbox();
  setupTrailFavoriteButton();
=======
// Adiciona um evento de clique ao botão "comentarios"
coments.addEventListener("click", () => {
  // Verifica se o botão de comentários está com o ícone "far" (não ativo)
  if (coments.classList.contains("far")) {
    coments.classList.remove("far"); // Remove a classe "far"
    coments.classList.add("fas");   // Adiciona a classe "fas"
    history.classList.remove("d-flex"); // Esconde a seção "historia"
    history.classList.add("hide");
    comentsPeople.classList.remove("hide"); // Mostra a seção de comentários
  } else if (coments.classList.contains("fas")) { // Caso esteja com o ícone "fas" (ativo)
    coments.classList.remove("fas"); // Remove a classe "fas"
    coments.classList.add("far");   // Adiciona a classe "far"
    history.classList.remove("hide"); // Mostra a seção "historia"
    history.classList.add("d-flex");
    comentsPeople.classList.add("hide"); // Esconde a seção de comentários
  }
});

// Seleciona o botão "ver-mais" e a seção de comentários extras
const verMaisBtn = document.querySelector("#ver-mais");
const moreComments = document.querySelector("#more-comments");

// Adiciona um evento de clique ao botão "ver-mais"
verMaisBtn.addEventListener("click", () => {
  // Verifica se a seção de comentários extras está escondida
  if (moreComments.classList.contains("hide")) {
    moreComments.classList.remove("hide"); // Mostra os comentários extras
    verMaisBtn.textContent = "Ver menos"; // Atualiza o texto do botão
  } else {
    moreComments.classList.add("hide"); // Esconde os comentários extras
    verMaisBtn.textContent = "Ver mais"; // Atualiza o texto do botão
  }
});

// Adiciona um evento de clique no botão de comentários para rolar a página até uma seção específica
document.getElementById('comentarios').addEventListener('click', function() {
  document.getElementById('targetComents').scrollIntoView({ behavior: 'smooth' }); // Rola suavemente até o elemento com ID "targetComents"
});
