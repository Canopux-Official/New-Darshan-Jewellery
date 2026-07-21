import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.adminUser.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatches) throw new UnauthorizedException('Invalid email or password');

    return this.generateTokens(user.id, user.email, user.role);
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      });
      const user = await this.prisma.adminUser.findUnique({ where: { id: payload.sub } });
      if (!user) throw new UnauthorizedException();
      return this.generateTokens(user.id, user.email, user.role);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async getProfile(userId: string) {
    const user = await this.prisma.adminUser.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.prisma.adminUser.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();

    const matches = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!matches) throw new BadRequestException('Current password is incorrect');

    if (currentPassword === newPassword) {
      throw new BadRequestException('New password must be different from the current password');
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await this.prisma.adminUser.update({ where: { id: userId }, data: { passwordHash } });
    return { message: 'Password updated successfully' };
  }

  private generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_SECRET'),
      expiresIn: this.config.get<string>('JWT_EXPIRES_IN'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN'),
    });
    return { accessToken, refreshToken, tokenType: 'Bearer' };
  }
}
