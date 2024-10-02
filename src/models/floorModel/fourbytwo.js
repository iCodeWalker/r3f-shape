import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

// depth of floorExtrudeSettings will be considered for the length of the floor.
// first argument of the floorModel.moveTo will be considered for the width of the floor

const FourByTwo = ({
  length = 1,
  width = 1,
  tileLength = 2,
  tileWidth = 4,
}) => {
  const [meshes, setMeshes] = useState([]);
  const [meshesLength, setMeshesLength] = useState([]);

  const tileTexture = useLoader(THREE.TextureLoader, "tile.jpg");
  const woodTexture = useLoader(THREE.TextureLoader, "wood.jpg");

  const tileGapColor = new THREE.Color(0xf1f3c2);
  // 0xf1f3c2

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
    depth: -length * 2,
    bevelEnabled: false,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  // ############ Floor tile Model #############
  // Subtracted gap value from tile size = tileWidth - 0.01
  //   const floorTileModel = new THREE.Shape();
  //   floorTileModel.moveTo(-(tileWidth / 2 - 0.005), 0);
  //   floorTileModel.lineTo(-(tileWidth / 2 - 0.005), 0.1);
  //   floorTileModel.lineTo(tileWidth / 2 - 0.005, 0.1);
  //   floorTileModel.lineTo(tileWidth / 2 - 0.005, 0);
  //   floorTileModel.lineTo(-(tileWidth / 2 - 0.005), 0);
  //   floorTileModel.closePath();

  const floorTileModel = new THREE.Shape();
  floorTileModel.moveTo(-0 - 0.01, 0); // Start point
  floorTileModel.lineTo(-0 - 0.01, 0.1); // Top left
  floorTileModel.lineTo(tileWidth - 0.01, 0.1); // Top right
  floorTileModel.lineTo(tileWidth - 0.01, 0); // Bottom right
  floorTileModel.lineTo(0 - 0.01, 0); // Back to the start point
  floorTileModel.closePath(); // Close the path

  // Last tile model
  const floorLastTileModel = (x) => {
    console.log(x, "floorLastTileModel");
    const floorLastTileModel = new THREE.Shape();
    floorLastTileModel.moveTo(0 - 0.01, 0); // Start point
    floorLastTileModel.lineTo(0 - 0.01, 0.1); // Top left
    floorLastTileModel.lineTo(2 - 0.01, 0.1); // Top right
    floorLastTileModel.lineTo(2 - 0.01, 0); // Bottom right
    floorLastTileModel.lineTo(0 - 0.01, 0); // Back to the start point
    floorLastTileModel.closePath(); // Close the path

    return floorLastTileModel;
  };

  // ############ Floor Extrude Setting  #############
  const floorTileExtrudeSettings = {
    depth: -tileLength,
    bevelEnabled: false,
    bevelSegments: 0,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 1,
  };

  // ############ Floor tile gap Model #############
  const floorTileGapModel = new THREE.Shape();
  floorTileGapModel.moveTo(-0.01, 0);
  floorTileGapModel.lineTo(-0.01, 0.101);
  floorTileGapModel.lineTo(0.01, 0.101);
  floorTileGapModel.lineTo(0.01, 0);
  floorTileGapModel.lineTo(-0.01, 0);
  floorTileGapModel.closePath();

  // ############ Floor tile gap Model #############
  const floorTileTopGapModel = new THREE.Shape();
  floorTileTopGapModel.moveTo(-0.01, 0);
  floorTileTopGapModel.lineTo(-0.01, 0.1);
  floorTileTopGapModel.lineTo(0.01, 0.1);
  floorTileTopGapModel.lineTo(0.01, 0);
  floorTileTopGapModel.lineTo(-0.01, 0);
  floorTileTopGapModel.closePath();

  // ############ Floor Extrude gap Setting  #############
  const floorTileGapExtrudeSettings = {
    depth: -length,
    bevelEnabled: false,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  // ############## Top exturde setting ###############
  const floorTileTopGapExtrudeSettings = {
    depth: -width,
    bevelEnabled: false,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  const backGapTile = (zPosition) => {
    return (
      <mesh
        position-z={-zPosition}
        position-y={0.102}
        position-x={tileWidth}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <extrudeGeometry
          args={[floorTileGapModel, floorTileTopGapExtrudeSettings]}
        />
        <meshStandardMaterial
          color={"blue"}
          map={tileTexture}
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  };

  let backMesh = [];
  for (let i = 0; i < length; i++) {
    if (i % 1 == 0 && tileLength == 1) {
      backMesh.push(backGapTile(i));
    }
    if (i % 2 == 0 && (tileLength == 2 || tileLength == 4)) {
      backMesh.push(backGapTile(i));
    }
  }

  const tileMeshes = (zPosition, len) => {
    const meshes1 = [];
    console.log(width, "datadata");

    let a = width / 2;
    // console.log(loopVar, "datadata");
    let coordinates = [0, 4, 8, 12, 16];
    for (let i = 0; i <= width; i++) {
      if (i % tileWidth !== 0) {
        continue;
      }

      //   coordinates.push(i);
      // }

      // for (let i = 0; i < width - tileWidth; i++) {

      let lastCordinate = coordinates[coordinates.length - 1];
      console.log(coordinates, lastCordinate, "floorTileModel");

      meshes1.push(
        <group>
          {/* left tile gap */}
          {/* {i == 0 && (
            <mesh
              position-z={-0.001}
              position-y={0.101}
              position-x={-tileWidth}
            >
              <extrudeGeometry
                args={[floorTileGapModel, floorTileGapExtrudeSettings]}
              />
              <meshStandardMaterial color={"green"} map={tileTexture} />
            </mesh>
          )} */}
          {/*front tile gap */}
          {/* {i != a && (
            <mesh
              position-z={0}
              position-y={0.1005}
              position-x={i}
              rotation={[0, -Math.PI / 2, 0]}
            >
              <extrudeGeometry
                args={[floorTileGapModel, floorTileTopGapExtrudeSettings]}
              />
              <meshStandardMaterial color={tileGapColor} map={tileTexture} />
            </mesh>
          )} */}

          {/* Main tile */}
          {console.log(i, "roightTile")}
          {/* <mesh position-z={-zPosition} position-y={0.101} position-x={i}>
            <extrudeGeometry
              args={[floorTileModel, floorTileExtrudeSettings]}
            />
            <meshStandardMaterial
              //   color={"green"}
              map={tileTexture}
              side={THREE.DoubleSide}
            />
          </mesh> */}
          {i == lastCordinate ? (
            <mesh
              position-z={-zPosition}
              position-y={1}
              position-x={i + tileWidth}
            >
              {console.log("floorLastTileModel", i, lastCordinate, width)}
              <extrudeGeometry
                args={[
                  floorLastTileModel(width - lastCordinate),
                  floorTileExtrudeSettings,
                ]}
              />
              <meshStandardMaterial
                color={"green"}
                map={tileTexture}
                side={THREE.DoubleSide}
              />
            </mesh>
          ) : (
            <mesh
              position-z={-zPosition}
              position-y={0.101}
              position-x={i + tileWidth}
            >
              {console.log("roightTile------", i)}

              <extrudeGeometry
                args={[floorTileModel, floorTileExtrudeSettings]}
              />
              <meshStandardMaterial
                //   color={"green"}
                map={tileTexture}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}

          {/* right tile gap */}
          <mesh
            position-z={-0.001}
            position-y={0.102}
            position-x={i + tileWidth}
          >
            {console.log(i, "roightTile")}
            <extrudeGeometry
              args={[floorTileGapModel, floorTileGapExtrudeSettings]}
            />
            <meshStandardMaterial
              color={"red"}
              map={tileTexture}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/*back tile gap */}
          {/* <mesh
            position-z={-zPosition - 0.02}
            position-y={0.102}
            position-x={i - tileWidth}
            // rotation={[0, -Math.PI / 2, 0]}
          >
            <extrudeGeometry
              args={[floorTileGapModel, floorTileTopGapExtrudeSettings]}
            />
            <meshStandardMaterial
              color={"red"}
              map={tileTexture}
              side={THREE.DoubleSide}
            />
          </mesh> */}
        </group>
      );
    }

    // Sides frame
    // const rightframe = (
    //   <mesh position-z={-0.001} position-y={0.3} position-x={width / 2}>
    //     <extrudeGeometry
    //       args={[floorTileGapModel, floorTileGapExtrudeSettings]}
    //     />
    //     <meshStandardMaterial
    //       color={tileGapColor}
    //       map={tileTexture}
    //       side={THREE.DoubleSide}
    //     />
    //   </mesh>
    // );
    // meshes1.push(rightframe);

    // const leftframe = (
    //   <mesh
    //     position-z={-0.001}
    //     position-y={0.3}
    //     position-x={-width / 2 - 0.01 * (width / 4)}
    //   >
    //     <extrudeGeometry
    //       args={[floorTileGapModel, floorTileGapExtrudeSettings]}
    //     />
    //     <meshStandardMaterial
    //       color={tileGapColor}
    //       map={tileTexture}
    //       side={THREE.DoubleSide}
    //     />
    //   </mesh>
    // );
    // meshes1.push(leftframe);

    return meshes1;
  };

  // ######################### Length #########################

  const tileMeshesLength = () => {
    const meshes1 = [];

    let loopVar = length;
    let a = loopVar;
    // console.log(loopVar, "datadata");
    for (let i = 0; i < a; i++) {
      console.log(i, "datadata");
      if (i % tileLength !== 0) {
        continue;
      }
      console.log(i, a, "datadata");

      meshes1.push(tileMeshes(i, a));
    }
    return meshes1;
  };

  useEffect(() => {
    let data = tileMeshes();
    console.log(data, "datadata");

    let data2 = tileMeshesLength();
    setMeshes([...data, backGapTile]);
    setMeshesLength([...data2, backMesh]);
  }, [length, width]);

  console.log(meshes, "meshes");

  const k = (
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

      {/* Main tile */}

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
  );

  return (
    <>
      <ambientLight intensity={0.5} />

      <directionalLight castShadow position={[0, 11, 0]} intensity={0.8} />
      {/* Floor Mesh*/}
      {/* <mesh position-z={0} position-y={0} position-x={0}>
        <extrudeGeometry args={[flooreModelTop, floorExtrudeSettings]} />
        <meshStandardMaterial map={woodTexture} side={THREE.DoubleSide} />
      </mesh> */}
      {/* Floor Tile Mesh*/}
      {/* <mesh position-z={0} position-y={-0.3} position-x={0}>
        <extrudeGeometry args={[floorTileModel, floorTileExtrudeSettings]} />
        <meshStandardMaterial map={tileTexture} />
      </mesh> */}
      {/* {tileMeshes()} */}
      {/* {meshes} */}
      {meshesLength}
    </>
  );
};

export default FourByTwo;
