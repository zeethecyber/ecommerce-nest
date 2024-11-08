import { IsIn, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsIn(['ADMIN', 'USER'])
  role: 'ADMIN' | 'USER';
}
