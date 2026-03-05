# 🌿 Trilha Santista

**Trilha Santista** é uma aplicação web interativa focada em mapear e detalhar as melhores trilhas da Baixada Santista. O projeto foi desenvolvido com foco em alta performance, código limpo (princípio DRY) e uma interface de usuário (UI/UX) moderna e minimalista.

🔗 **[Acessar o Projeto Online](https://cristianlira-dev.github.io/Trilha-Santista/)**

---

## ✨ Funcionalidades

* 🗺️ **Mapa 3D Interativo:** Visão completa da Baixada Santista e localização exata de todas as trilhas renderizadas em 3D utilizando a **API do MapBox**.
* ⛅ **Previsão do Tempo em Tempo Real:** Integração assíncrona com a **WeatherAPI** para informar a probabilidade de chuva no dia atual da trilha, garantindo a segurança do usuário.
* ❤️ **Favoritos (Salvar/Remover):** Sistema que permite aos usuários favoritar, salvar e remover suas trilhas preferidas para acesso rápido.
* 🔍 **Busca Inteligente:** Filtro dinâmico para pesquisar e encontrar trilhas específicas diretamente pelo nome.
* 📡 **Dados Dinâmicos (API REST):** As informações dos cards não são fixas no HTML. Os dados das trilhas são consumidos de forma assíncrona (via `fetch`) a partir de uma estrutura JSON, facilitando a escalabilidade e manutenção do projeto.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando Vanilla (sem frameworks), provando o domínio dos fundamentos da web:

* **HTML5:** Estruturação semântica.
* **CSS3:** Estilização responsiva, animações suaves, Flexbox/Grid e design focado em UI/UX.
* **JavaScript (ES6+):** Manipulação de DOM, consumo de APIs RESTful, assincronicidade (`async/await`) e sistema de cache local para otimização de requisições.
* **MapBox GL JS API:** Para a renderização do mapa 3D.
* **WeatherAPI:** Para os dados meteorológicos.

---

## 🚀 Como executar o projeto localmente

Como o projeto é totalmente baseado em tecnologias Front-End nativas, rodá-lo localmente é muito simples:

1. Clone este repositório:
   ```bash
   git clone [https://github.com/CristianLira-dev/Trilha-Santista.git](https://github.com/CristianLira-dev/Trilha-Santista.git)
