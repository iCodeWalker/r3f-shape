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
  },
  tileData: {
    widthOptions: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "4", value: "4" },
    ],
    lengthOptions: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
    ],
    gapColorOptions: [],
    tileTextures: ["tile.jpg", "wood.jpg", "darkwood.jpg"],
    selectedTexture: "tile.jpg",
  },
};

const initialState = {
  width: 10,
  length: 10,
  tileLength: 2,
  tileWidth: 2,
  tileGapColor: "#f1f39c",
  texture: "tile.jpg",
  selectedTexture: "tile.jpg",
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
          let gapColor = action.value.split("#")[1];
          gapColor = `0x` + gapColor;
          console.log(gapColor, "gapColorgapColorgapColor");
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
