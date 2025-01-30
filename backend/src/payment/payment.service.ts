import { BadRequestException, Inject, Injectable } from '@nestjs/common';
//import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  //private stripe: Stripe;
  constructor() {
    /*this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2024-12-18.acacia',
    });*/
  }

  async createSessionCheckout(
    children: number,
    currency: string = 'usd',
  ): Promise<{ paymentUrl: string }> {
    const amount = children * 999;
    try {
      /*const session = await this.stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: currency || 'usd',
              product_data: { name: 'Producto de prueba' },
              unit_amount: amount || 5000,
            },
            quantity: 1,
          },
        ],
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });*/

      return { paymentUrl: 'test' };
    } catch (error) {
      console.error('Error creating session:', error);
      throw new BadRequestException('Failed to create session checkout.');
    }
  }
}
