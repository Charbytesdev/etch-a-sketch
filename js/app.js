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
    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);
    for (let i = 0; i < 16; i++) {
      const column = document.createElement("div");
      column.classList.add("column");
      row.appendChild(column);
    }
  }
}

createGrid();
