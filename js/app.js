(function () {
  const appContainer = document.querySelector("#app-container");
  const gridContainer = createGridContainer(appContainer);
  const inputSize = document.querySelector("#size-range");
  const inputColor = document.querySelector("#color-picker");
  const gridButton = document.querySelector("#grid-button");
  const clearButton = document.querySelector("#clear-button");
  const colorButton = document.querySelector("#color-button");
  const rainbowButton = document.querySelector("#rainbow-button");
  const eraserButton = document.querySelector("#eraser-button");
  const rangeValue = document.querySelector("#range-value");

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
  inputSize.addEventListener("change", () => {
    changeGridSize(gridContainer, inputSize.value);
    changeGridSizeValue(inputSize.value);
  });

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

  function createGridContainer(appContainer) {
    const gridContainer = document.createElement("div");
    gridContainer.id = "grid-container";
    appContainer.appendChild(gridContainer);
    return gridContainer;
  }

  function createGrid(gridContainer, size = 16) {
    gridContainer.innerHTML = "";
    for (let i = 0; i < size; i++) {
      const column = document.createElement("div");
      column.classList.add("column");
      gridContainer.appendChild(column);
      for (let j = 0; j < size; j++) {
        const square = document.createElement("div");
        square.classList.add("square");

        column.appendChild(square);
        startDrawing(square);
        if (getIsGridLinesOn()) square.classList.add("grid");
      }
    }
  }

  function changeGridSize(gridContainer, inputSize) {
    createGrid(gridContainer, inputSize);
  }

  function changeGridSizeValue(value) {
    rangeValue.textContent = `${value} x ${value}`;
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
    gridButton.classList.toggle("active");
    setIsGridLinesOn(!isGridLinesOn);
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => square.classList.toggle("grid"));
  }

  function disableDrawingModes() {
    colorButton.classList.remove("active");
    rainbowButton.classList.remove("active");
    eraserButton.classList.remove("active");
    isRainbowModeOn = false;
    isEraserModeOn = false;
    isColorModeOn = false;
  }

  function enableColorMode() {
    disableDrawingModes();
    colorButton.classList.add("active");
    isColorModeOn = true;
  }

  function enableRainbowMode() {
    disableDrawingModes();
    rainbowButton.classList.add("active");
    isRainbowModeOn = true;
  }

  function enableEraserMode() {
    disableDrawingModes();
    eraserButton.classList.add("active");
    isEraserModeOn = true;
  }

  function clearGrid() {
    createGrid(gridContainer, inputSize.value);
  }

  //Intialize app
  createGrid(gridContainer, 16);
})();
