import { Sky } from 'three/addons/objects/Sky.js';
import { MathUtils } from 'three';
import { Vector3 } from 'three';

export default function createSky() {
	const sky = new Sky();
	sky.scale.setScalar( 450000 );
	sky.material.uniforms.rayleigh.value = 0.5;
	sky.material.uniforms.turbidity.value = 0;
	sky.material.uniforms.mieCoefficient.value = 0.0005;
	sky.material.uniforms.mieDirectionalG.value = 0.8;
	
	const phi = MathUtils.degToRad( 90 - 5 );
	const theta = MathUtils.degToRad( 30 );
	const sunPosition = new Vector3().setFromSphericalCoords( 1, phi, theta );
	
	sky.material.uniforms.sunPosition.value = sunPosition;

	return sky;
}