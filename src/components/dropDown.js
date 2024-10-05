import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleDimensionChange } from "../redux/actions/buildingAction.js";
import { buildingData } from "../redux/reducers/buidlingReducer.js";
import "../assets/style/customComponents.css";

const Dropdown = ({ label, funcKey, options }) => {
  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);
  const buildingReducer = useSelector(
    (state) => state.rootReducer.buildingReducer
  );

  return (
    <div className="dropdown">
      <span className="dropdown_label">{label} :</span>
      <div
        className="dropdown_select"
        id="length-select"
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
      >
        {buildingReducer[funcKey]}
      </div>
      <div
        className="dropdown_option_container"
        style={{ display: showDropdown ? "" : "none" }}
      >
        {options.map((item, index) => {
          return (
            <div
              data-value={item.value}
              key={index}
              className="dropdown_option"
              onClick={(e) => {
                console.log(e.target.value);
                e.stopPropagation();
                dispatch(
                  handleDimensionChange(funcKey, e.target.dataset.value)
                );
                setShowDropdown(false);
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
