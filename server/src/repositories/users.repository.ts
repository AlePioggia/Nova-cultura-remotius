import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
        return this.userModel.findOne(userFilterQuery);
    }

    async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
        return this.userModel.find(usersFilterQuery);
    }

    async create(user: User): Promise<User> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

    async findOneAndUpdate(
        userFilterQuery: FilterQuery<User>,
        user: Partial<User>,
    ) {
        return this.userModel.findOneAndUpdate(userFilterQuery, user);
    }
}
