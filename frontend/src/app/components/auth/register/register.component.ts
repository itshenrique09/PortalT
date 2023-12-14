import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../lib/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firstName: any
  lastName: any
  email: any
  password: any
  errorMessage?: String
  wrong?: boolean

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.getRegister(this.firstName,this.lastName ,this.email, this.password).subscribe({
      next: (data) => {
        if(data.auth = true){
          localStorage.setItem('token', data.token);
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message
        this.wrong = true
        setTimeout(()=>{this.wrong=false},3000)
      },
      complete: () => console.info('Auth completed')
    })
  }
}
