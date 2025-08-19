import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class ExercisesService {
constructor(private prisma: PrismaService) {}


create(data: { name: string; muscleGroup?: string; description?: string }) {
console.log('[ExercisesService] create', data.name);
return this.prisma.exercise.create({ data });
}
findAll() {
console.log('[ExercisesService] findAll');
return this.prisma.exercise.findMany();
}
update(id: number, data: Partial<{ name: string; muscleGroup?: string; description?: string }>) {
console.log('[ExercisesService] update', id, Object.keys(data));
return this.prisma.exercise.update({ where: { id }, data });
}
remove(id: number) {
console.log('[ExercisesService] remove', id);
return this.prisma.exercise.delete({ where: { id } });
}
}