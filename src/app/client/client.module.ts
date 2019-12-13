import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCourseModule } from './page-course/page-course.module';
import { ClientComponent } from './client.component';
import { PageHomeModule } from './page-home/page-home.module';
import { PageOurCourseModule } from './page-our-course/page-our-course.module';
import { PageLectureModule } from './page-lecture/page-lecture.module';
import { PageOurTeacherModule } from './page-our-teacher/page-our-teacher.module';
import { PageTeacherModule } from './page-teacher/page-teacher.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from './page-header/header.module';
import { LoginModalModule } from './login/login.module';
import { PageMyCourseModule } from './page-my-course/page-my-course.module';
import { PageProfileModule } from './page-profile/page-profile.module';
import { FooterModule } from './page-footer/footer.module';
import { PageEventModule } from './page-event/page-event.module';
import { ClientRoutingModule } from './client-routing.module';
import { ChatModule } from '../shared/modules/chat/chat.module';

@NgModule({
    declarations: [ClientComponent, PageNotFoundComponent],
    imports: [
      CommonModule,
      TranslateModule,
      ClientRoutingModule,
      LoginModalModule,
      HeaderModule,
      PageHomeModule,
      PageOurCourseModule,
      PageCourseModule,
      PageLectureModule,
      PageOurTeacherModule,
      PageTeacherModule,
      PageMyCourseModule,
      PageProfileModule,
      PageEventModule,
      FooterModule,
      ChatModule
    ]
  })
  export class ClientModule { }
