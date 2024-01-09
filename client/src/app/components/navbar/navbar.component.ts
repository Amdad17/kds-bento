import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() user : IUser | undefined;

  logout () {
    localStorage.removeItem('accessToken');
    window.location.href = 'https://bento-client.vercel.app/login';
  }
}