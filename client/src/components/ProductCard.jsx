import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF,Center } from '@react-three/drei';

function ModelViewer({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={[10, 10, 10]} />; 
}

function ProductCard({ product }) {
  return (
    <div className="bg-gray-200 shadow-md rounded-lg p-6 max-w-lg mx-auto text-center">
      <div className="relative" style={{ height: '200px' }}> 
        <Canvas className="absolute inset-0">
          <ambientLight intensity={1.8} />
          <directionalLight position={[0, 0, 5]} />
          <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          <Center>
            <ModelViewer modelPath={product.modelPath} />
          </Center>
        </Canvas>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">{product.name}</h3>
        <div className="text-lg text-gray-600">Rating: ★★★★☆</div>
        <div className="text-gray-600 mt-2">Rs. {product.price}</div>
        <button className="px-2 py-1 bg-gradient-to-r from-green-300 via-teal-300 to-cyan-400 rounded-lg text-white">
          Customize Dress
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
