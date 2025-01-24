import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-session-checkout')
  createPaymentIntent(
    @Body() body: { children: number; currency: string },
  ): Promise<any> {
    const { children, currency } = body;
    return this.paymentService.createSessionCheckout(children, currency);
  }
}
