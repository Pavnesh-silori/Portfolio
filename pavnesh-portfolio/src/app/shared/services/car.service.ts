import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  createCars(desk: THREE.Group): void {

    this.createCar(desk, -1.75, 0.72, 0xff2d2d);

  }

  private createCar(
    desk: THREE.Group,
    x: number,
    z: number,
    color: number
  ): void {

    const car = new THREE.Group();

    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.8,
      roughness: 0.25,
      clearcoat: 1
    });

    const tyreMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111
    });

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.07, 0.16),
      bodyMaterial
    );

    body.position.y = 0.035;

    car.add(body);

    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.05, 0.13),
      new THREE.MeshPhysicalMaterial({
        color: 0x202020,
        metalness: 0.4,
        roughness: 0.2
      })
    );

    cabin.position.set(0.02, 0.085, 0);

    car.add(cabin);

    const wheelPositions = [
      [-0.12, 0, -0.08],
      [0.12, 0, -0.08],
      [-0.12, 0, 0.08],
      [0.12, 0, 0.08]
    ];

    wheelPositions.forEach(([wx, wy, wz]) => {

      const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.02, 20),
        tyreMaterial
      );

      wheel.rotation.z = Math.PI / 2;

      wheel.position.set(wx, wy, wz);

      car.add(wheel);

    });

    car.position.set(x, 0.06, z);

    desk.add(car);


    // ==========================
// Premium Diary
// ==========================

const diary = new THREE.Group();

const coverMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x0d47a1,
  metalness: 0.15,
  roughness: 0.55,
  clearcoat: 0.5
});

const pageMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xfaf7ef,
  roughness: 0.9
});

// Pages

const pages = new THREE.Mesh(
  new THREE.BoxGeometry(
    0.42,
    0.025,
    0.30
  ),
  pageMaterial
);

pages.position.y = 0.012;

diary.add(pages);

// Cover

const cover = new THREE.Mesh(
  new THREE.BoxGeometry(
    0.43,
    0.008,
    0.31
  ),
  coverMaterial
);

cover.position.y = 0.03;

diary.add(cover);

// Spine

const spine = new THREE.Mesh(
  new THREE.BoxGeometry(
    0.02,
    0.03,
    0.31
  ),
  new THREE.MeshPhysicalMaterial({
    color: 0x082b6b
  })
);

spine.position.x = -0.205;
spine.position.y = 0.015;

diary.add(spine);

// Elastic Band

const band = new THREE.Mesh(
  new THREE.BoxGeometry(
    0.012,
    0.032,
    0.31
  ),
  new THREE.MeshStandardMaterial({
    color: 0x202020
  })
);

band.position.x = 0.18;
band.position.y = 0.016;

diary.add(band);

// Bookmark Ribbon

const ribbon = new THREE.Mesh(
  new THREE.BoxGeometry(
    0.008,
    0.002,
    0.18
  ),
  new THREE.MeshStandardMaterial({
    color: 0xd32f2f
  })
);

ribbon.position.set(
  0,
  -0.003,
  0.06
);

diary.add(ribbon);

// Position

diary.rotation.y = THREE.MathUtils.degToRad(18);

diary.position.set(
  1.80,
  0.05,
  0.72
);

desk.add(diary);

  }

}