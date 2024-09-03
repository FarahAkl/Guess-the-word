//Setting game name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerText = gameName;
document.querySelector(
  "footer"
).innerText = `${gameName} Game Created by Farah Akl`;

//Setting game options
let numOfTry = 5;
let numOfLetters = 6;
let currentTry = 1;
let numOfHints = 3;
//manage Hints
document.querySelector(".hint span").innerHTML = numOfHints;
const hintBtn = document.querySelector(".hint");
hintBtn.addEventListener("click", getHint);
//Array of Guesses
let wordToGuess = "";
let wordsArray = [
  "planet",
  "binary",
  "office",
  "guitar",
  "rocket",
  "puzzle",
  "oxygen",
  "camera",
  "pillow",
  "jungle",
  "anchor",
  "silver",
  "flower",
  "danger",
  "frozen",
  "gentle",
  "jacket",
  "vision",
  "crystal",
  "breeze",
  "artist",
  "bottle",
  "family",
  "sunset",
  "island",
  "circle",
  "forest",
  "desert",
  "thrive",
  "travel",
  "coffee",
  "global",
  "modern",
  "luxury",
  "bridge",
  "random",
  "object",
  "jigsaw",
  "yellow",
  "rabbit",
  "season",
  "dragon",
  "flight",
  "marine",
  "career",
  "puzzle",
  "gospel",
  "wonder",
  "magnet",
  "castle",
  "puzzle",
  "copper",
  "silver",
  "bright",
  "mantis",
  "rocket",
  "pepper",
  "spirit",
  "glider",
  "mirror",
];
wordToGuess =
  wordsArray[Math.floor(Math.random() * wordsArray.length)].toLowerCase();
let messageArea = document.querySelector(".message");
//Function Generate Input
function generateInput() {
  const inputsContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numOfTry; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    tryDiv.style.color = "#9a5caf";
    if (i != 1) tryDiv.classList.add("disabled-inputs");
    //Create Inputs
    for (let j = 1; j <= numOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();
  //Disable All Inputs Expect first one
  const inputsDisabled = document.querySelectorAll(".disabled-inputs input");
  inputsDisabled.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", (event) => {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

const checkButton = document.querySelector(".check");
checkButton.addEventListener("click", handleGuesses);

function handleGuesses() {
  let successGuess = true;
  for (let i = 1; i <= numOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];
    //game logic
    if (letter === actualLetter) {
      inputField.classList.add("in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("wrong");
      successGuess = false;
    }
  }
  //Check if User Win or Lose
  if (successGuess) {
    messageArea.innerHTML = `you win the word is <span>${wordToGuess}</span>`;
    if (numOfHints === 3) {
      messageArea.innerHTML = `Congrats You Didn't Use Hints <span>${wordToGuess}</span>`;
    }
    //disabled all inputs
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((input) => input.classList.add("disabled-inputs"));

    checkButton.disabled = true;
    hintBtn.disabled = true;
  } else {
    document
      .querySelector(`.try${currentTry}`)
      .classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(
      `.try${currentTry} input`
    );
    currentTryInputs.forEach((input) => (input.disabled = true));
    currentTry++;

    const nextTryInputs = document.querySelectorAll(`.try${currentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try${currentTry}`);
    if (el) {
      document
        .querySelector(`.try${currentTry}`)
        .classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      checkButton.disabled = true;
      hintBtn.disabled = true;
      messageArea.innerHTML = `You lose the word is <span>${wordToGuess}</span>`;
    }
  }
}

function getHint() {
  if (numOfHints > 0) {
    numOfHints--;
    document.querySelector(".hint span").innerHTML = numOfHints;
  }
  if (numOfHints === 0) {
    hintBtn.disabled = true;
  }
  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  const emptyEnabled = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );

  if (emptyEnabled.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabled.length);
    const randomInput = emptyEnabled[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    const hintLetter = wordToGuess[indexToFill];
    if (indexToFill !== -1) randomInput.value = hintLetter.toUpperCase();
  }
}
function handleBackspace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])")
    const currentIndex = Array.from(inputs).indexOf(document.activeElement)
    if (currentIndex > 0) {
      const currentInput=inputs[currentIndex]
      const prevInput = inputs[ currentIndex - 1 ]
      currentInput.value = ""
      prevInput.value=""
      prevInput.focus()
    }
  }
}
document.addEventListener("keydown",handleBackspace)
window.onload = () => generateInput();
