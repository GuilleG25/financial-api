import {
  Controller,
  UseGuards,
  Request,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MovementsService } from './movements.service';
import { MovementDto } from './movement.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}
  @Post()
  create(@Body() movementDto: MovementDto) {
    return this.movementsService.create(movementDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.movementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movementsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() movementDto: MovementDto) {
    return this.movementsService.update(id, movementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movementsService.remove(id);
  }
}
