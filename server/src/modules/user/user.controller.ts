import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
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
        try {
            return await this.usersService.getUserById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('email/:email')
    async getByEmail(@Param('email') email: string): Promise<User> {
        try {
            const res = await this.usersService.getUserByEmail(email);
            return res;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getMany(): Promise<User[]> {
        try {
            return await this.usersService.getUsers();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('teachers')
    async getTeachers(): Promise<User[]> {
        try {
            return await this.usersService.getTeachers();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('students')
    async getStudents(): Promise<User[]> {
        try {
            return await this.usersService.getStudents();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('create')
    async createOne(@Body() dto: UserDto) {
        try {
            return await this.usersService.createUser(
                dto.firstName,
                dto.lastName,
                dto.mail,
                dto.age,
                dto.address,
                dto.password,
                dto.roleId,
                dto.subjects,
            );
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('sign-user')
    async signUserIn(@Body() dto: Auth) {
        try {
            return await this.usersService.signUserIn(dto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
        }
    }

    // @Patch(':id')
    // async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    //     return this.usersService.updateUser(userId, updateUserDto)
    // }
}
