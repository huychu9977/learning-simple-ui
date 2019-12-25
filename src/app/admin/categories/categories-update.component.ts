import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-categories-update',
  templateUrl: './categories-update.component.html'
})
export class CategoriesUpdateComponent implements OnInit {
    category: any;
    isSaving: boolean;
    isLoading = false;
    isOpenDialog = false;
    editForm = this.fb.group({
      id: [null],
      code: [''],
      name: ['']
    });
    subCategory?: any[] = [];

    constructor(
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private categoryService: CategoryService,
      private route: ActivatedRoute,
      private fb: FormBuilder
    ) {}

    ngOnInit() {
      this.isSaving = false;
      this.route.data.subscribe(({ category }) => {
        this.category = category.body ? category.body : category;
        this.updateForm(this.category);
      });
    }

    private updateForm(category: any): void {
      this.editForm.patchValue({
        id: category.id,
        code: category.code,
        name: category.name
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
        this.isLoading = true;
        this.categoryService.updateCategory(this.getCateUpdate()).subscribe(response => this.onSaveSuccess(response),
        (err) => this.onSaveError(err));
    }
    private getCateUpdate() {
        const cateTmp: any = {};
        cateTmp.code = this.editForm.get(['code']).value;
        cateTmp.name = this.editForm.get(['name']).value;
        if (this.category.id) {
            cateTmp.id = this.category.id;
        }
        return cateTmp;
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

}
