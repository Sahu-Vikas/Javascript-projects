const checkbox = document.querySelectorAll(".checkbox");
const notifyMsg = document.querySelector(".notify-msg");
const inputText = document.querySelectorAll(".input-text");
const quote = document.querySelector(".quote");
const progressBar = document.querySelector(".progressBar");
const progressMsg = document.querySelector(".progress-msg");
const progressValue = document.querySelector(".progress-value");

const Goals = JSON.parse(localStorage.getItem("mygoals")) || {
  first: {
    name: "",
    completed: false,
  },
  second: {
    name: "",
    completed: false,
  },
  third: {
    name: "",
    completed: false,
  },
};

let goalsCount = Object.values(Goals).filter((goal) => goal.completed).length;
progressValue.style.width = `${(goalsCount / 3) * 100}%`;
progressValue.firstElementChild.innerText = `${goalsCount}/3 completed`;

const message = [
  "Raise the bar by completing your goals!",
  "Well began is half-done!",
  "Just a step away,keep going!",
  "Whoa! You just completed all the goals, time for chill",
];

const allQuotes = [
  "Move one step ahead,today!",
  "Keep going, You're making great progress!",
];

progressMsg.innerText = message[goalsCount];
if (goalsCount == 0) {
  quote.innerText = allQuotes[0];
} else {
  quote.innerText = allQuotes[1];
}

checkbox.forEach((chkbox) => {
  chkbox.addEventListener("click", (e) => {
    const filledFields = [...inputText].every(function (input) {
      return input.value;
    });
    if (filledFields) {
      chkbox.parentElement.classList.toggle("completed");
      const inputId = chkbox.nextElementSibling.id; //traverse from checkbox to next sibling text-input
      Goals[inputId].completed = !Goals[inputId].completed; //to change check - uncheck
      goalsCount = Object.values(Goals).filter((goal) => goal.completed).length;
      localStorage.setItem("mygoals", JSON.stringify(Goals)); //to store checkmarks in LS
      progressValue.style.width = `${(goalsCount / 3) * 100}%`;
      progressValue.firstElementChild.innerText = `${goalsCount}/3 completed`; //to change progress bar value
      progressMsg.innerText = message[goalsCount];
      if (goalsCount == 0) {
        quote.innerText = allQuotes[0];
      } else {
        quote.innerText = allQuotes[1];
      }
    } else {
      progressBar.classList.add("show-msg");
    }
  });
});

inputText.forEach((input) => {
  input.value = Goals[input.id].name; //to set localstorage values into input field

  if (Goals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-msg");
  });

  input.addEventListener("input", (e) => {
    if (Goals[input.id].completed) {
      input.value = Goals[input.id].name;
      return; // to restrict user from override completed goals
    }
    Goals[input.id].name = input.value; //we can write this in object form also
    localStorage.setItem("mygoals", JSON.stringify(Goals));
  });
});
