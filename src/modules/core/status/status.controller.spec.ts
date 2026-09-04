import orchestrator from 'test/orchestrator';

describe('StatusController', () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
  });

  it('GET to /status should return 200', async () => {
    const response = await fetch('http://localhost:3000/status');
    console.log(response.body);
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.dependencies.database.updated_at).toBeDefined();
    const parsedUpdatedAt = new Date(
      responseBody.dependencies.database.updated_at,
    ).toISOString();
    expect(responseBody.dependencies.database.updated_at).toEqual(
      parsedUpdatedAt,
    );

    expect(Number(responseBody.dependencies.database.max_connections)).toEqual(
      100,
    );
    expect(responseBody.dependencies.database.version).toEqual('16.0');
    expect(responseBody.dependencies.database.open_connections).toEqual(1);
  });
});
