import { Controller, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { QuirofanosService } from './quirofanos.service';
import { CreateQuirofanoDto } from './dto/create-quirofano.dto';
import { UpdateQuirofanoDto } from './dto/update-quirofano.dto';
import { ChangeQuirofanoStatusDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('quirofanos')
export class QuirofanosController {
  constructor(private readonly quirofanosService: QuirofanosService) {}

  @MessagePattern({ cmd: 'create_quirofano' })
  create(@Payload() createQuirofanoDto: CreateQuirofanoDto) {
    return this.quirofanosService.create(createQuirofanoDto);
  }

  @MessagePattern({ cmd: 'get_quirofanos' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.quirofanosService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'get_quirofano_by_id' })
  findOne(@Payload() id: number) {
    return this.quirofanosService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_quirofano' })
  update(@Payload() updateQuirofanoDto: UpdateQuirofanoDto) {
    return this.quirofanosService.update(
      updateQuirofanoDto.id,
      updateQuirofanoDto,
    );
  }

  @MessagePattern({ cmd: 'change_quirofano_status' })
  changeStatus(@Payload() changeQuirofanoStatusDto: ChangeQuirofanoStatusDto) {
    return this.quirofanosService.changeStatus(changeQuirofanoStatusDto);
  }
}
