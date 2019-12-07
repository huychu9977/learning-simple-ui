import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PermissionBO } from 'src/app/models/permissionBO.model';
import { PermissionService } from 'src/app/services/permission.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'permission-mgmt-update',
  templateUrl: './permission-management-update.component.html'
})
export class PermissionMgmtUpdateComponent implements OnInit {
  permission: PermissionBO;
  isSaving: boolean;
  editForm = this.fb.group({
    id: [null],
    code: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*')]],
    name: ['', [Validators.required, Validators.maxLength(50)]],

  });

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private permissionService: PermissionService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.route.data.subscribe(({ permission }) => {
      this.permission = permission.body ? permission.body : permission;
      this.updateForm(this.permission);
    });
  }

  private updateForm(permission: PermissionBO): void {
    this.editForm.patchValue({
      id: permission.id,
      code: permission.code,
      name: permission.name,
    });
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
    this.updatePermission();
    if (this.permission.id !== null) {
      this.permissionService.update(this.permission).subscribe(response => this.onSaveSuccess(response), (err) => this.onSaveError(err));
    } else {
      this.permissionService.create(this.permission).subscribe(response => this.onSaveSuccess(response), (err) => this.onSaveError(err));
    }
  }
  private updatePermission() {
      this.permission.code = this.editForm.get(['code']).value;
      this.permission.name = this.editForm.get(['name']).value;
  }

  private onSaveSuccess(result) {
    this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Thao tác thành công!'});
    setTimeout(() => {
      this.previousState();
      this.isSaving = false;
    }, 1700);
  }

  private onSaveError(err) {
    this.messageService.add({severity: 'error', summary: 'Thao tác thất bại!', detail: err.error.message});
    this.isSaving = false;
  }
}
