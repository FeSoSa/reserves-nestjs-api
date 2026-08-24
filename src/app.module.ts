import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservesModule } from './modules/reserves/reserves.module';

@Module({
  imports: [ReservesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
