import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OperatingRoomStatus } from 'generated/prisma/client';
import { OperatingRoomStatusList } from '../enum/operating-room.enum';

export class CreateOperatingRoomDto {
  @IsString()
  name: string;

  @IsEnum(OperatingRoomStatusList, {
    message: 'Allowed statuses: ' + OperatingRoomStatusList.join(', '),
  })
  @IsOptional()
  status: OperatingRoomStatus = OperatingRoomStatus.AVAILABLE;

  @IsOptional()
  location: string;
}
