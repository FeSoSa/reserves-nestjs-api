import { Module } from '@nestjs/common';
import { MigrationsController } from './migrations/migrations.controller';
import { MigrationsService } from './migrations/migrations.service';
import { StatusController } from './status/status.controller';
import { StatusService } from './status/status.service';

@Module({
  imports: [],
  controllers: [StatusController, MigrationsController],
  providers: [StatusService, MigrationsService],
})
export class CoreModule {}
