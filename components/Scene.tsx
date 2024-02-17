'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import TShirt from './canvas/Shirt_baked'
import { Suspense, useEffect, useRef, useState } from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import type { ThreeElements } from '@react-three/fiber';
import { state } from '@/app/_state'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';


function Backdrop() {
  const shadows = useRef<any>()

  const snap = useSnapshot(state)
  useFrame((state, delta) => easing.dampC(shadows.current?.getMesh().material.color, snap.color, 0.25, delta))
  return (
    <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={10} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
      <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}


type CameraRigProps = ThreeElements['group']
const CameraRig = ({ children }: CameraRigProps) => {
  const group = useRef<THREE.Group>(null!);
  const snap = useSnapshot(state);
  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1100;
    const isMobile = window.innerWidth <= 700;

    // set the initial position of the model
    let targetPosition = [-0.4, 0, 2];

    if (snap.isIntroed) {
      if (isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2];
    } else {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    }

    easing.damp3(state.camera.position, new Vector3(...targetPosition), 0.25, delta);

    // set the model rotation smoothly
    easing.dampE(
      group.current?.rotation,
      [-state.pointer.y / 5, state.pointer.x / 2, 0],
      0.25,
      delta
    )
  })


  return (
    <group ref={group}>
      {children}
    </group>
  )
}

export default function Scene() {
  return (
    <div className="absolute inset-0 h-full w-full -z-10">
      <Canvas
        className="h-full w-full"
        shadows
        camera={{ position: [0, 0, 0], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <CameraRig>
          <TShirt />
          <Backdrop />
        </CameraRig>
        <ambientLight intensity={1} />
      </Canvas>
    </div >
  )
}
