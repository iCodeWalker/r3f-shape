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
