import { Component } from '@angular/core';
import { MessagesCrudService } from '../../lib/services/messages-crud.service';

@Component({
  selector: 'app-message-crud',
  templateUrl: './message-crud.component.html',
  styleUrl: './message-crud.component.css'
})
export class MessageCrudComponent {
  id : any
  message: any;
  errorMessage?: string;
  wrong?: boolean;

  constructor(
    private messageService: MessagesCrudService
    ) {}

  sendMessage() {
    this.messageService.saveMessage(this.id, this.message).subscribe({
      next: (data) => { 
        this.id = data.id;
        this.message = data.message;
        location.reload()
      },
      error: (error) => {
        console.log(error)
        this.errorMessage = error.error.message;
        this.wrong = true;
        setTimeout(() => { this.wrong = false; }, 3000);
      },
      complete: () => console.info('Message sent')
    });
  }
}
