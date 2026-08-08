import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  constructor() {}

  createDrawer(desk: THREE.Group): THREE.Group {

    const drawer = new THREE.Group();

    // ==========================
    // Materials
    // ==========================

    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2f3339,
      metalness: 0.25,
      roughness: 0.45
    });

    const frontMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3a4048,
      metalness: 0.35,
      roughness: 0.35
    });

    const handleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd9d9d9,
      metalness: 1,
      roughness: 0.18
    });

    // ==========================
    // Drawer Body
    // ==========================

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.70,
        0.78,
        1.50
      ),
      bodyMaterial
    );

    body.castShadow = true;
    body.receiveShadow = true;

    drawer.add(body);

    // ==========================
    // Drawer Labels
    // ==========================

    const labels = [
      'Resume',
      'Certificates',
      'Projects',
      'Skills'
    ];

    // ==========================
    // Drawers
    // ==========================

    for (let i = 0; i < 4; i++) {

      const drawerFront = new THREE.Mesh(
        new THREE.BoxGeometry(
          0.72,
          0.16,
          0.03
        ),
        frontMaterial
      );

      drawerFront.position.set(
        0,
        0.27 - (i * 0.19),
        0.76
      );

      drawer.add(drawerFront);

      // Handle

      const handle = new THREE.Mesh(
        new THREE.BoxGeometry(
          0.20,
          0.02,
          0.03
        ),
        handleMaterial
      );

      handle.position.set(
        0,
        0.27 - (i * 0.19),
        0.79
      );

      drawer.add(handle);

      // Small Label Plate

      const plate = new THREE.Mesh(
        new THREE.BoxGeometry(
          0.26,
          0.05,
          0.01
        ),
        new THREE.MeshPhysicalMaterial({
          color: 0xf5f5f5,
          roughness: 0.6
        })
      );

      plate.position.set(
        -0.16,
        0.27 - (i * 0.19),
        0.785
      );

      drawer.add(plate);

      // Store metadata for future interaction

      drawerFront.userData = {
        type: 'drawer',
        label: labels[i]
      };

    }

    // ==========================
    // Wheels
    // ==========================

    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x202020
    });

    const wheelPositions = [
      [-0.24, -0.40, -0.60],
      [0.24, -0.40, -0.60],
      [-0.24, -0.40, 0.60],
      [0.24, -0.40, 0.60]
    ];

    wheelPositions.forEach(([x, y, z]) => {

      const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.04,
          0.04,
          0.03,
          20
        ),
        wheelMaterial
      );

      wheel.rotation.z = Math.PI / 2;

      wheel.position.set(x, y, z);

      drawer.add(wheel);

    });

    // ==========================
    // Position
    // ==========================

    drawer.position.set(
      -1.75,
      -0.58,
      0
    );

    desk.add(drawer);

    return drawer;

  }

}