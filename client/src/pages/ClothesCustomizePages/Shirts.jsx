import React, { Suspense ,useState} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF ,Environment, Center } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import state from '../../store';
import { Decal, useTexture } from '@react-three/drei';
import Customizer from '../Customizer';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { RgbaColorPicker } from 'react-colorful'; 

function ShirtsModel({ color }) {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/Models/shirt_baked.glb');
   
  
    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);
  
 
  
    const stateString = JSON.stringify(snap);
  

  return (
    <group key={stateString}>
    <mesh
      castShadow
      geometry={nodes.T_Shirt_male.geometry}
      material={materials.lambert1}
      material-roughness={1}
      dispose={null}
      material-color={color}
    >
         {/* <meshStandardMaterial color={'#ca6f1e'} /> */}
         {/* <meshStandardMaterial color={'white'} /> */}
      {snap.isFullTexture && (
        <Decal 
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={1}
          map={fullTexture}
        />
      )}

      {snap.isLogoTexture && (
        <Decal 
          position={[0, 0.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.15}
          map={logoTexture}
          anisotropy={16}
          depthTest={false}
          depthWrite={true}
        />
      )}
    </mesh>
  </group>
  );
}

export default function ShirtsPage() {
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
     {/* <ambientLight intensity={1} /> */}
     <directionalLight intensity={2} />
     <Environment preset='city' />
      <Suspense fallback={null}>
     
        <Center>
            <ShirtsModel color={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`} />
        </Center>
       
        
        <OrbitControls  minDistance={2}  maxDistance={5} maxPolarAngle={Math.PI / 2}  minPolarAngle={Math.PI / 2} enablePan={false} />
      </Suspense>
    </Canvas>

    </main>
    
  );
}