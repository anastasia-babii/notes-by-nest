import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';
import { LoginDto } from './login.dto';

export class SignupDto extends LoginDto {
  @IsNotEmpty()
  @IsPhoneNumber('UA')
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  lastName: string;
}
