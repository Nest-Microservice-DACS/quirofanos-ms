import { Module } from '@nestjs/common';
import { QuirofanosService } from './quirofanos.service';
import { QuirofanosController } from './quirofanos.controller';

@Module({
  controllers: [QuirofanosController],
  providers: [QuirofanosService],
})
export class QuirofanosModule {}
