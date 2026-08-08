import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { ScreenTextureService } from './screen-texture.service';

@Injectable({
    providedIn: 'root'
})
export class MonitorService {
    constructor(
        private screenTexture: ScreenTextureService
    ) { }

    createMonitor(desk: THREE.Group, side: 'left' | 'right'): THREE.Group {

        const monitor = new THREE.Group();

        const metalMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xe5e5e5,
            metalness: 1,
            roughness: 0.18,
            clearcoat: 1
        });

        const frameMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x161616,
            metalness: 0.35,
            roughness: 0.45
        });

        // ==========================
        // Stand Base
        // ==========================

        const base = new THREE.Mesh(
            new THREE.CylinderGeometry(0.22, 0.28, 0.03, 64),
            metalMaterial
        );

        base.castShadow = true;
        monitor.add(base);

        // ==========================
        // Pole
        // ==========================

        const pole = new THREE.Mesh(
            new THREE.CylinderGeometry(0.025, 0.025, 0.75, 32),
            metalMaterial
        );

        pole.position.y = 0.32;
        pole.castShadow = true;
        monitor.add(pole);

        // ==========================
        // Arm
        // ==========================

        const arm = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.08, 0.05),
            metalMaterial
        );

        arm.position.y = 1.02;
        monitor.add(arm);

        // ==========================
        // Frame
        // ==========================

        const frameWidth = side === 'left' ? 1.75 : 0.95;
        const frameHeight = side === 'left' ? 1.00 : 1.65;

        const frame = new THREE.Mesh(
            new THREE.BoxGeometry(frameWidth, frameHeight, 0.05),
            frameMaterial
        );

        frame.position.y = 1.08;
        frame.castShadow = true;
        frame.receiveShadow = true;

        monitor.add(frame);

        // ==========================
        // Screen
        // ==========================

        const texture =
            side === 'left'
                ? this.screenTexture.createVSCodeTexture()
                : this.screenTexture.createSpringBootTexture();

        const screen = new THREE.Mesh(
            new THREE.PlaneGeometry(
                frameWidth - 0.10,
                frameHeight - 0.10
            ),
            new THREE.MeshBasicMaterial({
                map: texture,
                toneMapped: false
            })
        );

        screen.position.set(
            0,
            1.08,
            0.028
        );

        monitor.add(screen);

        // ==========================
        // Position
        // ==========================

        monitor.position.set(
            side === 'left' ? -0.70 : 0.90,
            0.05,
            -0.65
        );

        // ==========================
        // Cable
        // ==========================

        const cableMaterial = new THREE.MeshStandardMaterial({
            color: 0x111111
        });

        const cableCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 1.02, -0.04),
            new THREE.Vector3(0, 0.90, -0.08),
            new THREE.Vector3(0, 0.60, -0.20),
            new THREE.Vector3(
                side === 'left' ? -0.25 : 0.25,
                0.05,
                -0.42
            )
        ]);

        const cable = new THREE.Mesh(
            new THREE.TubeGeometry(
                cableCurve,
                32,
                0.008,
                8,
                false
            ),
            cableMaterial
        );

        monitor.add(cable);

        desk.add(monitor);

        return monitor;

    }

}