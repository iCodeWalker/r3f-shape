import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import FloorModel from "./models/floorModel/floorModel";
import FourByTwo from "./models/floorModel/fourbytwo";
import { useDispatch, useSelector } from "react-redux";

const doorModel = new THREE.Shape();

doorModel.moveTo(0, 0);
doorModel.lineTo(0, 4);
doorModel.lineTo(2, 4);
doorModel.lineTo(2, 0);
doorModel.lineTo(0, 0);

doorModel.closePath();

const designModel1 = new THREE.Shape();

designModel1.moveTo(0, 0.5);
designModel1.lineTo(0.5, 0.5);
designModel1.lineTo(0.5, 1.6);
designModel1.lineTo(0, 1.6);

designModel1.closePath();

const frameModelLeft = new THREE.Shape();

frameModelLeft.moveTo(0, -0.2);
frameModelLeft.lineTo(0, 4.2);
frameModelLeft.lineTo(-0.1, 4.2);
frameModelLeft.lineTo(-0.1, -0.2);
frameModelLeft.lineTo(0, -0.2);
frameModelLeft.closePath();

// ############# Frame Model Top ###############
const frameModelTop = new THREE.Shape();

frameModelTop.moveTo(0, 4);
frameModelTop.lineTo(0, 4.1);
frameModelTop.lineTo(2.2, 4.1);
frameModelTop.lineTo(2.2, 4);
frameModelTop.lineTo(0, 4);
frameModelTop.closePath();

// ############ Floor Model #############
const flooreModelTop = new THREE.Shape();

flooreModelTop.moveTo(-10, 4);
flooreModelTop.lineTo(-10, 4.1);
flooreModelTop.lineTo(10, 4.1);
flooreModelTop.lineTo(10, 4);
flooreModelTop.lineTo(-10, 4);
flooreModelTop.closePath();

// ############ Left Wall Model #############
const wallModelLeft = new THREE.Shape();

wallModelLeft.moveTo(0, -0.2);
wallModelLeft.lineTo(0, 11.2);
wallModelLeft.lineTo(-0.1, 11.2);
wallModelLeft.lineTo(-0.1, -0.2);
wallModelLeft.lineTo(0, -0.2);
wallModelLeft.closePath();

// ############ Right Wall Model #############
const wallModelRight = new THREE.Shape();

wallModelRight.moveTo(0, -0.2);
wallModelRight.lineTo(0, 11.2);
wallModelRight.lineTo(-0.1, 11.2);
wallModelRight.lineTo(-0.1, -0.2);
wallModelRight.lineTo(0, -0.2);
wallModelRight.closePath();

// ############ Back Wall Model #############
const wallModelBack = new THREE.Shape();

wallModelBack.moveTo(0, 0);
wallModelBack.lineTo(0, 11.4);
wallModelBack.lineTo(19.9, 11.4);
wallModelBack.lineTo(19.9, 0);
wallModelBack.lineTo(0, 0);
wallModelBack.closePath();

// ############ front Wall Model #############
const wallModelfront = new THREE.Shape();

wallModelfront.moveTo(0, 0);
wallModelfront.lineTo(0, 11.4);
wallModelfront.lineTo(20, 11.4);
wallModelfront.lineTo(20, 0);
wallModelfront.lineTo(0, 0);
wallModelfront.closePath();

// ############ Ceil Wall Model #############
const wallModelCeil = new THREE.Shape();

wallModelCeil.moveTo(-10, 4);
wallModelCeil.lineTo(-10, 4.1);
wallModelCeil.lineTo(10, 4.1);
wallModelCeil.lineTo(10, 4);
wallModelCeil.lineTo(-10, 4);
wallModelCeil.closePath();

// const designModel2 = new THREE.Shape();

// designModel2.moveTo(0, 1);
// designModel2.lineTo(1, 1);
// designModel2.lineTo(1, 2);
// designModel2.lineTo(0, 2);
// designModel2.closePath();

// heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
// heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
// heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
// heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
// heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
// heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

const extrudeSettings = {
  depth: 0.03,
  bevelEnabled: true,
  bevelSegments: 3,
  steps: 2,
  bevelSize: 0.1,
  bevelThickness: 0.1,
};

const extrudeSettings2 = {
  depth: 0.11,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 1,
  bevelSize: 0.1,
  bevelThickness: 0.1,
};

const frameExtrudeSettings = {
  depth: 0.4,
  bevelEnabled: false,
  bevelSegments: 1,
  steps: 1,
  bevelSize: 0.1,
  bevelThickness: 0.1,
};

const floorExtrudeSettings = {
  depth: 20.1,
  bevelEnabled: false,
  bevelSegments: 1,
  steps: 1,
  bevelSize: 0.1,
  bevelThickness: 0.1,
};

const backWallExtudeSettings = {
  depth: 0.1,
  bevelEnabled: false,
  bevelSegments: 1,
  steps: 1,
  bevelSize: 0.1,
  bevelThickness: 0.1,
};

const woodColor = new THREE.Color(0xeeeeff);
const darkWoodColor = new THREE.Color(0xffdbb5);

export default function Experience() {
  const dispatch = useDispatch();

  const buildingData = useSelector(
    (state) => state.rootReducer.buildingReducer
  );

  console.log(buildingData, "Experience");

  const woodTexture = useLoader(TextureLoader, "wood.jpg");
  const darkWoodTexture = useLoader(TextureLoader, "darkwood.jpg");

  darkWoodTexture.wrapS = THREE.RepeatWrapping;
  darkWoodTexture.wrapT = THREE.RepeatWrapping;

  woodTexture.wrapS = THREE.RepeatWrapping;
  woodTexture.wrapT = THREE.RepeatWrapping;

  console.log(woodTexture, "woodTexture");

  return (
    <>
      {/* <Perf position="top-left" /> */}
      <OrbitControls makeDefault target={[7, 0, -3]} />
      <directionalLight castShadow position={[6, 4, 1]} intensity={3} />
      <ambientLight intensity={0.5} />
      {/* <mesh castShadow position={[-2, 2, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh> */}
      {/* <mesh castShadow position={[2, 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh> */}
      {/*  Left */}
      {/* <FloorModel length={14} width={14} /> */}
      <FloorModel
        length={buildingData.length}
        width={buildingData.width}
        tileLength={buildingData.tileLength}
        tileWidth={buildingData.tileWidth}
        gapColor={buildingData.tileGapColor}
        texture={"tile.jpg"}
      />
    </>
  );
}
