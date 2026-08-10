import { Injectable } from '@angular/core';
import * as THREE from 'three';

import { DeskService } from '../services/Desk.service';
import { MonitorService } from '../services/monitor.service';
import { LightsService } from '../services/lights.service';
import { PlatformService } from '../services/platform.service';
import { CameraService } from '../services/camera.service';
import { LaptopService } from '../services/laptop.service';
import { CarService } from '../services/car.service';
import { PlantService } from '../services/plant.service';
import { SocketService } from '../services/socket.service';
import { DrawerService } from '../services/drawer.service';
import { TablelampService } from '../services/tablelamp.service';
import { KeyboardMouseService } from '../services/keyboard-mouse.service';
import { ChairService } from '../services/chair.service';
import { DeveloperService } from '../services/developer.service';
@Injectable({
  providedIn: 'root'
}) export class SceneService {

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private world!: THREE.Group;


  private raycaster = new THREE.Raycaster();

  private mouse = new THREE.Vector2();

  private developer?: THREE.Group;

  private chair?: THREE.Group;

  private cameraTarget = new THREE.Vector3();

  private cameraLookTarget = new THREE.Vector3();

  private isDeveloperFocused = false;

  constructor(
    private deskService: DeskService,
    private monitorService: MonitorService,
    private lightsService: LightsService,
    private platformService: PlatformService,
    private cameraService: CameraService,
    private laptopService: LaptopService,
    private carService: CarService,
    private plantService: PlantService,
    private socketService: SocketService,
    private drawerService: DrawerService,
    private tablelampService: TablelampService,
    private keyboardMouseService: KeyboardMouseService,
    private chairService: ChairService,
    private developerService: DeveloperService
  ) { }

  init(canvas: HTMLCanvasElement): void {

    this.createScene();

    this.camera = this.cameraService.createCamera(canvas);

    this.createRenderer(canvas);

    this.renderer.domElement.addEventListener(
      'click',
      (event) => this.onDeveloperClick(event)
    );


    this.lightsService.createLights(this.scene);

    const platform = this.platformService.createPlatform(this.world);

    const desk = this.deskService.createDesk(platform);

    // Desk Accessories
    this.socketService.createSockets(desk);

    this.drawerService.createDrawer(desk);

    // Displays
    this.monitorService.createMonitor(desk, 'left');
    this.monitorService.createMonitor(desk, 'right');
    this.laptopService.createLaptop(desk);
    this.keyboardMouseService.createKeyboardAndMouse(desk);
    this.chair = this.chairService.createChair(this.world);
    this.developer = this.developerService.createDeveloper(this.world);
    // Decorations
    this.carService.createCars(desk);

    this.plantService.createPlant(desk);

    this.tablelampService.createLamp(desk);

    this.animate();

  }
  private createScene(): void {

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#08111f');

    this.world = new THREE.Group();
    this.scene.add(this.world);

  }

  private createRenderer(canvas: HTMLCanvasElement): void {

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });

    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;

  }

  private animate = (): void => {

    requestAnimationFrame(this.animate);

    const time = Date.now() * 0.0005;

    // =====================================================
    // Platform floating
    // =====================================================

    this.world.position.y =
      Math.sin(time * 2) * 0.08;


    // =====================================================
    // Developer Camera Focus
    // =====================================================

    if (this.isDeveloperFocused) {

      // Smooth camera movement

      this.camera.position.lerp(
        this.cameraTarget,
        0.05
      );


      // Smoothly look toward developer

      this.cameraLookTarget.lerp(
        this.developer
          ? new THREE.Vector3(
            this.developer.position.x,
            this.developer.position.y + 1.2,
            this.developer.position.z
          )
          : this.cameraLookTarget,
        0.05
      );

      this.camera.lookAt(
        this.cameraLookTarget
      );
    }


    // =====================================================
    // Render
    // =====================================================

    this.renderer.render(
      this.scene,
      this.camera
    );
  };


  private onDeveloperClick(
    event: MouseEvent
  ): void {

    // =====================================================
    // Mouse position → Normalized Device Coordinates
    // =====================================================

    const rect =
      this.renderer.domElement.getBoundingClientRect();

    this.mouse.x =
      (
        (event.clientX - rect.left) /
        rect.width
      ) * 2 - 1;

    this.mouse.y =
      -(
        (event.clientY - rect.top) /
        rect.height
      ) * 2 + 1;


    // =====================================================
    // Raycast
    // =====================================================

    this.raycaster.setFromCamera(
      this.mouse,
      this.camera
    );


    // =====================================================
    // Check Developer
    // =====================================================

    if (!this.developer) {
      return;
    }

    const intersections =
      this.raycaster.intersectObject(
        this.developer,
        true
      );


    // =====================================================
    // Developer Clicked
    // =====================================================

    if (intersections.length > 0) {

      console.log(
        'Developer clicked'
      );

      this.focusDeveloper();

      this.developerService.standDeveloper();
    }
  }

  private focusDeveloper(): void {

    if (!this.developer) {
      return;
    }

    // ================================================
    // Camera position
    // ================================================

    console.log("inside dev focus function")
    this.cameraTarget.set(
      this.developer.position.x + 2.8,
      this.developer.position.y + 2.5,
      this.developer.position.z + 3.0
    );


    // ================================================
    // Where the camera should look
    // ================================================

    this.cameraLookTarget.set(
      this.developer.position.x,
      this.developer.position.y + 1.2,
      this.developer.position.z
    );


    this.isDeveloperFocused = true;
  }
}