import { useEffect, useRef, useState, forwardRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import useStore from "../zoustan";
import { Box3, Vector3, Color, DoubleSide } from "three";

export default function WheelContainer() {
  const users = useStore((state) => state.users);
  const [run, setRun] = useState(false);
  const [random, setRandom] = useState(Math.random() / 10);
  const wheelRef = useRef();
  const arrowRef = useRef();
  const tempObject = {};

  const args = {
    radiusTop: 3,
    radiusBottom: 1,
    height: 1,
    radialSegments: 8,
    heightSegments: 0.5,
    openEnded: false,
    theStart: (5 * Math.PI) / 2,
    thetaLength: Math.PI / 4,
  };

  useFrame(({ camera }) => {});

  return (
    <group onClick={() => setRun(true)} ref={wheelRef}>
      {users.map((el, index) => {
        return (
          <ThreeCircle
            position={[-1.2, 0, 0]}
            triangleCount={users.length}
            start={index + 1}
            color={el.color}
            name={el.name}
            key={el.color}
            run={run}
            setRun={setRun}
            random={random}
            setRandom={setRandom}
          />
        );
      })}
      <mesh
        rotation={[0, Math.PI - 0.35, 0]}
        position={[-3.6, 0.9, 0]}
        scale={0.3}
        ref={arrowRef}
      >
        <cylinderGeometry args={Object.values(args)} />
        <meshBasicMaterial color="red" />
      </mesh>
    </group>
  );
}

const ThreeCircle = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const text = useRef();
  const wheel = useRef();
  const cRef = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [reg, setReg] = useState(true);
  const run = useStore((state) => state.isSpinning);
  const setIsSpinning = useStore((state) => state.setIsSpinning);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  const args = {
    radiusTop: 3,
    radiusBottom: 0,
    height: 1.5,
    radialSegments: 25,
    heightSegments: 1,
    openEnded: false,
    theStart: ((Math.PI * 2) / props.triangleCount) * props.start,
    thetaLength: (Math.PI * 2) / props.triangleCount,
  };

  // Return view, these are regular three.js elements expressed in JSX

  useFrame(({ clock }) => {
    const newArgs = {
      radiusTop: 3,
      radiusBottom: 0,
      height: 1.5,
      radialSegments: 25,
      heightSegments: 1,
      openEnded: false,
      theStart: ((Math.PI * 2) / props.triangleCount) * props.start,
      thetaLength: (Math.PI * 2) / props.triangleCount,
    };
    if (text.current) {
      text.current.rotation.set(
        -Math.PI / 2,
        0,
        newArgs.theStart + newArgs.thetaLength / 2
      );
      text.current.position.set(0, 1, 0);
    }
    if (mesh.current) {
      if (run) {
        if (!mesh.elapsed) mesh.elapsed = 1;
        if (!mesh.factor) mesh.factor = 0.01 + props.random;
        if (mesh.increase == null) mesh.increase = true;
        if (mesh.elapsed) {
          if (mesh.elapsed < 120 && mesh.increase) {
            mesh.elapsed += 1;
            mesh.current.rotation.y += mesh.factor;
            mesh.factor += 0.005;
          } else {
            if (mesh.factor > 0) {
              mesh.current.rotation.y += mesh.factor;
              mesh.factor -= 0.001;
              mesh.increase = false;
            } else {
              setIsSpinning(false);
              mesh.factor = null;
              mesh.elapsed = null;
              mesh.increase = null;
              props.setRandom(Math.random() / 10);
            }
          }
        }
      }
    }
  });

  return (
    <group ref={wheel}>
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
        segments={20}
        thetaLength={Math.PI / 4}
      >
        {/* <axesHelper args={[5]} /> */}
        <cylinderBufferGeometry
          args={Object.values(args)}
          scale={3}
          ref={cRef}
        />
        <group ref={text}>
          <Text
            fontSize={0.2}
            // width={3}
            maxWidth={3}
            minWidth={3}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign={"center"}
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
            anchorX="left"
            anchorY="center"
            strokeWidth={"2.5%"}
            strokeColor="black"
            position={[0, -2.7, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            {props.name}
          </Text>
        </group>
        <meshBasicMaterial
          segments={20}
          color={hovered ? "hotpink" : props.color}
        />
      </mesh>
    </group>
  );
};
