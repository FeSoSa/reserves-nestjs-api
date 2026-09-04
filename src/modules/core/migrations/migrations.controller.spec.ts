import { DatabaseService } from 'src/infra/database/database.service';
import orchestrator from 'test/orchestrator';

describe('MigrationsController POST', () => {
  let db: DatabaseService;

  beforeAll(async () => {
    await orchestrator.waitForAllServices();
    db = new DatabaseService();
    await db.query('DROP SCHEMA public cascade; CREATE schema public;');
  });

  it('POST to /migrations should return 200', async () => {
    const response1 = await fetch('http://localhost:3000/migrations', {
      method: 'POST',
    });
    expect(response1.status).toBe(201);
    const response1Body = await response1.json();
    expect(Array.isArray(response1Body)).toBe(true);
    expect(response1Body.length).toBeGreaterThan(0);

    const response2 = await fetch('http://localhost:3000/migrations', {
      method: 'POST',
    });
    expect(response2.status).toBe(200);
    const response2Body = await response2.json();
    expect(Array.isArray(response2Body)).toBe(true);
    expect(response2Body.length).toBe(0);
  });
});
