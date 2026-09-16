import { Injectable } from '@nestjs/common';
import { RunnerOption, runner } from 'node-pg-migrate';
import { RunMigration } from 'node_modules/node-pg-migrate/dist/legacy/migration';
import { join } from 'path';
import { DatabaseService } from 'src/infra/database/database.service';

@Injectable()
export class MigrationsService {
  constructor(private readonly db: DatabaseService) {}

  async getMigrations(): Promise<RunMigration[]> {
    const dbClient = await this.db.getNewClient();
    try {
      const defaultMigrationOption: RunnerOption = {
        dbClient: dbClient,
        dryRun: true,
        dir: join('src', 'infra', 'migrations'),
        direction: 'up',
        verbose: true,
        migrationsTable: 'pgmigrations',
      };
      dbClient.end();
      return await runner(defaultMigrationOption);
    } finally {
      await dbClient.end();
    }
  }

  async postMigrations(): Promise<RunMigration[]> {
    const dbClient = await this.db.getNewClient();
    try {
      const defaultMigrationOption: RunnerOption = {
        dbClient: dbClient,
        dryRun: false,
        dir: join('src', 'infra', 'migrations'),
        direction: 'up',
        verbose: true,
        migrationsTable: 'pgmigrations',
      };
      const migratedMigrations = await runner(defaultMigrationOption);
      return migratedMigrations;
    } finally {
      await dbClient.end();
    }
  }
}
