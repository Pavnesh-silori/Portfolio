import { Component } from '@angular/core';
import { WorkspaceComponent } from '../../shared/components/workspace/workspace.component';
import { HERO_DATA } from './hero.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, WorkspaceComponent ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
 hero = HERO_DATA;
}
