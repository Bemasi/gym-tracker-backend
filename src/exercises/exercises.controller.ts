import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExercisesService } from './exercises.service';


@ApiTags('exercises')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('exercises')
export class ExercisesController {
constructor(private readonly service: ExercisesService) {}


@Post()
create(@Body() body: { name: string; muscleGroup?: string; description?: string }) {
console.log('[ExercisesController] POST /exercises', body.name);
return this.service.create(body);
}


@Get()
findAll() {
console.log('[ExercisesController] GET /exercises');
return this.service.findAll();
}


@Patch(':id')
update(@Param('id') id: string, @Body() body: any) {
console.log('[ExercisesController] PATCH /exercises/:id', id);
return this.service.update(+id, body);
}


@Delete(':id')
remove(@Param('id') id: string) {
console.log('[ExercisesController] DELETE /exercises/:id', id);
return this.service.remove(+id);
}
}