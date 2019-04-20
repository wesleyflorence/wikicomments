import { Injectable } from '@angular/core';
// import { User } from '../models/user.model.client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

    constructor(private _http: HttpClient, private router: Router, private sharedService: SharedService) { }
    baseUrl = environment.baseUrl;

    login(username: String, password: String) {
        const body = {
            username: username,
            password: password
        };
        return this._http.post(this.baseUrl + '/api/login', body, { withCredentials: true }).map((res: any) => {
            const data = res;
            return data;
        });
    }

    register(username: String, password: String) {
        const body = {
          username : username,
          password : password
        };
        return this._http.post(this.baseUrl + '/api/register', body, { withCredentials: true }).map((res: any) => {
            const data = res;
            return data;
        });
    }

    logout() {
        return this._http.post(this.baseUrl + '/api/logout', '', { withCredentials: true }).map((res: any) => {
            const data = res;
            return data;
        })
    }

    loggedIn() {
        return this._http.post(this.baseUrl + '/api/loggedIn', '', { withCredentials: true })
          .map(
            (res: any) => {
              const user = res;
              if (user != '0') {
                this.sharedService.user = user;
                return true;
              } else {
                this.router.navigate(['/login']);
                return false;
              }
            }
          );
      }
}