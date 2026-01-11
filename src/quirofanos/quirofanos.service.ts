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
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { last } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { status } from '../common/grpc-status';
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

  async create(createQuirofanoDto: CreateQuirofanoDto) {
    try {
      return await this.quirofano.create({ data: createQuirofanoDto });
    } catch (error) {
      throw new RpcException({
        status: status.INTERNAL,
        message: 'Failed to create',
        details: error?.message || error,
      });
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const totalPages = await this.quirofano.count();
      const currentPage = paginationDto.page;
      const pageSize = paginationDto.size;
      return {
        data: await this.quirofano.findMany({
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        }),
        meta: {
          total: totalPages,
          page: currentPage,
          lastPage: Math.ceil(totalPages / pageSize),
        },
      };
    } catch (error) {
      throw new RpcException({
        status: status.INTERNAL,
        message: 'Failed to fetch',
        details: error?.message || error,
      });
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.quirofano.findUnique({ where: { id } });
      if (!result) {
        throw new RpcException({
          status: status.NOT_FOUND,
          message: 'Operating room not found',
        });
      }
      return result;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        status: status.INTERNAL,
        message: 'Failed to fetch operating room',
        details: error?.message || error,
      });
    }
  }

  async update(id: number, updateQuirofanoDto: UpdateQuirofanoDto) {
    try {
      return await this.quirofano.update({
        where: { id },
        data: updateQuirofanoDto,
      });
    } catch (error) {
      throw new RpcException({
        status: status.INTERNAL,
        message: 'Failed to update',
        details: error?.message || error,
      });
    }
  }

  async changeStatus(changeQuirofanoStatusDto: ChangeQuirofanoStatusDto) {
    const { id, estado } = changeQuirofanoStatusDto;
    try {
      return await this.quirofano.update({ where: { id }, data: { estado } });
    } catch (error) {
      throw new RpcException({
        status: status.INTERNAL,
        message: 'Failed to change status',
        details: error?.message || error,
      });
    }
  }
}
