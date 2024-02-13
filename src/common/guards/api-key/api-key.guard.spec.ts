import { ApiKeyGuard } from './api-key.guard';
import { JwtService } from '@nestjs/jwt';

describe('ApiKeyGuard', () => {
  it('should be defined', () => {
    const jwtServiceMock = {
      verifyAsync: jest.fn(),
    } as unknown as JwtService;

    expect(new ApiKeyGuard(jwtServiceMock)).toBeDefined();
  });
});