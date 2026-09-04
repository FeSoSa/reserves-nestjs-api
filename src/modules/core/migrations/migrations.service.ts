import { Injectable } from '@nestjs/common';
import migrationRunner, { RunnerOption } from 'node-pg-migrate';
import { join } from 'path';
import { DatabaseService } from 'src/infra/database/database.service';

@Injectable()
export class MigrationsService {
  constructor(private readonly db: DatabaseService) {}

  async getMigrations() {
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
      return await migrationRunner(defaultMigrationOption);
    } finally {
      await dbClient.end();
    }
  }

  async postMigrations() {
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
      const migratedMigrations = await migrationRunner(defaultMigrationOption);
      return migratedMigrations;
    } finally {
      await dbClient.end();
    }
  }
}
