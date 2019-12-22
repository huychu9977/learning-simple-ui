import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ExerciseService } from 'src/app/services/user-submit-exercise.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'lecture-exercise',
    templateUrl: './lecture-exercise.component.html',
    styleUrls: ['./lecture-exercise.component.scss']
})
export class LectureExerciseComponent implements OnInit {
    @Input() lecture?: any;
    listExercise?: any[] = [];
    fileSelect = null;
    loading = false;
    exerciseSubmitted?: any = null;
    exerciseFiles?: any[] = [];
    exerciseSelected?: any = null;
    constructor(
        private exerciseService: ExerciseService,
        private elRef: ElementRef,
        private messageService: MessageService,
        ) {}
    ngOnInit(): void {
        this.exerciseFiles = this.lecture.fileAttachments.filter(e => {
            return e.type === 'EXERCISE';
        });
        this.loadAll();
        this.loadExerciseSubmitted();
    }

    loadExerciseSubmitted() {
        this.exerciseService.getExerciseSubmitted(this.lecture.id).subscribe(res => {
            this.exerciseSubmitted = res;
        }, err => {this.messageService.add({severity: 'error', summary: 'Lỗi', detail: err.error.message }); });
    }

    loadAll() {
        this.loading = true;
        this.exerciseService.listByLecture(this.lecture.id).subscribe(res => {
            this.listExercise = res;
            this.loading = false;
        }, err => {this.loading = false; } );
    }
    submitExercise() {
        if (!this.fileSelect) {
            this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Chưa chọn tệp tin?'});
            return;
        }
        this.loading = true;
        const formdata: FormData = new FormData();
        formdata.append('file', this.fileSelect.item(0));
        formdata.append('lectureId', new Blob([JSON.stringify(this.lecture.id)], {
            type: 'application/json'
        }));
        this.exerciseService.submitExercise(formdata).subscribe(res => {
            this.messageService.add({severity: 'success', detail: 'Nộp thành công!'});
            this.loadAll();
        }, err => {
            this.messageService.add({severity: 'error', summary: 'Lỗi', detail: err.error.message });
            this.loading = false;
        });
    }

    onFileChange(event) {
        if (
            event.target.files[0].name.toLowerCase().endsWith('.zip') ||
            event.target.files[0].name.toLowerCase().endsWith('.rar') ||
            event.target.files[0].name.toLowerCase().endsWith('.java')
        ) {
          this.fileSelect = event.target.files;
        } else {
            const element = this.elRef.nativeElement.querySelector('#file');
            element.value = '';
            this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Chỉ tải tệp tin với đuôi (zip|java)'});
            this.fileSelect = null;
        }
    }
    downloadAttachment(fileUrl, fileName) {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}
