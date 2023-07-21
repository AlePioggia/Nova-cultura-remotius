import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user.dto';
import { Auth } from 'src/dto/auth.dto';

@Controller('Users')
export class UserController {
    constructor(private readonly usersService: UserService) { }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<User> {
        return this.usersService.getUserById(id);
    }

    @Get()
    async getMany(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Post('create')
    async createOne(@Body() dto: UserDto): Promise<User> {
        return this.usersService.createUser(
            dto.firstName,
            dto.lastName,
            dto.email,
            dto.age,
            dto.address,
            dto.password
        );
    }

    @Post('sign-user')
    async signUserIn(@Body() dto: Auth) {
        return this.usersService.signUserIn(dto);
    }

    // @Patch(':id')
    // async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    //     return this.usersService.updateUser(userId, updateUserDto)
    // }
}
