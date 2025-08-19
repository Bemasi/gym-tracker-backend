import { Get, Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SetsService } from './sets.service';


@ApiTags('sets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sets')
export class SetsController {
    constructor(private readonly service: SetsService) { }


    @Get(':workout_id')
    findSetsOfWorkout(@Param('workout_id') wrk_id: string) {
        console.log('[SetsController] GET /sets/:id', wrk_id);
        return this.service.findWorkoutSets(+wrk_id);
    }

    @Post()
    create(@Body() body: { workoutId: number; exerciseId: number; reps: number; weight?: number; durationSec?: number; restTimeSec?: number }) {
        console.log('[SetsController] POST /sets');
        return this.service.create(body);
    }


    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        console.log('[SetsController] PATCH /sets/:id', id);
        return this.service.update(+id, body);
    }


    @Delete(':id')
    remove(@Param('id') id: string) {
        console.log('[SetsController] DELETE /sets/:id', id);
        return this.service.remove(+id);
    }
}