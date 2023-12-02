const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const resetBtn = document.getElementById("resetBtn")
const app = document.getElementById("app")
const url = 'https://pokeapi.co/api/v2/pokemon?limit=10';
const favourites = document.getElementById('favourites');

const printPokemonList = (pokemonList) => {
    htmlCode = "";
    pokemonList.forEach((pokemon) => {      
        htmlCode += `
            <figure onclick="chageColor(this)">
                <img src="https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png" alt="${pokemon.name}">
                <figcaption id="namePokemon">        
                    <div>${capitalizerFirstLetter(pokemon.name)}</div>
                </figcaption>
            </figure>  
        `
    });
    
    app.innerHTML = htmlCode;
}

const getPokemon = async(url) => {
    try {
        const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Hubo un error cargando los pokemon");
        }
        const pokemon = await res.json();
        printPokemonList(pokemon.results)
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
        const singlePokemon = await res.json();
        app.innerHTML = "";
        app.innerHTML += `
        <div>
            <figure>
                <img src="https://img.pokemondb.net/sprites/home/normal/${singlePokemon.name}.png" alt="${singlePokemon.name}">
                <figcaption>
                    <div>${capitalizerFirstLetter(singlePokemon.name)}</div>
                </figcaption>
            </figure>
        </div>`;
    } catch (error) {
        console.error(error);
        app.innerHTML = error;
    }
});

resetBtn.addEventListener('click', () => location.reload());

/********************************Favoritos ***************************/

const chageColor = (obj) => {
    if (obj.style.backgroundColor === '') {
        obj.style.backgroundColor = 'green';
        const storageFavourites = getFavourites();
        localStorage.setItem('pokemonFavourite', obj.outerHTML);

    } else {
        obj.removeAttribute('style');
    }
}

function getFavourites(){
    const cardPokemonFavourite = localStorage.getItem('pokemonFavourite');
    return cardPokemonFavourite ? JSON.parse(cardPokemonFavourite) : [];
}

favourites.addEventListener('click', () => {
})





