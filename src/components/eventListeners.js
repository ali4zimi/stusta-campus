
import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredObject = {};
let selectedObject = null;
let oldColor = new THREE.Color();

export function onPointerMove(event, drag, camera, scene, city) {
    if (drag) return;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children, true);
    let intersect = intersects.length && intersects[0];

    if (hoveredObject && hoveredObject.group) {
        hoveredObject.onPointerOut();
    }

    if (intersect && intersect.object.userData.selectable) {
        let building = city.buildings.find(building => building.group.children.includes(intersect.object));
        hoveredObject = building;
        
        console.log(hoveredObject);
        building.onPointerOver();

    } else {
        hoveredObject = {};
    }
}

export function onClick(event) {
    if (selectedObject) {
        selectedObject.onPointerOut();
    }
    if (hoveredObject.group) {
        selectedObject = hoveredObject;
        hoveredObject.onClick();
    }
}

export function onResize(sceneContainer, renderer, camera) {
    const { width, height } = sceneContainer.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}