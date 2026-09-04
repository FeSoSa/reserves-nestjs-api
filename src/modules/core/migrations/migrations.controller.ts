import { Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { MigrationsService } from './migrations.service';

@Controller('migrations')
export class MigrationsController {
  constructor(private readonly service: MigrationsService) {}

  @Get()
  async getMigrations() {
    return this.service.getMigrations();
  }

  @Post()
  async postMigrations(@Res() res: Response) {
    const migratedMigrations = await this.service.postMigrations();

    if (migratedMigrations.length > 0) {
      return res.status(201).json(migratedMigrations);
    }

    return res.status(200).json(migratedMigrations);
  }
}
