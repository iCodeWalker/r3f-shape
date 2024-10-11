import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

const FrontWallModel = ({
  wallLength,
  xCoordinateShiftFrontWall,
  //   wallTexture,
  wallColor,
}) => {
  const wallTexture = useLoader(THREE.TextureLoader, "wood.jpg");

  // ################### Front Wall Model ###################
  const frontWallModel = new THREE.Shape();

  frontWallModel.moveTo(0, 0);
  frontWallModel.lineTo(0, 11); // y-coordinate is height, x-coordinate is width of wall
  frontWallModel.lineTo(0.5, 11); // y-coordinate is height, x-coordinate is width of wall
  frontWallModel.lineTo(0.5, 0);
  frontWallModel.lineTo(0, 0);
  frontWallModel.closePath();

  // ################### Front Wall Extrude Setting  ###################
  const frontWallExtrudeSettings = {
    depth: -wallLength, // floor length
    bevelEnabled: false,
    bevelSegments: 0,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 1,
  };
  return (
    <mesh
      position-z={0.001}
      position-y={0.102}
      position-x={xCoordinateShiftFrontWall - 0.101}
      rotation={[0, -Math.PI / 2, 0]}
    >
      {/* position-x={xCoordinateShift - 0.121} */}
      <extrudeGeometry args={[frontWallModel, frontWallExtrudeSettings]} />
      <meshStandardMaterial
        color={"blue"}
        side={THREE.DoubleSide}
        // map={wallTexture}
      />
    </mesh>
  );
};

export default FrontWallModel;
