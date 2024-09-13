import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF ,Environment, Center } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import state from '../../store';
import { Decal, useTexture } from '@react-three/drei';
import Customizer from '../Customizer';

function CottonPantModel() {
const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/Models/solid_color_formal_pant.glb');
//   console.log(nodes); // Log the nodes 
//   console.log(materials); // Log the materials 

  

 
  const stateString = JSON.stringify(snap);

  return (
    <group rotation={[20.5, -Math.PI, 3]} scale={[0.1, 0.1, 0.1]}>  
    <mesh
        castShadow
        geometry={nodes.Object_2.geometry}
        material={materials.W_Twill_98_Ctn_2Spa_260GSM_H_DF22018_FRONT_2641}  
        dispose={null}
      />
      
      <mesh
        castShadow
        geometry={nodes.Object_3.geometry}
        material={materials.W_Twill_98_Ctn_2Spa_260GSM_H_DF22018_FRONT_2641}  
        dispose={null}
      />
      
      <mesh
        castShadow
        geometry={nodes.Object_4.geometry}
        material={materials.W_Twill_98_Ctn_2Spa_260GSM_H_DF22018_FRONT_2641}  
        dispose={null}
      />
      
      <mesh
        castShadow
        geometry={nodes.Object_5.geometry}
        material={materials.W_Twill_98_Ctn_2Spa_260GSM_H_DF22018_FRONT_2641}  
      />
      
      <mesh
        castShadow
        geometry={nodes.Object_6.geometry}
        material={materials.W_Twill_98_Ctn_2Spa_260GSM_H_DF22018_FRONT_2641}  
        dispose={null}
      />
      
      <mesh
        castShadow
        geometry={nodes.Object_7.geometry}
        material={materials.W_Twill_98_Ctn_2Spa_260GSM_H_DF22018_FRONT_2641}  
        dispose={null}
      />
      
    </group>
  );
}

export default function CottonPantPage() {
  return (
    <main className='app transition-all ease-in'>
    <Customizer/>
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
            <CottonPantModel/>
        </Center>
      
        
        <OrbitControls minDistance={35} maxDistance={5} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} enablePan={false} />
      </Suspense>
    </Canvas>

    </main>
    
  );
}