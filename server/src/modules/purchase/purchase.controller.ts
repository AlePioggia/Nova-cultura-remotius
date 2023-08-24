import {
    Body,
    Controller,
    Post,
    UseGuards,
    Headers,
    Get,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePurchaseDTO } from 'src/dto/purchase.dto';
import * as jwt from 'jsonwebtoken';

@Controller('Purchases')
export class PurchaseController {
    constructor(private readonly purchaseService: PurchaseService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async createOne(
        @Body() dto: CreatePurchaseDTO,
        @Headers('authorization') authHeader: string,
    ) {
        try {
            const token = jwt.decode(authHeader.split(' ')[1]);
            return await this.purchaseService.createPurchase(dto, token);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('student')
    async getByStudent(@Headers('authorization') authHeader: string) {
        try {
            const token = jwt.decode(authHeader.split(' ')[1]);
            return await this.purchaseService.getStudentPurchases(token);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('teacher')
    async getByTeacher(@Headers('authorization') authHeader: string) {
        try {
            const token = jwt.decode(authHeader.split(' ')[1]);
            return await this.purchaseService.getTeacherPurchases(token);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
