import { proxy } from 'valtio';

const state = proxy({
  color: '#24BFA8',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './sliit-web-logo.png',
  fullDecal: './public/Designs/ball3.png',
});

export default state;