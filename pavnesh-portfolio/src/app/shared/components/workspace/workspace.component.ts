import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { SceneService } from '../../three/scene.service';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent implements AfterViewInit {


  @ViewChild('sceneCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(private sceneService: SceneService) {}

  ngAfterViewInit(): void {
    this.sceneService.init(this.canvasRef.nativeElement);
  }

}