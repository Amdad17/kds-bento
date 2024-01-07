import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  rootUrl = 'http://localhost:5000';

  authenticate (code: string) {
    return this.http.get(this.rootUrl + '/authenticate?code=' + code);
  }

}
