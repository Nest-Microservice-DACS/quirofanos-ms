import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { OperatingRoomStatusList } from '../enum/operating-room.enum';
import { OperatingRoomStatus } from 'generated/prisma/client';

export class ChangeOperatingRoomStatusDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsEnum(OperatingRoomStatusList, {
    message: 'Allowed statuses: ' + OperatingRoomStatusList.join(', '),
  })
  status: OperatingRoomStatus;
}
