import * as THREE from "three";

export default function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 0;
  camera.position.y = 60;
  return camera;
}