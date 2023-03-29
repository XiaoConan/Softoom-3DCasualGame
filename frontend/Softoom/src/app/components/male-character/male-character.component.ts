import { Component } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MatDialog } from '@angular/material/dialog';
import { FoodMenuComponent } from '../food-menu/food-menu.component';

@Component({
  selector: 'app-male-character',
  templateUrl: './male-character.component.html',
  styleUrls: ['./male-character.component.scss'],
})
export class MaleCharacterComponent {

  visible: boolean = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcfb665);
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

    //load the male role gltf model

    let model: THREE.Group;

    const loader = new GLTFLoader();
    loader.load(
      'assets/male-role/scene.gltf',
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
      'assets/room-two/scene.gltf',
      (room) => {
        room.scene.scale.set(1.5, 1.5, 2.5);
        room.scene.position.set(0, -1, 1);
        scene.add(room.scene);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    //load freezer model
    const freezer = new GLTFLoader();
    freezer.load(
      'assets/freezer-two/scene.gltf',
      (freezer) => {
        freezer.scene.scale.set(0.015, 0.015, 0.015);
        freezer.scene.position.set(2.5, -1, 5);
        freezer.scene.rotation.y = -1.5;

        scene.add(freezer.scene);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    //load the food card model
    const food_card = new GLTFLoader();
    food_card.load(
      'assets/food-cart/scene.gltf',
      (food) => {
        food.scene.scale.set(1, 1, 1);
        food.scene.position.set(-2, -1, 8.5);
        scene.add(food.scene);

        // Create a Raycaster object
        const raycaster = new THREE.Raycaster();

        // Set up the click event handler
        window.addEventListener('click', (event) => {
          // Calculate the mouse position in normalized device coordinates
          const mouse = new THREE.Vector2();
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

          // Set the raycaster position based on the mouse position
          raycaster.setFromCamera(mouse, camera);

          // Check if the ray intersects with the model
          const intersects = raycaster.intersectObject(food.scene);

          if (intersects.length > 0) {
            this.visible = true;
          }
        });
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

  closeFoodMenu() {
    this.visible = false;
  }
}
