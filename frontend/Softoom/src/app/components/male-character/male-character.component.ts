import { Component } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-male-character',
  templateUrl: './male-character.component.html',
  styleUrls: ['./male-character.component.scss'],
})
export class MaleCharacterComponent {
  constructor() {}

  ngOnInit(): void {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
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

    const loader = new GLTFLoader();
    loader.load(
      'assets/male-role/scene.gltf',
      (gltf) => {
        model = gltf.scene;
        gltf.scene.scale.set(0.2, 0.2, 0.2);
        gltf.scene.position.set(0, -2, 0);
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);

      // Rotate the imported model
      model.rotation.y += 0.01;

      renderer.render(scene, camera);
    }
    animate();
  }
}
