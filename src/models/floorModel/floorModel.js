import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

// depth of floorExtrudeSettings will be considered for the length of the floor.
// first argument of the floorModel.moveTo will be considered for the width of the floor

const FloorModel = ({
  length,
  width,
  tileLength,
  tileWidth,
  gapColor,
  texture,
}) => {
  const [tilesData, setTilesData] = useState([]);

  const tileTexture = useLoader(THREE.TextureLoader, texture);
  const tileGapColor = new THREE.Color(gapColor);

  // ################### Repeating Tile Texture ###################
  tileTexture.wrapS = THREE.RepeatWrapping;
  tileTexture.wrapT = THREE.RepeatWrapping;

  // ################### Floor Tile Model ###################
  // Subtracted tile gap value from tile size = tileWidth - 0.01
  const floorTileModel = new THREE.Shape();
  floorTileModel.moveTo(0 - 0.01, 0); // Start point
  floorTileModel.lineTo(0 - 0.01, 0.25); // Top left
  floorTileModel.lineTo(tileWidth - 0.01, 0.25); // Top right
  floorTileModel.lineTo(tileWidth - 0.01, 0); // Bottom right
  floorTileModel.lineTo(0 - 0.01, 0); // Back to the start point
  floorTileModel.closePath(); // Close the path

  // ################### Floor Tile Model : last tile model function ###################
  const floorLastTileModel = (x) => {
    console.log(x, "floorLastTileModel");
    const floorLastTileModel = new THREE.Shape();
    floorLastTileModel.moveTo(0 - 0.01, 0); // Start point
    floorLastTileModel.lineTo(0 - 0.01, 0.25); // Top left
    floorLastTileModel.lineTo(x - 0.01, 0.25); // Top right
    floorLastTileModel.lineTo(x - 0.01, 0); // Bottom right
    floorLastTileModel.lineTo(0 - 0.01, 0); // Back to the start point
    floorLastTileModel.closePath(); // Close the path

    return floorLastTileModel;
  };

  // ################### Floor Tile Model : last tile extrude setting function if length is not multiple of 2 ###################

  const floorVerticalLastTileExtrudeSetting = (zDistance) => {
    const extrudeSetting = {
      depth: -zDistance,
      bevelEnabled: false,
      bevelSegments: 0,
      steps: 1,
      bevelSize: 0.1,
      bevelThickness: 1,
    };

    return extrudeSetting;
  };

  // ################### Floor Tile Extrude Setting  ###################
  const floorTileExtrudeSettings = {
    depth: -tileLength,
    bevelEnabled: false,
    bevelSegments: 0,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 1,
  };

  // ################### Floor Tile-Gap Model ###################
  const floorTileGapModel = new THREE.Shape();
  floorTileGapModel.moveTo(-0.01, 0);
  floorTileGapModel.lineTo(-0.01, 0.251);
  floorTileGapModel.lineTo(0.01, 0.251);
  floorTileGapModel.lineTo(0.01, 0);
  floorTileGapModel.lineTo(-0.01, 0);
  floorTileGapModel.closePath();
  // ################### Floor Tile-Gap Extrude Setting  ###################
  const floorTileGapExtrudeSettings = {
    depth: -length,
    bevelEnabled: false,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  // ################### Horizontal Tile-Gap exturde setting ###################
  const horizontalTileGapExtrudeSettings = {
    depth: -width,
    bevelEnabled: false,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  // ################### Function to create horizontal tile gap ###################
  const horizontalTileGap = (zPosition) => {
    return (
      <mesh
        position-z={-zPosition}
        position-y={0.102}
        position-x={tileWidth}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <extrudeGeometry
          args={[floorTileGapModel, horizontalTileGapExtrudeSettings]}
        />
        <meshStandardMaterial
          color={tileGapColor}
          map={tileTexture}
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  };

  // ################### Function to create horizontal tile gap ###################

  let horizontalTileGapData = [];
  for (let i = 0; i < length; i++) {
    // if (i % 1 == 0 && tileLength == 1) {
    //   horizontalTileGapData.push(horizontalTileGap(i));
    // }
    if (i % tileLength == 0 && i != 0) {
      horizontalTileGapData.push(horizontalTileGap(i));
    }
  }

  console.log(horizontalTileGapData, "datadata----after");

  let floorTileStartingCoordinates = [];
  for (let i = 0; i <= width; i++) {
    if (i % tileWidth !== 0) {
      continue;
    }
    console.log(i, "floorTileStartingCoordinates");
    floorTileStartingCoordinates.push(i);
  }

  // ################### Function to create horizontal/along width tile meshes ###################
  const horizontalTileMesh = (zPosition, verticalLastIndex) => {
    const horizontalMeshData = [];

    for (let i = 0; i <= width; i++) {
      if (i % tileWidth !== 0) {
        continue;
      }
      console.log(i, "horizontalTileMesh");

      let lastCordinate =
        floorTileStartingCoordinates[floorTileStartingCoordinates.length - 1];

      console.log(lastCordinate, "horizontalTileMesh");

      horizontalMeshData.push(
        <group>
          {/* Main tile Mesh */}

          {i == lastCordinate ? (
            // #################### For last veritcal tile ####################
            verticalLastIndex === true ? (
              <mesh
                position-z={-zPosition}
                position-y={0.101}
                position-x={i + tileWidth}
              >
                <extrudeGeometry
                  args={[
                    floorLastTileModel(width - lastCordinate),
                    floorVerticalLastTileExtrudeSetting(length - zPosition),
                  ]}
                />
                <meshStandardMaterial
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
                <extrudeGeometry
                  args={[
                    floorLastTileModel(width - lastCordinate),
                    floorTileExtrudeSettings,
                  ]}
                />
                <meshStandardMaterial
                  map={tileTexture}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )
          ) : verticalLastIndex === true ? (
            // ############## If length is not multiple of 2 ################
            <mesh
              position-z={-zPosition}
              position-y={0.101}
              position-x={i + tileWidth}
            >
              <extrudeGeometry
                args={[
                  floorTileModel,
                  floorVerticalLastTileExtrudeSetting(length - zPosition),
                ]}
              />
              <meshStandardMaterial
                // color={tileGapColor}
                map={tileTexture}
                side={THREE.DoubleSide}
              />
            </mesh>
          ) : (
            // ################ if length multiple of 2 ###################
            <mesh
              position-z={-zPosition}
              position-y={0.101}
              position-x={i + tileWidth}
            >
              <extrudeGeometry
                args={[floorTileModel, floorTileExtrudeSettings]}
              />
              <meshStandardMaterial
                // color={"red"}
                map={tileTexture}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}

          {/* #################### right tile gap ################ */}
          {i != 0 && (
            <mesh
              position-z={-0.001}
              position-y={0.102}
              position-x={i + tileWidth - 0.01}
            >
              {console.log(i, lastCordinate, width, "lastCordinate")}
              <extrudeGeometry
                args={[floorTileGapModel, floorTileGapExtrudeSettings]}
              />
              <meshStandardMaterial
                color={"red"}
                map={tileTexture}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </group>
      );
    }
    return horizontalMeshData;
  };

  // ################### Function to create vertical/along length tile meshes ###################
  const verticalTileMesh = () => {
    const verticalMeshData = [];

    for (let i = 0; i < length; i++) {
      if (i % tileLength !== 0 && i != 0) {
        continue;
      }

      // ############## For last vertical tile if length is odd number #############

      if (
        i === length - 1 || // For tile length 1, 2, 4, 8
        i === length - 2 || // For tile length 3, 5
        i === length - 3 || // For tile length 7
        i === length - 5 || // For tile length 6
        i === length - 7 || // For tile length 10
        i === length - 8 // For tile length 9
      ) {
        verticalMeshData.push(horizontalTileMesh(i, true));
      } else {
        verticalMeshData.push(horizontalTileMesh(i, false));
      }
    }
    return verticalMeshData;
  };

  useEffect(() => {
    let tilesData = verticalTileMesh();
    setTilesData([...tilesData, ...horizontalTileGapData]);
  }, [length, width, tileLength, tileWidth, gapColor, texture]);

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight castShadow position={[0, 10, 0]} intensity={2} />
      {tilesData}
    </>
  );
};

export default FloorModel;
