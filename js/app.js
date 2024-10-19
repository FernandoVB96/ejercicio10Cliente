const pvtKey = 'f1c6e67fc74392744030de3cd62d0a7ff3eaf4c0';
const pubKey = '72691c3ff9511a7ec516ed581c4b09f2';
let ts = Date.now();
let hash = CryptoJS.MD5(ts + pvtKey + pubKey).toString();
const baseUrl = 'https://gateway.marvel.com/v1/public';

async function fetchMarvelCharacters() {
    const endpoint = `${baseUrl}/characters?ts=${ts}&apikey=${pubKey}&hash=${hash}&limit=50`;
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        displayCharacters(data.data.results);
    } catch (error) {
        console.error('Error al obtener personajes:', error);
    }
}

function displayCharacters(characters) {
    const container = document.getElementById('card-container');
    characters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>${character.description || 'No description available.'}</p>
        `;
        container.appendChild(card);
    });
}
fetchMarvelCharacters();
