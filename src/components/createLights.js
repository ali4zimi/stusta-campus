
import * as THREE from "three";

export default function createLight() {
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);

  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
  directionalLight.position.set(0, 50, 50);
  directionalLight.setSize = 50;
  directionalLight.castShadow = true;

  return { ambientLight, directionalLight };
}