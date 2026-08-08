import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class DeskService {

  constructor() { }

  createDesk(platform: THREE.Group): THREE.Group {

    const desk = new THREE.Group();

    // ==========================
    // Materials
    // ==========================

    const topMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2d3138,
      metalness: 0.25,
      roughness: 0.45,
      clearcoat: 1
    });

    const legMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf2f0ea,
      metalness: 0.85,
      roughness: 0.22,
      clearcoat: 1
    });

    // ==========================
    // Table Top
    // ==========================

    const top = new THREE.Mesh(
      new THREE.BoxGeometry(4.8, 0.08, 2.2),
      topMaterial
    );

    top.castShadow = true;
    top.receiveShadow = true;

    desk.add(top);

    // ==========================
    // Leg Frame
    // ==========================

    const createFrame = (x: number): THREE.Group => {

      const frame = new THREE.Group();

      // Front leg

      const front = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 1.1, 0.08),
        legMaterial
      );

      front.position.set(0.15, -0.58, 0.52);
      front.rotation.z = THREE.MathUtils.degToRad(-12);

      frame.add(front);

      // Back leg

      const back = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 1.1, 0.08),
        legMaterial
      );

      back.position.set(-0.15, -0.58, -0.52);
      back.rotation.z = THREE.MathUtils.degToRad(12);

      frame.add(back);

      // Bottom foot

      const foot = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.05, 1.25),
        legMaterial
      );

      foot.position.set(0, -1.13, 0);

      frame.add(foot);

      // Top connector

      const connector = new THREE.Mesh(
        new THREE.BoxGeometry(0.34, 0.05, 1.18),
        legMaterial
      );

      connector.position.set(0, -0.05, 0);

      frame.add(connector);

      frame.position.x = x;

      return frame;

    };

    desk.add(createFrame(-1.85));
    desk.add(createFrame(1.85));
    // ==========================
    // Side Rails
    // ==========================

    const rail = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.05, 1.35),
      legMaterial
    );

    rail.position.set(-1.25, -0.05, 0);

    desk.add(rail);

    const rail2 = rail.clone();
    rail2.position.x = 1.25;

    desk.add(rail2);

    // Front beam

    const frontBeam = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 0.05, 0.08),
      legMaterial
    );

    frontBeam.position.set(0, -0.05, 0.64);

    desk.add(frontBeam);

    // Rear beam

    const rearBeam = frontBeam.clone();
    rearBeam.position.z = -0.64;

    desk.add(rearBeam);
    // ==========================
    // Rear Cable Panel
    // ==========================

    

    const panelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x262a31,
      metalness: 0.2,
      roughness: 0.45
    });

    const rearPanel = new THREE.Mesh(
      new THREE.BoxGeometry(
        4.6,
        0.55,
        0.03
      ),
      panelMaterial
    );

    rearPanel.position.set(
      0,
      -0.38,
      -1.03
    );

    rearPanel.castShadow = true;
    rearPanel.receiveShadow = true;

    desk.add(rearPanel);

    // ==========================
    // Power Strip
    // ==========================

    const strip = new THREE.Mesh(
      new THREE.BoxGeometry(
        1.0,
        0.12,
        0.05
      ),
      new THREE.MeshStandardMaterial({
        color: 0xf4f1ea,
        metalness: 0.15,
        roughness: 0.65
      })
    );

    strip.position.set(
      0,
      -0.28,
      -1.06
    );

    desk.add(strip);

    // ==========================
    // Position
    // ==========================

    desk.position.set(0, 1.5, 0);

    platform.add(desk);

    return desk;

  }

}