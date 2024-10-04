import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/actions/authenticationAction.js";
import { handleDimensionChange } from "../redux/actions/buildingAction.js";

const ControlPanel = () => {
  const dispatch = useDispatch();

  const authentication = useSelector(
    (state) => state.rootReducer.authenticationReducer
  );

  const lengthSizeData = [
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "30", value: "30" },
    { label: "40", value: "40" },
    { label: "50", value: "50" },
    { label: "60", value: "60" },
    { label: "70", value: "70" },
  ];

  const widthSizeData = [
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "30", value: "30" },
    { label: "40", value: "40" },
    { label: "50", value: "50" },
    { label: "60", value: "60" },
    { label: "70", value: "70" },
  ];

  const tileWidthSizeData = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "4", value: "4" },
  ];

  const tileLengthSizeData = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "4", value: "4" },
  ];

  console.log(authentication, "ControlPanel");
  return (
    <div>
      <label for="length-select">Choose Length:</label>

      <select
        name="length"
        id="length-select"
        onChange={(e) => {
          console.log(e.target.value);
          dispatch(handleDimensionChange("length", e.target.value));
        }}
      >
        {lengthSizeData.map((item, index) => {
          return (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          );
        })}
      </select>

      <label for="width-select">Choose Width:</label>

      <select
        name="width"
        id="width-select"
        onChange={(e) => {
          console.log(e.target);
          dispatch(handleDimensionChange("width", e.target.value));
        }}
      >
        {widthSizeData.map((item, index) => {
          return (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          );
        })}
      </select>

      <label for="length-select">Choose Tile Length:</label>

      <select
        name="length"
        id="length-select"
        onChange={(e) => {
          console.log(e.target.value);
          dispatch(handleDimensionChange("tileLength", e.target.value));
        }}
      >
        {tileLengthSizeData.map((item, index) => {
          return (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          );
        })}
      </select>

      <label for="length-select">Choose Tile Width:</label>

      <select
        name="length"
        id="length-select"
        onChange={(e) => {
          console.log(e.target.value);
          dispatch(handleDimensionChange("tileWidth", e.target.value));
        }}
      >
        {tileWidthSizeData.map((item, index) => {
          return (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          );
        })}
      </select>
      <button onClick={() => dispatch(signIn(true))}>Click Me</button>
    </div>
  );
};
export default ControlPanel;
