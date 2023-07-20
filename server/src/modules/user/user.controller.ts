import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user.dto';

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

    @Post()
    createOne(@Body() dto: UserDto): Promise<User> {
        return this.usersService.createUser(
            dto.firstName,
            dto.lastName,
            dto.email,
            dto.age,
            dto.address,
        );
    }

    // @Patch(':id')
    // async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    //     return this.usersService.updateUser(userId, updateUserDto)
    // }
}
