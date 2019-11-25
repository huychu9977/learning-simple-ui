import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QUESTION_BECOME_INSTRUCTOR } from 'src/app/shared/constants/instructor-question-become.constants';

@Component({
  selector: 'app-become-instructor',
  templateUrl: './become-instructor.component.html',
  styleUrls: ['./become-instructor.component.scss']
})
export class BecomeInstructorComponent implements OnInit {
  step = 0;
  items = [];
  quickQuestion = QUESTION_BECOME_INSTRUCTOR;
  activeIndex = 1;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.step = +params.id || 0;
      if (this.step !== 0 && this.step !== 1 && this.step !== 2 && this.step !== 3 ) {
        this.router.navigate(['/not-found']);
      }
      this.activeIndex = this.step - 1;
    });
    this.items = [
      {label: 'Step 1'},
      {label: 'Step 2'},
      {label: 'Step 3'}
  ];
  }

}
