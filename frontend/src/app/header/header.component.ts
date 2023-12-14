import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatusComponent } from '../components/auth/login-status/login-status.component';
import { AuthService } from '../lib/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  firstName?: string = '';
  lastName?: string = '';

  constructor(
    private router: Router,
    public loginStatus:LoginStatusComponent,
    private authService: AuthService) {}

    ngOnInit(): void {
      this.getName()
    }
  
    getName(): void {
      this.authService.logedUser().subscribe({
        next:(data:any) => {
          this.firstName = data.firstName;
          this.lastName = data.lastName;
        }
      })
    }

    toLogout():void {
      this.authService.logout().subscribe();
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }

    toHome(): void{
      this.router.navigate(['/']);
    }

    toLogin(): void {
      this.router.navigate(['/login']);
    }
}