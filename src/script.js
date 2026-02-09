let gridWidth = 20;
let gridHeight = 20;

const builderGrid = document.querySelector("#builder-grid");

let data = [];

window.addEventListener("load", () => initGrid());

function generateEmptyGrid() {
  for (let i = 0; i < gridWidth * gridHeight; i++) {
    data[i] = FieldType.Grass;
    const element = builderGrid.children.item(i);
    element.classList.add("grass-field");
  }
}

function toggleField(index, element) {
  data[index] = (data[index] + 1) % 3;
  element.classList.value = "field-common";

  if (data[index] === 0) {
    element.classList.add("grass-field");
    changeRoad(index, false, true);
  } else if (data[index] === 1) {
    changeRoad(index);
  } else if (data[index] === 2) {
    element.classList.add("water-field");
    changeRoad(index, false, true);
  }
}

function initGrid() {
  data = [];
  for (let i = 0; i < gridWidth * gridHeight; i++) {
    data.push(FieldType.Grass);
    const element = document.createElement("div");
    element.classList.add("field-common");
    element.classList.add("grass-field");
    builderGrid.appendChild(element);

    element.addEventListener("click", (ev) => {
      toggleField(i, element);
    });
  }
}

function changeRoad(fieldIndex, isDeep = false, repair = false) {
  let originLeft = fieldIndex % gridWidth;
  let originTop = (fieldIndex - originLeft) / gridWidth;

  let topElement = originTop < gridHeight ? fieldIndex - gridWidth : null;
  let bottomElement = originTop >= 0 ? fieldIndex + gridWidth : null;
  let leftElement = originLeft > 0 ? fieldIndex - 1 : null;
  let rightElement = originLeft < gridWidth ? fieldIndex + 1 : null;

  //yes flags:)
  //left = 1, right = 2, up = 4, down = 8
  let connected = 0;

  if (data[leftElement] === FieldType.Road) {
    connected += 1;
    if (!isDeep) changeRoad(leftElement, true);
  }
  if (data[rightElement] === FieldType.Road) {
    connected += 2;
    if (!isDeep) changeRoad(rightElement, true);
  }
  if (data[topElement] == FieldType.Road) {
    connected += 4;
    if (!isDeep) changeRoad(topElement, true);
  }
  if (data[bottomElement] === FieldType.Road) {
    connected += 8;
    if (!isDeep) changeRoad(bottomElement, true);
  }

  if (repair) {
    return;
  }

  console.log(connected);
  let roadClass = RoadClass.get(connected) ?? "road-vertical";

  const element = builderGrid.children.item(fieldIndex);
  element.classList.value = "field-common";
  element.classList.add(roadClass);
}
