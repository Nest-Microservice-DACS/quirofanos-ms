import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { QuirofanoEstadoList } from '../enum/quirofano.enum';
import { QuirofanoEstado } from 'generated/prisma/client';

export class ChangeQuirofanoStatusDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsEnum(QuirofanoEstadoList, {
    message: 'Estados permitidos: ' + QuirofanoEstadoList.join(', '),
  })
  estado: QuirofanoEstado;
}
