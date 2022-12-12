const fatchPokemon = () => {
    const getPokeminUrl= id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for (let i = 1; i <= 150; i++){
        pokemonPromises.push(fetch(getPokeminUrl(i)).then(response => response.json()))
        
    }
    //metodo estatico, para encadear direto no obijeto construtor
    Promise.all(pokemonPromises)
        .then(pokemons =>{
             
            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                // concatenando
                accumulator += `
                <li clas="cards"${types[0]}> 
                <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"   />
                <h2 class="card-title">${pokemon.id}. ${pokemon.name} </h2>
                <p class="card-subtitle">${types.join(' │ ')} </p>
                </li>
                `
                return accumulator

            }, '')
            const ul = document.querySelector('[data-js="pokedex" ] ')

            ul.innerHTML = lisPokemons
        })

}
// fatch = ajax para fazer requesiçoes assincronas. //
fatchPokemon ()