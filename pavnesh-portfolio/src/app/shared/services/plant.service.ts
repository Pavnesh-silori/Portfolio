import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor() {}

  createPlant(desk: THREE.Group): THREE.Group {

    const plant = new THREE.Group();

    // ==========================
    // Materials
    // ==========================

    const potMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf5f5f5,
      metalness: 0.15,
      roughness: 0.25,
      clearcoat: 1
    });

    const soilMaterial = new THREE.MeshStandardMaterial({
      color: 0x4b3425,
      roughness: 1
    });

    const leafMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3ca34d,
      metalness: 0.05,
      roughness: 0.65
    });

    // ==========================
    // Pot
    // ==========================

    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.10, 0.16, 32),
      potMaterial
    );

    pot.castShadow = true;
    pot.receiveShadow = true;

    plant.add(pot);

    // ==========================
    // Soil
    // ==========================

    const soil = new THREE.Mesh(
      new THREE.CylinderGeometry(0.105, 0.105, 0.015, 32),
      soilMaterial
    );

    soil.position.y = 0.075;

    plant.add(soil);

    // ==========================
    // Leaves
    // ==========================

    for (let i = 0; i < 14; i++) {

      const leaf = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 12, 12),
        leafMaterial
      );

      const angle = (i / 14) * Math.PI * 2;
      const radius = 0.05 + Math.random() * 0.03;
      const height = 0.12 + Math.random() * 0.12;

      leaf.scale.set(0.7, 1.4, 0.5);

      leaf.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );

      leaf.rotation.z = Math.random() * Math.PI;
      leaf.rotation.x = Math.random() * Math.PI;

      plant.add(leaf);
    }

    // ==========================
    // Stem
    // ==========================

    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.018, 0.20, 12),
      new THREE.MeshStandardMaterial({
        color: 0x5d4037
      })
    );

    stem.position.y = 0.12;

    plant.add(stem);

    // ==========================
    // Position
    // ==========================

    plant.position.set(
      2.0,
      0.05,
      -0.75
    );

    desk.add(plant);

    return plant;

  }

}