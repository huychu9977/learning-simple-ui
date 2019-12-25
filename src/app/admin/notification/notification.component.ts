import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NotificationService } from 'src/app/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications?: any[] = [];
  totalItems: any;
  itemsPerPage: any = 5;
  page: any;
  keyword = '';
  loading = false;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.page = params.page || 1;
      this.keyword = params.keyword || '';
    });
    this.loadAll();
  }

  pushNotification(notiId?: any) {
    this.loading = true;
    this.notificationService.push(notiId).subscribe(res => {
      if (res) {
        this.loading = false;
        this.loadAll();
      }
    }, err => {console.log(err); });
  }

  loadAll() {
    this.loading = true;
    this.notificationService
        .query({
            page: this.page - 1,
            size: this.itemsPerPage,
            keyword: this.keyword
        })
        .subscribe(
            (res: HttpResponse<any[]>) => this.onSuccess(res.body),
            (res: HttpResponse<any>) => this.onError(res.body)
        );
  }

  loadPage(event: any) {
      this.page = event.page + 1;
      this.loadAll();
  }

  search() {
      this.page = 1;
      this.loadAll();
  }
  delete(noti: any) {
    this.confirmationService.confirm({
        message: 'Đồng ý thực hiện thao tác này?',
        accept: () => {
            this.notificationService.delete(noti.id).subscribe(() => {
                this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Thao tác thành công!'});
                this.loadAll();
            },
            (err) => {
                this.messageService.add({severity: 'error', summary: 'Thao tác thất bại!', detail: err.error.message});
            });
        }
    });
  }
  private onSuccess(data) {
      this.loading = false;
      this.totalItems = data.totalElements;
      this.notifications = data.content;
  }

  private onError(error) {
      this.loading = false;
      console.log(error);
  }
}
