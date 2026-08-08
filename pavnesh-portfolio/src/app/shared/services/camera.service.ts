import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() {}

  createCamera(canvas: HTMLCanvasElement): THREE.PerspectiveCamera {

    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );

    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);

    return camera;

  }

}