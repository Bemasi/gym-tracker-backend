import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WorkoutsService } from './workouts.service';


@ApiTags('workouts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('workouts')
export class WorkoutsController {
constructor(private readonly service: WorkoutsService) {}


@Post()
create(@Req() req: any, @Body() body: { date?: string; name?: string; notes?: string }) {
console.log('[WorkoutsController] POST /workouts');
const date = body?.date ? new Date(body.date) : undefined;
return this.service.create(req.user.userId, { ...body, date });
}


@Get()
findAll(@Req() req: any) {
console.log('[WorkoutsController] GET /workouts');
return this.service.findAllForUser(req.user.userId);
}


@Get(':id')
findOne(@Req() req: any, @Param('id') id: string) {
console.log('[WorkoutsController] GET /workouts/:id', id);
return this.service.findOne(+id, req.user.userId);
}


@Patch(':id')
update(@Req() req: any, @Param('id') id: string, @Body() body: any) {
console.log('[WorkoutsController] PATCH /workouts/:id', id);
return this.service.update(+id, req.user.userId, body);
}


@Delete(':id')
remove(@Req() req: any, @Param('id') id: string) {
console.log('[WorkoutsController] DELETE /workouts/:id', id);
return this.service.remove(+id, req.user.userId);
}
}