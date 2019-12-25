import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories?: any[] = [];
  loading = false;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadAll();
  }
  loadAll() {
    this.loading = true;
    this.categoryService
        .getCategories()
        .subscribe(
            res => {
              this.loading = false;
              this.categories = res;
            },
            err => {
              this.loading = false;
              console.log(err);
            }
        );
  }
  delete(cate: any) {
    this.confirmationService.confirm({
        message: 'Đồng ý thực hiện thao tác này?',
        accept: () => {
            this.categoryService.deleteCategoty(cate.id).subscribe(() => {
                this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Thao tác thành công!'});
                this.loadAll();
            },
            (err) => {
                this.messageService.add({severity: 'error', summary: 'Thao tác thất bại!', detail: err.error.message});
            });
        }
    });
  }
}
