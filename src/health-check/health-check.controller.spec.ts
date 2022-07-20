import { Test, TestingModule } from '@nestjs/testing';
import { when } from 'jest-when';
import { Connection } from 'typeorm';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [
        HealthCheckService,
        {
          provide: Connection,
          useValue: {
            getHealth: jest.fn(),
            checkDbConnection: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthCheckController>(HealthCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the health status', () => {
    const result = controller.getHealth();

    expect(result).toEqual('OK');
  });

  it('should return the status fro the db connection', () => {
    controller.checkDbConnection = jest.fn();
    when(controller.checkDbConnection).calledWith().mockReturnValue('OK');
    const result = controller.checkDbConnection();

    expect(result).toEqual('OK');
  });
});
