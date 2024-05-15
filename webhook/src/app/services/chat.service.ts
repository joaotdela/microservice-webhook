import { Injectable } from '@angular/core';
import { HubConnection,HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private mensagens: string[] =[];
  private hubConnection: HubConnection;
  constructor() {

    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/chat')
      .build();

    this.hubConnection.start()
      .then(() => console.log('Conectado ao hub'))
      .catch(err => console.error('Erro ao conectar ao hub', err));

    this.hubConnection.on("ReceberMensagem", (mensagem: string) => {
      console.log(`Mensagem ${mensagem}`);
      this.mensagens.push(mensagem);
    });
  }

  enviarMensagem(userName: string, novaMensagem: string){
    this.hubConnection.invoke('EnviarMensagem', userName + ': ' + novaMensagem)
    .catch(err => console.error('Erro ao enviar mensagem', err));
  }

  getMensagens(): string[]{
    return this.mensagens;
  }

  userNameIsValid(userName: string): string{
    if(userName === ""){
      const numeroAleatorio = Math.floor(Math.random() * 1000);
      return 'user' + numeroAleatorio;
    }
    return userName;
  }
}
