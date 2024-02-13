import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignupDto) {
    const token = await this.authService.signUp(signUpDto);
    return { token };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() authLoginDto: LoginDto) {
    const token = await this.authService.login(authLoginDto);

    return { token };
  }
}
