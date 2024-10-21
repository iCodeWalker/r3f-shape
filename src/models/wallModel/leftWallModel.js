import { Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const LeftWallModel = ({
  wallLength,
  xCoordinateShiftLeftWall,
  // wallTexture,
  wallColor,
}) => {
  const wallTexture = useLoader(THREE.TextureLoader, "wood.jpg");

  const leftWallRef = useRef();

  // ################### Left Wall Model ###################
  const leftWallModel = new THREE.Shape();

  leftWallModel.moveTo(0, 0);
  leftWallModel.lineTo(0, 11); // y-coordinate is height, x-coordinate is width of wall
  leftWallModel.lineTo(0.5, 11); // y-coordinate is height, x-coordinate is width of wall
  leftWallModel.lineTo(0.5, 0);
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
    // x position of wall is negative shoft of the wall width
    <mesh position-z={0} position-y={0} position-x={-0.511} ref={leftWallRef}>
      {/* position-x={xCoordinateShift - 0.121} */}
      <extrudeGeometry args={[leftWallModel, leftWallExtrudeSettings]} />

      <meshStandardMaterial
        color={"green"}
        side={THREE.DoubleSide}
        // map={wallTexture}
      />
      <Html
        position={[-1, 7, -15]}
        wrapperClass="label"
        center
        distanceFactor={20}
        occlude={[leftWallRef]}
      >
        Left Wall
      </Html>
    </mesh>
  );
};

export default LeftWallModel;
