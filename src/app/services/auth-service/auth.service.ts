import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  // backend url
  public authApiUrl: any = 'http://laracurrency.test';
  // add json to content type call
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  public data: any = '';
  // add authenticated to false by default
  authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  authGuard: boolean = false;

  constructor(public http: HttpClient) {
    if (localStorage.getItem("token")) {
      this.appendHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
      this.authenticated.next(true);
      this.authGuard = true;
    }
  }
  // get login api url
  loginData(body?: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.authApiUrl}/api/login`, body)
        .subscribe((res: any) => {
          console.log(res.token);
          if (res) {
            this.appendHeader('Authorization', `Bearer ${res.token}`);
            localStorage.setItem('token', res.token);
            this.authenticated.next(true);
            this.authGuard = true;
          }
        }, (err) => {
          console.log(err);
        });
    })
  }

  registerData(body?: any) {
    this.http.post(`${this.authApiUrl}/api/register`, body)
      .subscribe((res: any) => {
        console.log(res);
        console.log('register');
      }, (err) => {
        console.log('err register', err);
      });
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.authApiUrl}/api/user`, { headers: this.headers })
        .subscribe((res) => {
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.DeleteHeader("Authorization");
      localStorage.removeItem("token");
      this.authenticated.next(false);
      this.authGuard = false;
      resolve();
    })
  }

  authChangeObs() {
    return this.authenticated.asObservable();
  }

  // headers actions
  private getHeader(key: string) {
    return this.headers.get(key);
  }

  private appendHeader(key: string, value: any) {
    this.headers = this.headers.append(key, value);
  }

  private DeleteHeader(key: string, value?: any) {
    this.headers = this.headers.delete(key, value);
  }

}
