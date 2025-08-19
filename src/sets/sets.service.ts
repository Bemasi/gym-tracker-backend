import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class SetsService {
constructor(private prisma: PrismaService) {}


create(data: { workoutId: number; exerciseId: number; reps: number; weight?: number; durationSec?: number; restTimeSec?: number }) {
console.log('[SetsService] create', data);
return this.prisma.set.create({ data });
}
update(id: number, data: Partial<{ reps: number; weight?: number; durationSec?: number; restTimeSec?: number }>) {
console.log('[SetsService] update', id, data);
return this.prisma.set.update({ where: { id }, data });
}
remove(id: number) {
console.log('[SetsService] remove', id);
return this.prisma.set.delete({ where: { id } });
}
}