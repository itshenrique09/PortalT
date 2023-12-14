import { Component } from '@angular/core';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent {
  getStatus(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  }
}
