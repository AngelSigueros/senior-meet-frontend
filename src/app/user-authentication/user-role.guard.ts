import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';


/*
Guard funcional (basado en función): que sirve para comprobar si el usuario tiene el rol de ADMIN

Sirve para proteger las rutas, se añade sobre la ruta que queramos proteger en app.routes.ts

 Si es ADMIN entonces puede pasar (return true)
 Si no es ADMIN entonces router.navigate a /login

*/
export const userRoleGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.getIsAdmin()) {
    return true;
  } else {
    return router.navigate(['/login']);
  }

};
