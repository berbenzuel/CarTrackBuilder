window.FieldType = {
  Grass: 0,
  Road: 1,
  Water: 2,
};

//left = 1, right = 2, up = 4, down = 8
window.RoadClass = new Map([
  [0, "road-horizontal"],
  [1, "road-horizontal"],
  [2, "road-horizontal"],
  [3, "road-horizontal"],
  [4, "road-vertical"],
  [5, "road-turn-up-left"],
  [6, "road-turn-up-right"],
  [7, "road-three-up"],
  [8, "road-vertical"],
  [9, "road-turn-down-left"],
  [10, "road-turn-down-right"],
  [11, "road-three-down"],
  [12, "road-vertical"],
  [13, "road-three-left"],
  [14, "road-three-right"],
  [15, "road-cross"],
]);
