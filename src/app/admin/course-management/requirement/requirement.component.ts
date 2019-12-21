import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseBO } from 'src/app/models/courseBO.model';
import { RequirementService } from 'src/app/services/requirement.service';
import { STATUS_CAN_NOT_EIDT_DELETE } from 'src/app/shared/constants/status.constants';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'requirement',
  templateUrl: './requirement.component.html'
})
export class RequirementComponent implements OnInit {
  statusCanNotEditAndDelete = STATUS_CAN_NOT_EIDT_DELETE;
  courseRequireds?: any[] = [];
  requiredName?: string;
  course?: CourseBO;
  loading = false;
  isSaving = false;
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private requirementService: RequirementService) { }

  ngOnInit() {
    this.route.data.subscribe(({ course }) => {
      this.course = course.body ? course.body : course;
    });
    this.loadAll();
  }
  loadAll() {
    this.loading = true;
    this.courseRequireds = [];
    this.requirementService.findAll(this.course.code)
    .subscribe(data => {this.courseRequireds = data; this.loading = false; });
  }
  add() {
    if (this.requiredName.trim()) {
      this.courseRequireds.push({
        name: this.requiredName.trim(),
        isEdit: false
      });
      this.requiredName = '';
    }
  }
  delete(index) {
    this.courseRequireds.splice(index, 1);
  }
  save() {
    this.loading = true;
    this.isSaving = true;
    const body = this.courseRequireds.map(o => {
      return o.id ? {id: o.id , name: o.name} : { name: o.name};
    });
    if (body.length > 0) {
      this.requirementService.update(this.course.code, body)
      .subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
    }
  }
  private onSaveSuccess(result) {
    this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Thao tác thành công!'});
    this.loading = false;
    setTimeout(() => {
      this.previousState();
    }, 1200);
  }

  private onSaveError() {
   this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: 'Thao tác thất bại!'});
   this.loading = false;
   this.isSaving = false;
  }

  previousState() {
    window.history.back();
  }

}
