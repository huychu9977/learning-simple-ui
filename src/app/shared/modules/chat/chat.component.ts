import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from 'src/app/core/auth/socket.service';
import { AccountService } from 'src/app/core/auth/account.service';

@Component({
  selector: 'form-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() openListUserOnline = false;
  show = false;
  listUserOnline: any[] = [];
  listMessage: any[] = [];
  openingChatForm = false;
  listChatting = [];
  constructor(private socketService: SocketService, private accountService: AccountService) { }
  //
  ngOnInit() {
    this.accountService.identity().then(account => {
      if (account) {
        this.socketService.listUserOnline(res => {
          if (res) {
            const listTmp = [];
            this.listUserOnline = res.filter(r => {
              const check = listTmp.indexOf(r.username) < 0 && r.username !== account.username
              && (r.roles.indexOf('ROLE_TEACHER') > -1 || r.roles.indexOf('ROLE_ADMIN') > -1);
              listTmp.push(r.username);
              return check;
            });
          }
        });
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

  async getListMessage(username, name) {
    if (this.listChatting.indexOf(username) < 0) {
      this.openingChatForm = true;
      this.accountService.identity().then(async account => {
        const mess = await this.socketService.getListMessage(username).toPromise();
        let isHasUser = false;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.listMessage.length; i++) {
          if (this.listMessage[i].user === username) {
            this.listMessage[i].messages = [];
            this.listMessage[i].messages = mess.map(m => {
              return {
                content: m.content,
                createdAt: m.createdAt,
                isSent: m.senderId === account.id
              };
            });
            isHasUser = true;
          }
        }
        if (!isHasUser) {
          this.listMessage.push({
            username,
            name,
            messages : mess.length > 0 ? mess.map(m => {
              return {content: m.content, createdAt: m.createdAt, isSent: m.senderId === account.id};
            }) : []
          });
        }
        this.openingChatForm = false;
      });
      this.listChatting.push(username);
    }
  }

  onClose(event) {
    this.listMessage.splice(event - 1, 1);
    this.listChatting.splice(event - 1, 1);
  }
}
