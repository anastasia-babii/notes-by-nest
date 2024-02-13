import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindUserByIdParamsDto {
  @IsNotEmpty()
  @IsUUID('4')
  id: string;
}
