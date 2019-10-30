import { Component, OnInit } from '@angular/core';
import { RoleBO } from 'src/app/models/roleBO.model';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'jhi-role-mgmt-detail',
  templateUrl: './role-management-detail.component.html',
  styles: ['.modal-header, .modal-body{font-family: "Arimo";}table{border-collapse: separate; border-spacing: 10px 0.6em;}']
})
export class RoleMgmtDetailComponent implements OnInit {
  role: RoleBO;
  bsModalRef: BsModalRef;
  constructor() {}
  clear() {
    this.bsModalRef.hide();
  }
  ngOnInit() {
  }
}
