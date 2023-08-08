import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user.dto';
import { Auth } from 'src/dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('Users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('single/:id')
    async getOne(@Param('id') id: string): Promise<User> {
        return await this.usersService.getUserById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('email/:email')
    async getByEmail(@Param('email') email: string): Promise<User> {
        const res = await this.usersService.getUserByEmail(email);

        return res;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getMany(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('teachers')
    async getTeachers(): Promise<User[]> {
        return this.usersService.getTeachers();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async createOne(@Body() dto: UserDto) {
        return await this.usersService.createUser(
            dto.firstName,
            dto.lastName,
            dto.email,
            dto.age,
            dto.address,
            dto.password,
            dto.roleId,
            dto.subjects,
        );
    }

    @Post('sign-user')
    async signUserIn(@Body() dto: Auth) {
        return await this.usersService.signUserIn(dto);
    }

    // @Patch(':id')
    // async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    //     return this.usersService.updateUser(userId, updateUserDto)
    // }
}
