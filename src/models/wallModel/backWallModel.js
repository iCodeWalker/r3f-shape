import { Html } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";

const BackWallModel = ({
  wallLength,
  zCoordinateShiftBackWall,
  xCoordinateShiftBackWall,
  //   wallTexture,
  wallColor,
}) => {
  const { camera } = useThree();

  const wallTexture = useLoader(THREE.TextureLoader, "wood.jpg");

  const buildingReducer = useSelector(
    (state) => state.rootReducer.buildingReducer
  );

  // ################### Back Wall Model ###################
  const backWallModel = new THREE.Shape();

  const backWallRef = useRef();

  backWallModel.moveTo(0, 0);
  backWallModel.lineTo(0, 11); // y-coordinate is height, x-coordinate is width of wall
  backWallModel.lineTo(0.5, 11); // y-coordinate is height, x-coordinate is width of wall
  backWallModel.lineTo(0.5, 0);
  backWallModel.lineTo(0, 0);
  backWallModel.closePath();

  // ################### Back Wall Extrude Setting  ###################
  const backWallExtrudeSettings = {
    depth: -wallLength - 0.8, // floor length
    bevelEnabled: false,
    bevelSegments: 0,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 1,
  };

  useFrame(() => {
    if (!buildingReducer.isAllWallHidden) {
      if (backWallRef.current) {
        if (
          camera.position.x > 0 &&
          camera.position.z < 0 &&
          camera.position.z < backWallRef.current.position.z &&
          camera.position.z < buildingReducer.length
        ) {
          backWallRef.current.material.opacity = 0.2;
          backWallRef.current.material.transparent = true;
        } else {
          backWallRef.current.material.transparent = false;
          backWallRef.current.material.opacity = 1;
        }
      }
    }
  });

  useEffect(() => {
    if (buildingReducer.isAllWallHidden) {
      backWallRef.current.material.opacity = 0;
      backWallRef.current.material.transparent = true;
    } else {
      backWallRef.current.material.transparent = false;
      backWallRef.current.material.opacity = 1;
    }
  }, [buildingReducer.isAllWallHidden]);

  return (
    <mesh
      position-z={-zCoordinateShiftBackWall - 0.4}
      position-y={0}
      position-x={-0.51}
      rotation={[0, -Math.PI / 2, 0]}
      ref={backWallRef}
    >
      {/* position-x={xCoordinateShift - 0.121} */}
      <extrudeGeometry args={[backWallModel, backWallExtrudeSettings]} />
      <meshStandardMaterial
        color={"red"}
        side={THREE.DoubleSide}
        // map={wallTexture}
      />
      <Html
        position={[-1, 7, -zCoordinateShiftBackWall / 2]}
        wrapperClass="label"
        center
        distanceFactor={20}
        occlude={[backWallRef]}
      >
        Back Wall
      </Html>
    </mesh>
  );
};

export default BackWallModel;
