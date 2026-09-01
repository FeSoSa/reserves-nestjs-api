import { Controller, Get, Post } from "@nestjs/common";
import { MigrationsService } from "./migrations.service";

@Controller('migrations')
export class MigrationsController {
  constructor(private readonly service: MigrationsService) { }

  @Get()
  async getMigrations() {
    return this.service.getMigrations()
  }

  @Post()
  async postMigrations() {
    return this.service.postMigrations()
  }

}