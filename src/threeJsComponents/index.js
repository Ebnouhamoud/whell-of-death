import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Reflector, OrbitControls, useTexture } from "@react-three/drei";
import WheelContainer from "./wheelContainer.js";
import { MathUtils, Vector3, BackSide } from "three";
import { LayerMaterial, Depth, Noise } from "lamina";
import useStore from "../zoustan.js";
import Noodle from "./wheelSlice";

export default function ThreeJs() {
  const isFocused = useStore((state) => state.isFocused);
  console.log("irun");

  return (
    <div className="canvas-container" style={{ zIndex: 1 }}>
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: false }}
        camera={{
          position: isFocused ? [-3.9, 0, 2] : [2, 0, 6],
        }}
      >
        <mesh scale={100}>
          <boxGeometry args={[1, 1, 1]} />
          <LayerMaterial side={BackSide}>
            <Depth
              colorB="#191528"
              colorA="#3c162f"
              alpha={1}
              mode="normal"
              near={130}
              far={200}
              origin={[100, 100, -100]}
            />
            <Noise
              mapping="local"
              type="white"
              scale={1000}
              colorA="#282f44"
              colorB="#110e1b"
              mode="subtract"
              alpha={0.2}
            />
          </LayerMaterial>
        </mesh>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Noodle />
        </Suspense>
        <ControlledOrbit store={isFocused ? [-2.5, 0, -5.5] : [2, 0, 0]} />
        <group rotation={[Math.PI / 2, 0, 0]}>
          <WheelContainer />
        </group>
      </Canvas>
    </div>
  );
}

const ControlledOrbit = ({ store }) => {
  const isZoom = useStore((state) => state.isZoom);
  const orbitRef = useRef();
  useFrame((state, delta) => {
    orbitRef.current.target.x = MathUtils.damp(
      orbitRef.current.target.x,
      store[0],
      6,
      delta
    );
    orbitRef.current.target.y = MathUtils.damp(
      orbitRef.current.target.y,
      store[1],
      6,
      delta
    );
    orbitRef.current.target.z = MathUtils.damp(
      orbitRef.current.target.z,
      store[2],
      6,
      delta
    );

    // state.camera.lookAt(new Vector3(store[0], store[1], store[2]));
    state.camera.position.lerp(
      new Vector3(store[0] - 1, store[1], store[2] + 7),
      0.08
    );
    // state.camera.updateProjectionMatrix();
  });

  return (
    <OrbitControls
      ref={orbitRef}
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      min
    />
  );
};

function Ground(props) {
  const [floor, normal] = useTexture(["/var1.jpg", "/normal.jpg"]);
  return (
    <Reflector resolution={1024} args={[8, 8]} {...props}>
      {(Material, props) => (
        <Material
          color="#f0f0f0"
          metalness={0}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={[2, 2]}
          {...props}
        />
      )}
    </Reflector>
  );
}
