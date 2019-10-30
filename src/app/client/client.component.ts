import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { JhiLanguageHelper } from '../core/language/language.helper';

@Component({
    selector: 'page-client',
    templateUrl: './client.component.html',
    styles: []
})
export class ClientComponent implements OnInit {
    route;
    languages: any[];
    constructor(
        private router: Router,
        private languageHelper: JhiLanguageHelper) {this.route = this.router; }
        ngOnInit(): void {
            this.languageHelper.getAll().then(languages => {
                this.languages = languages;
              });
        }
}
