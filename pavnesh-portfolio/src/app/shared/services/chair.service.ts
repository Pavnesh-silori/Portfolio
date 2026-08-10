import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
    providedIn: 'root'
})
export class ChairService {

    constructor() { }

    createChair(world: THREE.Group): THREE.Group {

        const chair = new THREE.Group();

        // =====================================================
        // Materials
        // =====================================================

        const blackMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x111216,
            metalness: 0.05,
            roughness: 0.62,
            clearcoat: 0.35
        });

        const darkMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x1b1d22,
            metalness: 0.05,
            roughness: 0.72,
            clearcoat: 0.25
        });

        const metalMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x343941,
            metalness: 0.95,
            roughness: 0.22,
            clearcoat: 0.5
        });

        const wheelMaterial = new THREE.MeshStandardMaterial({
            color: 0x07080a,
            roughness: 0.72
        });


        // =====================================================
        // SEAT
        // =====================================================
        const seat = new THREE.Mesh(
            new THREE.BoxGeometry(
                1.00,
                0.16,
                0.82,
                6,
                0.08
            ),
            blackMaterial
        );

        seat.position.set(
            0,
            1.05,
            0
        );

        seat.castShadow = true;
        seat.receiveShadow = true;

        chair.add(seat);


        // =====================================================
        // SEAT CUSHION
        // =====================================================

        const cushion = new THREE.Mesh(
            new THREE.BoxGeometry(
                0.88,
                0.10,
                0.70
            ),
            darkMaterial
        );

        cushion.position.set(
            0,
            1.15,
            -0.02
        );

        cushion.castShadow = true;
        cushion.receiveShadow = true;

        chair.add(cushion);


        // =====================================================
        // BACKREST
        // =====================================================

        const backrest = new THREE.Mesh(
            new THREE.CapsuleGeometry(
                0.46,
                0.75,
                8,
                24
            ),
            blackMaterial
        );

        backrest.scale.set(
            0.95,
            1.0,
            0.34
        );

        backrest.position.set(
            0,
            1.70,
            0.30
        );

        // Slight ergonomic recline

        backrest.rotation.x =
            THREE.MathUtils.degToRad(-7);

        backrest.castShadow = true;
        backrest.receiveShadow = true;

        chair.add(backrest);


        // =====================================================
        // BACKREST INNER CUSHION
        // =====================================================

        const innerBack = new THREE.Mesh(
            new THREE.CapsuleGeometry(
                0.38,
                0.62,
                8,
                20
            ),
            darkMaterial
        );

        innerBack.scale.set(
            0.90,
            1.0,
            0.22
        );

        innerBack.position.set(
            0,
            1.70,
            0.24
        );

        innerBack.rotation.x =
            THREE.MathUtils.degToRad(-7);

        chair.add(innerBack);


        // =====================================================
        // HEADREST
        // =====================================================

        const headrest = new THREE.Mesh(
            new THREE.CapsuleGeometry(
                0.20,
                0.20,
                8,
                20
            ),
            blackMaterial
        );

        headrest.scale.set(
            1.15,
            0.80,
            0.38
        );

        headrest.position.set(
            0,
            2.40,
            0.27
        );

        headrest.castShadow = true;

        chair.add(headrest);


        // =====================================================
        // HEADREST SUPPORTS
        // =====================================================

        const supportMaterial = metalMaterial;

        const leftSupport = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.018,
                0.018,
                0.28,
                12
            ),
            supportMaterial
        );

        leftSupport.position.set(
            -0.13,
            2.27,
            0.29
        );

        chair.add(leftSupport);


        const rightSupport = leftSupport.clone();

        rightSupport.position.x = 0.13;

        chair.add(rightSupport);


        // =====================================================
        // ARMRESTS
        // =====================================================

        this.createArmrest(
            chair,
            -0.62,
            1.32,
            0
        );

        this.createArmrest(
            chair,
            0.62,
            1.32,
            0
        );


        // =====================================================
        // HYDRAULIC GAS LIFT
        // =====================================================

        const hydraulic = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.055,
                0.075,
                0.62,
                24
            ),
            metalMaterial
        );

        hydraulic.position.y = 0.70;

        hydraulic.castShadow = true;

        chair.add(hydraulic);


        // =====================================================
        // LOWER COLLAR
        // =====================================================

        const collar = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.12,
                0.12,
                0.08,
                32
            ),
            metalMaterial
        );

        collar.position.y = 0.40;

        chair.add(collar);


        // =====================================================
        // FIVE-STAR BASE
        // =====================================================

        const base = new THREE.Group();

        const baseLength = 0.62;

        for (let i = 0; i < 5; i++) {

            const leg = new THREE.Mesh(
                new THREE.BoxGeometry(
                    baseLength,
                    0.055,
                    0.10
                ),
                metalMaterial
            );

            leg.position.set(
                0,
                0,
                baseLength / 2
            );

            leg.rotation.y =
                THREE.MathUtils.degToRad(
                    i * 72
                );

            leg.castShadow = true;

            base.add(leg);
        }

        base.position.y = 0.38;

        chair.add(base);


        // =====================================================
        // WHEELS
        // =====================================================

        const wheelRadius = 0.075;

        const wheelDistance = 0.52;

        for (let i = 0; i < 5; i++) {

            const angle =
                THREE.MathUtils.degToRad(
                    i * 72
                );

            const wheel = new THREE.Mesh(
                new THREE.CylinderGeometry(
                    wheelRadius,
                    wheelRadius,
                    0.055,
                    20
                ),
                wheelMaterial
            );

            wheel.rotation.z =
                Math.PI / 2;

            wheel.position.set(
                Math.cos(angle) * wheelDistance,
                0.27,
                Math.sin(angle) * wheelDistance
            );

            wheel.castShadow = true;

            chair.add(wheel);
        }


        // =====================================================
        // CHAIR POSITION
        // =====================================================

        chair.position.set(
            0,
            -1,
            2.0
        );


        // =====================================================
        // ADD TO WORLD
        // =====================================================

        world.add(chair);

        return chair;
    }


    // =========================================================
    // ARMREST
    // =========================================================

    private createArmrest(
        chair: THREE.Group,
        x: number,
        y: number,
        z: number
    ): void {

        const armMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x15171b,
            metalness: 0.15,
            roughness: 0.48,
            clearcoat: 0.5
        });

        const metalMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x343941,
            metalness: 0.95,
            roughness: 0.22,
            clearcoat: 0.5
        });


        // =====================================================
        // Vertical Armrest Support
        // =====================================================

        const support = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.035,
                0.045,
                0.35,
                16
            ),
            armMaterial
        );

        support.position.set(
            x,
            y - 0.17,
            z
        );

        support.castShadow = true;

        chair.add(support);


        // =====================================================
        // Armrest Pad
        // =====================================================

        const pad = new THREE.Mesh(
            new THREE.CapsuleGeometry(
                0.08,
                0.37,
                0.02
            ),
            armMaterial
        );
        pad.rotation.y = THREE.MathUtils.degToRad(90);
        pad.rotation.z =
            THREE.MathUtils.degToRad(90);

        pad.scale.z = 0.55;

        pad.position.set(
            x,
            y,
            z - 0.02
        );

        pad.castShadow = true;

        chair.add(pad);


        // =====================================================
        // Metal Connector
        // =====================================================

        const connector = new THREE.Mesh(
            new THREE.BoxGeometry(
                0.08,
                0.04,
                0.10
            ),
            metalMaterial
        );

        connector.position.set(
            x,
            y - 0.04,
            z
        );

        connector.castShadow = true;

        chair.add(connector);
    }
}