import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

import { SpinnerService } from '../services/spinner.service';

@Injectable({
    providedIn: 'root',
})
export class Spinnerinterceptor implements HttpInterceptor {

    constructor(private spinnerSvc:SpinnerService){}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.spinnerSvc.show()
        return next.handle(req).pipe(
            finalize(()=>this.spinnerSvc.hide())
        )
    }
}
