import { Base, Geometry, Subtraction } from "@react-three/csg";
import { PivotControls, TrackballControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
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
  frontWallModel.lineTo(0.2, 11); // y-coordinate is height, x-coordinate is width of wall
  frontWallModel.lineTo(0.2, 0);
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

  const csg = useRef();
  const windowRef = useRef();

  const Window = (props) => (
    <Subtraction {...props}>
      <Geometry ref={windowRef}>
        <Base geometry={new THREE.BoxGeometry(2.5, 2.5, 2.5)} />
      </Geometry>
    </Subtraction>
  );

  return (
    <mesh
      position-z={0.001}
      position-y={0.102}
      position-x={xCoordinateShiftFrontWall - 0.101}
      rotation={[0, -Math.PI / 2, 0]}
    >
      {/* position-x={xCoordinateShift - 0.121} */}
      {/* <extrudeGeometry args={[frontWallModel, frontWallExtrudeSettings]} /> */}

      <Geometry ref={csg}>
        <Base>
          <extrudeGeometry args={[frontWallModel, frontWallExtrudeSettings]} />
        </Base>
        <PivotControls
          activeAxes={[true, true, false]}
          rotation={[0, Math.PI / 2, 0]}
          scale={10}
          anchor={[0, -2, 2]}
          onDrag={() => csg.current.update()}
          visible={false}
          position={[2, 2, 0]}
          hoveredColor={"green"}
          disableRotations={true}
          disableAxes={true}
          disableScaling={true}
        >
          <Window
            position={[1, 1, -1]}
            scale={1}
            rotation={[0, Math.PI / 2, 0]}
          />
          {/* <TrackballControls object={windowRef} mode="translate" /> */}
        </PivotControls>
      </Geometry>
      <meshStandardMaterial
        color={"blue"}
        side={THREE.DoubleSide}
        // map={wallTexture}
      />
    </mesh>
  );
};

export default FrontWallModel;
