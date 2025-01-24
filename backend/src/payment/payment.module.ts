import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [PaymentController],
  imports: [ConfigModule.forRoot()],
  providers: [
    PaymentService,
    {
      provide: 'STRIPE_API_KEY',
      useFactory: async (configService: ConfigService) =>
        configService.get('STRIPE_API_KEY'),
      inject: [ConfigService],
    },
  ],
})
export class PaymentModule {}
