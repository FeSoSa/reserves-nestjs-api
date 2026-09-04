import { Module } from '@nestjs/common';
import { ReservesController } from './reserves.controller';
import { ReservesRepository } from './reserves.repository';
import { ReservesService } from './reserves.service';

@Module({
  imports: [],
  controllers: [ReservesController],
  providers: [ReservesService, ReservesRepository],
})
export class ReservesModule {}
