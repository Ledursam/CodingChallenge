import {
    ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, NavigationExtras, Route,
    Router, RouterStateSnapshot, UrlSegment, UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import iziToast from "izitoast";
import { AuthService } from "../auth.service";
import { Location } from "@angular/common";
import { Observable } from "rxjs";

@Injectable()
export class ChallengeGuard implements CanActivate, CanActivateChild, CanLoad {
    
    constructor(private router: Router, private authService: AuthService, private location: Location) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const url = `/${route.path}`;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        
        if (this.authService.isLoggedIn()) {
            let checker = true;
            return true;
        }

        const navigationExtras: NavigationExtras = {
            queryParams: { url: url },
            fragment: 'anchor'
        };

        this.router.navigate(['/'], navigationExtras).then(r => { });
        iziToast.error({ title: 'Non autorisé', message: "Vous n'êtes pas autorisé à accéder à cette page.", position: 'topRight', overlay: false });
        return false;
    }
}
