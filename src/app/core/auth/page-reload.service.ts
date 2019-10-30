import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PageReloadService {
    constructor() {}
    reload(router?: Router) {
        router.routeReuseStrategy.shouldReuseRoute = () => false;
        router.onSameUrlNavigation = 'reload';
        router.navigate([router.url]);
    }
}
