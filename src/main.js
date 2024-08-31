import {
  searchPokemon,
  orderAlpha,
  orderRegion,
  orderByMxCP,
  filterByType,
  filterTopshow,
  filterEvolution,
// eslint-disable-next-line import/extensions
} from "./data.js";
// eslint-disable-next-line import/extensions
import data from "./data/pokemon/pokemon.js";

const { pokemon } = data;
const bodyFilter = document.getElementById("bodyFilter");
const pop = document.getElementById("popUp");
const search = document.querySelector("#search");
const resultText = document.getElementById("result");
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
// Para evento mostrar información
const homeNav = document.getElementById("homeNav");
const topNav = document.getElementById("topNav");
const evoNav = document.getElementById("evoNav");
const home = document.getElementById("home");
const topTen = document.getElementById("topTen");
const infoEvolution = document.getElementById("infoEvolution");
// Para manipular los select para el filtro
const alpha = document.getElementById("orderAlpha");
const region = document.getElementById("byRegion");
const typeMenu = document.getElementById("selectType");
const orderMaxPC = document.getElementById("orderByMaxPC");

// Para evoluciones
const pokemonList = document.getElementById("pokemonList");
const namePokemon = document.getElementById("namepokemon");
const numberOfCandies = document.getElementById("numberOfCandies");
const btnCalculate = document.getElementById("btn-calculate");

let arrayShow = [];

homeNav.addEventListener("click", () => {
  home.classList.remove("hide");
  topTen.classList.add("hide");
  infoEvolution.classList.add("hide");
  burger.classList.remove("move");
  nav.classList.remove("move");
});
topNav.addEventListener("click", () => {
  topTen.classList.remove("hide");
  home.classList.add("hide");
  infoEvolution.classList.add("hide");
  burger.classList.remove("move");
  nav.classList.remove("move");
});
evoNav.addEventListener("click", () => {
  infoEvolution.classList.remove("hide");
  home.classList.add("hide");
  topTen.classList.add("hide");
  burger.classList.remove("move");
  nav.classList.remove("move");
});

// Pokemones con top 10
const top10 = (arrayTop) => {
  const sectionTop = document.getElementById("sectionTop");
  let showTop10 = "";
  for (let i = 0; i < 10; i += 1) {
    showTop10 += ` 
      <div class="cardTop card">
          <h4 class="topTitle"><small class="titleSmall">Pokemon</small>${arrayTop[i].num}</h4>
          <div class="containerTop">
            <header class="pk">
              <img src="https://www.serebii.net/pokemongo/pokemon/${arrayTop[i].num}.png" alt="${arrayTop[i].name}" title="${arrayTop[i].name}">
            </header>
            <section class="pk topBody">
              <span class="pk-name">${arrayTop[i].name}</span>
              <br>
              <span class="pk-name">Spawn chance: ${arrayTop[i]["spawn-chance"]}%</span>
              </section>
          </div>
        </div>`;
  }
  sectionTop.innerHTML = showTop10;
};

// Calcular el top de pokemones con mas chance de aparición
topNav.addEventListener("click", () => {
  const arrayTop = filterTopshow(pokemon);
  top10(arrayTop);
});

const typePk = (element) => {
  let cad = "";
  for (let i = 0; i < element.length; i += 1) {
    cad += `<p class="type-value">${element[i]}</p>`;
  }
  return cad;
};
const weaknesses = (element) => {
  let cad = "";
  for (let i = 0; i < element.length; i += 1) {
    cad += `<p>${element[i]}</p>`;
  }
  return cad;
};
const resistant = (element) => {
  let cad = "";
  for (let i = 0; i < element.length; i += 1) {
    cad += `<p>${element[i]}</p>`;
  }
  return cad;
};
const candy = (element) => {
  let candyNum = 0;
  candyNum = element["next-evolution"] !== undefined
    ? element["next-evolution"][0]["candy-cost"]
    : 0;
  return candyNum;
};
const imgEvolution = (element) => {
  let cad = "";

  if (element["next-evolution"] !== undefined) {
    element["next-evolution"].forEach((i) => {
      const numero = pokemon.find((item) => item.name === i.name);
      if (numero !== undefined) {
        cad += `<img src="https://www.serebii.net/pokemongo/pokemon/${numero.num}.png" alt="${numero.name}" title="${numero.name}">`;
      }
      if (element["next-evolution"][0]["next-evolution"] !== undefined) {
        element["next-evolution"][0]["next-evolution"].forEach((j) => {
          const numero2 = pokemon.find((item) => item.name === j.name);
          if (numero2 !== undefined) {
            cad += `<img src="https://www.serebii.net/pokemongo/pokemon/${numero2.num}.png" alt="${numero2.name}" title="${numero2.name}">`;
          }
        });
      }
    });
  }
  if (element["prev-evolution"] !== undefined) {
    element["prev-evolution"].forEach((i) => {
      const numero3 = pokemon.find((item) => item.name === i.name);
      if (numero3 !== undefined) {
        cad += `<img src="https://www.serebii.net/pokemongo/pokemon/${numero3.num}.png" alt="${numero3.name}" title="${numero3.name}">`;
      }
    });
    if (element["prev-evolution"][0]["prev-evolution"] !== undefined) {
      element["prev-evolution"][0]["prev-evolution"].forEach((j) => {
        const pokemon4 = pokemon.find((item) => item.name === j.name);
        if (pokemon4 !== undefined) {
          cad += `<img src="https://www.serebii.net/pokemongo/pokemon/${pokemon4.num}.png" alt="${pokemon4.name}" title="${pokemon4.name}">`;
        }
      });
    }
  }
  return cad;
};
const showPop = (element) => {
  const popContainer = document.getElementById("popContainer");
  popContainer.innerHTML = `<header class="card-img">
    <img class="close" id="close" src="./../img/close.svg" alt="Close" srcset="">
    <img class="flex-h"  src="${element.img}"  alt="${element.name}" title="${element.name}" srcset="">
  </header>
  <div class="card">
    <header class="name-pk-card">
      <h3 class="flex-h"><span>${element.name}</span> N°<span class="flex-h">${element.num}</span></h3>
    </header>
    <section>
      <p style="text-align: center;">${element.about}</p>
    </section>
    <section>
      <div class="point">
        <img class="point-img" src="./../img/puntero.svg" alt="Point" title="Point">
        <span class="point-text">${element.generation.name}</span>
      </div>
      <div class="type">
        <h5>Type</h5>
        ${typePk(element.type)}
      </div>
      <div class="candy">
        <img class="candy-img" src="./../img/dulce.svg" alt="Candy" title="Next evolution">
        <span class="candy-text" title="Next evolution">${candy(element.evolution)}</span>
      </div>
    </section>
    <section class="base-color">
      <div class="base">
        <span class="value">${element.encounter["base-flee-rate"]}%</span>
        <span class="text-baseF">Base flee rate</span>
      </div>
      <div class="base">
        <span class="value">${element.encounter["base-capture-rate"]}%</span>
        <span class="text-baseF">Base capture rate</span>
      </div>
      <div class="base">
        <span class="value">${element["spawn-chance"]}%</span>
        <span class="text-chance">Spawn chance</span>
      </div>
    </section>
    <section class="resisWeak">
      <div class="weak-r weak">
        <h5 class="weak-title">Weaknesses</h5>${weaknesses(element.weaknesses)}
      </div>
      <div class="weak-r resistant" style="margin-top:0px;">
        <h5 class="weak-title">Resistant</h5>${resistant(element.resistant)}
      </div>
    </section>
    <section class="evolutions">
      <div class="title-ev">
        <h5>Evolutions & Pre-evolutions</h5>
      </div>
      <div class="body-ev">${imgEvolution(element.evolution)}
      </div> 
      </section>
      </div>`;
  pop.classList.add("show");
  const closePop = document.getElementById("close");
  closePop.addEventListener("click", () => {
    document.getElementById("popUp").classList.remove("show");
  });
};
const showPokemon = (obj) => {
  arrayShow = obj;
  let cont = 0;
  obj.forEach((element) => {
    const container = document.createElement("div");
    container.classList.add("container-pokemon");
    container.classList.add("modal");
    container.innerHTML = `<header class="pk-header">
          <p class="pk-num">${element.num}</p>
          <img src="${element.img}" alt="${element.name}" title="${element.name}">
        </header>
        <section class="pk-body">
          <p class="pk-name">${element.name}</p>
          <p>CP Max. <span id="cp">${element.stats["max-cp"]}</span></p>
          <p>HP Max. <span id="hp">${element.stats["max-hp"]}</span></p>
        </section>`;
    cont += 1;
    bodyFilter.appendChild(container);
    container.addEventListener("click", () => {
      showPop(element);
    });
  });

  document.getElementById("result").textContent = cont;
  resultText.textContent = cont;
};
//
search.addEventListener("keyup", (e) => {
  alpha.value = "0";
  typeMenu.value = "0";
  orderMaxPC.value = "0";
  region.value = "0";
  if (search.value.length > 0) {
    const result = searchPokemon(pokemon, e.target.value);
    if (result.length === 0) {
      resultText.textContent = "0";
      bodyFilter.innerHTML = "";
    } else {
      bodyFilter.innerHTML = "";
      showPokemon(result);
    }
  } else {
    resultText.textContent = "0";
    bodyFilter.innerHTML = "";
    showPokemon(orderRegion("1", pokemon));
  }
});

// Filtro de Ordenar
alpha.addEventListener("change", (e) => {
  const arrayOrder = orderAlpha(e.target.value, arrayShow);
  resultText.textContent = "0";
  bodyFilter.innerHTML = "";
  showPokemon(arrayOrder);
});
// Filtrar por Region
region.addEventListener("change", (e) => {
  const arrayRegion = orderRegion(e.target.value, pokemon);
  resultText.textContent = "0";
  bodyFilter.innerHTML = "";
  alpha.value = "0";
  search.value = "";
  showPokemon(arrayRegion);
  alpha.value = "0";
  orderMaxPC.value = "0";
  typeMenu.value = "0";
});
// Filtrar por CP
orderMaxPC.addEventListener("change", (e) => {
  const arrayorderMaxPC = orderByMxCP(e.target.value, arrayShow);
  resultText.textContent = "0";
  bodyFilter.innerHTML = "";
  showPokemon(arrayorderMaxPC);
});
// Filtrar pokemon por Tipo
let typeSelected;
typeMenu.addEventListener("change", () => {
  typeSelected = typeMenu.value;
  resultText.textContent = "0";
  bodyFilter.innerHTML = "";
  showPokemon(filterByType(pokemon, "type", typeSelected));
  search.value = "";
  alpha.value = "0";
  orderMaxPC.value = "0";
  region.value = "0";
});
// Navegador
const navEventos = () => {
  burger.addEventListener("click", () => {
    burger.classList.toggle("move");
    nav.classList.toggle("move");
  });
};
navEventos();

namePokemon.addEventListener("keyup", (e) => {
  const dataInputCandy = e.target.value;
  const dataInput = dataInputCandy.replace(/\s/g, "");
  namePokemon.value = dataInput;
});
// Número de candy
numberOfCandies.addEventListener("keyup", (e) => {
  const dataNumberCandy = e.target.value;
  const dataInput = dataNumberCandy.replace(/\s/g, "").replace(/\D/g, "");
  numberOfCandies.value = dataInput;
});
// Calcular el numero de caramelos para la siguiente evolucion
btnCalculate.addEventListener("click", () => {
  const candyEvolve = filterEvolution(pokemon, namePokemon.value);
  if (candyEvolve.length === 0) {
    // eslint-disable-next-line no-alert
    alert("Please, enter a correct name.");
  } else {
    const imgEvo = candyEvolve[0].img;
    if (candyEvolve[0].evolution["next-evolution"] !== undefined) {
      const newCandy = candyEvolve[0].evolution["next-evolution"][0]["candy-cost"] - numberOfCandies.value;
      if (newCandy >= 0) {
        const newName = candyEvolve[0].evolution["next-evolution"][0].name;
        const prueba = pokemon.filter((item) => item.name === newName);

        const showEvolution = `
              <div class="boxEvolution">
                <span class="letter2">To your <span class="name">${namePokemon.value}</span></span> 
                 <img class="img-styles" src='${imgEvo}' alt="${namePokemon.value}" title="${namePokemon.value}" /> 
                 <span class="letter2">Is missing ${newCandy} candies to evolve to</span>
                 <img class="img-styles" src='${prueba[0].img}' alt="${prueba[0].name}" title="${prueba[0].name}" /> 
                 <span class="letter2 name"> ${newName}</span>
              </div>`;
        pokemonList.innerHTML = showEvolution;
        namePokemon.value = "";
        numberOfCandies.value = "";
      } else {
        // eslint-disable-next-line no-alert
        alert("Enter reasonable amount of candy.");
      }
    } else {
      // eslint-disable-next-line no-alert
      alert("The entered Pokemon does not have a next evolution.");
      namePokemon.value = "";
      numberOfCandies.value = "";
    }
  }
});
showPokemon(pokemon);
