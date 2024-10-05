import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleDimensionChange } from "../redux/actions/buildingAction.js";
import { buildingData } from "../redux/reducers/buidlingReducer.js";
import "../assets/style/customComponents.css";

const Dropdown = ({ label, funcKey, options }) => {
  const dispatch = useDispatch();

  const [hideDropdown, setHideDropdown] = useState(true);
  const buildingReducer = useSelector(
    (state) => state.rootReducer.buildingReducer
  );

  console.log(funcKey, "handleDimensionChange");
  console.log(buildingReducer[funcKey], "buildingReducer");

  return (
    <div className="dropdown">
      <span className="dropdown_label">{label} :</span>
      <div
        className="dropdown_select"
        id="length-select"
        onClick={() => {
          setHideDropdown(!hideDropdown);
        }}
      >
        {buildingReducer[funcKey]}
      </div>
      <div
        className="dropdown_option_container"
        style={{ display: hideDropdown ? "none" : "" }}
      >
        {options.map((item, index) => {
          return (
            <div
              data-value={item.value}
              key={index}
              className="dropdown_option"
              onClick={(e) => {
                console.log(e.target.value);
                dispatch(
                  handleDimensionChange(funcKey, e.target.dataset.value)
                );
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
