(function () {
  createGrid(16);

  let isGridLinesOn = false;

  function getIsGridLinesOn() {
    return isGridLinesOn;
  }

  function setIsGridLinesOn(newValue) {
    isGridLinesOn = newValue;
  }

  const inputSize = document.querySelector("#size-range");
  inputSize.addEventListener("change", () => changeGridSize(inputSize.value));

  const gridButton = document.querySelector("#grid-button");
  gridButton.addEventListener("click", toggleGridLines);

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
      for (let j = 0; j < size; j++) {
        const square = document.createElement("div");
        square.classList.add("square");
        column.appendChild(square);
        startDrawing(square);
        if (getIsGridLinesOn) square.classList.add("grid");
      }
    }
  }

  function changeGridSize(inputSize) {
    console.log(inputSize);
    const body = document.querySelector("body");
    body.removeChild(body.lastChild);
    createGrid(inputSize);
  }

  function changeBackgroundColor(e) {
    e.target.style.backgroundColor = "purple";
  }

  function startDrawing(square) {
    square.addEventListener("mouseover", changeBackgroundColor);
  }

  function toggleGridLines() {
    setIsGridLinesOn(!isGridLinesOn);
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => square.classList.toggle("grid"));
  }
})();
