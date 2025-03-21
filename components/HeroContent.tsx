'use client'

import React, { useRef, useState, useEffect, Suspense, ErrorInfo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Grid, Text, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

// Error Boundary component for handling errors in 3D rendering
class ErrorBoundary extends React.Component<
  { children: React.ReactNode, fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode, fallback: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service
    console.error('3D Rendering Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback
    }

    return this.props.children
  }
}

// Custom floating box component
const FloatingBox = ({ position, color, size = 1 }: { position: [number, number, number], color: string, size?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    // Add subtle animation
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
    meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.1
  })
  
  return (
    <mesh ref={meshRef} position={position} castShadow>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
    </mesh>
  )
}

// Custom floating sphere component
const FloatingSphere = ({ position, color, size = 0.8 }: { position: [number, number, number], color: string, size?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    // Add subtle animation
    meshRef.current.position.y = position[1] + Math.cos(state.clock.getElapsedTime() * 0.8) * 0.2
  })
  
  return (
    <mesh ref={meshRef} position={position} castShadow>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.5} />
    </mesh>
  )
}

// Main scene component
const Scene = () => {
  const gridRef = useRef<THREE.Group>(null)
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 10, 7]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      
      {/* Main floating title */}
      <Float
        speed={2} // Animation speed
        rotationIntensity={0.2} // XYZ rotation intensity
        floatIntensity={0.5} // Up/down float intensity
        position={[0, 2.5, 0]} // Position
      >
        <Text
          fontSize={1.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          WELCOME
        </Text>
      </Float>
      
      {/* Grid */}
      <group ref={gridRef}>
        <Grid
          cellSize={1}
          cellThickness={0.5}
          cellColor="#6f6f6f"
          sectionSize={3}
          sectionThickness={1}
          sectionColor="#9d4b4b"
          fadeDistance={30}
          infiniteGrid
          position={[0, -0.01, 0]}
        />
      </group>
      
      {/* 3D Objects */}
      <FloatingBox position={[-3, 1, -2]} color="#ff4060" />
      <FloatingBox position={[3, 0.7, 2]} color="#0070f3" size={0.8} />
      <FloatingSphere position={[2, 1, -3]} color="#50e3c2" />
      <FloatingSphere position={[-2.5, 0.5, 3]} color="#f5a623" />
      <FloatingSphere position={[0, 0.5, -4]} color="#7928ca" />
    </>
  )
}

// Fallback component in case of errors
const FallbackComponent = () => (
  <div className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] bg-red-900 flex items-center justify-center flex-col gap-4">
    <h2 className="text-white text-2xl">Error Rendering 3D Scene</h2>
    <p className="text-white">There was a problem with the 3D rendering. Please check your browser compatibility.</p>
  </div>
)

// Export the HeroContent component
export function HeroContent() {
  return (
    <ErrorBoundary fallback={<FallbackComponent />}>
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
        <Canvas shadows camera={{ position: [8, 5, 8], fov: 50 }}>
          <Suspense fallback={null}>
            <Scene />
            <OrbitControls
              makeDefault
              target={[0, 0, 0]}
              maxPolarAngle={Math.PI / 2 - 0.1}
              minDistance={5}
              maxDistance={20}
              enableZoom={true}
              enablePan={false}
              // Set initial rotation to 15 degrees angle
              minPolarAngle={Math.PI / 12} // 15 degrees
              rotateSpeed={0.5}
            />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
        
        {/* Optional overlay information */}
        <div className="absolute bottom-4 left-4 text-white bg-black/30 p-3 rounded-lg backdrop-blur-sm">
          <h2 className="text-xl font-bold">Interactive 3D Grid</h2>
          <p className="text-sm">Drag to rotate • Scroll to zoom</p>
        </div>
      </div>
    </ErrorBoundary>
  )
} 