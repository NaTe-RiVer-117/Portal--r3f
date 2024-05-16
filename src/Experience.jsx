import React, { useRef } from 'react';
import { shaderMaterial, useGLTF,useTexture,  OrbitControls, Center, Sparkles } from '@react-three/drei';
import portalVertexShader from './shaders/portal/vertex.glsl';
import portalFragmentShader from './shaders/portal/fragment.glsl';
import * as THREE from 'three';
import { extend, useFrame } from '@react-three/fiber';
const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#5500f5'),
        uColorEnd: new THREE.Color('#00005f')
    },
    portalVertexShader,
    portalFragmentShader
)
extend({ PortalMaterial })
export default function Experience() {

  

    const { nodes } = useGLTF('./model/portal.glb');
    const bakedTexture = useTexture('./model/baked.jpg');
    const portalMaterial = useRef()
    useFrame((state, delta) =>
        {
            portalMaterial.current.uTime += delta
        })
    // Reference for the point light
    const lightRef = useRef();

    return (
        <>
            <color args={['#000000']} attach="background" />

            <OrbitControls makeDefault />

            <Center>
                <mesh geometry={nodes.baked.geometry}>
                    <meshBasicMaterial map={bakedTexture} map-flipY={false} />
                </mesh>
               
     
                <mesh
                    geometry={nodes.poleLightA.geometry}
                    position={nodes.poleLightA.position}
                    rotation={nodes.poleLightA.rotation}
                    scale={nodes.poleLightA.scale}
                >
                    <meshBasicMaterial color="#f0f025" />
                </mesh>
                <mesh
                    geometry={nodes.poleLightB.geometry}
                    position={nodes.poleLightB.position}
                    rotation={nodes.poleLightB.rotation}
                    scale={nodes.poleLightB.scale}
                >
                    <meshBasicMaterial color="#f0f025" />
                </mesh>

                <mesh
                    geometry={nodes.portalLight.geometry}
                    position={nodes.portalLight.position}
                    rotation={nodes.portalLight.rotation}
                >
                   <portalMaterial ref={ portalMaterial }/>
                </mesh>
            </Center>

            {/* Add a point light */}
            {/* <pointLight color="blue" intensity={1} distance={10} position={[-5, 5, 5]} ref={lightRef} /> */}

            <Sparkles
                scale={[4, 2, 4]}
                size={4}
                position-y={1}
                count={50}
            />
        </>
    );
}
