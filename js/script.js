const card = document.querySelector(".card");
const loader = document.querySelector(".loader");
const libras = document.querySelector("#Vlibras");
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
