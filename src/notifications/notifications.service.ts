import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationsService {
  private notificationSubject = new Subject<any>();

  get notifications() {
    return this.notificationSubject.asObservable();
  }

  sendNotification(notification: any) {
    this.notificationSubject.next(notification);
  }
}
