import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  authenticate (code: string) {
    return this.http.get(environment.API_URL + '/auth/token/' + code);
  }

  testAuthentication () {
    return this.http.get(environment.API_URL + '/auth/test');
  }
}
