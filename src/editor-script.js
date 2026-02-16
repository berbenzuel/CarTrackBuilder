let gridWidth = 20;
let gridHeight = 20;



window.Data = [];

window.addEventListener("load", () => {
  const uuid = JSON.parse(localStorage.getItem("uuid"));
  initGrid();
  if(uuid) {
    load(uuid)
  }
  else {
    generateEmptyGrid()
  }
});

function generateEmptyGrid() {
  const builderGrid = document.querySelector("#builder-grid");
  for (let i = 0; i < gridWidth * gridHeight; i++) {
    Data[i] = FieldType.Grass;
    const element = builderGrid.children.item(i);
    element.classList.value = "field-common";
    element.classList.add("grass-field");
  }
}

function toggleField(index, element) {
  Data[index] = (Data[index] + 1) % 3;
  element.classList.value = "field-common";

  if (Data[index] === 0) {
    element.classList.add("grass-field");
    changeRoad(index, false, true);
  } else if (Data[index] === 1) {
    changeRoad(index);
  } else if (Data[index] === 2) {
    element.classList.add("water-field");
    changeRoad(index, false, true);
  }
  console.log(Data)
}

function initGrid() {
  Data = [];
  console.log(document.querySelectorAll("#builder-grid"));
  const builderGrid = document.querySelector("#builder-grid");
  for (let i = 0; i < gridWidth * gridHeight; i++) {
    Data.push(FieldType.Grass);
    const element = document.createElement("div");
    element.classList.add("field-common");
    element.classList.add("grass-field");
    builderGrid.appendChild(element);

    element.addEventListener("click", (ev) => {
      toggleField(i, element);
    });
  }
}

function draw() {
  const builderGrid = document.querySelector("#builder-grid");
  for(let i = 0; i < gridWidth * gridHeight; i++) {
    let element = builderGrid.children.item(i);
    element.classList.value = "field-common";
    let data = Data[i];
    switch (Number.parseInt(data)) {
      case 0:
        element.classList.add("grass-field")
        break;
      case 1:
        changeRoad(i);
        break;
      case 2:
        element.classList.add("water-field");
        break;
    }
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

  if (Data[leftElement] === FieldType.Road) {
    connected += 1;
    if (!isDeep) changeRoad(leftElement, true);
  }
  if (Data[rightElement] === FieldType.Road) {
    connected += 2;
    if (!isDeep) changeRoad(rightElement, true);
  }
  if (Data[topElement] === FieldType.Road) {
    connected += 4;
    if (!isDeep) changeRoad(topElement, true);
  }
  if (Data[bottomElement] === FieldType.Road) {
    connected += 8;
    if (!isDeep) changeRoad(bottomElement, true);
  }

  if (repair) {
    return;
  }

  console.log(connected);
  let roadClass = RoadClass.get(connected).toString() ?? "road-vertical";

  const builderGrid = document.querySelector("#builder-grid");
  const element = builderGrid.children.item(fieldIndex);
  element.classList.value = "field-common";
  element.classList.add(roadClass);
}
