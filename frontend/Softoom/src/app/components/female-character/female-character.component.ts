import { Component } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-female-character',
  templateUrl: './female-character.component.html',
  styleUrls: ['./female-character.component.scss'],
})
export class FemaleCharacterComponent {
  visible: boolean = false;

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

    //load freezer model
    const freezer = new GLTFLoader();
    freezer.load(
      'assets/freezer-one/scene.gltf',
      (freezer) => {
        freezer.scene.scale.set(1.2, 1.2, 1.2);
        freezer.scene.position.set(3, -0.5, 4.5);

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

    //player model movement
    window.addEventListener('keydown', (event) => {
      if (event.key === 'w') {
        model.position.x -= 0.1;
        //let the model face to the direction of movement
        model.rotation.y = (3 * Math.PI) / 2;
      }
      if (event.key === 's') {
        model.position.x += 0.1;
        model.rotation.y = Math.PI / 2;
      }
      if (event.key === 'a') {
        model.position.z += 0.1;
        model.rotation.y = 0;
      }
      if (event.key === 'd') {
        model.position.z -= 0.1;
        model.rotation.y = Math.PI;
      }
    });


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
