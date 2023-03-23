import { Component } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-female-character',
  templateUrl: './female-character.component.html',
  styleUrls: ['./female-character.component.scss'],
})
export class FemaleCharacterComponent {
  constructor() {}

  ngOnInit(): void {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffb399);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Add ambient light to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // color, intensity
    scene.add(ambientLight);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio * 2);
    document.body.appendChild(renderer.domElement);

    //load the female role gltf model

    let model: THREE.Group;

    //load female role model
    const loader = new GLTFLoader();
    loader.load(
      'assets/female-role/scene.gltf',
      (gltf) => {
        model = gltf.scene;
        gltf.scene.scale.set(0.2, 0.2, 0.2);
        gltf.scene.position.set(0, -1, 0);
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    //load room model
    const room_loader = new GLTFLoader();
    room_loader.load(
      'assets/room-one/scene.gltf',
      (room) => {
        room.scene.scale.set(0.025, 0.025, 0.025);
        room.scene.position.set(0, -1, 1);
        scene.add(room.scene);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    //camera look at the room model
    camera.position.z = 1;
    camera.position.y = 4;
    camera.position.x = 7;
    camera.lookAt(scene.position);

    function animate() {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    }
    animate();
  }
}
