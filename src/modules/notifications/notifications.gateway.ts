import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' }, 
})
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  sendNewPostNotification(postTitle: string) {
    this.server.emit('newPost', {
      message: `Додано новий пост: ${postTitle}`,
      time: new Date(),
    });
  }
}