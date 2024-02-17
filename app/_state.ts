import { proxy } from "valtio";
import { derive } from "valtio/utils";

export const state = proxy({
  isIntroed: false,
  color: '#3B82F6',
  isLogoShow: true,
  isTextureShow: false,
  fullTexture: '/threejs.png',
  logoTexture: '/threejs.png',
  isModelLoaded: false,
  loaded: false
})

