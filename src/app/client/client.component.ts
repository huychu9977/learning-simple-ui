import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'page-client',
    templateUrl: './client.component.html',
    styles: []
})
export class ClientComponent implements OnInit {
    route;
    constructor(
        private router: Router) {this.route = this.router; }
    ngOnInit(): void {
    }
}
