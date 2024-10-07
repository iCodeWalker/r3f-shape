import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

const RightWallModel = ({
  wallLength,
  xCoordinateShiftRightWall,
  //   wallTexture,
  wallColor,
}) => {
  const wallTexture = useLoader(THREE.TextureLoader, "wood.jpg");

  // ################### Right Wall Model ###################
  const rightWallModel = new THREE.Shape();

  rightWallModel.moveTo(0, 0);
  rightWallModel.lineTo(0, 11); // y-coordinate is height, x-coordinate is width of wall
  rightWallModel.lineTo(0.1, 11); // y-coordinate is height, x-coordinate is width of wall
  rightWallModel.lineTo(0.1, 0);
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
      position-y={0.102}
      position-x={xCoordinateShiftRightWall}
    >
      {/* position-x={xCoordinateShift - 0.121} */}
      <extrudeGeometry args={[rightWallModel, rightWallExtrudeSettings]} />
      <meshStandardMaterial
        color={"yellow"}
        side={THREE.DoubleSide}
        // map={wallTexture}
      />
    </mesh>
  );
};

export default RightWallModel;
