import { Controller, Post, Body, Sse, MessageEvent } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { map, Observable } from 'rxjs';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Sse('events')
  sendEvents(): Observable<MessageEvent> {
    return this.notificationsService.notifications.pipe(
      map((notification) => ({
        data: notification,
      })),
    );
  }

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    this.notificationsService.sendNotification(createNotificationDto);
    return { message: 'Notification sent' };
  }
}
