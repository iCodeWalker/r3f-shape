import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/style/customComponents.css";

import SizePanel from "./sizePanel.js";

const LeftPanel = () => {
  const dispatch = useDispatch();

  const [hideDropdown, setHideDropdown] = useState(true);

  const buildingReducer = useSelector(
    (state) => state.rootReducer.buildingReducer
  );

  console.log(buildingReducer, "ControlPanel");
  return (
    <div className="leftpanel_container">
      <SizePanel />
    </div>
  );
};
export default LeftPanel;
