// Pokemon Search Lab Refactor

document.addEventListener('DOMContentLoaded', () => {

  // Global HTML Elements
  const pokemonContainer = document.querySelector('#pokemon-container');
  const pokemonSearchInputField = document.querySelector('#pokemon-search-input');
  let allPokemonData = [];

  // Function invocations
  getAllPokemonData();
  filterPokemon();
  flipPokemon();

  //********************FUNCTIONS**************************

  //getAllPokemonData
  // Makes a fetch to the database, and parses the data for all pokemons
  // Stores the parsed data which is an array into allPokemonData for later access
  // the parsed promise return is then passed into a render function renderAllPokemon
  // renderAllPokemon will take care of setting the HTML
  function getAllPokemonData() {
    fetch('http://localhost:3000/pokemon', {
        method: 'GET'
      })
      .then(r => {
        console.log(r);
        return r.json();
      })
      .then(pokeData => {
        allPokemonData = pokeData;
        console.table(pokeData);
        pokemonContainer.innerHTML = renderAllPokemon(pokeData)
      })
  }

  //filterPokemon
  // attaches an event listener to the pokemonSearchInputField
  // extracts the user input and stores it into userInput variable
  // creates a filter, where the callback to the .filter is a return for pokemon.name that includes userInput
  // Stores the output of the filter into filteredPokemon variable
  // Passes the filteredPokemon variable (which is an array) into the renderAllPokemon function so the page can be rendered with the filtered pokemon

  function filterPokemon() {
    pokemonSearchInputField.addEventListener('input', function () {
      const userInput = event.target.value
      const filteredPokemon = allPokemonData.filter(function (pokemon) {
        return pokemon.name.includes(userInput)
      })
      pokemonContainer.innerHTML = renderAllPokemon(filteredPokemon)
    })
  }

  //flipPokemon
  // attaches event listener to pokemonContainer, using delegation the event listener will be known to its children elements (the individual pokemon cards)

  function flipPokemon() {
    pokemonContainer.addEventListener('click', function (event) {
      if (event.target.dataset.action === 'flip') {
        const clickedPokemon = allPokemonData.find(function (pokemon) {
          debugger
          return pokemon.id == event.target.dataset.id
        })
        if (event.target.src === clickedPokemon.sprites.front) {
          event.target.src = clickedPokemon.sprites.back
        } else {
          event.target.src = clickedPokemon.sprites.front
        }
      }
    })
  }
})

// ***************HELPER FUNCTIONS*************
// renderAllPokemons
// maps overs a an array of pokemon and renders the HTML properly
// Using string interpolation return pokemon.name, set the data-id dataset attribute to equal pokemon.id so we can interact with the object later, and src attribute for the image
function renderAllPokemon(pokeArray) {
  return pokeArray.map(function (pokemon) {
    return `
    <div class="pokemon-container">
      <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
          <h1 class="center-text">${pokemon.name}</h1>
          <div style="width:239px;margin:auto">
           <div style="width:96px;margin:auto">
              <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
           </div>
      </div>
    </div>
  </div>
    `
  }).join('')
}

// renderPokemon
// 
function renderPokemon() {

}