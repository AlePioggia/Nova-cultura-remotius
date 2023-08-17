import { ChatModule } from './modules/chat/chat.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from './modules/review/review.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { PurchaseModule } from './modules/purchase/purchase.module';

@Module({
    imports: [
        ChatModule,
        LessonModule,
        AuthModule,
        UserModule,
        MongooseModule.forRoot(
            'mongodb://127.0.0.1:27017/nova-cultura-remotius',
        ),
        ConfigModule.forRoot(),
        PassportModule,
        ReviewModule,
        WalletModule,
        PurchaseModule,
    ],
})
export class AppModule {}
