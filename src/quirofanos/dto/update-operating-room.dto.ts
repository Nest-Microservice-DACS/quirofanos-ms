import { PartialType } from '@nestjs/mapped-types';
import { CreateOperatingRoomDto } from './create-operating-room.dto';

export class UpdateOperatingRoomDto extends PartialType(CreateOperatingRoomDto) {
}
