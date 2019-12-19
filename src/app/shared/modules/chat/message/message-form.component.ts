import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SocketService } from 'src/app/core/auth/socket.service';
@Component({
  selector: 'form-message',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {
  content = '';
  @Input() message?: any;
  @Input() index?: any;
  // tslint:disable-next-line:no-output-rename
  @Output('onClose') closeEmit = new EventEmitter<boolean>();
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.receiveMessage(res => {
      this.message.messages.push({
        content: res.content, createdAt: res.createdAt, isSent: false
      });
    });
  }
  close() {
    this.closeEmit.emit(this.index);
  }

  send(username) {
    if (this.content.trim() !== '') {
      this.socketService.sendMessage(this.content, username);
      this.message.messages.push({
        content: this.content, createdAt: new Date(), isSent: true
      });
      this.content = '';
    }
  }
}
