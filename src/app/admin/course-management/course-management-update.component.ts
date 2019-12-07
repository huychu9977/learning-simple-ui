import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseBO } from 'src/app/models/courseBO.model';
import { CourseService } from 'src/app/services/course.service';
import { CategoryService } from 'src/app/services/category.service';
import { STATUS_CAN_NOT_EIDT_DELETE } from 'src/app/shared/constants/status.constants';
import {ConfirmationService, MessageService} from 'primeng/api';
import { SlugifyPipe } from 'src/app/shared/util/string-to-slug.pipe';

@Component({
  selector: 'course-management-update',
  templateUrl: './course-management-update.component.html'
})
export class CourseManagementUpdateComponent implements OnInit {
  imageUrl;
  videoUrl;
  course: CourseBO;
  levels: any[];
  courseTopics: any[] = [];
  courseCategorys: any[];
  isSaving: boolean;
  selectedImages: FileList;
  selectedVideos: FileList;
  loading = false;
  editForm = this.fb.group({
    id: [null],
    code: [''],
    name: ['', [Validators.required, Validators.maxLength(200)]],
    sortDescription: [''],
    description: ['', [Validators.required]],
    activated: [true],
    level: ['', [Validators.required]],
    courseTopic: ['', [Validators.required]],
    courseCategory: [''],
  });
  statusCanNotEditAndDelete = STATUS_CAN_NOT_EIDT_DELETE;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private elRef: ElementRef,
    private fb: FormBuilder,
    private slugifyPipe: SlugifyPipe
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.route.data.subscribe(({ course }) => {
      this.course = course.body ? course.body : course;
      // if (this.statusCanNotEditAndDelete.indexOf(this.course.status) !== -1) {
      //   this.router.navigate(['admin/course-management']);
      //   return;
      // }
      this.updateForm(this.course);
    });
    this.courseCategorys = [];
    this.levels = [];
    this.categoryService.getCategories().subscribe(data => {
      this.courseCategorys = data;
    });
    this.courseService.getLevels().subscribe(data => {
      this.levels = data;
    });
  }

  selectCourseTopics() {
    this.loading = true;
    this.editForm.get('courseTopic').setValue(null);
    const courseCategoryCode  = this.editForm.get(['courseCategory']).value;
    if (courseCategoryCode) {
      this.categoryService.getTopics(courseCategoryCode).subscribe(data => {
        this.courseTopics = data;
        this.loading = false;
      });
    } else {
      this.courseTopics = [];
      this.loading = false;
    }
  }

  private updateForm(course: CourseBO): void {
    this.editForm.patchValue({
      id: course.id,
      code: course.code,
      name: course.name,
      sortDescription: course.sortDescription,
      description: course.description,
      activated: course.activated === undefined ? true : course.activated,
      level: course.level ? course.level : null,
      courseCategory: course.topicDTO ? course.topicDTO.courseCategoryDTO.code : null,
      courseTopic: course.topicDTO ? course.topicDTO.code : null
    });
    this.imageUrl = this.course.imageUrl ? this.course.imageUrl : 'assets/images/default.png';
    this.videoUrl = 'assets/images/default-video-image.png';
    if (this.course.id) {
      const courseCategoryCode  = this.editForm.get(['courseCategory']).value;
      if (courseCategoryCode) {
        this.categoryService.getTopics(courseCategoryCode).subscribe(data => {
          this.courseTopics = data;
        });
      } else {
        this.courseTopics = [];
      }
    }
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
    if (!this.selectedImages && !this.course.id) {
      this.messageService.add({severity: 'error', summary: 'Cảnh báo!', detail: 'Vui lòng chọn file image!'});
    } else if (!this.selectedVideos && !this.course.id) {
      this.messageService.add({severity: 'error', summary: 'Cảnh báo!', detail: 'Vui lòng chọn file video!'});
    } else {
      this.loading = true;
      const formdata: FormData = new FormData();
      formdata.append('imageFile', this.selectedImages ? this.selectedImages.item(0) : null);
      formdata.append('videoFile', this.selectedVideos ? this.selectedVideos.item(0) : null);
      formdata.append('courseDTO', new Blob([JSON.stringify(this.updateCourse())], {
        type: 'application/json'
      }));
      if (this.course.id !== null) {
        this.courseService.update(formdata).subscribe(response => this.onSaveSuccess(response), (err) => this.onSaveError(err));
      } else {
        this.courseService.create(formdata).subscribe(response => this.onSaveSuccess(response), (err) => this.onSaveError(err));
      }
    }
  }
  private updateCourse() {
    const courseTmp = {
      id : this.course.id,
      code : this.editForm.get(['code']).value,
      name : this.editForm.get(['name']).value,
      sortDescription : this.editForm.get(['sortDescription']).value,
      description : this.editForm.get(['description']).value.replace(/[ \t\r]+/g, ' '),
      activated : this.editForm.get(['activated']).value,
      topicDTO : {
        code : this.editForm.get(['courseTopic']).value
      },
      level : this.editForm.get(['level']).value
    };
    if (!this.course.id) {
      courseTmp.code = this.slugifyPipe.transform(this.editForm.get(['name']).value);
      delete courseTmp.id;
    }
    return courseTmp;
  }
  onVideoChange(event) {
    if (
        event.target.files[0].name.endsWith('.avi') ||
        event.target.files[0].name.endsWith('.flv') ||
        event.target.files[0].name.endsWith('.wmv') ||
        event.target.files[0].name.endsWith('.mov') ||
        event.target.files[0].name.endsWith('.mp4') ||
        event.target.files[0].name.endsWith('.AVI') ||
        event.target.files[0].name.endsWith('.FLV') ||
        event.target.files[0].name.endsWith('.WMV') ||
        event.target.files[0].name.endsWith('.MOV') ||
        event.target.files[0].name.endsWith('.MP4')
    ) {
      this.selectedVideos = event.target.files;
      this.videoUrl = event.target.files[0].name;
    } else {
        const element = this.elRef.nativeElement.querySelector('#fileVideo');
        element.value = '';
        this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Chỉ tải file với đuôi (avi|mp4|flv|wmv|mov)'});
        this.selectedVideos = null;
    }
  }

  onImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:variable-name
      reader.onload = (_event: any) => {
          this.imageUrl = _event.target.result;
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
      this.selectedImages = event.target.files;
    } else {
        const element = this.elRef.nativeElement.querySelector('#fileImage');
        element.value = '';
        this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Chỉ tải file với đuôi (jpg|png|jpeg)'});
        this.selectedImages = null;
    }
}
  private onSaveSuccess(result) {
    this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Thao tác thành công!'});
    this.loading = false;
    setTimeout(() => {
      this.previousState();
    }, 1200);
  }

  private onSaveError(err) {
    this.messageService.add({severity: 'error', summary: 'Thao tác thất bại!', detail: err.error.message});
    this.loading = false;
    this.isSaving = false;
  }

}
