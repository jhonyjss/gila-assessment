import { IsString, IsNotEmpty, IsNumber, IsEmpty } from 'class-validator';

export class CreateLogsDto {
  @IsString()
  @IsNotEmpty({
    message: 'Message is required*',
  })
  message: string;

  @IsNumber()
  @IsEmpty({
    message: 'User ID is required*',
  })
  usersId: number;

  @IsNumber()
  @IsEmpty({
    message: 'Category ID is required*',
  })
  categoriesId: number;

  @IsNumber()
  @IsEmpty({
    message: 'Notification ID is required*',
  })
  notificationsId: number;

  /*  @IsNumber()
  @IsNotEmpty({
    message: 'Category ID is required*',
  })
  readonly category_id: number;

  @IsNumber()
  @IsNotEmpty({
    message: 'Notification ID is required*',
  })
  readonly notification_id: number; */
}
