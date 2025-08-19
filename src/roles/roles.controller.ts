import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RolesService } from './roles.service';


@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('roles')
export class RolesController {
constructor(private readonly service: RolesService) {}


@Get()
findAll() {
console.log('[RolesController] GET /roles');
return this.service.findAll();
}


@Post()
create(@Body() body: { name: string }) {
console.log('[RolesController] POST /roles', body.name);
return this.service.create(body.name);
}


@Delete(':id')
remove(@Param('id') id: string) {
console.log('[RolesController] DELETE /roles/:id', id);
return this.service.remove(+id);
}
}