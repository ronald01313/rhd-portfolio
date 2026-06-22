import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { portfolioData } from "../data";

function Word({ children, ...props }: any) {
  const color = new THREE.Color();
  const fontProps = { fontSize: 0.25, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false };
  const ref = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  const over = (e: any) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  
  useFrame(() => {
    if (ref.current) {
      ref.current.color.lerp(color.set(hovered ? "#3b82f6" : "#94a3b8"), 0.1);
    }
  });

  return (
    <Text ref={ref} onPointerOver={over} onPointerOut={out} {...props} {...fontProps} children={children} />
  );
}

function Cloud({ count = 4, radius = 4 }) {
  const words = useMemo(() => {
    const allSkills = portfolioData.skills.map(s => s.name);
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (allSkills.length / count);
    const thetaSpan = (Math.PI * 2) / count;
    
    for (let i = 0; i < allSkills.length; i++) {
      spherical.set(radius, Math.acos(1 - (2 * i) / allSkills.length), Math.sqrt(allSkills.length * Math.PI) * Math.acos(1 - (2 * i) / allSkills.length));
      const pos = new THREE.Vector3().setFromSpherical(spherical);
      temp.push([pos, allSkills[i]]);
    }
    return temp;
  }, [count, radius]);

  const groupRef = useRef<THREE.Group>(null!);
  useFrame((state) => {
    groupRef.current.rotation.y += 0.002;
    groupRef.current.rotation.x += 0.001;
  });

  return (
    <group ref={groupRef}>
      {words.map(([pos, word], index) => (
        <Word key={index} position={pos} children={word} />
      ))}
    </group>
  );
}

export default function TechGlobe() {
  return (
    <div className="h-[400px] w-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
        <fog attach="fog" args={["#000", 0, 20]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Cloud radius={5} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
