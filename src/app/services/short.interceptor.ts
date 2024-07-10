import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ShortInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const TOKEN='d63a251fa2937f7ec7dafabd87fa14a3066d745a';

    request= request.clone({ setHeaders: {Authorization: 'Bearer '+ TOKEN}})

    return next.handle(request).pipe(catchError((error: HttpErrorResponse)=>{
      console.log(error);
      return throwError(error);
    }));

  }
}
