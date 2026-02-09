let gridWidth = 20;
let gridHeight = 20;

const builderGrid = document.querySelector('#builder-grid');

let data = []

window.addEventListener("load", () => initGrid())



function generateEmptyGrid() {
    for (let i = 0; i < gridWidth*gridHeight; i++) {
        data[i] = FieldType.Grass
        const element = builderGrid.children.item(i);
        element.classList.add("grass-field")
    }
}

function toggleField(index, element) {
    data[index] = (data[index] + 1) % 3
    element.classList.remove("grass-field","water-field","road-field")
    if (data[index] === 0) {
        element.classList.add("grass-field")
    }
    else if (data[index] === 1) {
        element.classList.add("road-field")
    }
    else if (data[index] === 2) {
        element.classList.add("water-field")
    }
}


function initGrid() {
    data = []
   for (let i = 0; i < gridWidth*gridHeight; i++) {
        data.push(FieldType.Grass)
        const element = document.createElement('div')
        element.classList.add('field-common')
        element.classList.add('grass-field')
        builderGrid.appendChild(element)

       element.addEventListener("click", (ev) => {
           toggleField(i, element)
       })
   }

}