import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isScrolled = signal(false);

  isMenuOpen = signal(false);

  navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 40);
  }

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  scrollTo(id: string) {

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }

    this.isMenuOpen.set(false);
  }

}