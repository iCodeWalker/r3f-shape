import { Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";

const RightWallModel = ({
  wallLength,
  xCoordinateShiftRightWall,
  //   wallTexture,
  wallColor,
}) => {
  const wallTexture = useLoader(THREE.TextureLoader, "wood.jpg");

  const rightWallRef = useRef();

  // ################### Right Wall Model ###################
  const rightWallModel = new THREE.Shape();

  // const buildingReducer = useSelector(
  //   (state) => state.rootReducer.buildingReducer
  // );

  rightWallModel.moveTo(0, 0);
  rightWallModel.lineTo(0, 11); // y-coordinate is height, x-coordinate is width of wall
  rightWallModel.lineTo(0.5, 11); // y-coordinate is height, x-coordinate is width of wall
  rightWallModel.lineTo(0.5, 0);
  rightWallModel.lineTo(0, 0);
  rightWallModel.closePath();

  // ################### Right Wall Extrude Setting  ###################
  const rightWallExtrudeSettings = {
    depth: -wallLength, // floor length
    bevelEnabled: false,
    bevelSegments: 0,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 1,
  };
  return (
    <mesh
      position-z={0}
      position-y={0}
      position-x={xCoordinateShiftRightWall}
      ref={rightWallRef}
    >
      {/* position-x={xCoordinateShift - 0.121} */}
      <extrudeGeometry args={[rightWallModel, rightWallExtrudeSettings]} />
      <meshStandardMaterial
        color={"yellow"}
        side={THREE.DoubleSide}
        // map={wallTexture}
      />
      <Html
        position={[1, 7, -15]}
        wrapperClass="label"
        center
        distanceFactor={20}
        occlude={[rightWallRef]}
      >
        Right Wall
      </Html>
    </mesh>
  );
};

export default RightWallModel;
