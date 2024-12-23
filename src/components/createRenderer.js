import * as THREE from "three";

export default function createRenderer(sceneContainer) {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);
    return renderer;
}
