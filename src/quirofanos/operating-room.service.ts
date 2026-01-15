import {
  HttpStatus,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { CreateOperatingRoomDto } from './dto/create-operating-room.dto';
import { UpdateOperatingRoomDto } from './dto/update-operating-room.dto';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '../../generated/prisma/client';
import { ChangeOperatingRoomStatusDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { last } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { status } from '../common/grpc-status';
@Injectable()
export class OperatingRoomService
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

  private readonly logger = new Logger(OperatingRoomService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Prisma connected to the database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma disconnected from the database');
  }

  async create(createOperatingRoomDto: CreateOperatingRoomDto) {
    try {
      return await this.operatingRoom.create({ data: createOperatingRoomDto });
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create operating room',
      });
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const totalPages = await this.operatingRoom.count();
      const currentPage = paginationDto.page;
      const pageSize = paginationDto.size;
      return {
        data: await this.operatingRoom.findMany({
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
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch operating rooms',
      });
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.operatingRoom.findUnique({ where: { id } });
      if (!result) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'Operating room not found',
        });
      }
      return result;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch operating room',
      });
    }
  }

  async update(id: number, updateOperatingRoomDto: UpdateOperatingRoomDto) {
    try {
      return await this.operatingRoom.update({
        where: { id },
        data: updateOperatingRoomDto,
      });
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to update',
      });
    }
  }

  async changeStatus(changeOperatingRoomStatusDto: ChangeOperatingRoomStatusDto) {
    const { id, status: status } = changeOperatingRoomStatusDto;
    try {
      return await this.operatingRoom.update({ where: { id }, data: { status } });
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to change status',
      });
    }
  }
}
