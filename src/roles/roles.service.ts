import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class RolesService {
constructor(private prisma: PrismaService) {}


findAll() {
console.log('[RolesService] findAll');
return this.prisma.role.findMany();
}
create(name: string) {
console.log('[RolesService] create', name);
return this.prisma.role.create({ data: { name } });
}
remove(id: number) {
console.log('[RolesService] remove', id);
return this.prisma.role.delete({ where: { id } });
}
}