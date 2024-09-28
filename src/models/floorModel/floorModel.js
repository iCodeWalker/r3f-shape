import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

// depth of floorExtrudeSettings will be considered for the length of the floor.
// first argument of the floorModel.moveTo will be considered for the width of the floor

const FloorModel = ({
  length = 1,
  width = 1,
  tileLength = 1,
  tileWidth = 1,
}) => {
  const [meshes, setMeshes] = useState([]);
  const tileTexture = useLoader(THREE.TextureLoader, "tile.jpg");
  const woodTexture = useLoader(THREE.TextureLoader, "wood.jpg");

  tileTexture.wrapS = THREE.RepeatWrapping;
  tileTexture.wrapT = THREE.RepeatWrapping;

  woodTexture.wrapS = THREE.RepeatWrapping;
  woodTexture.wrapT = THREE.RepeatWrapping;

  // ############ Floor Model #############
  const flooreModelTop = new THREE.Shape();
  flooreModelTop.moveTo(-(width / 2), 0);
  flooreModelTop.lineTo(-(width / 2), 0.1);
  flooreModelTop.lineTo(width / 2, 0.1);
  flooreModelTop.lineTo(width / 2, 0);
  flooreModelTop.lineTo(-(width / 2), 0);
  flooreModelTop.closePath();

  // ############ Floor Extrude Setting  #############
  const floorExtrudeSettings = {
    depth: length,
    bevelEnabled: false,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  // ############ Floor tile Model #############
  const floorTileModel = new THREE.Shape();
  floorTileModel.moveTo(-tileWidth, 0);
  floorTileModel.lineTo(-tileWidth, 0.1);
  floorTileModel.lineTo(tileWidth, 0.1);
  floorTileModel.lineTo(tileWidth, 0);
  floorTileModel.lineTo(-tileWidth, 0);
  floorTileModel.closePath();

  // ############ Floor Extrude Setting  #############
  const floorTileExtrudeSettings = {
    depth: tileLength * 2,
    bevelEnabled: false,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  const tileMeshes = () => {
    const meshes1 = [];

    let loopVar = width / 2;
    // console.log(loopVar, "datadata");
    for (let i = -(loopVar / 2); i < loopVar / 2; i++) {
      console.log(i, "datadata");

      meshes1.push(
        <mesh position-z={0} position-y={-0.3} position-x={i}>
          <extrudeGeometry args={[floorTileModel, floorTileExtrudeSettings]} />
          <meshStandardMaterial map={tileTexture} />
        </mesh>
      );
    }
    return meshes1;
  };

  useEffect(() => {
    let data = tileMeshes();
    console.log(data, "datadata");
    setMeshes(data);
  }, []);

  console.log(meshes, "meshes");

  return (
    <>
      {/* Floor Mesh*/}
      <mesh position-z={0} position-y={-0.4} position-x={0}>
        <extrudeGeometry args={[flooreModelTop, floorExtrudeSettings]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      {/* Floor Tile Mesh*/}
      {/* <mesh position-z={0} position-y={-0.3} position-x={0}>
        <extrudeGeometry args={[floorTileModel, floorTileExtrudeSettings]} />
        <meshStandardMaterial map={tileTexture} />
      </mesh> */}
      {/* {tileMeshes()} */}
      {meshes}
    </>
  );
};

export default FloorModel;
