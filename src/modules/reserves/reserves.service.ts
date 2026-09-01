import { Injectable } from "@nestjs/common";
import { ReservesRepository } from "./reserves.repository";

@Injectable()
export class ReservesService {
  constructor(private readonly repository: ReservesRepository) { }

  async getAll() {
    return await this.repository.hello()
  }

}