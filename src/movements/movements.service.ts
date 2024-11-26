import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movement, MovementDocument } from './movement.schema';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(Movement.name) private readonly movementModel: Model<MovementDocument>,
  ) {}

  async create(createMovementDto: { type: 'income' | 'expense'; amount: number; description?: string }) {
    const createdMovement = new this.movementModel(createMovementDto);
    return createdMovement.save();
  }

  async findAll() {
    return this.movementModel.find().exec();
  }

  async findOne(id: string) {
    return this.movementModel.findById(id).exec();
  }

  async update(id: string, updateMovementDto: { type?: 'income' | 'expense'; amount?: number; description?: string }) {
    return this.movementModel.findByIdAndUpdate(id, updateMovementDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.movementModel.findByIdAndDelete(id).exec();
  }
}
