import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/services/user-submit-exercise.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'lecture-exercise',
    templateUrl: './ecercise.component.html'
})
export class ExerciseComponent implements OnInit {
    list?: any[] = [];
    lecture?: any = null;
    loading = false;
    constructor(
        private exerciseService: ExerciseService,
        private route: ActivatedRoute,
        private messageService: MessageService,
    ) {}
    ngOnInit(): void {
        this.route.data.subscribe(({ lecture }) => {
            this.lecture = lecture.body ? lecture.body : lecture;
            this.loadAll();
        });
    }
    loadAll() {
        this.loading = true;
        this.exerciseService.listByLecture(this.lecture.id).subscribe(res => {
            this.list = res;
            this.loading = false;
        }, err => {
            this.loading = false;
            console.log(err);
        });
    }
    updateScore(id, score, content) {
        if (score < 0 || score > 10) {
            this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Điểm trong khoảng 0-10'});
            return;
        }
        this.loading = true;
        const formdata: FormData = new FormData();
        formdata.append('dto', new Blob([JSON.stringify({
            id,
            score,
            content
        })], {
            type: 'application/json'
        }));
        this.exerciseService.update(formdata).subscribe(res => {
            this.messageService.add({severity: 'success', summary: 'Thành công'});
            this.loadAll();
        }, err => { this.loading = false; console.log(err); });
    }
    checking(exerciseId?: any) {
        this.loading = true;
        this.exerciseService.checkingExercise(exerciseId).subscribe(res => {
            if  (res) {
                this.messageService.add({severity: 'success', summary: 'Đang kiểm tra'});
                this.loadAll();
            }
        }, err => { this.loading = false; });
    }
    downloadAttachment(fileUrl, fileName) {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    previousState() {
        window.history.back();
    }
}
