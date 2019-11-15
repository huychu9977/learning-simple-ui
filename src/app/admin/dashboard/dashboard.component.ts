import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { AccountService } from 'src/app/core/auth/account.service';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private accountService: AccountService,
    private ticketService: TicketService) { }
  ngOnInit() {
    this.accountService.identity().then(account => {
          this.currentAccount = account;
          this.loadAll();
    });
  }
  loadAll() {
    this.loadTicketNeedCheck();
    this.loadTicketCheking();
    this.loadTicketWarning();
    this.loadTicketSuccess();
  }
  loadTicketSuccess() {
    this.ticketService.findAllByStatus(5).subscribe(res => {
      this.ticketSuccess = res;
    });
  }
  loadTicketWarning() {
    this.ticketService.findAllByStatus(3).subscribe(res => {
      this.ticketWarning = res;
    });
  }
  loadTicketNeedCheck() {
    this.ticketService.findAllByStatus(6).subscribe(res1 => {
      this.ticketNeedCheck = res1;
    });
  }
  loadTicketCheking() {
    this.ticketService.findAllByStatus(2).subscribe(res1 => {
      this.ticketChecking = res1;
    });
  }
  changeTicketStatus(ticketId?: any, statusId?: any, statusIdOld?: any) {
    this.ticketService.changeTicketStatus(ticketId, statusId).subscribe(res => {
      if (res) {
        if (statusId === 2 || statusIdOld === 2) {
          this.loadTicketCheking();
        }
        if (statusIdOld === 6 || statusId === 6) {
          this.loadTicketNeedCheck();
        }
        if (statusIdOld === 3 || statusId === 3) {
          this.loadTicketWarning();
        }
        if (statusIdOld === 5 || statusId === 5) {
          this.loadTicketSuccess();
        }
       // this.toastr.success('Chuyển trạng thái thành công!', 'Thành công!');
      } else {
       // this.toastr.error('Chuyển trạng thái thất bại!', 'Thất bại!');
      }
    });
  }
  goToDetail(ticket?: any) {
    if (ticket.courseCode && !ticket.lectureCode) {
      this.router.navigate(['admin/course-management', ticket.courseCode, 'view']);
    } else if (ticket.courseCode && ticket.lectureCode) {
      this.router.navigate(['admin/course-management', ticket.courseCode, 'lecture', ticket.lectureCode, 'view']);
    }
  }
}
