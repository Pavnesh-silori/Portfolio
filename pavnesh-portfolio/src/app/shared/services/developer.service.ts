import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

@Injectable({
    providedIn: 'root'
})
export class DeveloperService {

    private developer!: THREE.Group;

    private torso!: THREE.Object3D;
    private head!: THREE.Object3D;

    private leftUpperLeg!: THREE.Object3D;
    private rightUpperLeg!: THREE.Object3D;

    private leftLowerLeg!: THREE.Object3D;
    private rightLowerLeg!: THREE.Object3D;

    private hoodieLower!: THREE.Object3D;

    private isStanding = false;
    constructor() { }

    // =====================================================
    // CREATE DEVELOPER
    // =====================================================

    private createBlock(
        width: number,
        height: number,
        depth: number,
        material: THREE.Material,
        radius = 0.04
    ): THREE.Mesh {

        const geometry = new RoundedBoxGeometry(
            width,
            height,
            depth,
            4,
            radius
        );

        const mesh = new THREE.Mesh(
            geometry,
            material
        );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }

    createDeveloper(world: THREE.Group): THREE.Group {

        this.developer = new THREE.Group();

        const developer = this.developer;

        this.createTorso(developer);
        this.createHead(developer);
        this.createHood(developer);
        this.createHair(developer);
        this.createGlasses(developer);
        this.createArms(developer);
        this.createLegs(developer);
        this.createHoodieText(developer);

        // =================================================
        // Developer Position
        // =================================================

        developer.position.set(
            0.1,
            -0.7,
            1.92,
        );

        // Face the desk

        world.add(developer);

        return developer;
    }

    // =====================================================
    // Developer Stand Up
    // =====================================================

   standDeveloper(): void {

    if (!this.developer) {
        return;
    }

    if (this.isStanding) {
        return;
    }

    this.isStanding = true;

    const duration = 1000;

    const startTime = performance.now();

    // =====================================================
    // Starting position
    // =====================================================

    const startY =
        this.developer.position.y;

    const startZ =
        this.developer.position.z;


    // =====================================================
    // Standing position
    // =====================================================

    const targetY =
        startY + 0.45;

    const targetZ =
        startZ - 0.65;


    // =====================================================
    // Animation
    // =====================================================

    const animateStand = (
        currentTime: number
    ): void => {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        // Smooth easing

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        // =================================================
        // Move ENTIRE developer
        // =================================================

        this.developer.position.y =
            THREE.MathUtils.lerp(
                startY,
                targetY,
                eased
            );

        this.developer.position.z =
            THREE.MathUtils.lerp(
                startZ,
                targetZ,
                eased
            );


        // =================================================
        // Continue animation
        // =================================================

        if (progress < 1) {

            requestAnimationFrame(
                animateStand
            );

        }

    };


    requestAnimationFrame(
        animateStand
    );
}

    // =====================================================
    // TORSO / HOODIE
    // =====================================================

    private createTorso(
        developer: THREE.Group
    ): void {

        const hoodieMaterial =
            new THREE.MeshPhysicalMaterial({
                color: 0x090a0c,
                metalness: 0.02,
                roughness: 0.72,
                clearcoat: 0.3
            });

        // =====================================================
        // Main Hoodie Body
        // =====================================================

        const torso = this.createBlock(
            0.55,
            0.65,
            0.34,
            hoodieMaterial,
            0.08
        );

        this.torso = torso;
        torso.position.set(
            0,
            1.48,
            0
        );

        developer.add(torso);


        // =====================================================
        // Hoodie Lower Section
        // =====================================================

        const lower = this.createBlock(
            0.60,
            0.18,
            0.36,
            hoodieMaterial,
            0.06
        );

        this.hoodieLower = lower;
        lower.position.set(
            0,
            1.16,
            0
        );

        developer.add(lower);
    }

    // =====================================================
    // HEAD
    // =====================================================

    private createHead(
        developer: THREE.Group
    ): void {

        const skinMaterial =
            new THREE.MeshPhysicalMaterial({
                color: 0xc98c70,
                roughness: 0.68,
                metalness: 0
            });


        // =====================================================
        // NECK
        // =====================================================

        const neck = this.createBlock(
            0.16,
            0.18,
            0.16,
            skinMaterial,
            0.035
        );

        neck.position.set(
            0,
            1.84,
            0
        );

        developer.add(neck);


        // =====================================================
        // BLOCK HEAD
        // =====================================================

        const head = this.createBlock(
            0.42,
            0.42,
            0.40,
            skinMaterial,
            0.055
        );

        head.position.set(
            0,
            2.08,
            0
        );

        head.castShadow = true;
        head.receiveShadow = true;

        developer.add(head);


        // =====================================================
        // EARS
        // =====================================================

        const leftEar = this.createBlock(
            0.07,
            0.11,
            0.07,
            skinMaterial,
            0.025
        );

        leftEar.position.set(
            -0.235,
            2.08,
            0
        );

        developer.add(leftEar);


        const rightEar = this.createBlock(
            0.07,
            0.11,
            0.07,
            skinMaterial,
            0.025
        );

        rightEar.position.set(
            0.235,
            2.08,
            0
        );

        developer.add(rightEar);


        // =====================================================
        // NOSE
        // =====================================================

        const nose = this.createBlock(
            0.055,
            0.07,
            0.06,
            skinMaterial,
            0.015
        );

        nose.position.set(
            0,
            2.04,
            -0.225
        );

        developer.add(nose);


        // =====================================================
        // EYES
        // =====================================================

        const eyeMaterial =
            new THREE.MeshBasicMaterial({
                color: 0x111111
            });


        const leftEye = new THREE.Mesh(
            new THREE.BoxGeometry(
                0.035,
                0.035,
                0.015
            ),
            eyeMaterial
        );

        leftEye.position.set(
            -0.075,
            2.09,
            -0.212
        );

        developer.add(leftEye);


        const rightEye = new THREE.Mesh(
            new THREE.BoxGeometry(
                0.035,
                0.035,
                0.015
            ),
            eyeMaterial
        );

        rightEye.position.set(
            0.075,
            2.09,
            -0.212
        );

        developer.add(rightEye);
    }


    // =====================================================
    // HAIR
    // =====================================================

    private createHair(
        developer: THREE.Group
    ): void {

        const hairMaterial =
            new THREE.MeshPhysicalMaterial({
                color: 0x17110e,
                metalness: 0.02,
                roughness: 0.68
            });


        // =====================================================
        // TOP HAIR
        // =====================================================

        const topHair = this.createBlock(
            0.44,
            0.12,
            0.40,
            hairMaterial,
            0.045
        );

        topHair.position.set(
            0,
            2.30,
            0
        );

        topHair.castShadow = true;

        developer.add(topHair);


        // =====================================================
        // BACK HAIR
        // =====================================================

        const backHair = this.createBlock(
            0.44,
            0.28,
            0.10,
            hairMaterial,
            0.035
        );

        /*
         * The developer's face is toward -Z.
         *
         * Therefore +Z is the back of his head.
         */

        backHair.position.set(
            0,
            2.18,
            0.19
        );

        backHair.castShadow = true;

        developer.add(backHair);


        // =====================================================
        // LEFT SIDE HAIR
        // =====================================================

        const leftHair = this.createBlock(
            0.08,
            0.24,
            0.30,
            hairMaterial,
            0.03
        );

        leftHair.position.set(
            -0.20,
            2.20,
            0.03
        );

        leftHair.castShadow = true;

        developer.add(leftHair);


        // =====================================================
        // RIGHT SIDE HAIR
        // =====================================================

        const rightHair = this.createBlock(
            0.08,
            0.24,
            0.30,
            hairMaterial,
            0.03
        );

        rightHair.position.set(
            0.20,
            2.20,
            0.03
        );

        rightHair.castShadow = true;

        developer.add(rightHair);


        // =====================================================
        // FRONT HAIRLINE
        // =====================================================

        const frontHair = this.createBlock(
            0.40,
            0.10,
            0.07,
            hairMaterial,
            0.025
        );

        frontHair.position.set(
            0,
            2.25,
            -0.19
        );

        frontHair.castShadow = true;

        developer.add(frontHair);


        // =====================================================
        // SMALL FRONT HAIR LOCKS
        // =====================================================

        const lockGeometry = new THREE.BoxGeometry(
            0.07,
            0.12,
            0.06
        );


        const leftLock = new THREE.Mesh(
            lockGeometry,
            hairMaterial
        );

        leftLock.position.set(
            -0.13,
            2.22,
            -0.205
        );

        leftLock.rotation.z =
            THREE.MathUtils.degToRad(-12);

        leftLock.castShadow = true;

        developer.add(leftLock);


        const middleLock = new THREE.Mesh(
            lockGeometry,
            hairMaterial
        );

        middleLock.position.set(
            0,
            2.24,
            -0.21
        );

        middleLock.rotation.z =
            THREE.MathUtils.degToRad(2);

        middleLock.castShadow = true;

        developer.add(middleLock);


        const rightLock = new THREE.Mesh(
            lockGeometry,
            hairMaterial
        );

        rightLock.position.set(
            0.13,
            2.22,
            -0.205
        );

        rightLock.rotation.z =
            THREE.MathUtils.degToRad(12);

        rightLock.castShadow = true;

        developer.add(rightLock);
    }

    // =====================================================
    // HOOD
    // =====================================================

    private createHood(
        developer: THREE.Group
    ): void {

        const hoodMaterial =
            new THREE.MeshPhysicalMaterial({
                color: 0x050608,
                metalness: 0.02,
                roughness: 0.78,
                clearcoat: 0.2
            });


        // =====================================================
        // HOOD BACK
        // =====================================================

        const hoodBack = new THREE.Mesh(
            new THREE.SphereGeometry(
                0.29,
                24,
                18,
                0,
                Math.PI * 2,
                Math.PI * 0.35,
                Math.PI * 0.45
            ),
            hoodMaterial
        );

        hoodBack.scale.set(
            1.12,
            1.12,
            0.82
        );

        /*
         * Move it BEHIND the head.
         *
         * Local -Z = face
         * Local +Z = back
         */

        hoodBack.position.set(
            0,
            2.08,
            0.10
        );

        hoodBack.castShadow = true;

        developer.add(hoodBack);


        // =====================================================
        // HOOD RIM
        // =====================================================

        const hoodRim = new THREE.Mesh(
            new THREE.TorusGeometry(
                0.245,
                0.045,
                12,
                32
            ),
            hoodMaterial
        );

        hoodRim.rotation.x =
            Math.PI / 2;

        hoodRim.position.set(
            0,
            2.06,
            0.015
        );

        hoodRim.scale.set(
            1.05,
            1.0,
            0.85
        );

        developer.add(hoodRim);


        // =====================================================
        // HOOD STRINGS
        // =====================================================

        const stringMaterial =
            new THREE.MeshBasicMaterial({
                color: 0xb8b8b8
            });


        const leftString = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.007,
                0.007,
                0.18,
                8
            ),
            stringMaterial
        );

        leftString.position.set(
            -0.055,
            1.88,
            -0.18
        );

        developer.add(leftString);


        const rightString = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.007,
                0.007,
                0.18,
                8
            ),
            stringMaterial
        );

        rightString.position.set(
            0.055,
            1.88,
            -0.18
        );

        developer.add(rightString);
    }

    // =====================================================
    // BLOCK GLASSES
    // =====================================================

    private createGlasses(
        developer: THREE.Group
    ): void {

        const frameMaterial =
            new THREE.MeshPhysicalMaterial({
                color: 0x050505,
                metalness: 0.4,
                roughness: 0.28
            });

        const lensMaterial =
            new THREE.MeshPhysicalMaterial({
                color: 0x1d2733,
                transparent: true,
                opacity: 0.25,
                roughness: 0.1,
                metalness: 0.1
            });


        // Left frame

        const leftFrame = new THREE.Mesh(
            new THREE.BoxGeometry(
                0.13,
                0.09,
                0.025
            ),
            frameMaterial
        );

        leftFrame.position.set(
            -0.075,
            2.085,
            -0.222
        );

        developer.add(leftFrame);


        // Right frame

        const rightFrame = leftFrame.clone();

        rightFrame.position.x = 0.075;

        developer.add(rightFrame);


        // Left lens

        const leftLens = new THREE.Mesh(
            new THREE.BoxGeometry(
                0.105,
                0.065,
                0.008
            ),
            lensMaterial
        );

        leftLens.position.set(
            -0.075,
            2.085,
            -0.238
        );

        developer.add(leftLens);


        // Right lens

        const rightLens = leftLens.clone();

        rightLens.position.x = 0.075;

        developer.add(rightLens);


        // Bridge

        const bridge = new THREE.Mesh(
            new THREE.BoxGeometry(
                0.055,
                0.018,
                0.025
            ),
            frameMaterial
        );

        bridge.position.set(
            0,
            2.085,
            -0.222
        );

        developer.add(bridge);


        // Side arms

        const leftArm = new THREE.Mesh(
            new THREE.BoxGeometry(
                0.15,
                0.018,
                0.018
            ),
            frameMaterial
        );

        leftArm.position.set(
            -0.15,
            2.085,
            -0.01
        );

        leftArm.rotation.y =
            THREE.MathUtils.degToRad(8);

        developer.add(leftArm);


        const rightArm = leftArm.clone();

        rightArm.position.x = 0.15;

        rightArm.rotation.y =
            THREE.MathUtils.degToRad(-8);

        developer.add(rightArm);
    }


    // =====================================================
    // ARMS
    // =====================================================
    private createArms(
        developer: THREE.Group
    ): void {

        const hoodieMaterial =
            new THREE.MeshPhysicalMaterial({
                color: 0x090a0c,
                metalness: 0.02,
                roughness: 0.72,
                clearcoat: 0.25
            });

        const skinMaterial =
            new THREE.MeshPhysicalMaterial({
                color: 0xc98c70,
                roughness: 0.68
            });


        // =====================================================
        // ARM DIMENSIONS
        // =====================================================

        const upperLength = 0.34;
        const forearmLength = 0.34;

        /*
         * Higher shoulder.
         *
         * This is the main change that brings the arms
         * above the desk.
         */

        const shoulderY = 1.82;

        /*
         * Upper arm goes down toward the elbow.
         */

        const upperAngle =
            THREE.MathUtils.degToRad(40);

        /*
         * Forearm is almost horizontal and goes
         * forward toward the keyboard.
         */

        const forearmAngle =
            THREE.MathUtils.degToRad(85);


        // =====================================================
        // LEFT SHOULDER
        // =====================================================

        const leftShoulder = new THREE.Vector3(
            -0.29,
            shoulderY,
            -0.02
        );


        // =====================================================
        // LEFT UPPER ARM
        // =====================================================

        const leftUpperArm = this.createBlock(
            0.16,
            upperLength,
            0.16,
            hoodieMaterial,
            0.05
        );

        const leftUpperCenter =
            new THREE.Vector3(
                leftShoulder.x,

                leftShoulder.y -
                (upperLength / 2) *
                Math.cos(upperAngle),

                leftShoulder.z -
                (upperLength / 2) *
                Math.sin(upperAngle)
            );

        leftUpperArm.position.copy(
            leftUpperCenter
        );

        leftUpperArm.rotation.x =
            upperAngle;

        developer.add(leftUpperArm);


        // =====================================================
        // LEFT ELBOW
        // =====================================================

        const leftElbow =
            new THREE.Vector3(
                leftShoulder.x,

                leftShoulder.y -
                upperLength *
                Math.cos(upperAngle),

                leftShoulder.z -
                upperLength *
                Math.sin(upperAngle)
            );


        // =====================================================
        // LEFT FOREARM
        // =====================================================

        const leftForearm = this.createBlock(
            0.15,
            forearmLength,
            0.15,
            hoodieMaterial,
            0.045
        );

        const leftForearmCenter =
            new THREE.Vector3(
                leftElbow.x,

                leftElbow.y -
                (forearmLength / 2) *
                Math.cos(forearmAngle),

                leftElbow.z -
                (forearmLength / 2) *
                Math.sin(forearmAngle)
            );

        leftForearm.position.copy(
            leftForearmCenter
        );

        leftForearm.rotation.x =
            forearmAngle;

        developer.add(leftForearm);


        // =====================================================
        // LEFT WRIST
        // =====================================================

        const leftWrist =
            new THREE.Vector3(
                leftElbow.x,

                leftElbow.y -
                forearmLength *
                Math.cos(forearmAngle),

                leftElbow.z -
                forearmLength *
                Math.sin(forearmAngle)
            );


        // =====================================================
        // LEFT HAND
        // =====================================================

        const leftHand = this.createBlock(
            0.14,
            0.07,
            0.18,
            skinMaterial,
            0.035
        );

        leftHand.position.copy(
            leftWrist
        );

        developer.add(leftHand);


        // =====================================================
        // RIGHT SHOULDER
        // =====================================================

        const rightShoulder = new THREE.Vector3(
            0.29,
            shoulderY,
            -0.02
        );


        // =====================================================
        // RIGHT UPPER ARM
        // =====================================================

        const rightUpperArm = this.createBlock(
            0.16,
            upperLength,
            0.16,
            hoodieMaterial,
            0.05
        );

        const rightUpperCenter =
            new THREE.Vector3(
                rightShoulder.x,

                rightShoulder.y -
                (upperLength / 2) *
                Math.cos(upperAngle),

                rightShoulder.z -
                (upperLength / 2) *
                Math.sin(upperAngle)
            );

        rightUpperArm.position.copy(
            rightUpperCenter
        );

        rightUpperArm.rotation.x =
            upperAngle;

        developer.add(rightUpperArm);


        // =====================================================
        // RIGHT ELBOW
        // =====================================================

        const rightElbow =
            new THREE.Vector3(
                rightShoulder.x,

                rightShoulder.y -
                upperLength *
                Math.cos(upperAngle),

                rightShoulder.z -
                upperLength *
                Math.sin(upperAngle)
            );


        // =====================================================
        // RIGHT FOREARM
        // =====================================================

        const rightForearm = this.createBlock(
            0.15,
            forearmLength,
            0.15,
            hoodieMaterial,
            0.045
        );

        const rightForearmCenter =
            new THREE.Vector3(
                rightElbow.x,

                rightElbow.y -
                (forearmLength / 2) *
                Math.cos(forearmAngle),

                rightElbow.z -
                (forearmLength / 2) *
                Math.sin(forearmAngle)
            );

        rightForearm.position.copy(
            rightForearmCenter
        );

        rightForearm.rotation.x =
            forearmAngle;

        developer.add(rightForearm);


        // =====================================================
        // RIGHT WRIST
        // =====================================================

        const rightWrist =
            new THREE.Vector3(
                rightElbow.x,

                rightElbow.y -
                forearmLength *
                Math.cos(forearmAngle),

                rightElbow.z -
                forearmLength *
                Math.sin(forearmAngle)
            );


        // =====================================================
        // RIGHT HAND
        // =====================================================

        const rightHand = this.createBlock(
            0.14,
            0.07,
            0.18,
            skinMaterial,
            0.035
        );

        rightHand.position.copy(
            rightWrist
        );

        developer.add(rightHand);
    }

    // =====================================================
    // LEGS
    // =====================================================

    private createLegs(
        developer: THREE.Group
    ): void {

        const jeansMaterial =
            new THREE.MeshPhysicalMaterial({
                color: 0x171b25,
                metalness: 0.02,
                roughness: 0.75
            });

        const shoeMaterial =
            new THREE.MeshPhysicalMaterial({
                color: 0x070809,
                metalness: 0.1,
                roughness: 0.55
            });


        // =====================================================
        // LEFT THIGH
        // =====================================================

        const leftThigh = this.createBlock(
            0.20,
            0.48,
            0.20,
            jeansMaterial,
            0.05
        );

        this.leftUpperLeg = leftThigh;
        leftThigh.position.set(
            -0.16,
            0.82,
            -0.28
        );

        leftThigh.rotation.x =
            THREE.MathUtils.degToRad(90);

        developer.add(leftThigh);


        // =====================================================
        // RIGHT THIGH
        // =====================================================

        const rightThigh = this.createBlock(
            0.20,
            0.48,
            0.20,
            jeansMaterial,
            0.05
        );

        this.rightUpperLeg = rightThigh;
        rightThigh.position.set(
            0.16,
            0.82,
            -0.28
        );

        rightThigh.rotation.x =
            THREE.MathUtils.degToRad(90);

        developer.add(rightThigh);


        // =====================================================
        // LEFT LOWER LEG
        // =====================================================

        const leftShin = this.createBlock(
            0.18,
            0.42,
            0.18,
            jeansMaterial,
            0.045
        );
        this.leftLowerLeg = leftShin;
        leftShin.position.set(
            -0.16,
            0.58,
            -0.60
        );

        developer.add(leftShin);


        // =====================================================
        // RIGHT LOWER LEG
        // =====================================================

        const rightShin = this.createBlock(
            0.18,
            0.42,
            0.18,
            jeansMaterial,
            0.045
        );
        this.rightLowerLeg = rightShin;
        rightShin.position.set(
            0.16,
            0.58,
            -0.60
        );

        developer.add(rightShin);


        // =====================================================
        // LEFT SHOE
        // =====================================================

        const leftShoe = this.createBlock(
            0.22,
            0.14,
            0.36,
            shoeMaterial,
            0.035
        );

        leftShoe.position.set(
            -0.16,
            0.38,
            -0.66
        );

        developer.add(leftShoe);


        // =====================================================
        // RIGHT SHOE
        // =====================================================

        const rightShoe = this.createBlock(
            0.22,
            0.14,
            0.36,
            shoeMaterial,
            0.035
        );

        rightShoe.position.set(
            0.16,
            0.38,
            -0.66
        );

        developer.add(rightShoe);
    }

    // =====================================================
    // HOODIE TEXT
    // =====================================================

    private createHoodieText(
        developer: THREE.Group
    ): void {

        const canvas =
            document.createElement('canvas');

        canvas.width = 512;
        canvas.height = 256;

        const ctx =
            canvas.getContext('2d')!;

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // First line

        ctx.font =
            'bold 42px Consolas';

        ctx.textAlign = 'center';

        ctx.fillStyle =
            '#eeeeee';

        ctx.fillText(
            'first commit',
            256,
            105
        );


        // Second line

        ctx.font =
            'bold 38px Consolas';

        ctx.fillStyle =
            '#48d597';

        ctx.fillText(
            '> logoff',
            256,
            155
        );


        const texture =
            new THREE.CanvasTexture(canvas);

        texture.colorSpace =
            THREE.SRGBColorSpace;

        texture.needsUpdate = true;


        const textMaterial =
            new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                depthWrite: false
            });


        const text = new THREE.Mesh(
            new THREE.PlaneGeometry(
                0.34,
                0.17
            ),
            textMaterial
        );

        text.position.set(
            0,
            1.51,
            -0.235
        );

        text.renderOrder = 2;

        developer.add(text);
    }
}