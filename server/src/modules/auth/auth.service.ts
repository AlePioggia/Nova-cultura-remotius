import { Injectable } from '@nestjs/common';
import { Auth } from 'src/dto/auth.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    async signup(dto: Auth) {
        const hash = await argon.hash(dto.password);
        return hash;
    }

    signin(dto: Auth) {}
}
