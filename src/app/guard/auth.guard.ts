import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): boolean {
    if(this.authService.getToken() != null)
      return true
    this.router.navigate([''])
    return false
  }
}

export const isAuthGuard : CanActivateFn = (): boolean => {
  return inject(AuthGuard).canActivate();
}
