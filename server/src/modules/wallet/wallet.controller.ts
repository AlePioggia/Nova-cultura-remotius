import {
    Controller,
    Get,
    Post,
    Patch,
    Body,
    Param,
    Headers,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDTO } from 'src/dto/wallet.dto';
import * as jwt from 'jsonwebtoken';

@Controller('wallets')
export class WalletController {
    constructor(private readonly walletsService: WalletService) {}

    @Get()
    async getWallet(@Headers('authorization') authHeader: string) {
        try {
            const token: any = jwt.decode(authHeader.split(' ')[1]);
            return await this.walletsService.getWalletByMail(token.mail);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Post('/')
    async createWallet(@Headers('authorization') authHeader: string) {
        try {
            const token: any = jwt.decode(authHeader.split(' ')[1]);
            return await this.walletsService.createWallet(token.mail);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('/mail')
    async createWalletWithMail(@Body('mail') mail) {
        try {
            return await this.walletsService.createWallet(mail);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('/deposit')
    async deposit(
        @Body('amount') amount: number,
        @Headers('authorization') authHeader: string,
    ) {
        try {
            const token: any = jwt.decode(authHeader.split(' ')[1]);
            return await this.walletsService.deposit(token.mail, amount);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('/withdraw')
    async withdraw(
        @Body('amount') amount: number,
        @Headers('authorization') authHeader: string,
    ) {
        try {
            const token: any = jwt.decode(authHeader.split(' ')[1]);
            return await this.walletsService.withdraw(token.mail, amount);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
