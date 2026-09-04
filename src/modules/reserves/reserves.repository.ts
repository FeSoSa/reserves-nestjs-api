import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infra/database/database.service';

@Injectable()
export class ReservesRepository {
  constructor(private readonly db: DatabaseService) {}

  async hello() {
    const result = await this.db.query('SELECT 1+1;');
    return result.rows;
  }
}
