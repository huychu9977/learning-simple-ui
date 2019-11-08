import { Component, OnInit, ElementRef } from '@angular/core';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseBO } from 'src/app/models/courseBO.model';
import { JhiLanguageHelper } from 'src/app/core/language/language.helper';
import { CourseService } from 'src/app/services/course.service';
import { CategoryService } from 'src/app/services/category.service';
import { STATUS_CAN_NOT_EIDT_DELETE } from 'src/app/shared/constants/status.constants';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'course-management-update',
  templateUrl: './course-management-update.component.html'
})
export class CourseManagementUpdateComponent implements OnInit {
  config = {
    extraPlugins: 'image2,scayt,wsc,youtube,widget,widgetselection,lineutils',
    height: 300
  };
  imageUrl;
  videoUrl;
  course: CourseBO;
  languages: any[];
  levels: any[];
  courseTopics: any[] = [];
  courseCategorys: any[];
  isSaving: boolean;
  selectedImages: FileList;
  selectedVideos: FileList;
  editForm = this.fb.group({
    id: [null],
    code: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100), Validators.pattern('^[_.@A-Za-z0-9-]*')]],
    name: ['', [Validators.required, Validators.maxLength(200)]],
    sortDescription: [''],
    description: ['', [Validators.required]],
    activated: [true],
    requiredCompleteRate: ['', [Validators.maxLength(3)]],
    level: ['', [Validators.required]],
    courseTopic: ['', [Validators.required]],
    courseCategory: [''],
  });
  statusCanNotEditAndDelete = STATUS_CAN_NOT_EIDT_DELETE;
  constructor(
    private languageHelper: JhiLanguageHelper,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private elRef: ElementRef,
    private fb: FormBuilder,
    private toastr?: ToastrService,
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.route.data.subscribe(({ course }) => {
      this.course = course.body ? course.body : course;
      if (this.statusCanNotEditAndDelete.indexOf(this.course.status) !== -1) {
        this.router.navigate(['admin/course-management']);
        return;
      }
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
    this.languageHelper.getAll().then(languages => {
      this.languages = languages;
    });
  }

  selectCourseTopics() {
    this.editForm.get('courseTopic').setValue(null);
    const courseCategoryCode  = this.editForm.get(['courseCategory']).value;
    if (courseCategoryCode) {
      this.categoryService.getTopics(courseCategoryCode).subscribe(data => {
        this.courseTopics = data;
      });
    } else {
      this.courseTopics = [];
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
      requiredCompleteRate: course.requiredCompleteRate,
      level: course.levelBO ? course.levelBO.code : null,
      courseCategory: course.topicDTO ? course.topicDTO.courseCategoryDTO.code : null,
      courseTopic: course.topicDTO ? course.topicDTO.code : null
    });
    this.imageUrl = this.course.courseImageId ? `api/image/${this.course.courseImageId}` : 'assets/images/default.png';
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
    swal('Thông báo', 'Đồng ý thực hiện thao tác này?', 'warning', {
      buttons: ['Từ chối', 'Đồng ý']
    }).then(confirm => {
        if (confirm) {
           this.confirm();
        }
    });
  }
  confirm() {
    if (!this.selectedImages && !this.course.id) {
      this.toastr.error('Cảnh báo!', 'Vui lòng chọn file image!');
    } else if (!this.selectedVideos && !this.course.id) {
      this.toastr.error('Cảnh báo!', 'Vui lòng chọn file video!');
    } else {
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
      levelBO : {
        code : this.editForm.get(['level']).value
      },
      requiredCompleteRate : this.editForm.get(['requiredCompleteRate']).value
    };
    if (!this.course.id) { delete courseTmp.id; }
    return courseTmp;
  }
  onVideoChange(event) {
    let checkList = false;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
        if (
            event.target.files[i].name.endsWith('.avi') ||
            event.target.files[i].name.endsWith('.flv') ||
            event.target.files[i].name.endsWith('.wmv') ||
            event.target.files[i].name.endsWith('.mov') ||
            event.target.files[i].name.endsWith('.mp4') ||
            event.target.files[i].name.endsWith('.AVI') ||
            event.target.files[i].name.endsWith('.FLV') ||
            event.target.files[i].name.endsWith('.WMV') ||
            event.target.files[i].name.endsWith('.MOV') ||
            event.target.files[i].name.endsWith('.MP4')
        ) {
            checkList = true;
        } else {
            const element = this.elRef.nativeElement.querySelector('#fileVideo');
            element.value = '';
            checkList = false;
            swal('Lỗi', 'Chỉ tải file với đuôi (avi|mp4|flv|wmv|mov)', 'error').then(() => {
                this.selectedVideos = null;
            });
            break;
        }
        if (checkList) {
            this.selectedVideos = event.target.files;
            this.videoUrl = event.target.files[0].name;
        }
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
    let checkList = false;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
        if (
            event.target.files[i].name.endsWith('.jpg') ||
            event.target.files[i].name.endsWith('.png') ||
            event.target.files[i].name.endsWith('.JPG') ||
            event.target.files[i].name.endsWith('.PNG') ||
            event.target.files[i].name.endsWith('.JPEG') ||
            event.target.files[i].name.endsWith('.jpeg')
        ) {
            checkList = true;
        } else {
            const element = this.elRef.nativeElement.querySelector('#fileImage');
            element.value = '';
            checkList = false;
            swal('Lỗi', 'Chỉ tải file với đuôi (jpg|png|jpeg)', 'error').then(() => {
                this.selectedImages = null;
            });
            break;
        }
        if (checkList) {
            this.selectedImages = event.target.files;
        }
    }
}
  private onSaveSuccess(result) {
    this.toastr.success('Thao tác thành công!');
    setTimeout(() => {
      this.previousState();
    }, 1700);
  }

  private onSaveError(err) {
    this.toastr.error('Thao tác thất bại!', err.error.message);
    this.isSaving = false;
  }

}
