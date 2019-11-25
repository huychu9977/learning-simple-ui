import { Component, OnInit } from '@angular/core';
import { UserBO } from 'src/app/models/userBO.model';
import { DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'jhi-user-mgmt-detail',
  templateUrl: './user-management-detail.component.html',
  styles: ['.modal-header, .modal-body{font-family: "Arimo";}table{border-collapse: separate; border-spacing: 10px 0.6em;}']
})
export class UserMgmtDetailComponent implements OnInit {
  user: UserBO;
  constructor(public config: DynamicDialogConfig, ) {}

  ngOnInit() {
    this.user = this.config.data.user;
  }
}
