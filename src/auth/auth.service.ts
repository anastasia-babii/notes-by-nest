import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CommonService } from '../common/common.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly сommonService: CommonService,
    private readonly userService: UserService,
  ) {}

  async signUp({
    email,
    phone,
    firstName,
    lastName,
    password,
  }: SignupDto): Promise<string> {
    const existingUser =
      await this.userService.checkUserExistenceByEmailOrPhone(email, phone);

    if (existingUser) {
      throw new ConflictException(
        'User with this email or phone already exists',
      );
    }

    const hashedPassword = await this.сommonService.hash(password);

    const newUser = await this.userService.createUser({
      email,
      phone,
      firstName,
      lastName,
      password: hashedPassword,
    });

    return this.jwtService.signAsync({ userEmail: email, userId: newUser.id });
  }

  async login({ email, password }: LoginDto): Promise<string> {
    const dbUser = await this.userService.findUserByEmailWithPassword(email);

    if (!dbUser) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatch = await this.сommonService.compareHashes({
      password,
      hashedPassword: dbUser.password,
    });

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.jwtService.signAsync({
      userEmail: dbUser.email,
      userId: dbUser.id,
    });
  }
}
