import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movement, MovementSchema } from './movement.schema';
import { MovementsService } from './movements.service';
import { MovementsController } from './movements.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movement.name, schema: MovementSchema }]),
  ],
  providers: [MovementsService],
  controllers: [MovementsController],
})
export class MovementsModule {}
