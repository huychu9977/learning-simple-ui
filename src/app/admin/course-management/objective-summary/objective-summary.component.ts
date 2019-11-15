import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseBO } from 'src/app/models/courseBO.model';
import { ObjectiveSummaryService } from 'src/app/services/objective-summary.service';
import { STATUS_CAN_NOT_EIDT_DELETE } from 'src/app/shared/constants/status.constants';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'objective-summary',
  templateUrl: './objective-summary.component.html',
  styleUrls: ['./objective-summary.component.scss']
})
export class ObjectiveSummaryComponent implements OnInit {
  statusCanNotEditAndDelete = STATUS_CAN_NOT_EIDT_DELETE;
  objectives?: any[] = [];
  objectiveName?: string;
  course?: CourseBO;
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private courseObjectiveService: ObjectiveSummaryService) { }

  ngOnInit() {
    this.route.data.subscribe(({ course }) => {
      this.course = course.body ? course.body : course;
    });
    this.loadAll();
  }
  loadAll() {
    this.objectives = [];
    this.courseObjectiveService.findAll(this.course.code)
    .subscribe(data => {this.objectives = data; });
  }
  add() {
    if (this.objectiveName.trim()) {
      this.objectives.push({
        name: this.objectiveName.trim(),
        isEdit: false
      });
      this.objectiveName = '';
    }
  }
  delete(index) {
    this.objectives.splice(index, 1);
  }
  save() {
    const body = this.objectives.map(o => {
      return o.id ? {id: o.id , name: o.name} : { name: o.name};
    });
    if (body.length > 0) {
      this.courseObjectiveService.update(this.course.code, body)
      .subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
    }
  }
  private onSaveSuccess(result) {
    this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Thao tác thành công!'});
    setTimeout(() => {
      this.previousState();
    }, 1200);
  }

  private onSaveError() {
   this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: 'Thao tác thất bại!'});
  }
  previousState() {
    window.history.back();
  }
}
