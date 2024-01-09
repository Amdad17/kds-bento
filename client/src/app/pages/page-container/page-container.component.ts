import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrl: './page-container.component.css'
  
})
export class PageContainerComponent implements OnInit {
  paths = ['dashboard','display','rule-setter'];
  currentPath:string = '/dashboard'

  constructor(private route:Router, private api: ApiService){

  }

  user: IUser | undefined;

  ngOnInit(): void {
    this.route.events.subscribe(event =>{
      if(event instanceof NavigationStart) {
        this.currentPath=event.url
      }
    });

    this.api.getUser().subscribe(data => this.user = data.user);
  }
  parseName (path: string) {
    return path.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
  }
  isSelected (path: string) {
    return this.currentPath.slice(1) === path
  }


}
