import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseBO } from 'src/app/models/courseBO.model';
import { RequirementService } from 'src/app/services/requirement.service';

@Component({
  selector: 'requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.scss']
})
export class RequirementComponent implements OnInit {

  courseRequireds?: any[] = [];
  requiredName?: string;
  course?: CourseBO;
  constructor(
    private route: ActivatedRoute,
    private requirementService: RequirementService,
    private toastr?: ToastrService) { }

  ngOnInit() {
    this.route.data.subscribe(({ course }) => {
      this.course = course.body ? course.body : course;
    });
    this.loadAll();
  }
  loadAll() {
    this.courseRequireds = [];
    this.requirementService.findAll(this.course.code)
    .subscribe(data => {this.courseRequireds = data; });
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
    const body = this.courseRequireds.map(o => {
      return o.id ? {id: o.id , name: o.name} : { name: o.name};
    });
    if (body.length > 0) {
      this.requirementService.update(this.course.code, body)
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
