import { Component, OnInit, Input } from '@angular/core';
import { CourseBO } from 'src/app/models/courseBO.model';
import { SocketService } from 'src/app/core/auth/socket.service';
import { AccountService } from 'src/app/core/auth/account.service';
@Component({
  selector: 'form-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  visibleSidebar2 = false;
  show = false;
  listUserOnline: any[] = [];
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.receiveMessage(res => {
      console.log(res);
    });
    this.socketService.listUserOnline(res => {
      if (res) {
        this.listUserOnline = res;
      }
    });
    this.socketService.userLogin(res => {
      if (res) {
        let existingUser = false;
        for (let index = 0; index < this.listUserOnline.length; index++) {
          if (this.listUserOnline[index].username === res.username) {
            existingUser = true;
            this.listUserOnline[index] = res;
          }
        }
        if (!existingUser) {
          this.listUserOnline.push(res);
        }
      }
    });
    this.socketService.userLogut(res => {
      if (res) {
        for (let index = 0; index < this.listUserOnline.length; index++) {
          if (this.listUserOnline[index].username === res.username) {
            this.listUserOnline.splice(index, 1);
          }
        }
      }
    });
  }
  send() {
    // this.socketService.sendUser();
  }
}
