function createContainer() {
  const body = document.querySelector("body");
  const container = document.createElement("div");
  container.id = "container";
  body.appendChild(container);
  return container;
}

function createGrid() {
  const container = createContainer();
  for (let i = 0; i < 16; i++) {
    const column = document.createElement("div");
    column.classList.add("column");
    container.appendChild(column);
    for (let i = 0; i < 16; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      column.appendChild(square);
    }
  }
}

createGrid();
