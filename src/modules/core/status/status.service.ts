import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infra/database/database.service';

@Injectable()
export class StatusService {
  constructor(private readonly db: DatabaseService) {}

  async getStatus() {
    const updated_at = new Date().toISOString();

    const databaseVersionResult = await this.db.query('SHOW server_version;');
    const databaseVersionValue = databaseVersionResult.rows[0].server_version;

    const databaseMaxConnectionsResult = await this.db.query(
      'SHOW max_connections;',
    );
    const databaseMaxConnectionsValue =
      databaseMaxConnectionsResult.rows[0].max_connections;

    const databaseOpenConnectionsResult = await this.db.query({
      text: 'SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;',
      values: [process.env.POSTGRES_DB],
    });
    const databaseOpenConnectionsValue =
      databaseOpenConnectionsResult.rows[0].count;

    return {
      dependencies: {
        database: {
          updated_at,
          version: databaseVersionValue,
          max_connections: databaseMaxConnectionsValue,
          open_connections: databaseOpenConnectionsValue,
        },
      },
    };
  }
}
