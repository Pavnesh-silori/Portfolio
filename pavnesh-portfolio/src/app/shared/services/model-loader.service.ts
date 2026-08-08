import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Injectable({
  providedIn: 'root'
})
export class ModelLoaderService {

  private loader = new GLTFLoader();

  load(path: string): Promise<THREE.Group> {

    return new Promise((resolve, reject) => {

      this.loader.load(

        path,

        (gltf) => { 

          resolve(gltf.scene);

        },

        undefined,

        (error) => {

          reject(error);

        }

      );

    });

  }

}