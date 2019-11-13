import { Component, OnInit, ElementRef } from '@angular/core';
import { AccountService } from 'src/app/core/auth/account.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PageReloadService } from 'src/app/core/auth/page-reload.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  currentAccount: any;
  imageUrl;
  selectedImages;
  isLoad = false;
  editForm = this.fb.group({
    username: [{value: '', disabled: true}, [Validators.required]],
    email: [{value: '', disabled: true}, [Validators.required]],
    name: ['', [Validators.maxLength(50)]],
    phone: ['', [Validators.maxLength(12)]],
    address: ['', [Validators.maxLength(50)]],
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elRef: ElementRef,
    private page: PageReloadService,
    private toast: ToastrService,
    private accountService: AccountService,
    private fb: FormBuilder, ) { }

  ngOnInit() {
    this.accountService.identity().then(account => {
      this.currentAccount = account;
      this.setFormValue();
    });
  }
  setFormValue() {
    this.editForm.patchValue({
      username: this.currentAccount.username,
      email: this.currentAccount.email,
      phone: this.currentAccount.phone,
      name: this.currentAccount.name,
      address: this.currentAccount.address
    });
    this.imageUrl = this.currentAccount.imageDTO ? `api/image/${this.currentAccount.imageDTO.id}` : 'assets/images/default.png';
  }
  get f() { return this.editForm.controls; }
  editCurrentAccount() {
    if (this.editForm.invalid) {
      this.toast.error('Vui lòng điền đủ thông tin');
      return;
    }
    this.isLoad = true;
    const formdata: FormData = new FormData();
    formdata.append('imageFile', this.selectedImages ? this.selectedImages.item(0) : null);
    formdata.append('userDTO', new Blob([JSON.stringify(this.updateUser())], {
      type: 'application/json'
    }));
    this.accountService.updateCurrentUser(formdata).subscribe(res => {
      if (res) {
        this.accountService.identity(true);
        this.toast.success('Cập nhật thành công!');
        this.page.reload(this.router);
        this.isLoad = false;
      }
    }, err => {
      this.toast.error(err.error.message);
    });
  }
  private updateUser() {
    const user = {
      id: this.currentAccount.id,
      username : this.editForm.get(['username']).value,
      name : this.editForm.get(['name']).value,
      phone : this.editForm.get(['phone']).value,
      email : this.editForm.get(['email']).value,
      address : this.editForm.get(['address']).value
    };
    return user;
  }
  onImageChange(event) {
    this.isLoad = true;
    if (
      event.target.files[0].name.endsWith('.jpg') ||
      event.target.files[0].name.endsWith('.png') ||
      event.target.files[0].name.endsWith('.JPG') ||
      event.target.files[0].name.endsWith('.PNG') ||
      event.target.files[0].name.endsWith('.JPEG') ||
      event.target.files[0].name.endsWith('.jpeg')
    ) {
      this.selectedImages = event.target.files;
    } else {
      const element = this.elRef.nativeElement.querySelector('#fileImage');
      element.value = '';
      this.toast.error('Chỉ tải file với đuôi (jpg|png|jpeg)', 'Lỗi');
      this.selectedImages = null;
    }
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:variable-name
      reader.onload = (_event: any) => {
          this.imageUrl = _event.target.result;
      };
    }
    this.isLoad = false;
  }
}
