import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  title = 'webhook';
  public userName: string = "";
  public mensagens: string[] = [];
  public novaMensagem: string = "";

  constructor(private chatService: ChatService) {
  }

  enviarMensagem() {
    this.userName = this.chatService.userNameIsValid(this.userName);
    this.chatService.enviarMensagem(this.userName, this.novaMensagem);
    this.mensagens = this.chatService.getMensagens();
    this.novaMensagem = "";
  }

}
