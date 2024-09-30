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
  const [meshesLength, setMeshesLength] = useState([]);

  const tileTexture = useLoader(THREE.TextureLoader, "tile.jpg");
  const woodTexture = useLoader(THREE.TextureLoader, "wood.jpg");

  const tileGapColor = new THREE.Color(0xf1f3c2);

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
    depth: -length,
    bevelEnabled: false,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  // ############ Floor tile Model #############
  // Subtracted gap value from tile size = tileWidth - 0.01
  const floorTileModel = new THREE.Shape();
  floorTileModel.moveTo(-(tileWidth - 0.01), 0);
  floorTileModel.lineTo(-(tileWidth - 0.01), 0.1);
  floorTileModel.lineTo(tileWidth - 0.01, 0.1);
  floorTileModel.lineTo(tileWidth - 0.01, 0);
  floorTileModel.lineTo(-(tileWidth - 0.01), 0);
  floorTileModel.closePath();

  // ############ Floor Extrude Setting  #############
  const floorTileExtrudeSettings = {
    depth: -tileLength * 2,
    bevelEnabled: false,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  // ############ Floor tile gap Model #############
  const floorTileGapModel = new THREE.Shape();
  floorTileGapModel.moveTo(-0.01, 0);
  floorTileGapModel.lineTo(-0.01, 0.1);
  floorTileGapModel.lineTo(0.01, 0.1);
  floorTileGapModel.lineTo(0.01, 0);
  floorTileGapModel.lineTo(-0.01, 0);
  floorTileGapModel.closePath();

  // ############ Floor Extrude gap Setting  #############
  const floorTileGapExtrudeSettings = {
    depth: tileLength * 2,
    bevelEnabled: false,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  // ############## Top exturde setting ###############
  const floorTileTopGapExtrudeSettings = {
    depth: tileLength * 2 + 0.02,
    bevelEnabled: false,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  const tileMeshes = (zPosition) => {
    const meshes1 = [];

    let loopVar = width;
    let a = loopVar / 2;
    // console.log(loopVar, "datadata");
    for (let i = -a; i < a; i++) {
      console.log(i, "datadata");
      if (i % 2 === 0) {
        continue;
      }
      console.log(i, a, "datadata");

      meshes1.push(
        <group>
          {/*left tile gap */}
          {i == 5 && (
            <mesh
              position-z={zPosition}
              position-y={-0.3}
              position-x={-i - 1.0001}
            >
              {console.log(i, "datadata---i")}

              <extrudeGeometry
                args={[floorTileGapModel, floorTileGapExtrudeSettings]}
              />
              <meshStandardMaterial color={"purple"} map={tileTexture} />
            </mesh>
          )}

          {/*top tile gap */}
          {i == 5 && (
            <mesh
              position-z={zPosition - 1.01}
              position-y={-0.3}
              position-x={-i - 1.0001}
              rotation={[0, Math.PI / 2, 0]}
            >
              {console.log(i, "datadata---i")}

              <extrudeGeometry
                args={[floorTileGapModel, floorTileGapExtrudeSettings]}
              />
              <meshStandardMaterial color={"red"} map={tileTexture} />
            </mesh>
          )}

          <mesh position-z={zPosition} position-y={-0.3} position-x={i}>
            <extrudeGeometry
              args={[floorTileModel, floorTileExtrudeSettings]}
            />
            <meshStandardMaterial map={tileTexture} />
          </mesh>

          {/* right tile gap */}
          {
            <mesh
              position-z={zPosition}
              position-y={-0.3}
              position-x={i + 1.0001}
            >
              <extrudeGeometry
                args={[floorTileGapModel, floorTileGapExtrudeSettings]}
              />
              <meshStandardMaterial color={"purple"} map={tileTexture} />
            </mesh>
          }
          {/* {i == -5 && (
            <mesh position-z={0} position-y={-0.3} position-x={i + 1.0001}>
              <extrudeGeometry
                args={[floorTileGapModel, floorTileGapExtrudeSettings]}
              />
              <meshStandardMaterial color={"red"} map={tileTexture} />
            </mesh>
          )} */}
        </group>
      );
    }
    return meshes1;
  };

  // ######################### Length #########################

  const tileMeshesLength = () => {
    const meshes1 = [];

    let loopVar = length;
    let a = loopVar;
    // console.log(loopVar, "datadata");
    for (let i = 0; i < a - 1; i++) {
      console.log(i, "datadata");
      //   if (i % 2 === 0) {
      //     continue;
      //   }
      console.log(i, a, "datadata");

      meshes1.push(tileMeshes(i));
    }
    return meshes1;
  };

  useEffect(() => {
    let data = tileMeshes();
    console.log(data, "datadata");

    let data2 = tileMeshesLength();
    setMeshes(data);
    setMeshesLength(data2);
  }, []);

  console.log(meshes, "meshes");

  return (
    <>
      <directionalLight castShadow position={[0, 11, 0]} intensity={0.8} />
      {/* Floor Mesh*/}
      <mesh position-z={0} position-y={0} position-x={0}>
        <extrudeGeometry args={[flooreModelTop, floorExtrudeSettings]} />
        <meshStandardMaterial map={woodTexture} side={THREE.DoubleSide} />
      </mesh>
      {/* Floor Tile Mesh*/}
      {/* <mesh position-z={0} position-y={-0.3} position-x={0}>
        <extrudeGeometry args={[floorTileModel, floorTileExtrudeSettings]} />
        <meshStandardMaterial map={tileTexture} />
      </mesh> */}
      {/* {tileMeshes()} */}
      {/* {meshes} */}
      {/* {meshesLength} */}
      <group>
        {/* left tile gap */}
        <mesh position-z={-2.0211} position-y={0.101} position-x={-1.0001}>
          <extrudeGeometry
            args={[floorTileGapModel, floorTileGapExtrudeSettings]}
          />
          <meshStandardMaterial color={tileGapColor} map={tileTexture} />
        </mesh>
        {/*top tile gap */}
        <mesh
          position-z={-0.011}
          position-y={0.101}
          position-x={-1.01}
          rotation={[0, Math.PI / 2, 0]}
        >
          {/* {console.log(i, "datadata---i")} */}

          <extrudeGeometry
            args={[floorTileGapModel, floorTileTopGapExtrudeSettings]}
          />
          <meshStandardMaterial color={tileGapColor} map={tileTexture} />
        </mesh>

        <mesh position-z={-0.021} position-y={0.101} position-x={0}>
          <extrudeGeometry args={[floorTileModel, floorTileExtrudeSettings]} />
          <meshStandardMaterial map={tileTexture} side={THREE.DoubleSide} />
        </mesh>

        {/* right tile gap */}
        <mesh position-z={-2.021} position-y={0.101} position-x={1.0001}>
          <extrudeGeometry
            args={[floorTileGapModel, floorTileGapExtrudeSettings]}
          />
          <meshStandardMaterial color={tileGapColor} map={tileTexture} />
        </mesh>

        {/*bottom tile gap */}

        <mesh
          position-z={-2.031}
          position-y={0.101}
          position-x={-1.01}
          rotation={[0, Math.PI / 2, 0]}
        >
          {/* {console.log(i, "datadata---i")} */}

          <extrudeGeometry
            args={[floorTileGapModel, floorTileTopGapExtrudeSettings]}
          />
          <meshStandardMaterial color={tileGapColor} map={tileTexture} />
        </mesh>
      </group>
    </>
  );
};

export default FloorModel;
