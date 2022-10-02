import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginatedResultPay } from '../_models/pagination';
import { Pay } from '../_models/Pay';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class PayResolver implements Resolve<PaginatedResultPay<Pay[]>>{
    pageNumber = 1;
    pageSize = 3;
    constructor(private auth: AuthService, private route: Router, private toastr: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResultPay<Pay[]>> {
        return this.auth.getPay(0, this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.toastr.error('Proplem retrieving messages Pay');
                return of(null);
            })
        );
    }
}
