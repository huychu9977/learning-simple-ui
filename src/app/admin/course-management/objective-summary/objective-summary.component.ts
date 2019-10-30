import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseBO } from 'src/app/models/courseBO.model';
import { ObjectiveSummaryService } from 'src/app/services/objective-summary.service';

@Component({
  selector: 'objective-summary',
  templateUrl: './objective-summary.component.html',
  styleUrls: ['./objective-summary.component.scss']
})
export class ObjectiveSummaryComponent implements OnInit {
  objectives?: any[] = [];
  objectiveName?: string;
  course?: CourseBO;
  constructor(
    private route: ActivatedRoute,
    private courseObjectiveService: ObjectiveSummaryService,
    private toastr?: ToastrService) { }

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
    this.toastr.success('Thao tác thành công!');
    setTimeout(() => {
      this.previousState();
    }, 1200);
  }

  private onSaveError() {
    this.toastr.error('Thao tác thất bại!');
  }
  previousState() {
    window.history.back();
  }
}
