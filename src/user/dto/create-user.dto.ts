import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
  Length,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

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

  @IsNotEmpty()
  @IsString()
  @Length(6, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number.',
  })
  readonly password: string;
}
