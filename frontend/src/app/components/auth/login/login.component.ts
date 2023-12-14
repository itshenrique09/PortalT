import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../lib/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: any;
  password: any;
  errorMessage?: string;
  wrong?: boolean;
  
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.getLogin(this.email, this.password).subscribe({
      next: (data) => { 
          localStorage.setItem("token", data.token);
          this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error)
        this.errorMessage = error.error.message;
        this.wrong = true;
        setTimeout(() => { this.wrong = false; }, 3000);
      },
      complete: () => console.info('Auth completed')
    });
  }
}
