import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Base, Geometry, Subtraction } from "@react-three/csg";
import {
  PivotControls,
  TrackballControls,
  TransformControls,
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { useSelector } from "react-redux";

const FrontWallModel = ({
  wallLength,
  xCoordinateShiftFrontWall,
  //   wallTexture,
  wallColor,
}) => {
  const wallTexture = useLoader(THREE.TextureLoader, "wood.jpg");

  const frontWallRef = useRef();

  const buildingReducer = useSelector(
    (state) => state.rootReducer.buildingReducer
  );

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
    depth: -wallLength - 1, // floor length
    bevelEnabled: false,
    bevelSegments: 0,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 1,
  };

  const csg = useRef();
  const windowRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (!buildingReducer.isAllWallHidden) {
      if (frontWallRef.current) {
        if (camera.position.x > 0 && camera.position.z > 0) {
          frontWallRef.current.material.opacity = 0.2;
          frontWallRef.current.material.transparent = true;
        } else {
          frontWallRef.current.material.transparent = false;
          frontWallRef.current.material.opacity = 1;
        }
      }
    }
  });

  useEffect(() => {
    if (buildingReducer.isAllWallHidden) {
      frontWallRef.current.material.opacity = 0;
      frontWallRef.current.material.transparent = true;
    } else {
      frontWallRef.current.material.transparent = false;
      frontWallRef.current.material.opacity = 1;
    }
  }, [buildingReducer.isAllWallHidden]);

  const Window = (props) => (
    <Subtraction {...props}>
      <Geometry>
        <Base ref={windowRef} geometry={new THREE.BoxGeometry(2.5, 2.5, 3)} />
      </Geometry>
    </Subtraction>
  );

  return (
    // <mesh
    //   position-z={0.101}
    //   position-y={11 / 2 + 0.102}
    //   position-x={15 + 2}
    //   rotation={[0, 0, 0]}
    // >
    //   {/* position-x={xCoordinateShift - 0.121} */}
    //   {/* <extrudeGeometry args={[frontWallModel, frontWallExtrudeSettings]} /> */}

    //   <Geometry ref={csg}>
    //     <Base>
    //       {/* <extrudeGeometry args={[frontWallModel, frontWallExtrudeSettings]} /> */}
    //       <boxGeometry args={[30, 11, 0.2]} />
    //     </Base>
    //     {/* <PivotControls
    //       activeAxes={[true, true, false]}
    //       // rotation={[0, 0, 0]}
    //       scale={10}
    //       // anchor={[0, -2, 2]}
    //       onDrag={() => csg.current.update()}
    //       // visible={false}
    //       position={[0, 0, 0]}
    //       hoveredColor={"green"}
    //       disableRotations={true}
    //       disableAxes={true}
    //       disableScaling={true}
    //     > */}
    //     <Window position={[-3, 0, 0]} scale={1} rotation={[0, 0, 0]} />
    //     <TransformControls object={windowRef.current} mode="translate" />
    //     {/* </PivotControls> */}
    //   </Geometry>
    //   <meshStandardMaterial
    //     color={"blue"}
    //     // side={THREE.DoubleSide}
    //     // map={wallTexture}
    //   />
    // </mesh>

    <mesh
      position-z={0}
      position-y={0}
      position-x={-0.51}
      rotation={[0, -Math.PI / 2, 0]}
      ref={frontWallRef}
    >
      {/* position-x={xCoordinateShift - 0.121} */}
      <extrudeGeometry args={[frontWallModel, frontWallExtrudeSettings]} />
      <meshStandardMaterial
        color={"red"}
        side={THREE.DoubleSide}
        // transparent={true}
        // opacity={0.15}
        // map={wallTexture}
      />
      <Html
        position={[1, 7, -10]}
        wrapperClass="label"
        center
        distanceFactor={20}
        occlude={[frontWallRef]}
      >
        Front Wall
      </Html>
    </mesh>
  );
};

export default FrontWallModel;
