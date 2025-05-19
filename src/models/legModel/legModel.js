import { Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";

const LegModel = ({
  xPosition,
  zPosition,
  color,
  texture,
  zCoordinateShiftBackWall,
  xCoordinateShiftBackWall,
  //   wallTexture,
  wallColor,
}) => {
  const legTexture = useLoader(THREE.TextureLoader, "wood.jpg");
  // ################### Repeating Tile Texture ###################
  legTexture.wrapS = THREE.RepeatWrapping;
  legTexture.wrapT = THREE.RepeatWrapping;

  const [legExtrude, setCeilExtrude] = useState({});
  const [isCeilingVisible, setIsCeilingVisible] = useState(true);

  const buildingReducer = useSelector(
    (state) => state.rootReducer.buildingReducer
  );

  // ################### Back Wall Model ###################
  const legModel = new THREE.Shape();

  const legRef = useRef();

  legModel.moveTo(0, 0);
  legModel.lineTo(0, -3); // y-coordinate is height, x-coordinate is width of wall
  legModel.lineTo(0.2, -3); // y-coordinate is height, x-coordinate is width of wall
  legModel.lineTo(0.2, 0);
  legModel.lineTo(0, 0);
  legModel.closePath();

  const bedLegRef = useRef();

  // ################### Back Wall Extrude Setting  ###################

  const calcExtrudeSettingForCeil = () => {
    return {
      depth: -0.2, // floor length
      bevelEnabled: false,
      bevelSegments: 0,
      steps: 1,
      bevelSize: 0.1,
      bevelThickness: 1,
    };
  };

  useEffect(() => {
    setCeilExtrude(calcExtrudeSettingForCeil());
    setIsCeilingVisible(buildingReducer.isAllWallHidden);
  }, [buildingReducer.length, buildingReducer.isAllWallHidden]);

  useEffect(() => {
    if (legRef.current) {
      if (buildingReducer.isAllWallHidden) {
        legRef.current.material.opacity = 1;
        legRef.current.material.transparent = false;
      } else {
        legRef.current.material.transparent = false;
        legRef.current.material.opacity = 1;
      }
    }
  }, [buildingReducer.isAllWallHidden]);

  console.log(xPosition, "xPosition");
  return (
    <mesh
      position-z={zPosition}
      position-y={3 - 0.3}
      position-x={xPosition}
      rotation={[0, 0, 0]}
      ref={legRef}
    >
      {/* position-x={xCoordinateShift - 0.121} */}
      <extrudeGeometry args={[legModel, legExtrude]} />
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        map={legTexture}
      />
      {/* <Html
        position={[-1, 7, -zCoordinateShiftBackWall / 2]}
        wrapperClass="label"
        center
        distanceFactor={20}
        occlude={[legRef]}
      >
        Ceiling
      </Html> */}
    </mesh>
  );
};

export default LegModel;
