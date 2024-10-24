import { Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const CeilingModel = ({
  wallLength,
  zCoordinateShiftBackWall,
  xCoordinateShiftBackWall,
  //   wallTexture,
  wallColor,
}) => {
  const wallTexture = useLoader(THREE.TextureLoader, "wood.jpg");

  // ################### Back Wall Model ###################
  const ceilingModel = new THREE.Shape();

  const ceilingRef = useRef();

  ceilingModel.moveTo(0, 0);
  ceilingModel.lineTo(0, 31); // y-coordinate is height, x-coordinate is width of wall
  ceilingModel.lineTo(0.5, 31); // y-coordinate is height, x-coordinate is width of wall
  ceilingModel.lineTo(0.5, 0);
  ceilingModel.lineTo(0, 0);
  ceilingModel.closePath();

  // ################### Back Wall Extrude Setting  ###################
  const ceilingExtrudeSettings = {
    depth: -wallLength - 0.8, // floor length
    bevelEnabled: false,
    bevelSegments: 0,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 1,
  };
  return (
    <mesh
      position-z={0.5}
      position-y={11.5}
      position-x={-0.5}
      rotation={[0, 0, -Math.PI / 2]}
      ref={ceilingRef}
    >
      {/* position-x={xCoordinateShift - 0.121} */}
      <extrudeGeometry args={[ceilingModel, ceilingExtrudeSettings]} />
      <meshStandardMaterial
        color={"orange"}
        side={THREE.DoubleSide}
        // map={wallTexture}
      />
      <Html
        position={[-1, 7, -zCoordinateShiftBackWall / 2]}
        wrapperClass="label"
        center
        distanceFactor={20}
        occlude={[ceilingRef]}
      >
        Back Wall
      </Html>
    </mesh>
  );
};

export default CeilingModel;
