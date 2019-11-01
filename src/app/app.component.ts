import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'learning-simple-ui';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('vi');
    translate.use('vi');
}
}
