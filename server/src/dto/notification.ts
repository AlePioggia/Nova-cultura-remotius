export interface INotification {
    mail: string;
    notificationContent: string;
    timeStamp?: Date;
}

export class Notification implements INotification {
    mail: string;
    notificationContent: string;
    timeStamp?: Date;
}
