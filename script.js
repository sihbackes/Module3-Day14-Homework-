const createNumberCells = function () {
  for (let i = 1; i < 77; i++) {
    let numbersBox = document.getElementById("numbers-box");
    let numberCell = document.createElement("div");
    let h4 = document.createElement("h4");
    numberCell.classList.add("number-cells");
    numberCell.classList.add(i);
    numbersBox.appendChild(numberCell);
    numberCell.appendChild(h4);
    h4.appendChild(document.createTextNode(i));
  }
};

const generateNumber = function () {
  let number = Math.floor(Math.random() * 76) + 1;
  let display = document.getElementById("display");
  let numberOnDisplay = document.createElement("span");
  numberOnDisplay.classList.add("number-display");
  display.appendChild(numberOnDisplay);
  numberOnDisplay.appendChild(document.createTextNode(number));
  let classNumber = document.getElementsByClassName(number);
  console.log(classNumber);
  classNumber[0].style.backgroundColor = "lightpink";
};

window.onload = function () {
  createNumberCells();
};
