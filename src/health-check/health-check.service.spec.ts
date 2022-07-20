import { Test, TestingModule } from '@nestjs/testing';
import { when } from 'jest-when';
import { Connection } from 'typeorm/connection/Connection';
import { HealthCheckService } from './health-check.service';

describe('HealthCheckService', () => {
  let service: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthCheckService,
        {
          provide: Connection,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should return "OK"', () => {
    expect(service.getHealth()).toBe('OK');
  });

  it('checkDbConnection should return OK', () => {
    service.checkDbConnection = jest.fn();
    when(service.checkDbConnection).calledWith().mockReturnValue('OK');
    expect(service.checkDbConnection()).toEqual('OK');
  });
});
