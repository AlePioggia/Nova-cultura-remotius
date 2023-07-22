import { ForbiddenException, Injectable } from '@nestjs/common';
import { Auth } from 'src/dto/auth.dto';
import { UsersRepository } from 'src/repositories/users.repository';
import { User } from 'src/schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(private readonly usersRepository: UsersRepository, private configService: ConfigService, private jwtService: JwtService) { }

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
    ) {
        const hash = await argon.hash(password);
        try {
            const check = (await this.usersRepository.find({})).find(x => x.mail === mail)
            if (check)
                return
            const user = await this.usersRepository.create({
                id: uuidv4(),
                mail: mail,
                firstName: firstName,
                lastName: lastName,
                age: age,
                address: address,
                hash: hash
            });
            return await this.signtoken(user.id, user.mail);
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
        return this.signtoken(user.id, user.mail);
    }

    async signtoken(userId: string, mail: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            mail
        }

        const secret = await this.configService.get('JWT_SECRET');

        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        });

        return {
            access_token: token
        };
    }

    // async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    //     return this.usersRepository.findOneAndUpdate({userId}, userUpdates);
    // }
}
