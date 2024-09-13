import React, { Suspense, useState} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF ,Environment, Center } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import state from '../../store';
import { Decal, useTexture } from '@react-three/drei';
import Customizer from '../Customizer';
import { RgbaColorPicker } from 'react-colorful'; 


function PantsModel({ color }) {
const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/Models/grey_cargo_pant.glb');
//   console.log(nodes); // Log the nodes 
//   console.log(materials); // Log the materials 

  

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  const stateString = JSON.stringify(snap);

  return (
    <>
   
    <mesh
      castShadow
      geometry={nodes.cargo_pant_Pant_cotton_poplin_cargo_pant_0.geometry}
      material={materials.Pant_cotton_poplin_cargo_pant}
      dispose={null}
      material-color={color} // Apply dynamic color to the material
    >
      

      {snap.isFullTexture && (
        <meshStandardMaterial map={fullTexture} />
      )}
    </mesh>
    
    
    <mesh
      castShadow
      geometry={nodes.cargo_pant_boutons_0.geometry}
      material={materials.boutons}
      dispose={null}
    >
      <meshStandardMaterial color={'white'} /> 
    </mesh>
    
    {/* Stitches (Primary) with custom color */}
    <mesh
      castShadow
      geometry={nodes.cargo_pant_stitches_cargo_pant_0.geometry}
      material={materials.stitches_cargo_pant}
      dispose={null}
    >
    
    </mesh>
    
    {/* Stitches (Secondary) with custom color */}
    <mesh
      castShadow
      geometry={nodes.cargo_pant_stitches_cargo_pant_02_0.geometry}
      material={materials.stitches_cargo_pant_02}
      dispose={null}
    >
      <meshStandardMaterial color={'white'} /> 
    </mesh>
  </>
  );
}

export default function PantsPage() {
  const [color, setColor] = useState({ r:200, g:20, b:20 , a: 1 }); // Default color

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
     <ambientLight intensity={1} />
     <directionalLight intensity={2} />
     <Environment preset='city' />
      <Suspense fallback={null}>
   
        <Center>
            <PantsModel color={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`} />
        </Center>
      
        
        <OrbitControls minDistance={3} maxDistance={5} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} enablePan={false} />
      </Suspense>
    </Canvas>

    </main>
    
  );
}