import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { QuirofanosService } from './quirofanos.service';
import { CreateQuirofanoDto } from './dto/create-quirofano.dto';
import { UpdateQuirofanoDto } from './dto/update-quirofano.dto';
import { ChangeQuirofanoStatusDto } from './dto';

@Controller()
export class QuirofanosController {
  constructor(private readonly quirofanosService: QuirofanosService) {}

  @MessagePattern({ cmd: 'create_quirofano' })
  create(@Payload() createQuirofanoDto: CreateQuirofanoDto) {
    return this.quirofanosService.create(createQuirofanoDto);
  }

  @MessagePattern({ cmd: 'find_all_quirofanos' })
  findAll() {
    return this.quirofanosService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_quirofano' })
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
