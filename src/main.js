import createLights from "./components/createLights";
import animate from "./components/animate";
import createCamera from "./components/createCamera";
import createRenderer from "./components/createRenderer";
import createScene from "./components/createScene";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { createCity } from "./components/City";
import createSky from './components/Sky';
import { onPointerMove, onClick, onResize } from './components/eventListeners';



const sceneContainer = document.getElementById('scene-container');
const renderer = createRenderer(sceneContainer);
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = createScene();
const camera = createCamera();


const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2 - Math.PI / 12;
controls.minPolarAngle = Math.PI / 8;

let isDragging = false;

controls.addEventListener('start', () => {
    isDragging = true;
})

controls.addEventListener('end', () => {
    isDragging = false;
})


const lights = createLights();
scene.add(lights.ambientLight);
scene.add(lights.directionalLight);


// Render loop
animate(() => {
    renderer.render(scene, camera);
});


const city = createCity();
scene.add(city.ground.mesh);
scene.add(city.map.mesh);
city.buildings.forEach(building => scene.add(building.group));


// add sky
const sky = new createSky();
scene.add( sky );


// Event listeners


window.addEventListener('pointermove', (event) => onPointerMove(event, isDragging, camera, scene, city));
window.addEventListener('click', (event) => onClick(event));
window.addEventListener('resize', () => onResize(sceneContainer, renderer, camera));



const sidebar = document.getElementById('sidebar');
const ul = document.createElement('ul');
sidebar.appendChild(ul);
// for each building, create a button
city.buildings.forEach(building => {
    const option = document.createElement('li');
    option.textContent = building.name;
    option.addEventListener('click', () => {
        building.onClick();
    });



    option.addEventListener('click', () => {
        if (selectedObject) {
            selectedObject.onPointerOut();
        }

        selectedObject = building;
        building.onClick();
    });
    
    ul.appendChild(option);
});