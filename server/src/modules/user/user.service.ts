import { ForbiddenException, Injectable } from '@nestjs/common';
import { Auth } from 'src/dto/auth.dto';
import { UsersRepository } from 'src/repositories/users.repository';
import { User } from 'src/schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';
import * as argon from 'argon2';

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
        password: string
    ): Promise<User> {
        const hash = await argon.hash(password);
        try {
            const user = this.usersRepository.create({
                id: uuidv4(),
                mail: mail,
                firstName: firstName,
                lastName: lastName,
                age: age,
                address: address,
                hash: hash
            });
            return user;
        } catch (error) {
            throw error
        }
    }

    async signUserIn(dto: Auth) {
        const user: User = await (await this.usersRepository.find({})).find(x => x.mail === dto.email)
        if (!user) throw new ForbiddenException(
            'Credential incorrect'
        )
        const pwMatches = await argon.verify(user.hash, dto.password)
        if (!pwMatches) {
            throw new ForbiddenException('Credentials incorrect')
        }
        return "Utente autenticato";
    }

    // async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    //     return this.usersRepository.findOneAndUpdate({userId}, userUpdates);
    // }
}
