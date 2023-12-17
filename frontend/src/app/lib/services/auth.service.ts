import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials : true
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getRegister(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + 'register', new RegisterModel(firstName, lastName ,email, password), httpOptions).pipe(catchError(this.handleError));
  }

  getLogin(email: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + 'login', new LoginModel(email, password), httpOptions).pipe(catchError(this.handleError));
  }

  logedUser(): Observable<any>{
    return this.http.get(environment.apiUrl + 'users', httpOptions).pipe(catchError(this.handleError));
  }

  logout(): Observable<any>{
    return this.http.post(environment.apiUrl + 'logout', httpOptions).pipe(catchError(this.handleError));
  }

  getUsersByIds(id: any): Observable<any> {
    const url = `${environment.apiUrl}user/${id}`;
    return this.http.get(url, httpOptions).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => {
      return error;
    });
  }
}

export class RegisterModel {
  constructor(public firstName: string, public lastName: string ,public email: string, public password: string) { }
}

export class LoginModel {
  constructor(public email: string, public password: string) { }
}