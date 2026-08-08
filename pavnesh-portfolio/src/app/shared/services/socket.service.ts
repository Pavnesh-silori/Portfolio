import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() {}

  createSockets(desk: THREE.Group): THREE.Group {

    const socketGroup = new THREE.Group();

    // ==========================
    // Materials
    // ==========================

    const stripMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf4f1ea,
      metalness: 0.08,
      roughness: 0.55,
      clearcoat: 0.3
    });

    const socketMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.75
    });

    const plugMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a
    });

    const cableMaterial = new THREE.MeshStandardMaterial({
      color: 0x101010
    });

    // ==========================
    // Power Strip
    // ==========================

    const strip = new THREE.Mesh(
      new THREE.BoxGeometry(
        1.20,
        0.14,
        0.05
      ),
      stripMaterial
    );

    strip.castShadow = true;
    strip.receiveShadow = true;

    socketGroup.add(strip);

    // ==========================
    // Sockets
    // ==========================

    const socketPositions = [-0.42, -0.14, 0.14, 0.42];

    socketPositions.forEach(x => {

      const socket = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.032,
          0.032,
          0.012,
          24
        ),
        socketMaterial
      );

      socket.rotation.x = Math.PI / 2;

      socket.position.set(
        x,
        0,
        0.03
      );

      socketGroup.add(socket);

    });

    // ==========================
    // Plug 1
    // ==========================

    const plug1 = this.createPlug(
      plugMaterial,
      cableMaterial,
      -0.14
    );

    socketGroup.add(plug1);

    // ==========================
    // Plug 2
    // ==========================

    const plug2 = this.createPlug(
      plugMaterial,
      cableMaterial,
      0.14
    );

    socketGroup.add(plug2);

    // ==========================
    // Position
    // ==========================

    socketGroup.position.set(
      0,
      -0.32,
      -1.08
    );

    desk.add(socketGroup);

    return socketGroup;

  }

  // ==========================
  // Plug
  // ==========================

  private createPlug(
    plugMaterial: THREE.Material,
    cableMaterial: THREE.Material,
    x: number
  ): THREE.Group {

    const plug = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.05,
        0.06,
        0.05
      ),
      plugMaterial
    );

    body.position.z = 0.035;

    plug.add(body);

    // Pins

    [-0.01, 0.01].forEach(px => {

      const pin = new THREE.Mesh(
        new THREE.BoxGeometry(
          0.004,
          0.015,
          0.012
        ),
        new THREE.MeshStandardMaterial({
          color: 0xd4af37
        })
      );

      pin.position.set(
        px,
        0,
        0.065
      );

      plug.add(pin);

    });

    // Cable

    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0.12, -0.05),
      new THREE.Vector3(0, 0.30, -0.12),
      new THREE.Vector3(0, 0.55, -0.18)
    ]);

    const cable = new THREE.Mesh(
      new THREE.TubeGeometry(
        curve,
        32,
        0.006,
        8,
        false
      ),
      cableMaterial
    );

    plug.add(cable);

    plug.position.x = x;

    return plug;

  }

}