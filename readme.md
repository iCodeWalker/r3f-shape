## Physics

      <group>
        {/* tile gap */}
        <mesh position-z={0} position-y={-0.3} position-x={-1.01}>
          <extrudeGeometry
            args={[floorTileGapModel, floorTileGapExtrudeSettings]}
          />
          <meshStandardMaterial color={"red"} map={tileTexture} />
        </mesh>
        <mesh position-z={0} position-y={-0.3} position-x={0}>
          <extrudeGeometry args={[floorTileModel, floorTileExtrudeSettings]} />
          <meshStandardMaterial map={tileTexture} />
        </mesh>

        {/* tile gap */}
        <mesh position-z={0} position-y={-0.3} position-x={1.01}>
          <extrudeGeometry
            args={[floorTileGapModel, floorTileGapExtrudeSettings]}
          />
          <meshStandardMaterial color={"red"} map={tileTexture} />
        </mesh>
      </group>

      <group>
        {/* tile gap */}
        <mesh position-z={0} position-y={-0.3} position-x={1.015}>
          <extrudeGeometry
            args={[floorTileGapModel, floorTileGapExtrudeSettings]}
          />
          <meshStandardMaterial color={"red"} map={tileTexture} />
        </mesh>
        <mesh position-z={0} position-y={-0.3} position-x={2.025}>
          <extrudeGeometry args={[floorTileModel, floorTileExtrudeSettings]} />
          <meshStandardMaterial map={tileTexture} />
        </mesh>

        {/* tile gap */}
        <mesh position-z={0} position-y={-0.3} position-x={3.035}>
          <extrudeGeometry
            args={[floorTileGapModel, floorTileGapExtrudeSettings]}
          />
          <meshStandardMaterial color={"red"} map={tileTexture} />
        </mesh>
      </group>

// ################################################################

        <group>
          {/*left tile gap */}
          {/* {i == 5 && (
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
          )} */}

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
