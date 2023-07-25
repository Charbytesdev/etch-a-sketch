(function () {
  const body = document.querySelector("body");
  const container = createContainer(body);
  const inputSize = document.querySelector("#size-range");
  const inputColor = document.querySelector("#color-picker");
  const gridButton = document.querySelector("#grid-button");
  const clearButton = document.querySelector("#clear-button");
  const colorButton = document.querySelector("#color-button");
  const rainbowButton = document.querySelector("#rainbow-button");
  const eraserButton = document.querySelector("#eraser-button");

  let isGridLinesOn = false;
  let mouseDown = false;
  let isColorModeOn = true;
  let isRainbowModeOn = false;
  let isEraserModeOn = false;
  let currentColor = "#9D00FF";

  document.addEventListener("mouseup", () => (mouseDown = false));
  gridButton.addEventListener("click", toggleGridLines);
  clearButton.addEventListener("click", clearGrid);
  colorButton.addEventListener("click", enableColorMode);
  rainbowButton.addEventListener("click", enableRainbowMode);
  eraserButton.addEventListener("click", enableEraserMode);
  inputColor.addEventListener("change", () =>
    setCurrentColor(inputColor.value)
  );
  inputSize.addEventListener("change", () =>
    changeGridSize(container, inputSize.value)
  );

  //Disable dragging to prevent drawing issues
  document.ondragstart = () => {
    return false;
  };

  function getCurrentColor() {
    return currentColor;
  }

  function setCurrentColor(color) {
    currentColor = color;
  }

  function getIsGridLinesOn() {
    return isGridLinesOn;
  }

  function setIsGridLinesOn(newValue) {
    isGridLinesOn = newValue;
  }

  function createContainer(body) {
    const container = document.createElement("div");
    container.id = "container";
    body.appendChild(container);
    return container;
  }

  function createGrid(container, size = 16) {
    container.innerHTML = "";
    for (let i = 0; i < size; i++) {
      const column = document.createElement("div");
      column.classList.add("column");
      container.appendChild(column);
      for (let j = 0; j < size; j++) {
        const square = document.createElement("div");
        square.classList.add("square");

        column.appendChild(square);
        startDrawing(square);
        if (getIsGridLinesOn()) square.classList.add("grid");
      }
    }
  }

  function changeGridSize(container, inputSize) {
    createGrid(container, inputSize);
  }

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

  function changeBackgroundColor(square) {
    let color = "";
    if (isColorModeOn) color = getCurrentColor();
    if (isRainbowModeOn) color = getRandomColor();
    else if (isEraserModeOn) color = "transparent";
    square.style.backgroundColor = color;
  }

  function startDrawing(square) {
    square.addEventListener("mousedown", () => {
      mouseDown = true;
      changeBackgroundColor(square);
    });

    square.addEventListener("mousemove", () => {
      if (mouseDown) changeBackgroundColor(square);
    });
  }

  function toggleGridLines() {
    setIsGridLinesOn(!isGridLinesOn);
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => square.classList.toggle("grid"));
  }

  function enableColorMode() {
    isColorModeOn = true;
    isRainbowModeOn = false;
    isEraserModeOn = false;
  }

  function enableRainbowMode() {
    isRainbowModeOn = true;
    isColorModeOn = false;
    isEraserModeOn = false;
  }

  function enableEraserMode() {
    isEraserModeOn = true;
    isColorModeOn = false;
    isRainbowModeOn = false;
  }

  function clearGrid() {
    createGrid(container, inputSize.value);
  }

  //Intialize app
  createGrid(container, 16);
})();
