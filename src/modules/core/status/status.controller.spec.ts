import { Test, TestingModule } from "@nestjs/testing"
import { DatabaseModule } from "src/infra/database/database.module"
import { StatusController } from "./status.controller"
import { StatusService } from "./status.service"

describe('StatusController', () => {
  let statusController: StatusController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [StatusController],
      providers: [StatusService]
    }).compile();

    statusController = app.get<StatusController>(StatusController)
  })
  it('GET to /status should return 200', async () => {
    const response = await fetch("http://localhost:3000/status");
    console.log(response.body)
    expect(response.status).toBe(200)

    const responseBody = await response.json()
    expect(responseBody.dependencies.database.updated_at).toBeDefined()
    const parsedUpdatedAt = new Date(
      responseBody.dependencies.database.updated_at).toISOString()
    expect(responseBody.dependencies.database.updated_at).toEqual(parsedUpdatedAt)

    expect(Number(responseBody.dependencies.database.max_connections)).toEqual(100)
    expect(responseBody.dependencies.database.version).toEqual("16.0")
    expect(responseBody.dependencies.database.open_connections).toEqual(1)
  })

})