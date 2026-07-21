import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(6, { message: 'Current password is required' })
  currentPassword: string;

  @IsString()
  @MinLength(8, { message: 'New password must be at least 8 characters' })
  newPassword: string;
}
