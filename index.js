//Boards data
const easy = [
  "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298",
];
const medium = [
  "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
  "619472583243985617587316924158247369926531478734698152891754236365829741472163895",
];
const hard = [
  "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
  "712583694639714258845269173521436987367928415498175326184697532253841769976352841",
];

//vaiables
let selectedNum, selectedBox;
let board, name, solution;

function generateBoard(board) {
  //clear previous board
  clearPrevious();

  //let used to increment box ids

  let idCount = 0;
  for (let i = 0; i < 81; i++) {
    let box = document.createElement("p");

    if (board.charAt(i) !== "-") {
      box.textContent = board.charAt(i);
      box.classList.add("background");
    } else {
      //add event listener

      box.addEventListener("click", function (e) {
        selectedBox = this;
        for (let j = 0; j < 81; j++) {
          qsa(".box")[j].classList.remove("selected");
        }
        this.classList.add("selected");
      });
    }

    //assingning id
    box.id = idCount++;

    //add class to box
    box.classList.add("box");

    if ((box.id > 17 && box.id < 27) || (box.id > 44 && box.id < 54)) {
      box.classList.add("bottomBorder");
    }

    if ((box.id + 1) % 9 == 3 || (box.id + 1) % 9 == 6) {
      box.classList.add("rightBorder");
    }

    //add box to code

    id("board").appendChild(box);
  }
  id("board").classList.add("completeBorder");
}

document.body.addEventListener("keyup", (e) => {
  selectedNum = e.key;
  updateMove();
});

function updateMove() {
  // console.log(selectedNum);

  if (selectedBox && selectedNum === "Backspace") {
    selectedBox.textContent = "";
  }
  if (selectedBox && selectedNum && selectedNum >= 1 && selectedNum <= 9) {
    selectedBox.textContent = selectedNum;

    if (checkCorrect(selectedBox)) {
      selectedBox.classList.add("background");
      selectedBox.classList.remove("incorrect");
      selectedBox.classList.add("blue");
    } else {
      selectedBox.classList.add("incorrect");
      selectedBox.classList.remove("background");
    }
    selectedNum = null;
  }
}

function checkCorrect(box) {
  return solution.charAt(box.id) == box.textContent;
}

function clearPrevious() {
  //access all the box
  let boxes = qsa(".box");

  //remove each box
  for (let i = 0; i < boxes.length; i++) boxes[i].remove();

  selectedBox = null;
  selectedNum = null;
}

//buttons
id("easy").onclick = function () {
  board = easy[0];
  solution = easy[1];
  generateBoard(board);
};

id("medium").onclick = function () {
  board = medium[0];
  solution = medium[1];
  generateBoard(board);
};

id("hard").onclick = function () {
  board = hard[0];
  solution = hard[1];
  generateBoard(board);
};

//Helper functions
function id(id) {
  return document.getElementById(id);
}

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}
