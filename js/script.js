const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const resetBtn = document.getElementById("resetBtn")
const app = document.getElementById("app")
const url = 'https://pokeapi.co/api/v2/pokemon?limit=10';

const printPokemonList = (pokemonList) => {
    app.innerHTML = "";
    pokemonList.forEach((pokemon) => {
        
        app.innerHTML += `
        <figure>
            <img src="https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png" alt="${pokemon.name}">
            <figcaption>        
                <div>${capitalizerFirstLetter(pokemon.name)}</div>
            </figcaption>
        </figure>    
        `
    });
}

const getPokemon = async(url) => {
    try {
        const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Hubo un error cargando los pokemon");
        }
        const pokemon = await res.json();
        printPokemonList(pokemon.results)
        console.log(pokemon)
    } catch (error) {
        console.error(error)
        app.innerHTML = error
    }
};

getPokemon(url)

function capitalizerFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

let currentPage = 1;

nextBtn.addEventListener('click', () => {
        currentPage++;
        const newUrl = `${url}?limit=10&&offset=${(currentPage - 1) * 10}`
        getPokemon(newUrl)
        console.log('Este boton va hacia adelante')
});
 
prevBtn.addEventListener('click', () => {
     if (currentPage >= 1) {
         currentPage--;
        const newUrl = `${url}?limit=10&&offset=${(currentPage - 1) * 10}`
        getPokemon(newUrl)
         console.log('Este botón va hacia atras')
     }
})

searchBtn.addEventListener('click', async () => {
    const pokemonName = searchInput.value.toLowerCase();
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!res.ok) {
            throw new Error("Pokemon no encontrado");
        }
        const pokemonName = await res.json();
    } catch (error) {
        console.error(error);
        app.innerHTML = error;
    }
});



