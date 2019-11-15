import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PermissionBO } from 'src/app/models/permissionBO.model';
import { JhiLanguageHelper } from 'src/app/core/language/language.helper';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'jhi-permission-mgmt-update',
  templateUrl: './permission-management-update.component.html'
})
export class PermissionMgmtUpdateComponent implements OnInit {
  permission: PermissionBO;
  languages: any[];
  isSaving: boolean;
  editForm = this.fb.group({
    id: [null],
    code: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*')]],
    name: ['', [Validators.required, Validators.maxLength(50)]],

  });

  constructor(
    private languageHelper: JhiLanguageHelper,
    private permissionService: PermissionService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.route.data.subscribe(({ permission }) => {
      this.permission = permission.body ? permission.body : permission;
      console.log(this.permission);
      this.updateForm(this.permission);
    });
    this.languageHelper.getAll().then(languages => {
      this.languages = languages;
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
    // swal('Thông báo', 'Đồng ý thực hiện thao tác này?', 'warning', {
    //   buttons: ['Từ chối', 'Đồng ý']
    // }).then(confirm => {
    //     if (confirm) {
    //       this.confirm();
    //     }
    // });
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
   // this.toastr.success('Thao tác thành công!');
    setTimeout(() => {
      this.previousState();
      this.isSaving = false;
    }, 1700);
  }

  private onSaveError(err) {
   // this.toastr.error('Thao tác thất bại!', err.error.message);
    this.isSaving = false;
  }
}
