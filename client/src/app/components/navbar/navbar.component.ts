import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  logout () {
    localStorage.removeItem('accessToken');
    window.location.href = 'https://bento-client.vercel.app/login';
  }
}