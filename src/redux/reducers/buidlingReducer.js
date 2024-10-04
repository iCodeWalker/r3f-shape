import {
  HANDLE_DIMENSION_CHANGE,
  HANDLE_TILE_ATTRIBUTE_CHANGE,
} from "../actions/actionTypes.js";

export const buildingData = {
  width: "",
  length: "",
  tileLength: "",
  tileWidth: "",
  tileGapColor: "",
};

const initialState = {
  width: 10,
  length: 10,
  tileLength: 4,
  tileWidth: 2,
  tileGapColor: 0xf1f39c,
  texture: "tile.jpg",
};

const buildingReducer = (state = initialState, action) => {
  switch (action.type) {
    // ############# 1. Handling floor dimension(length, width) changes ################
    // ############# 2. Handling floor tile dimension(length, width) changes ################
    case HANDLE_DIMENSION_CHANGE:
      // ####### Floor Length #######
      if (action.key === "length") {
        buildingData.length = parseFloat(action.value);
        state = { ...state, length: parseFloat(action.value) };
      }
      // ####### Floor Width #######
      if (action.key === "width") {
        buildingData.width = parseFloat(action.value);
        state = { ...state, width: parseFloat(action.value) };
      }
      // ####### Tile Length #######
      if (action.key === "tileLength") {
        buildingData.tileLength = parseFloat(action.value);
        state = { ...state, tileLength: parseFloat(action.value) };
      }
      // ####### Tile Width #######
      if (action.key === "tileWidth") {
        buildingData.tileWidth = parseFloat(action.value);
        state = { ...state, tileWidth: parseFloat(action.value) };
      }
      return { ...state };

    // ############# 1. Handling tile attribute changes ################
    case HANDLE_TILE_ATTRIBUTE_CHANGE:
      // ####### Tile Gap Color #######
      if (action.key === "tileGapColor") {
        buildingData.tileGapColor = action.value;
        state = { ...state, tileGapColor: action.value };
      }
      return { ...state };

    default:
      return state;
  }
};
export default buildingReducer;
