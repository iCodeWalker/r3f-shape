import { Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";

const AngleBackSupportModel = ({
  length, // In feet
  width, // In feet
  height, // In feet
  texture,
  wallLength,
  xposition,
  zposition,
  zCoordinateShiftBackWall,
  xCoordinateShiftBackWall,
  //   wallTexture,
  wallColor,
}) => {
  const bedTexture = useLoader(THREE.TextureLoader, texture);

  // ################### Repeating Tile Texture ###################
  bedTexture.wrapS = THREE.RepeatWrapping;
  bedTexture.wrapT = THREE.RepeatWrapping;
  bedTexture.repeat.set(0.1, 0.5);

  const [bedExtrude, setCeilExtrude] = useState({});
  const [isCeilingVisible, setIsCeilingVisible] = useState(true);

  const buildingReducer = useSelector(
    (state) => state.rootReducer.buildingReducer
  );

  // ################### Back Wall Model ###################
  const bedModel = new THREE.Shape();

  const bedRef = useRef();

  bedModel.moveTo(0, 0);
  bedModel.lineTo(0, width); // y-coordinate is width of bed, x-coordinate is "How much the bed has wood"
  bedModel.lineTo(0.528, 0); // y-coordinate is width of bed, x-coordinate is "How much the bed has wood"
  bedModel.lineTo(0, 0);
  bedModel.closePath();

  const bedLegRef = useRef();

  // ################### Back Wall Extrude Setting  ###################

  const calcExtrudeSettingForCeil = () => {
    return {
      depth: 4.3, // length of bed in feet
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
    if (bedRef.current) {
      if (buildingReducer.isAllWallHidden) {
        bedRef.current.material.opacity = 1;
        bedRef.current.material.transparent = false;
      } else {
        bedRef.current.material.transparent = false;
        bedRef.current.material.opacity = 1;
      }
    }
  }, [buildingReducer.isAllWallHidden]);

  console.log(wallLength, "wallLength");
  return (
    <mesh
      position-z={-18.35}
      position-y={3.1} // Height in feet
      position-x={xposition}
      rotation={[0, -Math.PI / 2, 0]}
      ref={bedRef}
    >
      {/* position-x={xCoordinateShift - 0.121} */}
      <extrudeGeometry args={[bedModel, bedExtrude]} />
      <meshStandardMaterial
        // color={"orange"}
        side={THREE.DoubleSide}
        map={bedTexture}
      />
      {/* <Html
        position={[-1, 7, -zCoordinateShiftBackWall / 2]}
        wrapperClass="label"
        center
        distanceFactor={20}
        occlude={[bedRef]}
      >
        Ceiling
      </Html> */}
    </mesh>
  );
};

export default AngleBackSupportModel;
