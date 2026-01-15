import { Controller, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OperatingRoomService as OperatingRoomService } from './operating-room.service';
import { CreateOperatingRoomDto } from './dto/create-operating-room.dto';
import { UpdateOperatingRoomDto } from './dto/update-operating-room.dto';
import { ChangeOperatingRoomStatusDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller()
export class OperatingRoomController {
  constructor(private readonly operatingRoomService: OperatingRoomService) {}

  @MessagePattern({ cmd: 'create_operating_room' })
  create(@Payload() createOperatingRoomDto: CreateOperatingRoomDto) {
    return this.operatingRoomService.create(createOperatingRoomDto);
  }

  @MessagePattern({ cmd: 'get_operating_rooms' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.operatingRoomService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'get_operating_room_by_id' })
  findOne(@Payload() id: number) {
    return this.operatingRoomService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_operating_room' })
  update(
    @Payload()
    {
      updateOperatingRoomDto,
      id,
    }: {
      updateOperatingRoomDto: UpdateOperatingRoomDto;
      id: number;
    },
  ) {
    return this.operatingRoomService.update(id, updateOperatingRoomDto);
  }

  @MessagePattern({ cmd: 'change_operating_room_status' })
  changeStatus(
    @Payload() changeOperatingRoomStatusDto: ChangeOperatingRoomStatusDto,
  ) {
    return this.operatingRoomService.changeStatus(changeOperatingRoomStatusDto);
  }
}
