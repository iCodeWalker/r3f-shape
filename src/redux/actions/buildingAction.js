import {
  HANDLE_DIMENSION_CHANGE,
  HANDLE_TILE_ATTRIBUTE_CHANGE,
  HANDLE_WALL_ATTRIBUTE_CHANGE,
} from "./actionTypes.js";

export const handleDimensionChange = (key, value) => {
  console.log(value, "handleDimensionChange");
  return {
    type: HANDLE_DIMENSION_CHANGE,
    key: key,
    value: value,
  };
};

export const handleTileAttributeChange = (key, value) => {
  console.log(value, "handleTileAttribute");
  return {
    type: HANDLE_TILE_ATTRIBUTE_CHANGE,
    key: key,
    value: value,
  };
};

export const handleWallAttributeChange = (key, value) => {
  return {
    type: HANDLE_WALL_ATTRIBUTE_CHANGE,
    key: key,
    value: value,
  };
};
