"use client";
import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

/**
 * A hero component that displays a canvas with a starry background.
 * This component takes no props and should be used as a direct child of a
 * page component.
 *
 * @example
 * import Hero from '@/components/Hero'
 *
 * function HomePage() {
 *   return (
 *     <div>
 *       <Hero />
 *       {/* Other content here */
export default function Hero() {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        left: "0",
        top: "0",
      }}
      camera={{ position: [0, 0, 0.2] }}
    >
      <Stars />
    </Canvas>
  );
}

function Stars(props) {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1 })
  );
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 50;
    ref.current.rotation.y -= delta / 60;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
