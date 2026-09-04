import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientConfig, QueryConfig, QueryResult } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  async query<T = any>(
    queryObject: string | QueryConfig,
  ): Promise<QueryResult<T>> {
    let client: Client | undefined;

    try {
      client = await this.getNewClient();
      const result = await client.query<T>(queryObject);
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      if (client) {
        await client.end();
      }
    }
  }

  async getNewClient(): Promise<Client> {
    const config: ClientConfig = {
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      ssl: process.env.NODE_ENV == 'production' ? true : false,
    };
    const client = new Client(config);
    await client.connect();
    return client;
  }
}
