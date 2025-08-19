import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }


  async register(dto: RegisterDto) {
    console.log('[AuthService] register attempt', dto.email);
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) {
      console.log('[AuthService] register failed: email exists');
      throw new BadRequestException('Email already in use');
    }


    const passwordHash = await bcrypt.hash(dto.password, 10);


    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: passwordHash,
        roles: {
          create: [
            {
              role: {
                connectOrCreate: {
                  where: { name: 'user' },
                  create: { name: 'user' },
                },
              },
            },
          ],
        },
      },
      include: { roles: { include: { role: true } } },
    });


    const roles = user.roles.map((ur) => ur.role.name);
    console.log('[AuthService] register success', user.id);
    return this.signTokens(user.id, user.email, roles);
  }


  async login(email: string, password: string) {
    console.log('[AuthService] login attempt', email);
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { roles: { include: { role: true } } },
    });
    if (!user) {
      console.log('[AuthService] login failed: user not found');
      throw new UnauthorizedException('Invalid credentials');
    }


    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      console.log('[AuthService] login failed: wrong password');
      throw new UnauthorizedException('Invalid credentials');
    }


    const roles = user.roles.map((ur) => ur.role.name);
    console.log('[AuthService] login success', user.id);
    return this.signTokens(user.id, user.email, roles);
  }


  private signTokens(sub: number, email: string, roles: string[]) {
    const payload = { sub, email, roles };
    const accessToken = this.jwt.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    });
  }
}