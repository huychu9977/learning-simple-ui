import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { AccountService } from 'src/app/core/auth/account.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { QUESTION_BECOME_INSTRUCTOR } from 'src/app/shared/constants/instructor-question-become.constants';
import { MessageService } from 'primeng/api';
import { CHECKING, WAIT_CHECK, ERROR, SUCCESS } from 'src/app/shared/constants/status.constants';
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ticketNeedCheck = [];
  ticketChecking = [];
  ticketWarning = [];
  ticketSuccess = [];
  ticketError = [];
  currentAccount: any;
  userDetail: any;
  userPreview = false;
  quickQuestion = QUESTION_BECOME_INSTRUCTOR;

  constructor(
    private router: Router,
    private userService: UserService,
    private messageService: MessageService,
    private accountService: AccountService,
    private ticketService: TicketService) { }
  ngOnInit() {
    this.accountService.identity().then(account => {
          this.currentAccount = account;
          this.loadAll();
    });
  }
  loadAll() {
    this.loadTicketWaitCheck();
    this.loadTicketCheking();
    this.loadTicketError();
    this.loadTicketSuccess();
  }
  loadTicketSuccess() {
    this.ticketService.findAllByStatus(SUCCESS).subscribe(res => {
      this.ticketSuccess = res;
    });
  }
  loadTicketError() {
    this.ticketService.findAllByStatus(ERROR).subscribe(res => {
      this.ticketWarning = res;
    });
  }
  loadTicketWaitCheck() {
    this.ticketService.findAllByStatus(WAIT_CHECK).subscribe(res1 => {
      this.ticketNeedCheck = res1;
    });
  }
  loadTicketCheking() {
    this.ticketService.findAllByStatus(CHECKING).subscribe(res1 => {
      this.ticketChecking = res1;
    });
  }
  changeTicketStatus(ticketId?: any, statusCode?: string, statusIdOld?: string) {
    this.ticketService.changeTicketStatus(ticketId, statusCode).subscribe(res => {
      if (res) {
        if (statusCode === CHECKING || statusIdOld === CHECKING) {
          this.loadTicketCheking();
        }
        if (statusIdOld === WAIT_CHECK || statusCode === WAIT_CHECK) {
          this.loadTicketWaitCheck();
        }
        if (statusIdOld === ERROR || statusCode === ERROR) {
          this.loadTicketError();
        }
        if (statusIdOld === SUCCESS || statusCode === SUCCESS) {
          this.loadTicketSuccess();
        }
       // this.toastr.success('Chuyển trạng thái thành công!', 'Thành công!');
      } else {
       // this.toastr.error('Chuyển trạng thái thất bại!', 'Thất bại!');
      }
    });
  }
  goToDetail(ticket?: any) {
    this.userPreview = false;
    if (!ticket.courseCode && !ticket.lectureCode && ticket.teacherUsername) {
      this.userService.find(ticket.teacherUsername).subscribe(res => {
        this.userDetail = res.body;
        this.userPreview = true;
      });
      return;
    }
    if (ticket.courseCode && !ticket.lectureCode) {
      this.router.navigate(['admin/course-management', ticket.courseCode, 'view']);
    } else if (ticket.courseCode && ticket.lectureCode) {
      this.router.navigate(['admin/course-management', ticket.courseCode, 'lecture', ticket.lectureCode, 'view']);
    }
  }
  acceptUserToTeacher(isAccept: boolean, username: string) {
    this.userService.updateRoleTeacher(isAccept, username).subscribe(res => {
      if (res) {
        this.userPreview = false;
        this.messageService.add({severity: 'success', detail: 'Thành công!'});
      }
    });
  }
}
