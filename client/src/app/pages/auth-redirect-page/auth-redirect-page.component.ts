import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-auth-redirect-page',
  templateUrl: './auth-redirect-page.component.html',
  styleUrl: './auth-redirect-page.component.css'
})
export class AuthRedirectPageComponent implements OnInit {

  constructor (private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.api.authenticate(code).subscribe({
        next: () => {
          
        },
        error: () => window.location.href = 'https://bento-client.vercel.app/login'
      })
    } else window.location.href = 'https://bento-client.vercel.app/login';
  }

}
