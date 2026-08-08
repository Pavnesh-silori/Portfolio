import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
    providedIn: 'root'
})
export class KeyboardMouseService {

    constructor() {}

    createKeyboardAndMouse(desk: THREE.Group): THREE.Group {

        const setup = new THREE.Group();

        this.createKeyboard(setup);
        this.createMouse(setup);

        // =====================================================
        // Position on desk
        // =====================================================

        setup.position.set(
            0,
            0.05,
            0.80
        );

        desk.add(setup);

        return setup;
    }


    // =========================================================
    // KEYBOARD
    // =========================================================

    private createKeyboard(parent: THREE.Group): void {

        const keyboard = new THREE.Group();


        // =====================================================
        // Materials
        // =====================================================

        const bodyMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x111318,
            metalness: 0.35,
            roughness: 0.32,
            clearcoat: 0.8
        });

        const keyMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x252831,
            metalness: 0.1,
            roughness: 0.38
        });

        const rgbMaterial = new THREE.MeshBasicMaterial({
            color: 0x00e5ff
        });


        // =====================================================
        // Keyboard Body
        // =====================================================

        const body = new THREE.Mesh(
            new THREE.BoxGeometry(
                1.65,
                0.07,
                0.58
            ),
            bodyMaterial
        );

        body.position.y = 0.035;

        body.castShadow = true;
        body.receiveShadow = true;

        keyboard.add(body);


        // =====================================================
        // RGB Underglow
        // =====================================================

        const rgbStrip = new THREE.Mesh(
            new THREE.BoxGeometry(
                1.55,
                0.012,
                0.025
            ),
            rgbMaterial
        );

        rgbStrip.position.set(
            0,
            0.075,
            0.285
        );

        keyboard.add(rgbStrip);


        // =====================================================
        // Keys
        // =====================================================

        const keyGeometry = new THREE.BoxGeometry(
            0.075,
            0.035,
            0.075
        );

        const startX = -0.63;
        const startZ = -0.19;

        for (let row = 0; row < 4; row++) {

            for (let col = 0; col < 14; col++) {

                const key = new THREE.Mesh(
                    keyGeometry,
                    keyMaterial
                );

                key.position.set(
                    startX + col * 0.092,
                    0.09,
                    startZ + row * 0.10
                );

                key.castShadow = true;

                keyboard.add(key);


                // RGB light underneath key

                const keyGlow = new THREE.Mesh(
                    new THREE.BoxGeometry(
                        0.052,
                        0.004,
                        0.052
                    ),
                    rgbMaterial
                );

                keyGlow.position.set(
                    key.position.x,
                    0.071,
                    key.position.z
                );

                keyboard.add(keyGlow);
            }
        }


        // =====================================================
        // Space Bar
        // =====================================================

        const spaceBar = new THREE.Mesh(
            new THREE.BoxGeometry(
                0.48,
                0.035,
                0.075
            ),
            keyMaterial
        );

        spaceBar.position.set(
            0,
            0.09,
            0.30
        );

        keyboard.add(spaceBar);


        // =====================================================
        // Enter Key
        // =====================================================

        const enterKey = new THREE.Mesh(
            new THREE.BoxGeometry(
                0.14,
                0.035,
                0.17
            ),
            keyMaterial
        );

        enterKey.position.set(
            0.60,
            0.09,
            0.05
        );

        keyboard.add(enterKey);


        // =====================================================
        // RGB Glow
        // =====================================================

        const glow = new THREE.PointLight(
            0x00e5ff,
            0.8,
            1.8
        );

        glow.position.set(
            0,
            0.12,
            0.20
        );

        keyboard.add(glow);


        parent.add(keyboard);
    }


    // =========================================================
    // MOUSE
    // =========================================================

    private createMouse(parent: THREE.Group): void {

        const mouse = new THREE.Group();


        // =====================================================
        // Materials
        // =====================================================

        const mouseMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x17191f,
            metalness: 0.25,
            roughness: 0.3,
            clearcoat: 0.8
        });

        const rgbMaterial = new THREE.MeshBasicMaterial({
            color: 0x00e5ff
        });


        // =====================================================
        // Mouse Body
        // =====================================================

        const body = new THREE.Mesh(
            new THREE.SphereGeometry(
                0.18,
                32,
                20
            ),
            mouseMaterial
        );

        body.scale.set(
            1,
            0.45,
            1.35
        );

        body.position.y = 0.12;

        body.castShadow = true;
        body.receiveShadow = true;

        mouse.add(body);


        // =====================================================
        // Scroll Wheel
        // =====================================================

        const wheel = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.035,
                0.035,
                0.018,
                20
            ),
            rgbMaterial
        );

        wheel.rotation.z = Math.PI / 2;

        wheel.position.set(
            0,
            0.19,
            -0.015
        );

        mouse.add(wheel);


        // =====================================================
        // RGB Strip
        // =====================================================

        const rgbStrip = new THREE.Mesh(
            new THREE.TorusGeometry(
                0.13,
                0.008,
                8,
                32
            ),
            rgbMaterial
        );

        rgbStrip.scale.z = 1.3;

        rgbStrip.rotation.x = Math.PI / 2;

        rgbStrip.position.y = 0.055;

        mouse.add(rgbStrip);


        // =====================================================
        // Mouse Position
        // =====================================================

        mouse.position.set(
            1.05,
            0,
            0.12
        );


        parent.add(mouse);
    }
}