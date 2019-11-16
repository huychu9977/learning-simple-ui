import { map } from 'rxjs/operators';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserBO } from 'src/app/models/userBO.model';
import { JhiLanguageHelper } from 'src/app/core/language/language.helper';
import { UserService } from 'src/app/services/user.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'jhi-user-mgmt-update',
  templateUrl: './user-management-update.component.html'
})
export class UserMgmtUpdateComponent implements OnInit {
  imageUrl = null;
  user: UserBO;
  roleBOs: any[];
  isSaving: boolean;
  selectedFiles: FileList;
  selectedRoles;
  editForm = this.fb.group({
    id: [null],
    username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*')]],
    name: ['', [Validators.required, Validators.maxLength(50)]],
    address: ['', [Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    activated: [true],
    phone: ['', [Validators.maxLength(11)]],
    roleBOs: ['', [Validators.required]],
    imageUrl: [],
  });

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private elRef: ElementRef,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.route.data.subscribe(({ user }) => {
      this.user = user.body ? user.body : user;
      this.updateForm(this.user);
    });
    this.roleBOs = [];
    this.userService.roleBOs().pipe(map(data => data.map(v => {
      return {code: v, name: v};
    }))).subscribe(rol => {
      this.roleBOs = rol;
    });
  }
  get f() { return this.editForm.controls; }
  private updateForm(user: UserBO): void {
    this.editForm.patchValue({
      id: user.id,
      username: user.username,
      name: user.name,
      phone: user.phone,
      email: user.email,
      activated: user.activated === undefined ? true : user.activated,
      address: user.address,
      imageUrl: user.imageUrl,
      roleBOs: user.roleBOs
    });
    // tslint:disable-next-line:max-line-length
    this.imageUrl = this.user.imageDTO ? `api/image/${this.user.imageDTO.id}` : 'https://icon-library.net/images/default-user-icon/default-user-icon-4.jpg';
    this.selectedRoles = user.roleBOs ? user.roleBOs : [];
  }

  previousState() {
    window.history.back();
  }

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
    const formdata: FormData = new FormData();
    formdata.append('imageFile', this.selectedFiles ? this.selectedFiles.item(0) : null);
    formdata.append('userDTO', new Blob([JSON.stringify(this.updateUser())], {
      type: 'application/json'
    }));
    if (this.user.id !== null) {
      this.userService.updateWithImage(formdata).subscribe(response => this.onSaveSuccess(response), (err) => this.onSaveError(err));
    } else {
      this.userService.createWithImage(formdata).subscribe(response => this.onSaveSuccess(response), (err) => this.onSaveError(err));
    }
  }
  private updateUser() {
    const user = {
      id : this.user.id,
      username : this.editForm.get(['username']).value,
      name : this.editForm.get(['name']).value,
      phone : this.editForm.get(['phone']).value,
      email : this.editForm.get(['email']).value,
      activated : this.editForm.get(['activated']).value,
      address : this.editForm.get(['address']).value,
      roleBOs : this.selectedRoles
    };
    if (this.user.id === null) { delete user.id; }
    return user;
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
          this.imageUrl = event.target.result;
      };
    }

    if (
        event.target.files[0].name.endsWith('.jpg') ||
        event.target.files[0].name.endsWith('.png') ||
        event.target.files[0].name.endsWith('.JPG') ||
        event.target.files[0].name.endsWith('.PNG') ||
        event.target.files[0].name.endsWith('.JPEG') ||
        event.target.files[0].name.endsWith('.jpeg')
    ) {
      this.selectedFiles = event.target.files;
    } else {
        const element = this.elRef.nativeElement.querySelector('#filevideo');
        element.value = '';
        this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Chỉ tải file với đuôi (jpg|png|jpeg)'});
        this.selectedFiles = null;
    }
  }
  private onSaveSuccess(result) {
    this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Thao tác thành công!'});
    setTimeout(() => {
      this.previousState();
      this.isSaving = false;
    }, 1500);
  }

  private onSaveError(err) {
    this.messageService.add({severity: 'error', summary: 'Thao tác thất bại!', detail: err.error.message});
    this.isSaving = false;
  }
}
