import React, { Suspense,useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import state from '../../store';
import Customizer from '../Customizer';
import { RgbaColorPicker } from 'react-colorful'; 

function Dress03Model({ color }) {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/Models/dress04.glb');

  // console.log(nodes);
  // console.log(materials);

  

  const stateString = JSON.stringify(snap);

  return (
<group rotation={[0, 0, 0]} scale={[0.1, 0.1, 0.1]}>
  <mesh
    castShadow
    geometry={nodes.dress_Rib_1X1_486gsm_FRONT_2246101_0.geometry}
    material={materials.Rib_1X1_486gsm_FRONT_2246101}  
    dispose={null}
    material-color={color} // Apply dynamic color to the material
  >
     
  </mesh>

 
  
</group>
  );
}

export default function Dress03Page() {

  const [color, setColor] = useState({ r: 255, g: 0, b: 50, a: 1 }); // Default color

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
        <directionalLight intensity={1} />
        <Environment preset='city' />
        <Suspense fallback={null}>
        
            <Center>
              <Dress03Model color={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}/>
            </Center>
         
          <OrbitControls minDistance={40} maxDistance={5} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} enablePan={false} />
        </Suspense>
      </Canvas>
    </main>
  );
}
