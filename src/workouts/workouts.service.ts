import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class WorkoutsService {
constructor(private prisma: PrismaService) {}


create(userId: number, data: { date?: Date; name?: string; notes?: string }) {
console.log('[WorkoutsService] create for user', userId, data.name);
return this.prisma.workout.create({ data: { ...data, userId } });
}


findAllForUser(userId: number) {
console.log('[WorkoutsService] findAllForUser', userId);
return this.prisma.workout.findMany({ where: { userId }, orderBy: { date: 'desc' } });
}


async findOne(id: number, userId: number) {
console.log('[WorkoutsService] findOne', id, 'for user', userId);
const w = await this.prisma.workout.findFirst({ where: { id, userId }, include: { sets: true } });
if (!w) throw new NotFoundException('Workout not found');
return w;
}


update(id: number, _userId: number, data: Partial<{ date: Date; name: string; notes: string }>) {
console.log('[WorkoutsService] update', id, Object.keys(data));
return this.prisma.workout.update({ where: { id }, data });
}


remove(id: number, _userId: number) {
console.log('[WorkoutsService] remove', id);
return this.prisma.workout.delete({ where: { id } });
}
}