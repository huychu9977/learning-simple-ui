import { Component, OnInit } from '@angular/core';
import { EventBO } from 'src/app/models/eventBO.model';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.scss']
})
export class EventManagementComponent implements OnInit {

  events?: EventBO[] = [];
  totalItems: any;
  itemsPerPage: any;
  page: any;
  previousPage: any;
  keyword = '';
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private eventService: EventService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.itemsPerPage = 2;
        this.activatedRoute.queryParams.subscribe(params => {
            this.page = params.page || 1;
            this.previousPage = params.page || 1;
            this.keyword = params.keyword || '';
        });
    }

    ngOnInit() {
        this.loadAll();
    }

    setActive(event?: EventBO) {
        this.eventService.setActive(event).subscribe(response => {
            if (response.status === 200 && response) {
                this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Cập nhật trạng thái thành công!'});
                this.loadAll();
            } else {
                console.log('ERROR');
            }
        });
    }

    loadAll() {
        this.eventService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                keyword: this.keyword
            })
            .subscribe(
                (res: HttpResponse<EventBO[]>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onError(res.body)
            );
    }
    loadPage(event: any) {
        this.page = event.page + 1;
        if (this.page !== this.previousPage) {
            this.transition();
            this.previousPage = this.page;
        }
    }

    transition() {
        const param = {
            page: this.page,
            keyword: this.keyword
        };
        if (this.keyword === '' || !this.keyword) { delete param.keyword; }
        this.router.navigate(['/admin/event-management'], {
            queryParams: param
        });
        this.loadAll();
    }
    search(value?: string) {
        this.keyword = value;
        this.page = 1;
        this.loadAll();
    }
    deleteLecture(event: EventBO) {
        this.confirmationService.confirm({
            message: 'Đồng ý thực hiện thao tác này?',
            accept: () => {
                this.eventService.delete(event.code).subscribe(() => {
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
        this.totalItems = data.totalResult;
        this.events = data.results;
    }

    private onError(error) {
        console.log(error);
    }
    previousState() {
        window.history.back();
    }
}
