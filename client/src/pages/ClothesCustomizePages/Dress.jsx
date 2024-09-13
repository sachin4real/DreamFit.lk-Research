import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import state from '../../store';
import { useTexture } from '@react-three/drei';
import Customizer from '../Customizer';
import { RgbaColorPicker } from 'react-colorful';

function DressModel({ color }) {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/Models/dress.glb');

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  return (
    <group scale={[0.05, 0.05, 0.05]}>
      <mesh castShadow geometry={nodes.B_Skrt_Dress_mtl_0.geometry} dispose={null}  material-color={color}>
        <meshStandardMaterial color={'darkgreen'} />
      </mesh>
      <mesh castShadow geometry={nodes.B_Top_Dress_mtl_0.geometry} dispose={null}>
        <meshStandardMaterial color={'white'} />
      </mesh>
      <mesh castShadow geometry={nodes.Belt_Dress_mtl_0.geometry} dispose={null}>
        <meshStandardMaterial color={'black'} />
      </mesh>
      <mesh castShadow geometry={nodes.F_F_Skrt_Dress_mtl_0.geometry} dispose={null}  material-color={color}>
        <meshStandardMaterial color={'darkgreen'} />
      </mesh>
      <mesh castShadow geometry={nodes.F_Skrt_Dress_mtl_0.geometry} dispose={null}  material-color={color}>
        <meshStandardMaterial color={'green'} />
      </mesh>
      <mesh castShadow geometry={nodes.L_F_Top_Dress_mtl_0.geometry} dispose={null}>
        <meshStandardMaterial color={'white'} />
      </mesh>
      <mesh castShadow geometry={nodes.L_Sleeve_Dress_mtl_0.geometry} dispose={null}>
        <meshStandardMaterial color={'white'} />
      </mesh>
      <mesh castShadow geometry={nodes.R_F_Top_Dress_mtl_0.geometry} dispose={null}>
        <meshStandardMaterial color={'white'} />
      </mesh>
      <mesh castShadow geometry={nodes.R_Sleeve_Dress_mtl_0.geometry} dispose={null}>
        <meshStandardMaterial color={'white'} />
      </mesh>
    </group>
  );
}

export default function DressPage() {
  const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 1 }); // Default color

  return (
    <main className='app transition-all ease-in'>
      <Customizer />
       {/* color picker */}
       <div className="absolute top-6 right-0 p-4 z-10  mb-2"> 
        <div className='bg-slate-100 p-2 rounded-lg shadow-lg text-gray-700 font-semibold text-center'>Color Picker </div>
        <RgbaColorPicker
          color={color}
          onChange={setColor} // Update the color state
        />
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 25 }} // Adjusted camera position for better initial view
        gl={{ preserveDrawingBuffer: true }}
        className="w-full max-w-full h-full transition-all ease-in"
      >
        {/* <ambientLight intensity={1.5}/> */}
        <directionalLight intensity={3} />
        <Environment preset='city' />
        <Suspense fallback={null}>
     
            <Center>
              <DressModel color={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}/>
            </Center>
         
          <OrbitControls minDistance={22} maxDistance={5} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} enablePan={false} />
        </Suspense>
      </Canvas>
    </main>
  );
}
