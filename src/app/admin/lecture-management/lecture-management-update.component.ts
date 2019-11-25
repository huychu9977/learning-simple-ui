import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseBO } from 'src/app/models/courseBO.model';
import { LectureBO } from 'src/app/models/lectureBO.model';
import { LectureService } from 'src/app/services/lecture.service';
import { SlugifyPipe } from 'src/app/shared/util/string-to-slug.pipe';
import { STATUS_CAN_NOT_EIDT_DELETE } from 'src/app/shared/constants/status.constants';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'lecture-management-update',
  templateUrl: './lecture-management-update.component.html'
})
export class LectureManagementUpdateComponent implements OnInit {
  course: CourseBO;
  videoUrl;
  lecture: LectureBO;
  lectureParents: LectureBO[];
  types: any[];
  isSaving: boolean;
  selectedVideos: FileList;
  selectedFiles: any = [];
  idDeletedFile: any = [];
  parentCode;
  editForm = this.fb.group({
    id: [null],
    code: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*')]],
    name: ['', [Validators.required, Validators.maxLength(250)]],
    activated: [true],
    type: ['', [Validators.required]],
    parent: [''],
    sortOrder: [''],
    oldSortOrder: ['']
  });
  statusCanNotEditAndDelete = STATUS_CAN_NOT_EIDT_DELETE;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private lectureService: LectureService,
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
    });
    this.route.data.subscribe(({ lecture }) => {
      this.lecture = lecture.body ? lecture.body : lecture;
      // tslint:disable-next-line:max-line-length
      if (this.statusCanNotEditAndDelete.indexOf(this.course.status) !== -1 || this.statusCanNotEditAndDelete.indexOf(this.lecture.status) !== -1) {
        this.router.navigate(['admin/course-management', this.course.code, 'lecture']);
        return;
      }
      this.updateForm(this.lecture);
    });
  }
  slugify() {
    this.editForm.get(['code']).setValue(this.slugifyPipe.transform(this.editForm.get(['name']).value));
  }
  updateSortOrder() {
    if (this.editForm.get(['type']).value === 'chapter') {
      this.editForm.get(['sortOrder']).setValue(this.editForm.get(['oldSortOrder']).value);
    } else if (this.editForm.get(['parent']).value) {
      this.lectureService.getTotalChildren(this.editForm.get(['parent']).value)
      // tslint:disable-next-line:radix
      .subscribe(data => this.editForm.get(['sortOrder']).setValue(parseInt(data) + 1));
    }
  }
  updateType() {
    if (this.editForm.get(['type']).value === 'chapter') {
      this.editForm.get(['parent']).setValue(null);
    }
    if (this.editForm.get(['type']).value !== 'chapter' && this.editForm.get(['parent']).value === null) {
      this.editForm.get(['sortOrder']).setValue(1);
    } else if (this.editForm.get(['type']).value !== 'chapter' && this.editForm.get(['parent']).value !== null) {
      this.editForm.get(['sortOrder']).setValue(this.editForm.get(['sortOrder']).value);
    } else {
      this.editForm.get(['sortOrder']).setValue(this.editForm.get(['oldSortOrder']).value);
    }
  }
  private updateForm(lecture: LectureBO): void {
    this.editForm.patchValue({
      id: lecture.id,
      code: lecture.code,
      name: lecture.name,
      activated: lecture.activated === undefined ? true : lecture.activated,
      type: lecture.type ? lecture.type.code : null,
      parent: lecture.parentCode ? lecture.parentCode : null,
      sortOrder: lecture.id ? lecture.sortOrder : 0
    });
    this.selectedFiles = lecture.fileAttachments.map(file => {
      return {id: file.id, name: file.fileName};
    });
    this.idDeletedFile = [];
    this.route
      .queryParams
      .subscribe(params => {
        this.editForm.get(['parent']).setValue(params.parentCode || null);
    });
    this.lectureParents = [];
    this.lectureService.getParents(this.lecture.code, this.course.code).subscribe(data => {
      this.lectureParents = data;
      this.editForm.get(['sortOrder']).setValue(lecture.id ? lecture.sortOrder : this.lectureParents.length + 1);
      this.editForm.get(['oldSortOrder']).setValue(lecture.id ? lecture.sortOrder : this.lectureParents.length + 1);
    });
    this.types = [];
    this.lectureService.getTypes().subscribe(data => {
      this.types = data;
      if (lecture.id) {
        // chương học đã có bài học con
        if (lecture.lectures.length > 0) {
          this.types = this.types.filter(t => {
            return t.code === 'chapter';
          });
        } else if (lecture.parentCode) {
          // bài học đã thuộc 1 chương
          this.types = this.types.filter(t => {
            return t.code !== 'chapter';
          });
        }
      } else {
        if (this.editForm.get(['parent']).value) {
          // tạo mới bài học từ 1 chương
          this.types = this.types.filter(t => {
            return t.code !== 'chapter';
          });
        }
      }
    });
    if (!this.lecture.id) {
      this.updateSortOrder();
    }
    this.videoUrl = '../../../assets/images/default-video-image.png';
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
    const formdata: FormData = new FormData();
    formdata.append('videoFile', this.selectedVideos ? this.selectedVideos.item(0) : null);
    if (this.selectedFiles.length === 0) {
      formdata.append('files', null);
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.selectedFiles.length; i++) {
        if (!this.selectedFiles[i].id) {
          formdata.append('files', this.selectedFiles[i]);
        }
      }
    }
    formdata.append('lectureDTO', new Blob([JSON.stringify(this.updateCourseLecture())], {
      type: 'application/json'
    }));
    if (this.lecture.id !== null) {
      formdata.append('idDeleteds', new Blob([JSON.stringify(this.idDeletedFile)], {
        type: 'application/json'
      }));
      this.lectureService.update(formdata).subscribe(response => this.onSaveSuccess(response), (error) => this.onSaveError(error));
    } else {
      this.lectureService.create(formdata).subscribe(response => this.onSaveSuccess(response), (error) => this.onSaveError(error));
    }
  }
  private updateCourseLecture() {
    const courseTmp = {
      id : this.lecture.id,
      code : this.editForm.get(['code']).value,
      name : this.editForm.get(['name']).value,
      activated : this.editForm.get(['activated']).value,
      courseCode : this.course.code,
      type : {
        code : this.editForm.get(['type']).value
      },
      parentCode : this.editForm.get(['parent']).value,
      sortOrder : this.editForm.get(['sortOrder']).value,
    };
    if (!this.lecture.id) { delete courseTmp.id; }
    if (!courseTmp.parentCode) { delete courseTmp.parentCode; }
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
  onFileChange(event) {
    let checkList = false;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
        if (
            ( event.target.files[i].name.endsWith('.doc') ||
            event.target.files[i].name.endsWith('.docx') ||
            event.target.files[i].name.endsWith('.pdf') ||
            event.target.files[i].name.endsWith('.txt') ||
            event.target.files[i].name.endsWith('.zip') ||
            event.target.files[i].name.endsWith('.rar') ) &&
            Math.ceil(event.target.files[i].size / 1024) <= (3 * 1024)
        ) {
            checkList = true;
        } else {
            checkList = false;
            // tslint:disable-next-line:max-line-length
            this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Chỉ tải file với đuôi (doc|docx|pdf|txt|zip|rar) và nhỏ hơn 3MB'});
            break;
        }
        if (checkList) {
            this.selectedFiles = [...this.selectedFiles, event.target.files[i]];
        }
    }
  }
  removeFileAttach(id, index) {
    if (id) {
      this.idDeletedFile.push(id);
    }
    this.selectedFiles.splice(index, 1);
  }
  private onSaveSuccess(result) {
    this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Thao tác thành công!'});
    setTimeout(() => {
      this.previousState();
    }, 1200);
  }

  private onSaveError(err) {
    this.messageService.add({severity: 'error', summary: 'Thao tác thất bại!', detail: err.error.message});
    this.isSaving = false;
  }
}
