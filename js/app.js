function createContainer() {
  const body = document.querySelector("body");
  const container = document.createElement("div");
  container.id = "container";
  body.appendChild(container);
  return container;
}

function createGrid(size = 16) {
  const container = createContainer();
  for (let i = 0; i < size; i++) {
    const column = document.createElement("div");
    column.classList.add("column");
    container.appendChild(column);
    for (let i = 0; i < size; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      column.appendChild(square);
      startDrawing(square);
    }
  }
}

function changeRange(inputSize) {
  console.log(inputSize);
  const body = document.querySelector("body");
  body.removeChild(body.lastChild);
  createGrid(inputSize);
}

createGrid(15);
const inputSize = document.querySelector("#size-range");

inputSize.addEventListener("change", () => changeRange(inputSize.value));

function changeBackgroundColor(e) {
  e.target.style.backgroundColor = "purple";
}

function startDrawing(square) {
  square.addEventListener("mouseover", changeBackgroundColor);
}

function showGrid() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => square.classList.toggle("grid"));
}

const gridButton = document.querySelector("#grid-button");
gridButton.addEventListener("click", showGrid);
