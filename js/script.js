const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const buttonsType = document.querySelectorAll('.type-buttons');
const background = document.querySelector('.background');

const height = document.querySelector('.info-height');
const weight = document.querySelector('.info-weight');
const abilities = document.querySelector('.info-abilities');
const category = document.querySelector('.info-category');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const btnPrev = document.querySelector('.btn-prev');

const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;
let pokemonData = []; // array com todos os dados dos pokemons
let pokemonFiltered = [];
let tipo = '';
let i = 0;
const fetchPokemonEndPoints = async () => {
  const APIResponse = await fetch(
    // `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    'https://pokeapi.co/api/v2/pokemon?limit=200'
  );
  const data = await APIResponse.json();
  const endpoints = data.results.map((pokemon) => pokemon.url);
  return endpoints;
};

const fetchAllPokemons = async () => {
  const pokemonEndpoints = await fetchPokemonEndPoints();
  pokemonEndpoints.forEach((endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        pokemonData.push(data);
        // aqui você pode fazer algo com os dados, como exibir na tela
      })
      .catch((error) => console.error(error));
  });
};

fetchAllPokemons();

const renderPokemon = async (pokemon) => {
  // console.log(pokemon);
  const type = pokemon.types;
  const abilities2 = pokemon.abilities;
  let typesText = '';
  let abilitiesText = '';

  abilities2.forEach((el) => {
    const abilityName = el.ability.name;
    abilitiesText += abilityName + ' ';
  });

  type.forEach((el) => {
    const typeName = el.type.name;
    typesText += typeName + ' ';
  });

  pokemonName.innerHTML = pokemon.name;
  pokemonNumber.innerHTML = pokemon.id;
  height.innerHTML = pokemon.height;
  weight.innerHTML = pokemon.weight;
  category.innerHTML = typesText;
  abilities.innerHTML = abilitiesText;

  pokemonImage.src =
    pokemon['sprites']['versions']['generation-v']['black-white']['animated'][
      'front_default'
    ];
  searchPokemon = pokemon.id;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const pokemon = pokemonData.filter((pokemon) => pokemon.name === input.value);
  // console.log(pokemon);
  renderPokemon(pokemon[0]);
  input.value = '';
});

btnPrev.addEventListener('click', () => {
  searchPokemon -= 1;
  let pokemon = [];
  if (tipo !== '') {
    i--;
    pokemon = pokemonFiltered[i];
    renderPokemon(pokemon);
  }
  if (tipo === '') {
    pokemon = pokemonData.filter((pk) => pk.id === searchPokemon);
    renderPokemon(pokemon[0]);
  }
});

btnNext.addEventListener('click', () => {
  searchPokemon += 1;
  let pokemon = [];

  if (tipo !== '') {
    i++;
    pokemon = pokemonFiltered[i];
    renderPokemon(pokemon);
  }
  if (tipo === '') {
    pokemon = pokemonData.filter((pk) => pk.id === searchPokemon);
    renderPokemon(pokemon[0]);
  }
});

buttonsType.forEach((button) => {
  button.addEventListener('click', (ev) => {
    tipo = ev.target.innerText.toLowerCase();
    console.log(tipo);
    pokemonFiltered = pokemonData.filter((pokemon) =>
      pokemon.types.some((pokemonType) => pokemonType.type.name === tipo)
    );
    const teste = `img/${tipo}Background.jpg`;
    console.log(teste);
    background.src = `img/backgrounds/${tipo}Background.jpg`;
    renderPokemon(pokemonFiltered[0]);
  });
});

// renderPokemon(pokemonData[0]);
