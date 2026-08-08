import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class TablelampService {

  constructor() {}

  createLamp(desk: THREE.Group): THREE.Group {

    const lamp = new THREE.Group();

    // ==========================
    // Materials
    // ==========================

    const metalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2d3138,
      metalness: 1,
      roughness: 0.22,
      clearcoat: 1
    });

    const ledMaterial = new THREE.MeshBasicMaterial({
      color: 0x00e5ff
    });

    // ==========================
    // Base
    // ==========================

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.16,
        0.18,
        0.03,
        40
      ),
      metalMaterial
    );

    base.castShadow = true;
    base.receiveShadow = true;

    lamp.add(base);

    // ==========================
    // Vertical Pole
    // ==========================

    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.02,
        0.02,
        0.48,
        24
      ),
      metalMaterial
    );

    pole.position.y = 0.24;

    lamp.add(pole);

    // ==========================
    // Arm
    // ==========================

    const arm = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.018,
        0.018,
        0.42,
        24
      ),
      metalMaterial
    );

    arm.rotation.z = THREE.MathUtils.degToRad(-45);

    arm.position.set(
      0.15,
      0.60,
      0
    );

    lamp.add(arm);

    // ==========================
    // Lamp Head
    // ==========================

    const head = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.22,
        0.05,
        0.10
      ),
      metalMaterial
    );

    head.rotation.z = THREE.MathUtils.degToRad(-45);

    head.position.set(
      0.30,
      0.75,
      0
    );

    lamp.add(head);

    // ==========================
    // LED Strip
    // ==========================

    const led = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.18,
        0.005,
        0.08
      ),
      ledMaterial
    );

    led.rotation.z = THREE.MathUtils.degToRad(-45);

    led.position.set(
      0.30,
      0.72,
      0
    );

    lamp.add(led);

    // ==========================
    // Glow
    // ==========================

    const glow = new THREE.PointLight(
      0x00e5ff,
      1.6,
      3
    );

    glow.position.set(
      0.25,
      0.68,
      0
    );

    lamp.add(glow);

// ==========================
// Spot Light
// ==========================

const spot = new THREE.SpotLight(
  0xffffff,
  4
);

spot.angle = Math.PI / 4;
spot.penumbra = 0.8;
spot.decay = 2;
spot.distance = 6;
spot.castShadow = true;

spot.position.set(
  0.30,
  0.73,
  0
);

const target = new THREE.Object3D();

// This is the center of the desk in WORLD coordinates
target.position.set(
  0,
  0.38,
  0.25
);

// IMPORTANT: Add target to desk, NOT lamp
desk.add(target);

spot.target = target;

lamp.add(spot);

    // ==========================
    // Position
    // ==========================

lamp.position.set(
    -2.15,
    0.05,
    0.75
);
    desk.add(lamp);

    return lamp;

  }

}