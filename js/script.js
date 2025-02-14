const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const resetBtn = document.getElementById("resetBtn")
const app = document.getElementById("app")
const url = 'https://pokeapi.co/api/v2/pokemon?limit=10';
const favourites = document.getElementById('favourites');

function drawHTML(name, fav = false) {
    const style = fav ? 'style="background-color: green;"' : "";
    app.innerHTML += `
    <div>
        <figure ${style} onclick="changeColor(this, '${name}')">
            <img src="https://img.pokemondb.net/sprites/home/normal/${name}.png" alt="${name}">
            <figcaption id="namePokemon">        
                <div>${capitalizerFirstLetter(name)}</div>
            </figcaption>
        </figure>
    </div>`;
}

const printPokemonList = (pokemonList) => {
    const storageFavourites = loadFavouritesLocalStorage();
    app.innerHTML = "";
    pokemonList.forEach((pokemon) => {
        let fav = false;
        if (pokemon.name in storageFavourites) {
            fav = true;
        }
        drawHTML(pokemon.name, fav);
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
    } catch (error) {
        console.error(error)
        app.innerHTML = error
    }
};

getPokemon(url);

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
});

searchBtn.addEventListener('click', async () => {
    const pokemonName = searchInput.value.toLowerCase();
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!res.ok) {
            throw new Error("Pokemon no encontrado");
        }
        const singlePokemon = await res.json();
        app.innerHTML = "";
        drawHTML(singlePokemon.name);
    } catch (error) {
        console.error(error);
        app.innerHTML = error;
    }
});

resetBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload()
});

/********************************Favoritos ***************************/

const changeColor = (obj, name) => {
    const storageFavourites = loadFavouritesLocalStorage();
    if (obj.style.backgroundColor === '') {
        obj.style.backgroundColor = 'green';
        storageFavourites[name] = obj.outerHTML;
    } else {
        obj.removeAttribute('style');
        delete storageFavourites[name];
    }
    localStorage.setItem('pokemonFavourite', JSON.stringify(storageFavourites));
}

function loadFavouritesLocalStorage(){
    const cardPokemonFavourite = localStorage.getItem('pokemonFavourite');
    return cardPokemonFavourite ? JSON.parse(cardPokemonFavourite) : {};
}

favourites.addEventListener('click', () => {
    const storageFavourites = loadFavouritesLocalStorage();
    app.innerHTML = "";
    Object.entries(storageFavourites).forEach((pokemon) => {  
        drawHTML(pokemon[0]);
    });
})





