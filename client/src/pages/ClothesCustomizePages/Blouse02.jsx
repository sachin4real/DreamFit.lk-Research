import React, { useState, Suspense } from 'react';
import { RgbaColorPicker } from 'react-colorful'; // Import the new color picker
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import state from '../../store';
import Customizer from '../Customizer';

function Blouse02Model({ color }) {
  
  const snap = useSnapshot(state);

  const { nodes, materials } = useGLTF('/Models/belly_button.glb');

  return (
    <group scale={[0.1, 0.1, 0.1]}>
      <mesh
        castShadow
        geometry={nodes.BellyButtonLongSleeveShirt_M_Croptop_0.geometry}
        material={materials.M_Croptop}
        dispose={null}
        material-color={color} // Apply dynamic color to the material
      >
        <meshStandardMaterial color={'lightblue'} />
      </mesh>
    </group>
  );
}

export default function Blouse02Page() {
  const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 1 }); // Default color

  return (
    <main className='app transition-all ease-in'>
      <Customizer />

      {/* color picker */}
      <div className="absolutetop-6 right-0 p-4 z-10 mb-2"> 
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
        <directionalLight intensity={2.5} />
        <Environment preset='city' />
        <Suspense fallback={null}>
         
            <Center>
              <Blouse02Model color={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`} /> 
            </Center>
         
          <OrbitControls 
            minDistance={300} 
            maxDistance={10} 
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={Math.PI / 2} 
            enablePan={false} 
          />
        </Suspense>
      </Canvas>
    </main>
  );
}
