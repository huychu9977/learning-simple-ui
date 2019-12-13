import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from 'src/app/core/auth/socket.service';
@Component({
  selector: 'form-message',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {
  visibleSidebar2 = false;
  @Input() isShow = false;
  constructor(private socketService: SocketService) { }

  ngOnInit() {
  }
  send() {
    // this.socketService.sendUser();
  }
}
