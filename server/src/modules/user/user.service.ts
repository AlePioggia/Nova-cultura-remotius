import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/repositories/users.repository';
import { User } from 'src/schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async getUserById(userId: string): Promise<User> {
        return this.usersRepository.findOne({ userId });
    }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async createUser(
        firstName: string,
        lastName: string,
        mail: string,
        age: number,
        address: string,
    ): Promise<User> {
        return this.usersRepository.create({
            id: uuidv4(),
            mail: mail,
            firstName: firstName,
            lastName: lastName,
            age: age,
            address: address,
        });
    }

    // async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    //     return this.usersRepository.findOneAndUpdate({userId}, userUpdates);
    // }
}
