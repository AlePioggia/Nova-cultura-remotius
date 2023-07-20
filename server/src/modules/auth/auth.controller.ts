import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from 'src/dto/auth';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post('signup')
    signup(@Body() dto: Auth) {
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: Auth) {
        this.authService.signin(dto);
    }

}
