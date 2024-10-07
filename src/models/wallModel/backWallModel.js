import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

const BackWallModel = ({
  wallLength,
  zCoordinateShiftBackWall,
  xCoordinateShiftBackWall,
  //   wallTexture,
  wallColor,
}) => {
  const wallTexture = useLoader(THREE.TextureLoader, "wood.jpg");

  // ################### Back Wall Model ###################
  const backWallModel = new THREE.Shape();

  backWallModel.moveTo(0, 0);
  backWallModel.lineTo(0, 11); // y-coordinate is height, x-coordinate is width of wall
  backWallModel.lineTo(0.1, 11); // y-coordinate is height, x-coordinate is width of wall
  backWallModel.lineTo(0.1, 0);
  backWallModel.lineTo(0, 0);
  backWallModel.closePath();

  // ################### Back Wall Extrude Setting  ###################
  const backWallExtrudeSettings = {
    depth: -wallLength, // floor length
    bevelEnabled: false,
    bevelSegments: 0,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 1,
  };
  return (
    <mesh
      position-z={-zCoordinateShiftBackWall}
      position-y={0.102}
      position-x={xCoordinateShiftBackWall}
      rotation={[0, -Math.PI / 2, 0]}
    >
      {/* position-x={xCoordinateShift - 0.121} */}
      <extrudeGeometry args={[backWallModel, backWallExtrudeSettings]} />
      <meshStandardMaterial
        color={"red"}
        side={THREE.DoubleSide}
        // map={wallTexture}
      />
    </mesh>
  );
};

export default BackWallModel;
