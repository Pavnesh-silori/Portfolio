import { Injectable } from '@angular/core';
import * as THREE from 'three';
@Injectable({
    providedIn: 'root'
})
export class PlatformService {

    constructor() { }
    

    createPlatform(world: THREE.Group): THREE.Group {
        
            const platform = new THREE.Group();
            // ==========================
            // Main Platform
            // ==========================
            const base = new THREE.Mesh(
                new THREE.CylinderGeometry(
                    2.9,
                    3.1,
                    0.35,
                    96
                ),
                new THREE.MeshPhysicalMaterial({
                    color: 0x222d4d,
                    metalness: 0.85,
                    roughness: 0.22,
                    clearcoat: 1,
                    clearcoatRoughness: 0
                })
            );
            base.castShadow = true;
            base.receiveShadow = true;
            platform.add(base);
            // ==========================
            // Top Plate
            // ==========================
            const top = new THREE.Mesh(
                new THREE.CylinderGeometry(
                    2.82,
                    2.82,
                    0.05,
                    96
                ),
                new THREE.MeshPhysicalMaterial({
                    color: 0x36466f,
                    metalness: 1,
                    roughness: 0.08
                })
            );
            top.position.y = 0.19;
            platform.add(top);
            // ==========================
            // Neon Ring
            // ==========================
            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(
                    2.93,
                    0.03,
                    16,
                    180
                ),
                new THREE.MeshBasicMaterial({
                    color: 0x00e8ff
                })
            );
            ring.rotation.x = Math.PI / 2;
            ring.position.y = 0.19;
            platform.add(ring);
            // ==========================
            // Bottom Glow
            // ==========================
            const glow = new THREE.Mesh(
                new THREE.CircleGeometry(
                    3.3,
                    64
                ),
                new THREE.MeshBasicMaterial({
                    color: 0x00e8ff,
                    transparent: true,
                    opacity: 0.10,
                    side: THREE.DoubleSide
                })
            );
            glow.rotation.x = -Math.PI / 2;
            glow.position.y = -0.18;
            platform.add(glow);
            platform.position.y = -1;
            world.add(platform);
            return platform;
        
    }
}
