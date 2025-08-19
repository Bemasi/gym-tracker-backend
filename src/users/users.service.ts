import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
constructor(private prisma: PrismaService) {}


findAll() {
console.log('[UsersService] findAll');
return this.prisma.user.findMany({ include: { roles: { include: { role: true } } } });
}


async findOne(id: number) {
console.log('[UsersService] findOne', id);
const user = await this.prisma.user.findUnique({ where: { id }, include: { roles: { include: { role: true } } } });
if (!user) throw new NotFoundException('User not found');
return user;
}


async update(id: number, dto: UpdateUserDto) {
console.log('[UsersService] update', id, Object.keys(dto));
const data: any = { ...dto };
if (dto.password) {
data.password = await bcrypt.hash(dto.password, 10);
delete data.passwordRaw;
}
return this.prisma.user.update({ where: { id }, data });
}


remove(id: number) {
console.log('[UsersService] remove', id);
return this.prisma.user.delete({ where: { id } });
}
}