import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class LightsService {

  constructor() {}

  createLights(scene: THREE.Scene): void {

    const ambient = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffffff, 4);
    sun.position.set(8, 10, 8);
    sun.castShadow = true;
    scene.add(sun);

  }

}