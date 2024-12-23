import * as THREE from 'three';
import { stusta_buildings } from "../data/buildings.js";

const BUILDING_COLOR = 0xD4D4D4;
const BUILDING_COLOR_HOVER = 0xFFA500;
const BUILDING_COLOR_SELECTED = 0x00FF00;


export function createCity() {
    const ground = new Ground();
    const map = new Map();

    let buildings = []
    for (let building of stusta_buildings) {
        const newBuilding = new Building(building.name, building.units);
        buildings.push(newBuilding);
    }

    return { ground, map, buildings }
}

export class Ground {
    material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    
    constructor() {
        this.mesh = new THREE.Mesh(new THREE.CircleGeometry(5000, 32), this.material);
        this.mesh.position.set(0, 0.0, 0);
        this.mesh.rotation.x = -Math.PI / 2;
        // this.mesh.scale.set(1000, 0.1, 1000);
        this.mesh.receiveShadow = true; 
        // this.mesh.castShadow = true;
    }
}

export class Map {
    material = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('/assets/stusta.png') });
    
    constructor() {
        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(), this.material);
        this.mesh.position.set(0, 0.05, 0);
        this.mesh.scale.set(50, 0.1, 50);
        this.mesh.receiveShadow = true;
        // this.mesh.castShadow = true;
    }
}

export class Building {
    materialOptions = new THREE.MeshStandardMaterial({ color: BUILDING_COLOR });
    constructor(name, units) {
        this.name = name;
        this.group = new THREE.Group();
        this.group.userData = { selectable: true };
        this.createUnits(units);
    }

    createUnits(units) {
        for (let unit of units) {
            let newUnit = new Unit(unit.name, unit.dimensions, unit.position, unit.rotation, this.materialOptions);
            this.group.add(newUnit.mesh);
        }
    }

    render() {
        this.rotation.x = this.rotation.y += 0.01
    }

    onResize(width, height, aspect) {
        
    }

    onPointerOver(e) {
        this.group.children.forEach(unit => unit.material.color.set(BUILDING_COLOR_HOVER))
    }

    onPointerOut(e) {
        this.group.children.forEach(unit => unit.material.color.set(BUILDING_COLOR))
    }

    onClick(e) {
        this.group.children.forEach(unit => unit.material.color.set(BUILDING_COLOR_SELECTED))
    }
}

export class Unit {
    constructor(name, dimensions, position, rotation, materialOptions) {
        this.name = name;
        this.geometry = new THREE.BoxGeometry(dimensions.length, dimensions.height, dimensions.width);
        this.mesh = new THREE.Mesh(this.geometry, materialOptions);
        this.mesh.position.set(position.x, dimensions.height / 2, position.y);
        this.mesh.rotation.y = rotation.y;
        this.mesh.userData = { selectable: true };
        this.mesh.castShadow = true;
    }
}
