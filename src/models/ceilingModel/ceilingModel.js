import { Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";

const CeilingModel = ({
  wallLength,
  zCoordinateShiftBackWall,
  xCoordinateShiftBackWall,
  //   wallTexture,
  wallColor,
}) => {
  const wallTexture = useLoader(THREE.TextureLoader, "wood.jpg");

  const [ceilExtrude, setCeilExtrude] = useState({});
  const [isCeilingVisible, setIsCeilingVisible] = useState(true);

  const buildingReducer = useSelector(
    (state) => state.rootReducer.buildingReducer
  );

  // ################### Back Wall Model ###################
  const ceilingModel = new THREE.Shape();

  const ceilingRef = useRef();

  ceilingModel.moveTo(0, 0);
  ceilingModel.lineTo(0, buildingReducer.width + 1); // y-coordinate is height, x-coordinate is width of wall
  ceilingModel.lineTo(0.5, buildingReducer.width + 1); // y-coordinate is height, x-coordinate is width of wall
  ceilingModel.lineTo(0.5, 0);
  ceilingModel.lineTo(0, 0);
  ceilingModel.closePath();

  // ################### Back Wall Extrude Setting  ###################

  const calcExtrudeSettingForCeil = () => {
    return {
      depth: -buildingReducer.length - 1, // floor length
      bevelEnabled: false,
      bevelSegments: 0,
      steps: 1,
      bevelSize: 0.1,
      bevelThickness: 1,
    };
  };

  useEffect(() => {
    setCeilExtrude(calcExtrudeSettingForCeil());
    setIsCeilingVisible(buildingReducer.isAllWallHidden);
  }, [buildingReducer.length, buildingReducer.isAllWallHidden]);

  useEffect(() => {
    if (ceilingRef.current) {
      if (buildingReducer.isAllWallHidden) {
        ceilingRef.current.material.opacity = 0;
        ceilingRef.current.material.transparent = true;
      } else {
        ceilingRef.current.material.transparent = false;
        ceilingRef.current.material.opacity = 1;
      }
    }
  }, [buildingReducer.isAllWallHidden]);

  console.log(wallLength, "wallLength");
  return (
    <mesh
      position-z={0.5}
      position-y={11.5}
      position-x={-0.5}
      rotation={[0, 0, -Math.PI / 2]}
      ref={ceilingRef}
    >
      {/* position-x={xCoordinateShift - 0.121} */}
      <extrudeGeometry args={[ceilingModel, ceilExtrude]} />
      <meshStandardMaterial
        color={"orange"}
        side={THREE.DoubleSide}
        // map={wallTexture}
      />
      {/* <Html
        position={[-1, 7, -zCoordinateShiftBackWall / 2]}
        wrapperClass="label"
        center
        distanceFactor={20}
        occlude={[ceilingRef]}
      >
        Ceiling
      </Html> */}
    </mesh>
  );
};

export default CeilingModel;
