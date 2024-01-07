import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('accessToken');
  return token ? true : inject(Router).createUrlTree(['/auth-redirect']);
};
