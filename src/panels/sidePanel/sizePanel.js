import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../components/dropDown.js";
import { buildingData } from "../../redux/reducers/buidlingReducer.js";
import { handleTileAttributeChange } from "../../redux/actions/buildingAction.js";

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
        label={"Floor Length"}
        funcKey="length"
        options={buildingData.floorData.lengthOptions}
      />
      <Dropdown
        label={"Floor Width"}
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
      <p>Textures</p>
      <div className="image_container">
        {buildingData.tileData.tileTextures.map((item, index) => {
          return (
            <div
              className="image_item"
              onClick={(e) => {
                console.log(e, "image_container");
                dispatch(handleTileAttributeChange("selectedTexture", item));
              }}
            >
              <img src={item} />
            </div>
          );
        })}

        {/* <div className="image_item">
          <img src="wood.jpg" />
        </div>
        <div className="image_item">
          <img src="darkwood.jpg" />
        </div> */}
      </div>
    </div>
  );
};
export default SizePanel;
