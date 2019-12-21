import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss']
})
export class StatisticalComponent implements OnInit {
  data: any;
  constructor() { }

  ngOnInit() {
    this.data = {
      datasets: [{
          data: [
              100,
              300,
              50,
              250,
              80
          ],
          backgroundColor: [
              '#FF6384',
              '#4BC0C0',
              '#FFCE56',
              '#E7E9ED',
              '#36A2EB'
          ],
          label: 'My dataset'
      }],
      labels: [
          'Red',
          'Green',
          'Yellow',
          'Grey',
          'Blue'
      ]
    };
  }

}
