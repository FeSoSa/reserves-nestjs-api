import { Controller, Get } from "@nestjs/common";
import { ReservesService } from "./reserves.service";

@Controller('reserves')
export class ReservesController {
  constructor(
    private readonly service: ReservesService
  ) { }

  @Get()
  async getReserves() {
    return await this.service.getAll()
  }

}