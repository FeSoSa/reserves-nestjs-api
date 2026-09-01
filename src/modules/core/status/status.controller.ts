import { Controller, Get } from "@nestjs/common";
import { StatusService } from "./status.service";

@Controller('status')
export class StatusController {
  constructor(
    private readonly service: StatusService
  ) { }

  @Get()
  async getStatus() {
    return await this.service.getStatus()
  }

}