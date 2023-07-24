(function () {
  let isGridLinesOn = false;
  let mouseDown = false;
  let isRainbowModeOn = false;
  let isEraserModeOn = false;
  let currentColor = "#9D00FF";

  document.addEventListener("mouseup", () => (mouseDown = false));
  //Disable dragging to prevent drawing issues
  document.ondragstart = () => {
    return false;
  };

  const body = document.querySelector("body");
  const container = createContainer(body);
  createGrid(container, 16);

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

  const inputSize = document.querySelector("#size-range");
  inputSize.addEventListener("change", () =>
    changeGridSize(container, inputSize.value)
  );

  const inputColor = document.querySelector("#color-picker");
  inputColor.addEventListener("change", () =>
    setCurrentColor(inputColor.value)
  );

  const gridButton = document.querySelector("#grid-button");
  gridButton.addEventListener("click", toggleGridLines);

  const clearButton = document.querySelector("#clear-button");
  clearButton.addEventListener("click", clearGrid);

  const rainbowButton = document.querySelector("#rainbow-button");
  rainbowButton.addEventListener("click", toggleRainbowMode);

  const eraserButton = document.querySelector("#eraser-button");
  eraserButton.addEventListener("click", toggleEraserMode);

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

  function changeBackgroundColor(e) {
    let color = getCurrentColor();
    if (isRainbowModeOn) {
      color = getRandomColor();
    } else if (isEraserModeOn) {
      color = "transparent";
    }

    e.target.style.backgroundColor = color;
  }

  function startDrawing(square) {
    square.addEventListener("mousedown", (e) => {
      mouseDown = true;
      changeBackgroundColor(e);
    });

    square.addEventListener("mousemove", (e) => {
      if (mouseDown) changeBackgroundColor(e);
    });
  }

  function toggleGridLines() {
    setIsGridLinesOn(!isGridLinesOn);
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => square.classList.toggle("grid"));
  }

  function toggleRainbowMode() {
    isRainbowModeOn = !isRainbowModeOn;
    isEraserModeOn = false;
  }

  function toggleEraserMode() {
    isEraserModeOn = !isEraserModeOn;
    isRainbowModeOn = false;
  }

  function clearGrid() {
    createGrid(container, inputSize.value);
  }
})();
