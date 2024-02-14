import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthKeyGuard', () => {
  it('should be defined', () => {
    const jwtServiceMock = {
      verifyAsync: jest.fn(),
    } as unknown as JwtService;

    expect(new AuthGuard(jwtServiceMock)).toBeDefined();
  });
});
