import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { History } from './schemas/history.schema';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name)
    private historyModel: mongoose.Model<History>,
  ) {}

  async findAll(
    query: Query,
    user: User,
  ): Promise<{ history: History[]; count: number }> {
    const resPerPage = 7;

    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const userFilter = { user: user.id };

    const historyQuery = this.historyModel
      .find({ ...keyword, ...userFilter })
      .sort({ createdAt: -1 })
      .limit(resPerPage)
      .skip(skip);

    const history = await historyQuery.exec();

    const count = await this.historyModel.countDocuments({
      ...keyword,
      ...userFilter,
    });

    return {
      history,
      count,
    };
  }

  async create(history: History, user: User): Promise<History> {
    const data = Object.assign(history, { user: user._id });

    const res = await this.historyModel.create(data);
    return res;
  }

  async getTotalAmount(user: User): Promise<{ totalAmount: number }> {
    const result = await this.historyModel.aggregate([
      {
        $match: { user: user._id },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    const totalAmount = result.length ? result[0].totalAmount : 0;
    return { totalAmount };
  }
}
