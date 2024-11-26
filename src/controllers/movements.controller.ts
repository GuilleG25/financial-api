import {
  HttpCode,
  HttpStatus,
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
import { MovementsService } from '../modules/movements/movements.service';
import { MovementDto } from '../modules/movements/dto/movement.dto';
import { JwtAuthGuard } from '../modules/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Request() req) {
    const userId = req.user.userId;
    return this.movementsService.findAll(userId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Request() req, @Body() movementDto: MovementDto) {
    const userId = req.user.userId;
    return this.movementsService.create(userId, movementDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() movementDto: MovementDto,
  ) {
    const userId = req.user.userId;
    return this.movementsService.update(id, userId, movementDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.movementsService.remove(id);
  }
}
