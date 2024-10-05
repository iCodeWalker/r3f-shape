import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/style/customComponents.css";

import SizePanel from "./sizePanel.js";

const SidePanel = () => {
  const dispatch = useDispatch();

  const [hideDropdown, setHideDropdown] = useState(true);

  const buildingReducer = useSelector(
    (state) => state.rootReducer.buildingReducer
  );

  console.log(buildingReducer, "ControlPanel");
  return (
    <div style={{ padding: "30px" }}>
      <SizePanel />
    </div>
  );
};
export default SidePanel;
