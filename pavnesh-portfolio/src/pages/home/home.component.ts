import { Component } from '@angular/core';
import { NavbarComponent } from '../../app/feature/navbar/navbar.component';
import { HeroComponent } from '../../app/feature/hero/hero.component';
import { AboutComponent } from '../../app/feature/about/about.component';
import { SkillsComponent } from '../../app/feature/skills/skills.component';
import { ExperienceComponent } from '../../app/feature/experience/experience.component';
import { ProjectsComponent } from '../../app/feature/projects/projects.component';
import { ContactsComponent } from '../../app/feature/contacts/contacts.component';
import { FooterComponent } from '../../app/feature/footer/footer.component';

@Component({
  selector: 'app-home',
 imports:[
  NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactsComponent,
    FooterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
