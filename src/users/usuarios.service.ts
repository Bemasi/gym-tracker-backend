import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.usuario.findMany({ include: { roles: { include: { rol: true } } } });
  }

  async findOne(id: number) {
    const user = await this.prisma.usuario.findUnique({ where: { id }, include: { roles: { include: { rol: true } } } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async update(id: number, dto: UpdateUsuarioDto) {
    if (dto.password) {
      (dto as any).passwordHash = await bcrypt.hash(dto.password, 10);
      delete (dto as any).password;
    }
    return this.prisma.usuario.update({ where: { id }, data: dto as any });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
