import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import infinito25Main from '/Infi25.png';
import slide1 from '/dj.jpg';
import slide2 from '/dj.jpg';
import slide3 from '/dj.jpg';


const ImagePlane = ({ imageUrl, position, rotation, index }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, imageUrl);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.2;
      
      // Gentle Y-axis rotation
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[4, 2.25]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#a855f7" transparent opacity={0.6} />
    </points>
  );
};

const Scene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle auto-rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Circular carousel layout
  const imagePositions = [
    [0, 0, 0],        // Center
    [5, 0, 0],        // Right
    [0, 0, -5],       // Back
    [-5, 0, 0],       // Left
  ];

  const images = [infinito25Main, slide1, slide2, slide3];

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#06b6d4" />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Image carousel */}
      <group ref={groupRef}>
        {images.map((image, index) => (
          <ImagePlane
            key={index}
            imageUrl={image}
            position={imagePositions[index]}
            rotation={[0, (Math.PI / 2) * index, 0]}
            index={index}
          />
        ))}
      </group>
    </>
  );
};

const Infinito25Scene = () => {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
};

export default Infinito25Scene;
