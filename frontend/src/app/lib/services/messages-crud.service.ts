import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials : true
};

@Injectable({
  providedIn: 'root'
})
export class MessagesCrudService {

  constructor(private http: HttpClient) { }

  saveMessage(id: string, message: string): Observable<any> {
    return this.http.post(environment.apiUrl + 'save',new MessagesModel(id, message) ,httpOptions).pipe(catchError(this.handleError));
  }

  allMessage(): Observable<any> {
    return this.http.get(environment.apiUrl + 'messages',httpOptions).pipe(catchError(this.handleError));
  }

  deleteMessage(id: any): Observable<any> {
    const url = `${environment.apiUrl}delete/${id}`;
    return this.http.delete(url, httpOptions).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => {
      return error;
    });
  }
}

export class MessagesModel {
  constructor(public id: string, public message: string ) { }
}
