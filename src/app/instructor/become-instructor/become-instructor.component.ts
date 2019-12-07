import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QUESTION_BECOME_INSTRUCTOR } from 'src/app/shared/constants/instructor-question-become.constants';
import { AccountService } from 'src/app/core/auth/account.service';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';
import { PageReloadService } from 'src/app/core/auth/page-reload.service';

@Component({
  selector: 'app-become-instructor',
  templateUrl: './become-instructor.component.html',
  styleUrls: ['./become-instructor.component.scss']
})
export class BecomeInstructorComponent implements OnInit {
  step = 0;
  items = [];
  quickQuestion = QUESTION_BECOME_INSTRUCTOR;
  activeIndex = 1;
  selectedFile;
  pdfFile;
  pdfPreview = false;
  answers: any[] = [];
  isLoad = false;
  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private elRef: ElementRef,
    private accountService: AccountService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!this.accountService.isAuthenticated()) {
        this.router.navigate(['home']);
        return;
      }
      this.accountService.identity().then(account => {
        if (account.roleBOs && account.roleBOs.includes('ROLE_TEACHER')) {
          this.router.navigate(['instructor/courses']);
          return;
        }
        if (account.status !== null && account.status === false) {
          alert('Đang chờ kiểm duyệt!');
          this.router.navigate(['home']);
          return;
        }
      });
      this.step = +params.id || 0;
      if (this.step !== 0 && this.step !== 1 && this.step !== 2 && this.step !== 3 && this.step !== 4) {
        this.router.navigate(['/not-found']);
      }
      this.activeIndex = this.step - 1;
      if (this.step === 0) {
        this.answers = [];
      }
    });
    this.items = [
      {label: 'Câu hỏi 1'},
      {label: 'Câu hỏi 2'},
      {label: 'Câu hỏi 3'},
      {label: 'Tải lên CV'}
    ];
  }

  onSelectAnswer(qId, aId) {
    this.answers[qId] = aId;
  }

  onFileChange(event) {
    if (
      event.target.files[0].name.endsWith('.pdf') ||
      event.target.files[0].name.endsWith('.PDF')
    ) {
      this.selectedFile = event.target.files;
    } else {
      this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: 'Chỉ tải file pdf!'});
      const element = this.elRef.nativeElement.querySelector('#fileImage');
      element.value = '';
      this.selectedFile = null;
    }
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:variable-name
      reader.onload = (_event: any) => {
           this.pdfFile = _event.target.result;
      };
    }
  }

  requestUpdateToTeacher() {
    if (this.answers.length !== 3) {
      this.messageService.add({severity: 'error', summary: 'Cảnh báo!', detail: 'Vui lòng trả lời các câu hỏi!'});
      return;
    }
    if (!this.selectedFile) {
      this.messageService.add({severity: 'error', summary: 'Cảnh báo!', detail: 'Vui lòng chọn file!'});
      return;
    }
    if (this.accountService.isAuthenticated()) {
      this.isLoad = true;
      const formdata: FormData = new FormData();
      formdata.append('cvFile', this.selectedFile ? this.selectedFile.item(0) : null);
      formdata.append('answers', new Blob([JSON.stringify(this.answers)], {
        type: 'application/json'
      }));
      this.userService.requestUpdateRoleTeacher(formdata).subscribe(res => {
        if (res) {
          this.isLoad = false;
          this.answers = [];
          this.selectedFile = null;
          alert('Chờ duyệt!');
          window.location.href = 'home';
        }
      }, () => {
        this.isLoad = false;
      });
    }
  }
}
