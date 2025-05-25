import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import FloorModel from "./models/floorModel/floorModel";
import FourByTwo from "./models/floorModel/fourbytwo";
import { useDispatch, useSelector } from "react-redux";
import LeftWallModel from "./models/wallModel/leftWallModel";
import RightWallModel from "./models/wallModel/rightWallModel";
import BackWallModel from "./models/wallModel/backWallModel";
import FrontWallModel from "./models/wallModel/frontWallModel";
import { AxesHelper } from "three";
import CeilingModel from "./models/ceilingModel/ceilingModel";
import BedModel from "./models/bedModel/bedModel";
import LegModel from "./models/legModel/legModel";
import BedCoverModel from "./models/bedCoverModel/bedCoverModel";
import SideCoverModel from "./models/bedCoverModel/sideCoverModel";
import BackCoverModel from "./models/bedCoverModel/backCoverModel";
import FrontCoverModel from "./models/bedCoverModel/frontCoverModel";
import CurvatureBedModel from "./models/curvatureBedModel/curvatureBedModel";
import BackSupportModel from "./models/backSupport/backSupport";
import AngleBackSupportModel from "./models/angleBackSupport/angleBackSupport";

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

  const buildingReducer = useSelector(
    (state) => state.rootReducer.buildingReducer
  );

  console.log(buildingReducer, "Experience");

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
      <OrbitControls
        makeDefault
        minDistance={10}
        maxDistance={60}
        target={[15, 0, -15]}
      />
      <directionalLight castShadow position={[6, 4, 1]} intensity={2.5} />
      <directionalLight castShadow position={[-6, 4, 1]} intensity={2.5} />
      <directionalLight castShadow position={[6, 4, 10]} intensity={2.5} />
      <directionalLight castShadow position={[-6, 4, -10]} intensity={2.5} />

      <ambientLight intensity={0.5} />
      {/* <axesHelper args={[20]} /> */}
      {/* <mesh castShadow position={[-2, 2, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh castShadow position={[2, 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh> */}
      {/*  Left */}
      {/* <FloorModel length={14} width={14} /> */}
      <FloorModel
        length={buildingReducer.length}
        width={buildingReducer.width}
        tileLength={buildingReducer.tileLength}
        tileWidth={buildingReducer.tileWidth}
        gapColor={buildingReducer.tileGapColor}
        texture={buildingReducer.selectedTileTexture}
      />

      <FrontWallModel
        wallLength={buildingReducer.width}
        zCoordinateShiftBackWall={buildingReducer.length}
        xCoordinateShiftFrontWall={buildingReducer.tileWidth}
        // texture={buildingReducer.selectedTexture}
        wallColor={buildingReducer.tileGapColor}
      />

      <LeftWallModel
        wallLength={buildingReducer.length}
        xCoordinateShiftLeftWall={buildingReducer.tileWidth}
        // texture={buildingReducer.selectedTexture}
        wallColor={buildingReducer.tileGapColor}
      />
      <RightWallModel
        wallLength={buildingReducer.length}
        xCoordinateShiftRightWall={buildingReducer.width - 0.009}
        // texture={buildingReducer.selectedTexture}
        wallColor={buildingReducer.tileGapColor}
      />
      <BackWallModel
        wallLength={buildingReducer.width + 0.202}
        zCoordinateShiftBackWall={buildingReducer.length + 0.101}
        xCoordinateShiftBackWall={buildingReducer.tileWidth}
        // texture={buildingReducer.selectedTexture}
        wallColor={buildingReducer.tileGapColor}
      />
      <CeilingModel
        wallLength={buildingReducer.width + 0.202}
        zCoordinateShiftBackWall={buildingReducer.length + 0.101}
        xCoordinateShiftBackWall={buildingReducer.tileWidth}
        // texture={buildingReducer.selectedTexture}
        wallColor={buildingReducer.tileGapColor}
      />
      <BedModel
        width={4}
        length={7}
        height={3}
        texture={buildingReducer.selectedTableTExture}
        wallLength={5}
        xposition={13.5}
        zposition={-11.5}
        // zCoordinateShiftBackWall={-5 + 0.101}
        // xCoordinateShiftBackWall={buildingReducer.tileWidth}
      />
      <BedCoverModel
        width={3}
        length={7}
        height={3}
        texture={buildingReducer.selectedTableTExture}
        wallLength={5}
        // zCoordinateShiftBackWall={-5 + 0.101}
        // xCoordinateShiftBackWall={buildingReducer.tileWidth}
      />

      <BedCoverModel
        width={3}
        length={7}
        height={3}
        texture={buildingReducer.selectedTableTExture}
        wallLength={5}
        // zCoordinateShiftBackWall={-5 + 0.101}
        // xCoordinateShiftBackWall={buildingReducer.tileWidth}
      />
      <SideCoverModel
        width={3}
        length={7}
        height={3}
        texture={buildingReducer.selectedTableTExture}
        wallLength={5}
        // zCoordinateShiftBackWall={-5 + 0.101}
        // xCoordinateShiftBackWall={buildingReducer.tileWidth}
      />

      <BackCoverModel
        width={3}
        length={3}
        height={3}
        texture={buildingReducer.selectedTableTExture}
        wallLength={5}
        // zCoordinateShiftBackWall={-5 + 0.101}
        // xCoordinateShiftBackWall={buildingReducer.tileWidth}
      />

      <FrontCoverModel
        width={3}
        length={3}
        height={3}
        texture={buildingReducer.selectedTableTExture}
        wallLength={5}
        // zCoordinateShiftBackWall={-5 + 0.101}
        // xCoordinateShiftBackWall={buildingReducer.tileWidth}
      />

      <BedModel
        width={4}
        length={7}
        height={2}
        texture={buildingReducer.selectedTableTExture}
        wallLength={5}
        xposition={4}
        zposition={-4}
        // zCoordinateShiftBackWall={-5 + 0.101}
        // xCoordinateShiftBackWall={buildingReducer.tileWidth}
      />
      <LegModel
        xPosition={4}
        zPosition={-4}
        color={"orange"}
        texture={buildingReducer.selectedTileTexture}
      />
      <LegModel
        xPosition={8 - 0.2}
        zPosition={-4}
        color={"orange"}
        texture={buildingReducer.selectedTileTexture}
      />
      <LegModel
        xPosition={4}
        zPosition={-11 + 0.2}
        color={"orange"}
        texture={buildingReducer.selectedTileTexture}
      />
      <LegModel
        xPosition={8 - 0.2}
        zPosition={-11 + 0.2}
        color={"orange"}
        texture={buildingReducer.selectedTileTexture}
      />

      <CurvatureBedModel
        width={3}
        length={7}
        height={2}
        texture={buildingReducer.selectedTableTExture}
        wallLength={5}
        xposition={4}
        zposition={-15}
      />

      <BackSupportModel
        width={3}
        length={7}
        height={2}
        texture={buildingReducer.selectedTableTExture}
        wallLength={5}
        xposition={13.35}
        zposition={-15}
      />

      <AngleBackSupportModel
        width={3}
        length={7}
        height={2}
        texture={buildingReducer.selectedTableTExture}
        wallLength={5}
        xposition={17.65}
        zposition={-15}
      />
    </>
  );
}
