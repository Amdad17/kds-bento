import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IUser } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  authenticate (code: string) {
    return this.http.get(environment.API_URL + '/auth/token/' + code);
  }

  getUser () : Observable<{ user: IUser }> {
    return this.http.get<{ user: IUser }>(environment.API_URL + '/auth/user');
  }
}
