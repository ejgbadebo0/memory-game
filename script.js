const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let matching = false;
let c1 = null;
let matched = 0;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target.className);
  if (event.target.classList.contains('matched')) {
    return;
  }
 
  event.target.style.backgroundColor = event.target.className;

  if(matching) {
    //console.log(`function start: ${c1.style.backgroundColor}`);
    if (c1 === event.target){
      console.log('you clicked the same card');
      return;
    }
    else if (event.target.className === c1.className) {
      console.log('you matched a color!');

      c1.classList.add('matched');
      event.target.classList.add('matched');
      matched += 2;

      console.log(`${matched} matched of ${COLORS.length}.`);
      playAgain(matched);
    }
    else{
      setTimeout(resetCards,1000,event.target,c1);
      console.log('no match');
    }
    
    c1 = null;
    matching = false;

  }
  else{    
    event.target.style.backgroundColor = event.target.className;
    c1 = event.target;
    matching = true;
    console.log(`function end: ${c1.style.backgroundColor}`);

  }


}

function resetCards(f, s) {
  f.style.backgroundColor = '';
  s.style.backgroundColor = '';
}

function playAgain(cardsMatched) {
  
  if (cardsMatched === COLORS.length) {
    console.log('reseting');
    matched = 0;
    gameContainer.innerHTML = '';
    let newColors = shuffle(COLORS);
    createDivsForColors(newColors);
  }
}
// when the DOM loads
createDivsForColors(shuffledColors);
