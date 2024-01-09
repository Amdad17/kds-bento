import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ToastMessageService } from './services/toast-message/toast-message.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor (private message: NzMessageService, private toast: ToastMessageService) {}

  ngOnInit(): void {
    this.toast.getMessages().subscribe(data => this.message.create(data.type, data.message));
  }
}
