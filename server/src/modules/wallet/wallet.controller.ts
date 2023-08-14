import {
    Controller,
    Get,
    Post,
    Patch,
    Body,
    Param,
    Headers,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDTO } from 'src/dto/wallet.dto';
import * as jwt from 'jsonwebtoken';

@Controller('wallets')
export class WalletController {
    constructor(private readonly walletsService: WalletService) {}

    @Get()
    async getWallet(@Headers('authorization') authHeader: string) {
        const token: any = jwt.decode(authHeader.split(' ')[1]);
        return this.walletsService.getWalletByMail(token.mail);
    }

    @Post('/')
    async createWallet(@Headers('authorization') authHeader: string) {
        const token: any = jwt.decode(authHeader.split(' ')[1]);
        return this.walletsService.createWallet(token.mail);
    }

    @Post('/mail')
    async createWalletWithMail(@Body('mail') mail) {
        return this.walletsService.createWallet(mail);
    }

    @Post('/deposit')
    async deposit(
        @Body('amount') amount: number,
        @Headers('authorization') authHeader: string,
    ) {
        const token: any = jwt.decode(authHeader.split(' ')[1]);
        return this.walletsService.deposit(token.mail, amount);
    }

    @Post('/withdraw')
    async withdraw(
        @Body('amount') amount: number,
        @Headers('authorization') authHeader: string,
    ) {
        const token: any = jwt.decode(authHeader.split(' ')[1]);
        return this.walletsService.withdraw(token.mail, amount);
    }
}
