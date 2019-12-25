import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-notification-update',
  templateUrl: './notification-update.component.html'
})
export class NotificationUpdateComponent implements OnInit {
    totalItems: any;
    itemsPerPage: any = 5;
    page: any = 1;
    keyword = '';
    users: any[] = [];
    selectedUsers;
    selectedUsernames;
    //
    notification: any;
    isSaving: boolean;
    isLoading = false;
    isOpenDialog = false;
    editForm = this.fb.group({
      id: [null],
      content: [''],
      url: [''],
      title: ['']
    });

    constructor(
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private notificationService: NotificationService,
      private route: ActivatedRoute,
      private userService: UserService,
      private fb: FormBuilder
    ) {}

    ngOnInit() {
      this.isSaving = false;
      this.route.data.subscribe(({ notification }) => {
        this.notification = notification.body ? notification.body : notification;
        this.updateForm(this.notification);
      });
      this.loadUsers();
    }

    private updateForm(notification: any): void {
      this.editForm.patchValue({
        id: notification.id,
        title: notification.title,
        url: notification.url,
        content: notification.content
      });
      this.selectedUsers = notification.listUserIdSent ? notification.listUserIdSent : [];
      this.selectedUsernames = notification.listUsernameSent ? notification.listUsernameSent : [];
    }

    previousState() {
      window.history.back();
    }
    get f() { return this.editForm.controls; }

    save() {
      this.isSaving = true;
      if (this.editForm.invalid) {
        return;
      }
      this.confirmationService.confirm({
        message: 'Đồng ý thực hiện thao tác này?',
        accept: () => {
          this.confirm();
        }
      });
    }
    confirm() {
        this.isLoading = true;
        this.notificationService.update(this.getNotiUpdate()).subscribe(response => this.onSaveSuccess(response),
        (err) => this.onSaveError(err));
    }
    private getNotiUpdate() {
        const notiTmp: any = {};
        notiTmp.title = this.editForm.get(['title']).value;
        notiTmp.url = this.editForm.get(['url']).value;
        notiTmp.content = this.editForm.get(['content']).value;
        notiTmp.listUserIdSent = this.selectedUsers;
        if (this.notification.id) {
            notiTmp.id = this.notification.id;
        }
        return notiTmp;
    }

    private onSaveSuccess(result) {
        this.isLoading = false;
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Thao tác thành công!'});
        setTimeout(() => {
            this.previousState();
            this.isSaving = false;
        }, 1000);
    }

    private onSaveError(err) {
      this.isLoading = false;
      this.messageService.add({severity: 'error', summary: 'Thao tác thất bại!', detail: err.error.message});
      this.isSaving = false;
    }
    // user
    checkSelected(id?: any) {
        return this.selectedUsers.indexOf(id) > -1 ? true : false;
    }
    selecteUser(id?: any) {
        const index = this.selectedUsers.indexOf(id);
        if (index > -1) { this.selectedUsers.splice(index, 1); } else { this.selectedUsers.push(id); }
    }
    search(value?: string) {
        this.keyword = value || '';
        this.page = 1;
        this.loadUsers();
    }
    loadPage(event: any) {
        this.page = event.page + 1;
        this.loadUsers();
    }
    loadUsers() {
        this.userService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                keyword: this.keyword
            })
            .subscribe(
                (res: HttpResponse<any[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpResponse<any>) => this.onError(res.body)
            );
    }
    private onSuccess(data, headers) {
        this.totalItems = data.totalElements;
        this.users = data.content;
    }
    private onError(error) {
        console.log(error);
    }
    // end user
}
