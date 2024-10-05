import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF ,Environment, Center } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import state from '../../store';
import Customizer from '../Customizer';

function DenimShirtModel() {
const snap = useSnapshot(state);

  const { nodes, materials } = useGLTF('/Models/unisex_denim_shirt_design.glb');

  // console.log(nodes); // Log the nodes 
  // console.log(materials); // Log the materials 

  

  const stateString = JSON.stringify(snap);

  return (
    <group rotation={[20.5, -Math.PI, 3]} scale={[0.1, 0.1, 0.1]}>  
      
    <mesh
      castShadow
      geometry={nodes.Object_2.geometry}
      material={materials.DF_Denim_FRONT_2670} 
      dispose={null}
     >
      <meshStandardMaterial color={'#071f35'} /> 
    </mesh>
    
    <mesh
      castShadow
      geometry={nodes.Object_3.geometry}
      material={materials.Material1041664}  
      dispose={null}
      >
      <meshStandardMaterial color={'#071f35'} /> 
    </mesh>
    
    <mesh
      castShadow
      geometry={nodes.Object_4.geometry}
      material={materials.DF_Denim_FRONT_2670}  
      dispose={null}
      >
      <meshStandardMaterial color={'#24496b'} /> 
    </mesh>
    
    <mesh
      castShadow
      geometry={nodes.Object_5.geometry}
      material={materials.Material1041664}  
      dispose={null}
      >
      <meshStandardMaterial color={'#071f35'} /> 
    </mesh>
    
    <mesh
      castShadow
      geometry={nodes.Object_6.geometry}
      material={materials.DF_Denim_FRONT_2670}  
      dispose={null}
      >
      <meshStandardMaterial color={'#071f35'} /> 
    </mesh>
    
    <mesh
      castShadow
      geometry={nodes.Object_7.geometry}
      material={materials.Material1041664}  
      dispose={null}
      >
      <meshStandardMaterial color={'#98b1c8'} /> 
    </mesh>
    
    <mesh
      castShadow
      geometry={nodes.Object_8.geometry}
      material={materials.DF_Denim_FRONT_2670}  
      dispose={null}
      >
      <meshStandardMaterial color={'black'} /> 
    </mesh>
    
    <mesh
      castShadow
      geometry={nodes.Object_9.geometry}
      material={materials.Material1041664}  
      dispose={null}
      >
      <meshStandardMaterial color={'grey'} /> 
    </mesh>
  </group>
  );
}

export default function DenimShirtPage() {
  return (
    <main className='app transition-all ease-in'>
    <Customizer/>
    <Canvas 
    shadows
    camera={{ position: [0, 0, 0], fov: 25 }}
    gl={{ preserveDrawingBuffer: true }}
    className="w-full max-w-full h-full transition-all ease-in"
    >
      {/* <ambientLight intensity={1}/> */}
     <directionalLight intensity={2.5} />
     <Environment preset='city' />
      <Suspense fallback={null}>
   
        <Center>
            <DenimShirtModel/>
        </Center>
       
        
        <OrbitControls minDistance={28} maxDistance={5} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} enablePan={false} />
      </Suspense>
    </Canvas>

    </main>
    
  );
}