import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../components/dropDown.js";
import { buildingData } from "../../redux/reducers/buidlingReducer.js";

const SizePanel = () => {
  const dispatch = useDispatch();

  const [hideDropdown, setHideDropdown] = useState(true);

  const buildingReducer = useSelector(
    (state) => state.rootReducer.buildingReducer
  );

  console.log(buildingReducer, "ControlPanel");
  return (
    <div style={{ padding: "30px" }}>
      <Dropdown
        label={"Length"}
        funcKey="length"
        options={buildingData.floorData.lengthOptions}
      />
      <Dropdown
        label={"Width"}
        funcKey="width"
        options={buildingData.floorData.widthOptions}
      />

      <Dropdown
        label={"Tile Length"}
        funcKey="tileLength"
        options={buildingData.tileData.lengthOptions}
      />

      <Dropdown
        label={"Tile Width"}
        funcKey={"tileWidth"}
        options={buildingData.tileData.widthOptions}
      />
    </div>
  );
};
export default SizePanel;
