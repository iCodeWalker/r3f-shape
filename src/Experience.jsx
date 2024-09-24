import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

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

const woodColor = new THREE.Color(0xeeeeff);
const darkWoodColor = new THREE.Color(0xffdbb5);

export default function Experience() {
  const woodTexture = useLoader(TextureLoader, "wood.jpg");
  const darkWoodTexture = useLoader(TextureLoader, "darkwood.jpg");

  darkWoodTexture.wrapS = THREE.RepeatWrapping;
  darkWoodTexture.wrapT = THREE.RepeatWrapping;

  woodTexture.wrapS = THREE.RepeatWrapping;
  woodTexture.wrapT = THREE.RepeatWrapping;

  console.log(woodTexture, "woodTexture");

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
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
      <mesh position-z={-0.15} position-x={-0.1}>
        <extrudeGeometry args={[frameModelLeft, frameExtrudeSettings]} />
        <meshStandardMaterial color={darkWoodColor} map={woodTexture} />
      </mesh>

      {/*  Right */}
      <mesh position-z={-0.15} position-x={2.2}>
        <extrudeGeometry args={[frameModelLeft, frameExtrudeSettings]} />
        <meshStandardMaterial color={darkWoodColor} map={woodTexture} />
      </mesh>

      {/*  Top */}
      <mesh position-z={-0.15} position-y={0.1} position-x={-0.1}>
        <extrudeGeometry args={[frameModelTop, frameExtrudeSettings]} />
        <meshStandardMaterial color={darkWoodColor} map={woodTexture} />
      </mesh>
      {/* Bottom */}
      <mesh position-z={-0.15} position-y={-4.2} position-x={-0.1}>
        <extrudeGeometry args={[frameModelTop, frameExtrudeSettings]} />
        <meshStandardMaterial color={darkWoodColor} map={woodTexture} />
      </mesh>
      <mesh>
        <extrudeGeometry args={[doorModel, extrudeSettings]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      <mesh position-z={-0.05} position-x={0.3}>
        <extrudeGeometry args={[designModel1, extrudeSettings2]} />
        <meshBasicMaterial color={woodColor} map={woodTexture} />
      </mesh>

      <mesh position-z={-0.05} position-x={1.3}>
        <extrudeGeometry args={[designModel1, extrudeSettings2]} />
        <meshBasicMaterial color={woodColor} map={woodTexture} />
      </mesh>

      <mesh position-z={-0.05} position-x={0.3} position-y={2}>
        <extrudeGeometry args={[designModel1, extrudeSettings2]} />
        <meshBasicMaterial color={woodColor} map={woodTexture} />
      </mesh>

      <mesh position-z={-0.05} position-x={1.3} position-y={2}>
        <extrudeGeometry args={[designModel1, extrudeSettings2]} />
        <meshBasicMaterial color={woodColor} map={woodTexture} />
      </mesh>

      {/* <mesh position-z={-0.05} position-x={0.4} position-y={3}>
        <extrudeGeometry args={[designModel2, extrudeSettings2]} />
        <meshStandardMaterial color={"red"} />
      </mesh> */}

      <mesh receiveShadow position-y={-1.25}>
        <boxGeometry args={[10, 0.5, 10]} />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
