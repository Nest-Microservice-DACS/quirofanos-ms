import { Module } from '@nestjs/common';
import { OperatingRoomService } from './operating-room.service';
import { OperatingRoomController } from './operating-room.controller';

@Module({
  controllers: [OperatingRoomController],
  providers: [OperatingRoomService],
})
export class QuirofanosModule {}
