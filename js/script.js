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
  }
};

window.addEventListener("load", showWeatherInfo);

// Comentários / história
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
});
