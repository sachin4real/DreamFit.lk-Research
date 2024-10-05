import { proxy } from 'valtio';

const state = proxy({
  color: '#24BFA8',
  isLogoTexture: true,
  isFullTexture: true,
  logoDecal: './sliit-web-logo.png',
  fullDecal: './public/Designs/pexels02.jpg',
});

export default state;