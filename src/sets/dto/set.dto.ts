import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SetDto {
    @ApiPropertyOptional()
    @IsOptional()
    reps?: int

    

}