import { Module } from "@nestjs/common";
import { ReservesController } from "./reserves.controller";

@Module({
    imports: [],
    controllers: [ReservesController],
    providers: [],
})
export class ReservesModule { }