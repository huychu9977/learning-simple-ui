import { Component, OnInit } from '@angular/core';
import { RoleBO } from 'src/app/models/roleBO.model';
@Component({
  selector: 'jhi-role-mgmt-detail',
  templateUrl: './role-management-detail.component.html',
  styles: ['.modal-header, .modal-body{font-family: "Arimo";}table{border-collapse: separate; border-spacing: 10px 0.6em;}']
})
export class RoleMgmtDetailComponent implements OnInit {
  role: RoleBO;
  constructor() {}
  clear() {
   // this.bsModalRef.hide();
  }
  ngOnInit() {
  }
}
