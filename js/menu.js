// menu.js - Sistema de gerenciamento de trilhas salvas

// Função para filtrar cards na busca
function filtrarCards() {
  const termoBusca = document.getElementById("buscar").value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  let contador = 0;
  const busca = document.getElementById("ErroBusca");

  cards.forEach((card) => {
    const titulo = card.querySelector(".titulo").textContent.toLowerCase();

    if (titulo.includes(termoBusca)) {
      card.classList.remove("hide");
      contador++;
    } else {
      card.classList.add("hide");
    }
  });

  if (contador === 0) {
    busca.classList.remove("hide");
  } else {
    busca.classList.add("hide");
  }
}

// ==================== SISTEMA DE CARDS SALVOS ====================

// Função para obter todos os cards salvos do localStorage
function getSavedCards() {
  const saved = localStorage.getItem("savedCards");
  return saved ? JSON.parse(saved) : [];
}

// Função para salvar cards no localStorage
function setSavedCards(cards) {
  localStorage.setItem("savedCards", JSON.stringify(cards));
}

// Função para verificar se um card já está salvo
function isCardSaved(cardName) {
  const savedCards = getSavedCards();
  return savedCards.some((card) => card.name === cardName);
}

// Função para salvar um card
function saveCard(cardName, cardImage, cardLink) {
  const savedCards = getSavedCards();

  // Verifica se já está salvo
  if (isCardSaved(cardName)) {
    alert("Card já salvo!");
    return false;
  }

  // Adiciona o novo card
  savedCards.push({
    name: cardName,
    image: cardImage,
    link: cardLink,
  });

  setSavedCards(savedCards);
  return true;
}

// Função para remover um card
function deleteCard(cardName) {
  const savedCards = getSavedCards();
  const updatedCards = savedCards.filter((card) => card.name !== cardName);
  setSavedCards(updatedCards);
}

// Função principal para toggle do card (salvar/remover)
function toggleCard(cardName, cardImage, cardLink) {
  const icon = event.target;

  if (isCardSaved(cardName)) {
    
    deleteCard(cardName);
    icon.classList.remove("fa-solid", "fas");
    icon.classList.add("fa-regular", "far");

    // Se estiver na página de cards salvos, recarrega
    if (window.location.pathname.includes("cards_salvos.html")) {
      loadSavedCards();
    }
  } else {
    
    if (saveCard(cardName, cardImage, cardLink)) {
      icon.classList.remove("fa-regular", "far");
      icon.classList.add("fa-solid", "fas");
    }
  }
}

// Função para atualizar ícones na página inicial
function updateBookmarkIcons() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const titulo = card.querySelector(".titulo").textContent;
    const icon = card.querySelector(".bookmark-icon");

    if (icon && isCardSaved(titulo)) {
      icon.classList.remove("fa-regular", "far");
      icon.classList.add("fa-solid", "fas");
    }
  });
}

// Função para carregar cards salvos na página cards_salvos.html
function loadSavedCards() {
  const container = document.getElementById("savedCards");

  if (!container) return; // Não está na página de cards salvos

  const savedCards = getSavedCards();

  if (savedCards.length === 0) {
    container.innerHTML =
      '<h1 class="text-center mt-5" style="color: #4e0801;">Não há trilhas salvas</h1>';
    return;
  }

  container.innerHTML = "";

  savedCards.forEach((card) => {
    const cardHTML = `
      <div class="card d-flex px-4 mx-auto">
        <div class="card-header d-flex">
          <h3 class="titulo">${card.name}</h3>
          <i class="fas fa-solid fa-bookmark bookmark-icon" onclick="toggleCard('${card.name}', '${card.image}', '${card.link}')"></i>
        </div>
        <div class="card-body d-flex">
          <div class="container-img">
            <img class="img-trilha" src="${card.image}" alt="${card.name}">
          </div>
          <div class="container-texto">
            <h5>Descrição:...</h5>
            <h5>Desnível Positivo:...</h5>
          </div>
        </div>
        <div class="card-footer d-flex">
          <div class="container-estrelas d-flex">
            <p class="card-text d-flex text-end" style="font-size: 15px; color:#dde1c8">
              <small class="text-end">
                <i class="fas fa-star fa-2x"></i>
                <i class="fas fa-star fa-2x"></i>
                <i class="fas fa-star fa-2x"></i>
                <i class="fas fa-star fa-2x"></i>
                <i class="far fa-star fa-2x"></i>
              </small>
            </p>
          </div>
          <a href="${card.link}">ver mais</a>
        </div>
      </div>
    `;

    container.innerHTML += cardHTML;
  });
}

// Inicializa quando a página carrega
document.addEventListener("DOMContentLoaded", function () {
  // Se estiver na página de cards salvos, carrega os cards
  if (window.location.pathname.includes("cards_salvos.html")) {
    loadSavedCards();
  } else {
    // Se estiver na página inicial, atualiza os ícones
    updateBookmarkIcons();
  }
});
