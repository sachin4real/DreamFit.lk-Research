import React, { Suspense , useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF ,Environment, Center } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import state from '../../store';
import { Decal, useTexture } from '@react-three/drei';
import Customizer from '../Customizer';
import { RgbaColorPicker } from 'react-colorful';

function LadiesShirtModel({ color }) {
const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/Models/t-shirt_t_pose.glb');
//   console.log(nodes); // Log the nodes 
//   console.log(materials); // Log the materials 

  

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  const stateString = JSON.stringify(snap);

  return (
    <group scale={[0.05, 0.05, 0.05]} rotation={[20.5, -Math.PI, 3]}>
    <mesh
      castShadow
      geometry={nodes.Object_2.geometry}  
      material={materials.T_shirt}
      material-roughness={1}       
      dispose={null}
      material-color={color}
      >
       {snap.isFullTexture && (
        <meshStandardMaterial map={fullTexture} />
      )}
    </mesh>
  </group>
  );
}

export default function LadiesShirtPage() {

  const [color, setColor] = useState({ r: 255, g: 158, b: 246, a: 1 }); // Default color

  return (
    <main className='app transition-all ease-in'>
    <Customizer/>
      {/* color picker */}
      <div className="absolute top-6 right-0 p-4 z-10 mb-2"> 
      <div className='bg-slate-100 p-2 rounded-lg shadow-lg text-gray-700 font-semibold text-center'>Color Picker </div>
        <RgbaColorPicker
          color={color}
          onChange={setColor} // Update the color state
        />
      </div>

    <Canvas 
    shadows
    camera={{ position: [0, 0, 0], fov: 25 }}
    gl={{ preserveDrawingBuffer: true }}
    className="w-full max-w-full h-full transition-all ease-in"
    >
    <directionalLight intensity={1.5} />
     <Environment preset='city' />
      <Suspense fallback={null}>
     
        <Center>
            <LadiesShirtModel   color={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`} />
        </Center>
       
        
        <OrbitControls minDistance={15} maxDistance={5} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} enablePan={false} />
      </Suspense>
    </Canvas>

    </main>
    
  );
}