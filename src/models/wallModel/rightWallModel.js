import { Html } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
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

  const { camera } = useThree();

  const buildingReducer = useSelector(
    (state) => state.rootReducer.buildingReducer
  );

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

  useFrame(() => {
    if (!buildingReducer.isAllWallHidden) {
      if (rightWallRef.current) {
        if (
          camera.position.x > 0 &&
          camera.position.z < 0 &&
          camera.position.x > rightWallRef.current.position.x &&
          camera.position.x > buildingReducer.width
        ) {
          rightWallRef.current.material.opacity = 0.2;
          rightWallRef.current.material.transparent = true;
        } else {
          rightWallRef.current.material.transparent = false;
          rightWallRef.current.material.opacity = 1;
        }
      }
    }
  });

  useEffect(() => {
    if (buildingReducer.isAllWallHidden) {
      rightWallRef.current.material.opacity = 0;
      rightWallRef.current.material.transparent = true;
    } else {
      rightWallRef.current.material.transparent = false;
      rightWallRef.current.material.opacity = 1;
    }
  }, [buildingReducer.isAllWallHidden]);

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
