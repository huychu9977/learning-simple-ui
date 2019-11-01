import { PermissionService } from '../../services/permission.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { RoleBO } from 'src/app/models/roleBO.model';
import { JhiLanguageHelper } from 'src/app/core/language/language.helper';
import { RoleService } from 'src/app/services/role.service';
import { PermissionBO } from 'src/app/models/permissionBO.model';
const swal: SweetAlert = _swal as any;
@Component({
  selector: 'jhi-role-mgmt-update',
  templateUrl: './role-management-update.component.html'
})
export class RoleMgmtUpdateComponent implements OnInit {
  totalItems: any;
  itemsPerPage: any = 2;
  page: any = 1;
  keyword = '';
  role: RoleBO;
  languages: any[];
  permissionBOs: any[];
  isSaving: boolean;
  selectedPermissions;
  editForm = this.fb.group({
    id: [null],
    code: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*')]],
    name: ['', [Validators.maxLength(50)]],
  });

  constructor(
    private languageHelper: JhiLanguageHelper,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private permissionService: PermissionService,
    private toastr?: ToastrService,
  ) { }

  ngOnInit() {
    this.isSaving = false;
    this.route.data.subscribe(({ role }) => {
      this.role = role.body ? role.body : role;
      this.updateForm(this.role);
    });
    this.languageHelper.getAll().then(languages => {
      this.languages = languages;
    });
    this.loadPermissions();
  }
  // permission
  checkSelected(code?: string) {
    return this.selectedPermissions.indexOf(code) > -1 ? true : false;
  }
  selectedPermission(code?: string) {
    const index = this.selectedPermissions.indexOf(code);
    if (index > -1) { this.selectedPermissions.splice(index, 1); } else { this.selectedPermissions.push(code); }
  }
  search(value?: string) {
    this.keyword = value;
    this.page = 1;
    this.loadPermissions();
  }
  loadPage(event: any) {
    this.page = event.page;
    this.loadPermissions();
  }
  loadPermissions() {
    this.permissionService
        .query({
            page: this.page - 1,
            size: this.itemsPerPage,
            keyword: this.keyword
        })
        .subscribe(
            (res: HttpResponse<PermissionBO[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpResponse<any>) => this.onError(res.body)
        );
  }
  private onSuccess(data, headers) {
    this.totalItems = headers.get('X-Total-Count');
    this.permissionBOs = data;
  }
  private onError(error) {
    console.log(error);
  }
  // end permission
  private updateForm(role: RoleBO): void {
    this.editForm.patchValue({
      id: role.id,
      code: role.code,
      name: role.name,
      permissionBOs: role.permissionBOs
    });
    this.selectedPermissions = role.permissionBOs ? role.permissionBOs : [];
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
    swal('Thông báo', 'Đồng ý thực hiện thao tác này?', 'warning', {
      buttons: ['Từ chối', 'Đồng ý']
    }).then(confirm => {
        if (confirm) {
          this.confirm();
        }
    });
  }
  confirm() {
    this.updateRole();
    if (this.role.id !== null) {
      this.roleService.update(this.role).subscribe(response => this.onSaveSuccess(response), (err) => this.onSaveError(err));
    } else {
      this.roleService.create(this.role).subscribe(response => this.onSaveSuccess(response), (err) => this.onSaveError(err));
    }
  }
  private updateRole() {
      this.role.code = this.editForm.get(['code']).value;
      this.role.name = this.editForm.get(['name']).value;
      this.role.permissionBOs = this.selectedPermissions;
  }

  private onSaveSuccess(result) {
    this.toastr.success('Thao tác thành công!');
    setTimeout(() => {
      this.previousState();
      this.isSaving = false;
    }, 1700);
  }

  private onSaveError(err) {
    this.toastr.error('Thao tác thất bại!', err.error.message);
    this.isSaving = false;
  }
}
