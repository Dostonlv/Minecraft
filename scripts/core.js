import * as THREE from './components/three.module.js';
import { PointerLockControls } from './components/PointerLockControls.js';

import { Map } from "./components/generationMap.js";
import { Controls } from "./components/controls.js";

const canvas				= document.querySelector("#game");
const scene 				= new THREE.Scene();
scene.background 			= new THREE.Color(0x00ffff);
scene.fog 					= new THREE.Fog(0x00ffff, 10, 650);
const renderer 				= new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
const camera 				= new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(50, 40, 50);


let mapWorld = new Map();
mapWorld.generation(scene);

let controls = new Controls( new PointerLockControls(camera, document.body),  scene, mapWorld );

window.addEventListener( "keydown", (e)=>{ controls.inputKeydown(e); } );
window.addEventListener( "keyup", (e)=>{ controls.inputKeyup(e); } );
document.body.addEventListener( "click", (e) => { controls.onClick(e); }, false );


function update(){
	controls.update();
};

GameLoop();

function GameLoop() {
	update();
	render();
	requestAnimationFrame(GameLoop);
}

function render(){
	renderer.render(scene, camera);
}

window.addEventListener("resize", function() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});