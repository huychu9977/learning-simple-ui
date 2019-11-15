import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { QuestionBO } from 'src/app/models/questionBO.model';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'question-modal',
  templateUrl: './question-modal.component.html'
})
export class QuestionModalComponent implements OnInit {
    answerContent = '';
    question: QuestionBO;
    questionTmp: QuestionBO;
    error = '';
    constructor(
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig) { }

    ngOnInit(): void {
      this.question = this.config.data.question;
      this.questionTmp = this.DeepCopy(this.question);
    }
    DeepCopy(obj: any): any {
        let clonedObject;
        if (obj === null || typeof obj !== 'object') {
          return obj;
        }
        if (obj instanceof Array) {
          clonedObject = [];
          for (let i = 0; i < obj.length; i++) {
            clonedObject[i] = this.DeepCopy(obj[i]);
          }
          return clonedObject;
        }
        if (obj instanceof Date) {
          clonedObject = new Date(obj.valueOf());
          return clonedObject;
        }
        if (obj instanceof RegExp) {
          clonedObject = RegExp(obj.source, obj.flags);
          return clonedObject;
        }
        if (obj instanceof Object) {
          clonedObject = new obj.constructor();
          for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) {
              clonedObject[attr] = this.DeepCopy(obj[attr]);
            }
          }
          return clonedObject;
        }
      }
    createAnswer() {
        this.questionTmp.answers.push({
            content: this.answerContent,
            isCorrect: false
        });
        this.answerContent = '';
    }
    deleteAnswer(i) {
        this.questionTmp.answers.splice(i, 1);
    }
    handleChange(evt, answer: any) {
        const target = evt.target;
        if (target.checked) {
            this.questionTmp.answers.forEach(a => {
                a.isCorrect = this.compare(a, answer) ? true : false;
            });
        }
    }
    save() {
        if (this.questionTmp.content === '' || !this.questionTmp.content || this.questionTmp.answers.length === 0) {
            this.error = 'Vui lòng nhập 1 câu hỏi và ít nhất 1 câu trả lời!';
            return;
        }
        this.questionTmp.answers.map(a => {
            if (a.hasOwnProperty('isEdit')) {
                delete a.isEdit;
            }
            return a;
        });
        this.ref.close(this.questionTmp);
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
