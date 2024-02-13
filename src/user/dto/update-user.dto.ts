import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 15)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(3, 15)
  lastName?: string;
}
