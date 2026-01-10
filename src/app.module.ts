import { Module } from '@nestjs/common';
import { QuirofanosModule } from './quirofanos/quirofanos.module';

@Module({
  imports: [QuirofanosModule],
})
export class AppModule {}
