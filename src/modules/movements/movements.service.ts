import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movement, MovementDocument } from './movement.schema';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(Movement.name)
    private readonly movementModel: Model<MovementDocument>,
  ) {}

  async findAll(userId) {
    return this.movementModel.find({ userId }).exec();
  }

  async create(
    userId: string,
    createMovementDto: {
      type: 'income' | 'expense';
      amount: number;
      description?: string;
    },
  ) {
    const createdMovement = new this.movementModel({
      userId,
      ...createMovementDto,
    });
    return createdMovement.save();
  }

  async update(
    id: string,
    userId: string,
    updateMovement: {
      type?: 'income' | 'expense';
      amount?: number;
      description?: string;
    },
  ) {
    return this.movementModel
      .findByIdAndUpdate(id, { userId, ...updateMovement }, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.movementModel.findByIdAndDelete(id).exec();
  }
}
