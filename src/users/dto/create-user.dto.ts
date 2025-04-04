import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(['admin', 'profesor', 'niño', 'personal'])
  role: string;

  @IsOptional()
  @IsString()
  representativeId?: string;
}
