import { Component } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { BufferGeometryUtils } from 'three';

@Component({
  selector: 'app-male-character',
  templateUrl: './male-character.component.html',
  styleUrls: ['./male-character.component.scss']
})
export class MaleCharacterComponent {
  constructor() { }

  ngOnInit() : void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    // //load the female role gltf model
    // const loader = new GLTFLoader();
    // loader.load('assets/female-role/scene.gltf', (gltf) => {
    //   scene.add(gltf.scene);
    // }, undefined, (error) => {
    //   console.error(error);
    // });
    const loader = new FBXLoader();
    loader.load('assets/Ch24_nonPBR.fbx', (fbx) => {
      // Traverse the object and triangulate each geometry
      fbx.traverse((child) => {
        if (child instanceof THREE.Mesh && child.geometry !== undefined) {
          child.geometry = BufferGeometryUtils.mergeBufferGeometries([child.geometry.toNonIndexed().triangulate()]);
        }
      });

      // Merge all the meshes into a single Mesh
      const meshes = fbx.children.filter(child => child instanceof THREE.Mesh && child.geometry !== undefined);
      const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(meshes.map(mesh => mesh.geometry));


      scene.add(mergedGeometry);
    }, undefined, (error) => {
      console.error(error);
    });

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame( animate );

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render( scene, camera );
    }
    animate();
  }
}
