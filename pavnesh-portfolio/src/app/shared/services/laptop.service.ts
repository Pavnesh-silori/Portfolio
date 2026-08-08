import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { ScreenTextureService } from './screen-texture.service';
@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  constructor(
    private screenTexture: ScreenTextureService
  ) { }

  createLaptop(desk: THREE.Group): THREE.Group {

    const laptop = new THREE.Group();

    this.createStand(laptop);

    this.createBase(laptop);

    this.createDisplay(laptop);

    laptop.position.set(
      0,
      0.05,
      -0.12
    );

    desk.add(laptop);

    return laptop;

  }

  // =====================================================
  // Stand
  // =====================================================

  private createStand(laptop: THREE.Group): void {

    const aluminum = new THREE.MeshPhysicalMaterial({
      color: 0xd6d8dc,
      metalness: 1,
      roughness: 0.16,
      clearcoat: 1
    });

    const base = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.78,
        0.02,
        0.58
      ),
      aluminum
    );

    base.position.y = 0.01;

    base.castShadow = true;

    base.receiveShadow = true;

    laptop.add(base);

    const support = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.08,
        0.20,
        0.18
      ),
      aluminum
    );

    support.position.set(
      0,
      0.11,
      -0.10
    );

    support.castShadow = true;

    laptop.add(support);

    const topPlate = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.74,
        0.02,
        0.54
      ),
      aluminum
    );

    topPlate.position.y = 0.22;

    topPlate.castShadow = true;

    laptop.add(topPlate);

  }

  // =====================================================
  // Display
  // =====================================================

  private createDisplay(laptop: THREE.Group): void {

    const aluminum = new THREE.MeshPhysicalMaterial({
      color: 0xc5c9cf,
      metalness: 1,
      roughness: 0.18,
      clearcoat: 1
    });

    const black = new THREE.MeshPhysicalMaterial({
      color: 0x171717,
      metalness: 0.25,
      roughness: 0.55
    });

    const display = new THREE.Group();


    // =====================================================
    // Back Cover
    // =====================================================

    const back = new THREE.Mesh(
      new THREE.BoxGeometry(
        1.20,
        0.018,
        0.82
      ),
      aluminum
    );

    back.castShadow = true;
    back.receiveShadow = true;

    display.add(back);


    // =====================================================
    // Bezel
    // =====================================================

    const bezel = new THREE.Mesh(
      new THREE.BoxGeometry(
        1.12,
        0.010,
        0.74
      ),
      black
    );

    bezel.position.y = 0.004;

    display.add(bezel);


    // =====================================================
    // Screen
    // =====================================================

    const screenTexture =
      this.screenTexture.createLaptopTerminalTexture();

    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(
        1.02,
        0.66
      ),
      new THREE.MeshBasicMaterial({
        map: screenTexture,
        toneMapped: false,
        side: THREE.DoubleSide
      })
    );


    // IMPORTANT:
    // PlaneGeometry is created in X-Y.
    // Laptop lid is modeled in X-Z.
    // Rotate screen so it sits correctly on the lid.

    screen.rotation.x = -Math.PI / 2;


    // Move screen slightly toward the front
    // so it sits above the bezel.

   screen.position.set(
    0,
    0.012,
    0.002
);

    screen.renderOrder = 2;

    display.add(screen);


    // =====================================================
    // Webcam
    // =====================================================

    const webcam = new THREE.Mesh(
      new THREE.SphereGeometry(
        0.008,
        16,
        16
      ),
      new THREE.MeshStandardMaterial({
        color: 0x050505
      })
    );

    webcam.position.set(
      0,
      -0.015,
      -0.34
    );

    display.add(webcam);


    // =====================================================
    // Display Position
    // =====================================================

    display.position.set(
      0,
      0.615,
      -0.29
    );


    // =====================================================
    // Laptop Lid Angle
    // =====================================================

    display.rotation.x =
      THREE.MathUtils.degToRad(105);


    // =====================================================
    // Add Display
    // =====================================================

    laptop.add(display);
  }

  // =====================================================
  // Laptop Base
  // =====================================================


  private createBase(laptop: THREE.Group): void {

    const aluminum = new THREE.MeshPhysicalMaterial({
      color: 0xc5c9cf,
      metalness: 1,
      roughness: 0.18,
      clearcoat: 1
    });

    const black = new THREE.MeshPhysicalMaterial({
      color: 0x171717,
      metalness: 0.25,
      roughness: 0.55
    });

    const keyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x262626,
      metalness: 0.15,
      roughness: 0.45
    });

    const rgbMaterial = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.18
    });

    // ==========================
    // Bottom Shell
    // ==========================

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(
        1.20,
        0.022,
        0.82
      ),
      aluminum
    );

    body.position.y = 0.235;

    body.castShadow = true;
    body.receiveShadow = true;

    laptop.add(body);

    // ==========================
    // Keyboard Deck
    // ==========================

    const deck = new THREE.Mesh(
      new THREE.BoxGeometry(
        1.08,
        0.008,
        0.72
      ),
      black
    );

    deck.position.y = 0.249;

    laptop.add(deck);

    // ==========================
    // RGB Glow
    // ==========================

    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(
        0.92,
        0.38
      ),
      rgbMaterial
    );

    glow.rotation.x = -Math.PI / 2;

    glow.position.y = 0.252;

    laptop.add(glow);

    // ==========================
    // Keyboard
    // ==========================

    const keyGeometry = new THREE.BoxGeometry(
      0.043,
      0.005,
      0.043
    );

    const startX = -0.42;
    const startZ = -0.23;

    for (let row = 0; row < 5; row++) {

      const offset =
        row === 1 ? 0.02 :
          row === 2 ? 0.04 :
            row === 3 ? 0.06 :
              row === 4 ? 0.09 : 0;

      for (let col = 0; col < 14; col++) {

        const key = new THREE.Mesh(
          keyGeometry,
          keyMaterial
        );

        key.position.set(
          startX + offset + col * 0.062,
          0.255,
          startZ + row * 0.068
        );

        key.castShadow = true;

        laptop.add(key);

      }

    }

    // ==========================
    // Space Bar
    // ==========================

    const spaceBar = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.30,
        0.005,
        0.043
      ),
      keyMaterial
    );

    spaceBar.position.set(
      0,
      0.255,
      0.04
    );

    laptop.add(spaceBar);

    // ==========================
    // Power Button
    // ==========================

    const powerButton = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.05,
        0.005,
        0.05
      ),
      new THREE.MeshPhysicalMaterial({
        color: 0x404040
      })
    );

    powerButton.position.set(
      0.49,
      0.255,
      -0.24
    );

    laptop.add(powerButton);

    // ==========================
    // Speaker Grills
    // ==========================

    const speakerMaterial = new THREE.MeshBasicMaterial({
      color: 0x101010
    });

    for (let i = 0; i < 22; i++) {

      const hole = new THREE.Mesh(
        new THREE.CircleGeometry(
          0.004,
          8
        ),
        speakerMaterial
      );

      hole.rotation.x = -Math.PI / 2;

      hole.position.set(
        -0.49,
        0.2525,
        -0.22 + i * 0.02
      );

      laptop.add(hole);

      const hole2 = hole.clone();

      hole2.position.x = 0.49;

      laptop.add(hole2);

    }

    // ==========================
    // Touchpad
    // ==========================

    const touchpad = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.42,
        0.003,
        0.22
      ),
      new THREE.MeshStandardMaterial({
        color: 0x9ba0a8
      })
    );

    touchpad.position.set(
      0,
      0.252,
      0.22
    );

    laptop.add(touchpad);

    // ==========================
    // Hinge
    // ==========================

    const hinge = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.015,
        0.015,
        1.02,
        20
      ),
      aluminum
    );

    hinge.rotation.z = Math.PI / 2;

    hinge.position.set(
      0,
      0.235,
      -0.39
    );

    laptop.add(hinge);

  }


}