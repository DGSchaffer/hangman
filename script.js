const words = [
  "callback",
  "viewport",
  "variable",
  "function",
  "event",
  "class",
  "design",
  "flexbox",
  "global",
  "selector",
];

const active = document.getElementById("active");
const fails = document.getElementById("fails");
const startGame = document.getElementById("myButton");
const guessWord = document.querySelector(".text");
const teclado = document.querySelectorAll(".btn");
const countTen = document.getElementById("counter");

let randomWord;
let failsCount = 0;

//by clicking NEW GAME load new random word from {words} into textarea and then hide it and reset the counter:
startGame.addEventListener("click", () => {
  countTen.innerText = "0";
  active.style.color = "black";
  active.innerText = "ACTIVE";
  failsCount = 0;

  randomWord = words[Math.floor(Math.random() * words.length)];
  const hiddenWord = Array.from(randomWord)
    .map((letter) => "-")
    .join("");
  guessWord.innerText = hiddenWord;
  // reset keys:
  teclado.forEach((btn) => {
    btn.style.backgroundColor = ""; // Set to the default value (empty string)
  });
});

//click event for each button of the teclado:
teclado.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedLetter = btn.innerHTML;
    //check if letter is in there:
    if (randomWord.includes(selectedLetter)) {
      // make letter visible:
      const currentHiddenWord = guessWord.innerText;
      const updatedHiddenWord = currentHiddenWord
        .split("")
        .map((letter, index) =>
          randomWord[index] === selectedLetter ? selectedLetter : letter
        )
        .join("");

      guessWord.innerText = updatedHiddenWord;

      // YOU WIN when the whole word is unveiled:

      if (!updatedHiddenWord.includes("-")) {
        active.innerText = "YOU WIN!";
        active.style.color = "green";
      }
    } else {
      // YOU FAIL when you had 10 wrong guesses:
      failsCount++;
      countTen.innerHTML = failsCount.toString();
      if (failsCount === 10) {
        active.innerText = "YOU FAILED!";
        active.style.color = "red";
      }
    }

    btn.style.backgroundColor = "orange";
  });
});
