/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

const cardTemplate = document.getElementById("card-template");
const searchInput = document.querySelector("[data-search]");
const characterContainer = document.getElementById("character-cards");

let characters = [];

// Function to render character cards
function renderCharacterCards(characterArray) {
  characterContainer.innerHTML = ""; // Clear previous cards

  characterArray.forEach((character) => {
    const cardClone = cardTemplate.content.cloneNode(true).children[0];
    const charName = cardClone.querySelector(".char-name");
    const movieList = cardClone.querySelector(".movie-list");
    const lastSeen = cardClone.querySelector(".last-seen");
    const img = cardClone.querySelector(".card-img");

    charName.textContent = character.name;

    character.movies.forEach((movie) => {
      const movieItem = document.createElement("li");
      movieItem.textContent = movie;
      movieList.appendChild(movieItem);
    });

    if (character.lastSeen) {
      lastSeen.textContent = "Last seen: " + character.lastSeen;
    } else {
      lastSeen.textContent = "Unknown"; // Default text if lastSeen is not available
    }

    if (character.image) {
      img.src = character.image;
    }

    characterContainer.appendChild(cardClone);
  });
}

// Function to filter characters based on search input
function filterCharacters(searchTerm) {
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  renderCharacterCards(filteredCharacters);
}

// Event listener for input change in search bar
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.trim();
  filterCharacters(searchTerm);
});

// Fetch data and render character cards on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  fetch("starwars.json")
    .then((response) => response.json())
    .then((data) => {
      characters = data;
      renderCharacterCards(characters);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

// Function to filter characters based on affiliation (light or dark side)
function filterByAffiliation(affiliation) {
  const filteredCharacters = characters.filter((character) => {
    return character.affiliation === affiliation;
  });

  renderCharacterCards(filteredCharacters);
}

// Event listener for Light Side button click
document.getElementById("light-side").addEventListener("click", () => {
  filterByAffiliation("light");
});

// Event listener for Dark Side button click
document.getElementById("dark-side").addEventListener("click", () => {
  filterByAffiliation("dark");
});
