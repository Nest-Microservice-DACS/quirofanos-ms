import { Module } from '@nestjs/common';
import { QuirofanosModule } from './quirofanos/operating-room.module';

@Module({
  imports: [QuirofanosModule],
})
export class AppModule {}
