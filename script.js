const createNumberCells = function () {
  for (let i = 1; i < 77; i++) {
    //loop to create 76 cells
    let numbersBox = document.getElementById("numbers-box"); // gets the div on HTML
    let numberCell = document.createElement("div"); //Create a div
    let h4 = document.createElement("h4"); //creates a h4
    numberCell.classList.add("number-cells"); // add a class to style the cells
    numberCell.classList.add(i); //add a number to the class that I will use on the next function
    numbersBox.appendChild(numberCell);
    numberCell.appendChild(h4);
    h4.appendChild(document.createTextNode(i)); //create the number inside of the cell
  }
};

const generateNumber = function () {
  let number = Math.floor(Math.random() * 76) + 1; // creates a random number
  let display = document.getElementById("display"); // gets the div on HTML
  let numberOnDisplay = document.createElement("span"); // creates an span
  numberOnDisplay.classList.add("number-display"); // add a class to the span the styles all of them
  display.appendChild(numberOnDisplay); // put the span inside in the div from HTML
  numberOnDisplay.appendChild(document.createTextNode(number)); // put the random number create on the span
  let classNumber = document.getElementsByClassName(number); //call the same class that match to the random number
  classNumber[0].style.backgroundColor = "lightpink"; // style the cell
};

window.onload = function () {
  createNumberCells();
};
