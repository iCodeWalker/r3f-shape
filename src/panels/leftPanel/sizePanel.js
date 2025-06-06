import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../components/dropDown.js";
import { buildingData } from "../../redux/reducers/buidlingReducer.js";
import {
  handleTileAttributeChange,
  handleWallAttributeChange,
} from "../../redux/actions/buildingAction.js";

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const SizePanel = () => {
  const dispatch = useDispatch();

  const [color, setColor] = useColor("#561ecb");

  const [showColorPicker, setShowColorPicker] = useState(true);

  const buildingReducer = useSelector(
    (state) => state.rootReducer.buildingReducer
  );

  const handleTileGapColor = (e) => {
    console.log(e, "tileGapColor");
    setColor(e);
    dispatch(handleTileAttributeChange("tileGapColor", e.hex));
  };

  console.log(buildingReducer, "ControlPanel");
  return (
    <div className="sizepanel_container">
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
      <input
        type="checkbox"
        value={buildingReducer.isAllWallHidden}
        onChange={(e) =>
          dispatch(handleWallAttributeChange("hideAllWalls", e.target.checked))
        }
        style={{ height: "20px", width: "20px" }}
      />
      <p>Hide All Walls</p>

      <p>Textures :</p>
      <div className="image_container">
        {buildingData.tileData.tileTextures.map((item, index) => {
          return (
            <div
              className="image_item"
              onClick={(e) => {
                console.log(e, "image_container");
                dispatch(
                  handleTileAttributeChange("selectedTileTexture", item)
                );
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
      <div>
        <div>
          <p>Tile Gap Color :</p>
          <div
            className="color_picker_label"
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            {buildingReducer.tileGapColor}
          </div>
        </div>
        {showColorPicker && (
          <div className="color_picker_container">
            <ColorPicker
              color={color}
              onChange={handleTileGapColor}
              hideAlpha={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default SizePanel;
