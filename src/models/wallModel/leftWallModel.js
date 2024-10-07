import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

const LeftWallModel = ({
  wallLength,
  xCoordinateShiftLeftWall,
  // wallTexture,
  wallColor,
}) => {
  const wallTexture = useLoader(THREE.TextureLoader, "wood.jpg");

  // ################### Left Wall Model ###################
  const leftWallModel = new THREE.Shape();

  leftWallModel.moveTo(0, 0);
  leftWallModel.lineTo(0, 11); // y-coordinate is height, x-coordinate is width of wall
  leftWallModel.lineTo(0.1, 11); // y-coordinate is height, x-coordinate is width of wall
  leftWallModel.lineTo(0.1, 0);
  leftWallModel.lineTo(0, 0);
  leftWallModel.closePath();

  // ################### Left Wall Extrude Setting  ###################
  const leftWallExtrudeSettings = {
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
      position-x={xCoordinateShiftLeftWall - 0.1}
    >
      {/* position-x={xCoordinateShift - 0.121} */}
      <extrudeGeometry args={[leftWallModel, leftWallExtrudeSettings]} />

      <meshStandardMaterial
        color={"green"}
        side={THREE.DoubleSide}
        // map={wallTexture}
      />
    </mesh>
  );
};

export default LeftWallModel;
