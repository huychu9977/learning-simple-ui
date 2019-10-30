import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { QuestionModalComponent } from './question-modal.component';
import { LectureBO } from 'src/app/models/lectureBO.model';
import { QuestionBO } from 'src/app/models/questionBO.model';
import { BsModalService } from 'ngx-bootstrap';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'lecture-quiz',
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {
    lecture: LectureBO;
    questions: QuestionBO[];

    constructor(
        private modalService: BsModalService,
        private route: ActivatedRoute,
        private questionService: QuestionService,
        private toastr: ToastrService) {
        }

    ngOnInit(): void {
        this.route.data.subscribe(({ lecture }) => {
            this.lecture = lecture.body ? lecture.body : lecture;
        });
        this.loadAll();
    }
    previousState() {
        window.history.back();
    }

    loadAll() {
        this.questionService.findAll(this.lecture.code)
        .subscribe(
            (res: HttpResponse<QuestionBO[]>) => this.onSuccess(res.body),
            (res: HttpResponse<any>) => console.log(res.body)
        );
    }

    private onSuccess(data) {
        this.questions = data;
    }

    handleChange(evt, answer: any, question?: QuestionBO) {
        const target = evt.target;
        if (target.checked) {
            question.answers.forEach(a => {
                a.isCorrect = this.compare(a, answer) ? true : false;
            });
        }
    }

    delete(i) {
        this.questions.splice(i, 1);
    }

    save() {
        if (this.questions.length > 0) {
            this.questionService.update(this.lecture.code, this.questions)
            .subscribe(
                response => this.onSaveSuccess(response),
                () => this.onSaveError()
            );
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

    open(q?: QuestionBO) {
        const modalRef = this.modalService.show(QuestionModalComponent);
        const qTmp: QuestionBO = {
            content: '',
            answers: []
        };
        q = q ? q : qTmp;
        q.answers.map(a => {
            return {
                id: a.id ? a.id : null,
                content: a.content ? a.content : '',
                isCorrect: a.isCorrect ? a.isCorrect : false,
                isEdit: false
            };
        });
        modalRef.content.question = q;
        modalRef.content.action.take(1).subscribe((value) => {
            if (q.content !== '' && q.answers.length > 0) {
                value.id = q.id;
                this.questions[this.questions.indexOf(q)] = value;
            } else {
                this.questions.push(value);
            }
        });
    }
    compare(o1: any, o2: any) {
        for (const attr in o1) {
            if (o2.hasOwnProperty(attr)) {
                if (o1[attr] !== o2[attr]) { return false; }
            }
        }
        return true;
    }
}
