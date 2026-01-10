import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { CreateQuirofanoDto } from './dto/create-quirofano.dto';
import { UpdateQuirofanoDto } from './dto/update-quirofano.dto';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '../../generated/prisma/client';
import { ChangeQuirofanoStatusDto } from './dto';
@Injectable()
export class QuirofanosService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private pool: Pool;
  private adapter: PrismaPg;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);
    super({ adapter });
    this.pool = pool;
    this.adapter = adapter;
  }

  private readonly logger = new Logger(QuirofanosService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Prisma conectado a la base de datos');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma desconectado de la base de datos');
  }

  create(createQuirofanoDto: CreateQuirofanoDto) {
    return this.quirofano.create({ data: createQuirofanoDto });
  }

  findAll() {
    return this.quirofano.findMany();
  }

  findOne(id: number) {
    return this.quirofano.findUnique({ where: { id } });
  }

  update(id: number, updateQuirofanoDto: UpdateQuirofanoDto) {
    return this.quirofano.update({
      where: { id },
      data: updateQuirofanoDto,
    });
  }

  changeStatus(changeQuirofanoStatusDto: ChangeQuirofanoStatusDto) {
    const { id, estado } = changeQuirofanoStatusDto;
    return this.quirofano.update({ where: { id }, data: { estado } });
  }
}
