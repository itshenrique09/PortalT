import { Component } from '@angular/core';
import { MessagesCrudService } from '../../../lib/services/messages-crud.service';
import { AuthService } from '../../../lib/services/auth.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-display-messages',
  templateUrl: './display-messages.component.html',
  styleUrl: './display-messages.component.css'
})
export class DisplayMessagesComponent {
  messagesWithUsers: any[] = [];
  users: any[] = [];
  errorMessage?: string;
  wrong?: boolean;

  constructor(private messageService: MessagesCrudService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.seeMessages();
  }

  seeMessages() {
    this.messageService.allMessage().subscribe({
      next: (messagesData) => {
        const userObservables = messagesData.map((message: any) => this.userById(message.user_id));
        forkJoin(userObservables).subscribe((usersData: any) => {
          this.messagesWithUsers = messagesData.map((message: any, index: number) => ({
            ...message,
            user: usersData[index],
          }));
        });
      },
    });
  }
  
  userById(userId: any): Observable<any> {
    return this.authService.getUsersByIds(userId);
  }

  moveMessageUp(message: any) {
    const index = this.messagesWithUsers.indexOf(message);
    if (index > 0) {
      this.swapMessages(index, index - 1);
    }
  }

  moveMessageDown(message: any) {
    const index = this.messagesWithUsers.indexOf(message);
    if (index < this.messagesWithUsers.length - 1) {
      this.swapMessages(index, index + 1);
    }
  }

  private swapMessages(indexA: number, indexB: number) {
    const temp = this.messagesWithUsers[indexA];
    this.messagesWithUsers[indexA] = this.messagesWithUsers[indexB];
    this.messagesWithUsers[indexB] = temp;
  }

  deleteMessage(messageId: number): void {
    this.messageService.deleteMessage(messageId).subscribe({
      next:() => {
        location.reload()
      },
      error: (error) => {
        this.errorMessage = error.error;
        this.wrong = true;
        setTimeout(() => { this.wrong = false; }, 3000);
      },
      complete: () => console.info('Message deleted')
    });
  } 
}
