/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        // create a new div element, which will become the game card
        let gameCard = document.createElement('div');

        // add the class game-card to the list
        gameCard.classList.add('game-card');

        // Construct the image path using the "assets" folder
        let imagePath = `${games[i].img}`;

        // set the inner HTML using a template literal to display some info 
        // about each game
        gameCard.innerHTML = `
            <img src="${imagePath}" alt="${games[i].name}" class="game-img"
            <h2>${games[i].name}</h2>
            <p>Description: ${games[i].description}</p>
            <p>Backers: ${games[i].backers}</p>
            <p>Goal: ${games[i].goal}</p>
        `;

        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions=GAMES_JSON.reduce((acc,games)=>acc+games.backers,0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML=`${totalContributions.toLocaleString()} Contributions`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalAmountPledged = GAMES_JSON.reduce((acc, games) => acc + games.pledged, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalAmountPledged.toLocaleString()} Raised`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = `${totalGames.toLocaleString()} Games`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(games => games.pledged < games.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(games => games.pledged >= games.goal);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const fundraisingInfoString = `
  We have raised $${GAMES_JSON.reduce((total, game) => total + game.pledged, 0)} for ${GAMES_JSON.length} games.
  ${unfundedGamesCount === 0
    ? 'All our games are funded!'
    : `Currently, ${unfundedGamesCount} ${unfundedGamesCount !== 1 ? 'games remain' : 'game remains'} unfunded. We humbly accept
        and appreciate your patronage and passion for funding the games on our platform!`
  }
`;

// create a new DOM element containing the template string and append it to the description container
const fundraisingInfoElement = document.createElement("p");
fundraisingInfoElement.innerHTML = fundraisingInfoString;
descriptionContainer.appendChild(fundraisingInfoElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, runnerUpGame] = sortedGames.slice(0, 2);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topFundedGameElement = document.createElement("p");
topFundedGameElement.textContent = `Top Funded Game: ${topGame.name}`;
firstGameContainer.appendChild(topFundedGameElement);

// do the same for the runner up item
const runnerUpElement = document.createElement("p");
runnerUpElement.textContent = `Runner-Up: ${runnerUpGame.name}`;
secondGameContainer.appendChild(runnerUpElement);