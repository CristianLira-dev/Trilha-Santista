const elements = {
  searchInput: document.getElementById("buscar"),
  cardsContainer: document.getElementById("cardsContainer"),
  emptyState: document.getElementById("ErroBusca"),
  lightbox: document.getElementById("lightbox"),
  lightboxImage: document.getElementById("lightboxImage"),
  lightboxClose: document.getElementById("lightboxClose"),
};

const WEATHER_API_KEY = "5723b489974e4b659f904203241910";
const weatherCache = new Map();
let trilhas = [];

function getSavedCards() {
  const saved = localStorage.getItem("savedCards");
  return saved ? JSON.parse(saved) : [];
}

function setSavedCards(cards) {
  localStorage.setItem("savedCards", JSON.stringify(cards));
}

function isCardSaved(cardName) {
  return getSavedCards().some((card) => card.name === cardName);
}

function toggleCard(trilha, icon) {
  const savedCards = getSavedCards();
  const cardIndex = savedCards.findIndex((card) => card.name === trilha.titulo);

  if (cardIndex >= 0) {
    savedCards.splice(cardIndex, 1);
    setSavedCards(savedCards);
    icon.classList.remove("fa-solid", "saved");
    icon.classList.add("fa-regular");
    return;
  }

  savedCards.push({
    name: trilha.titulo,
    image: trilha.imagem,
    link: trilha.link,
  });
  setSavedCards(savedCards);
  icon.classList.remove("fa-regular");
  icon.classList.add("fa-solid", "saved");
}

function createCard(trilha) {
  const savedClass = isCardSaved(trilha.titulo) ? "fa-solid saved" : "fa-regular";

  return `
    <article class="card" data-title="${trilha.titulo.toLowerCase()}">
      <header class="card-header">
        <h3 class="titulo">${trilha.titulo}</h3>
        <i class="fa-bookmark bookmark-icon ${savedClass}" data-bookmark-id="${trilha.id}" aria-label="Salvar trilha"></i>
      </header>
      <div class="card-body">
        <div class="container-img">
          <img class="img-trilha" src="${trilha.imagem}" alt="${trilha.titulo}" loading="lazy" decoding="async" data-lightbox-src="${trilha.imagem}">
        </div>
        <div class="container-texto">
          <p><strong>Descrição:</strong> ${trilha.descricao}</p>
        </div>
      </div>
      <footer class="card-footer">
        <a href="${trilha.link}">ver mais</a>
      </footer>
    </article>
  `;
}

function renderCards(items) {
  elements.cardsContainer.innerHTML = items.map(createCard).join("");
  elements.emptyState.classList.toggle("hide", items.length > 0);
}

function filterCards() {
  const term = elements.searchInput.value.trim().toLowerCase();
  const filtered = term
    ? trilhas.filter((trilha) => trilha.titulo.toLowerCase().includes(term))
    : trilhas;

  renderCards(filtered);
  hydrateWeatherByCity(filtered);
}

async function loadTrilhas() {
  const response = await fetch("./trilhas.json");
  if (!response.ok) throw new Error("Não foi possível carregar trilhas.json");

  trilhas = await response.json();
  renderCards(trilhas);
  hydrateWeatherByCity(trilhas);
}

async function fetchWeatherByCity(cidade) {
  if (weatherCache.has(cidade)) return weatherCache.get(cidade);

  /*
    Cache por cidade para evitar chamadas repetidas na API durante renderizações,
    mantendo a aplicação performática mesmo com vários cards na tela.
  */
  const request = fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(cidade)}&days=1&lang=pt`)
    .then(async (res) => {
      if (!res.ok) throw new Error(`Falha na API para ${cidade}`);
      const data = await res.json();
      return data?.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain;
    })
    .catch(() => null);

  weatherCache.set(cidade, request);
  return request;
}

async function hydrateWeatherByCity(items) {
  await Promise.all(
    items.map(async (trilha) => {
      const chance = await fetchWeatherByCity(trilha.cidade);
      const target = document.getElementById(`clima-${trilha.id}`);
      if (!target) return;

      target.textContent =
        chance === null
          ? "Clima: previsão indisponível no momento."
          : `Clima em ${trilha.cidade}: ${chance}% de chance de chuva hoje.`;
    })
  );
}

function setupEvents() {
  elements.searchInput.addEventListener("input", filterCards);

  elements.cardsContainer.addEventListener("click", (event) => {
    const bookmark = event.target.closest("[data-bookmark-id]");
    if (bookmark) {
      const trilhaId = Number(bookmark.dataset.bookmarkId);
      const trilha = trilhas.find((item) => item.id === trilhaId);
      if (trilha) toggleCard(trilha, bookmark);
      return;
    }

    const image = event.target.closest("[data-lightbox-src]");
    if (image) {
      elements.lightboxImage.src = image.dataset.lightboxSrc;
      elements.lightboxImage.alt = image.alt;
      elements.lightbox.classList.remove("hide");
    }
  });

  const closeLightbox = () => elements.lightbox.classList.add("hide");
  elements.lightboxClose.addEventListener("click", closeLightbox);
  elements.lightbox.addEventListener("click", (event) => {
    if (event.target === elements.lightbox) closeLightbox();
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  setupEvents();

  try {
    await loadTrilhas();
  } catch (error) {
    elements.emptyState.classList.remove("hide");
    elements.emptyState.querySelector("h1").textContent = "Erro ao carregar trilhas. Tente novamente.";
    console.error(error);
  }
});
