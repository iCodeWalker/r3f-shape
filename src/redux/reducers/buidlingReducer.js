import {
  HANDLE_DIMENSION_CHANGE,
  HANDLE_TILE_ATTRIBUTE_CHANGE,
} from "../actions/actionTypes.js";

export const buildingData = {
  width: "",
  length: "",
  height: "",
  tileLength: "",
  tileWidth: "",
  tileGapColor: "",
  floorData: {
    widthOptions: [
      { label: "10", value: "10" },
      { label: "20", value: "20" },
      { label: "30", value: "30" },
      { label: "40", value: "40" },
      { label: "50", value: "50" },
      { label: "60", value: "60" },
      { label: "70", value: "70" },
    ],
    lengthOptions: [
      { label: "10", value: "10" },
      { label: "20", value: "20" },
      { label: "30", value: "30" },
      { label: "40", value: "40" },
      { label: "50", value: "50" },
      { label: "60", value: "60" },
      { label: "70", value: "70" },
    ],
    floorTextures: [],
    selectedFloorTexture: "",
  },
  tileData: {
    widthOptions: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
      { label: "6", value: "6" },
    ],
    lengthOptions: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
      { label: "6", value: "6" },
      { label: "7", value: "7" },
      { label: "8", value: "8" },
      { label: "9", value: "9" },
      { label: "10", value: "10" },
    ],
    gapColorOptions: [],
    tileTextures: ["tile.jpg", "wood.jpg", "darkwood.jpg"],
    selectedTileTexture: "tile.jpg",
  },
  wallData: {
    wallTextures: [],
    selectedWallTexture: {
      front: "",
      back: "",
      left: "",
      right: "",
    },
  },
};

const initialState = {
  width: 30,
  length: 30,
  height: 11,
  tileLength: 2,
  tileWidth: 2,
  tileGapColor: "#f1f39c",
  texture: "tile.jpg",
  selectedTileTexture: "tile.jpg",
  selectedWallTexture: {
    front: "",
    back: "",
    left: "",
    right: "",
  },
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
        if (action.value !== "" && action.value != undefined) {
          buildingData.tileGapColor = action.value;
          state = { ...state, tileGapColor: action.value };
        } else {
          let defaultTileGapColor = 0xf1f3c2;
          buildingData.tileGapColor = 0xf1f3c2;
          state = { ...state, tileGapColor: defaultTileGapColor };
        }
      }
      // ####### Tile Texture #######
      if (action.key === "selectedTexture") {
        buildingData.selectedTexture = action.value;
        state = { ...state, selectedTexture: action.value };
      }
      return { ...state };

    default:
      return state;
  }
};
export default buildingReducer;
