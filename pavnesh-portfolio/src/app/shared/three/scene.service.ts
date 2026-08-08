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
@Injectable({
    providedIn: 'root'
})export class SceneService {

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private world!: THREE.Group;

  constructor(
    private deskService: DeskService,
    private monitorService: MonitorService,
    private lightsService: LightsService,
    private platformService: PlatformService,
    private cameraService: CameraService,
    private laptopService: LaptopService,
    private carService: CarService,
    private plantService:PlantService,
    private socketService:SocketService,
    private drawerService:DrawerService,
    private tablelampService:TablelampService,
    private keyboardMouseService: KeyboardMouseService
  ) {}
init(canvas: HTMLCanvasElement): void {

    this.createScene();

    this.camera = this.cameraService.createCamera(canvas);

    this.createRenderer(canvas);

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

    this.world.rotation.y = time * 0.5;
    this.world.position.y = Math.sin(time * 2) * 0.08;

    this.renderer.render(this.scene, this.camera);

  };

}