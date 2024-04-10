import { HttpInterceptorFn } from '@angular/common/http';

/*
Interceptor de Angular basado en función

Sirve para interceptar las peticiones HTTP que se envían de Angular a Backend.

Agrega el token JWT en una cabecera (header) de la petición HTTP
*/
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("jwt_token");

  if (token) {
    req = req.clone({
      // agregar token JWT a la cabecera Authorization de la petición HTTP
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(req);
};
