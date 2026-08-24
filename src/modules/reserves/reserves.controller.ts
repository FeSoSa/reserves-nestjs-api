import { Controller, Get } from "@nestjs/common";

@Controller('reserves')
export class ReservesController {
    constructor() { }

    @Get()
    getReserves(): string[] {
        return ['reserva1', 'reserva2']
    }

}