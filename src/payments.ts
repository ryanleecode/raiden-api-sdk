import {
  PaymentReceipt as PaymentReceiptS,
  PaymentEvent as PaymentEventS,
} from 'raiden-swagger-sdk';
import { Observable } from 'rxjs';
import { Configuration, PaymentsApi } from './apis';

export interface Token {
  /**
   * The address of the token
   */
  address: string;

  /**
   * The amount you want to pay
   */
  amount: number;
}

/**
 * Creates an object used to initiate a payment
 * @param address - The address of the token
 * @param amount - The amount you want to pay
 */
export function NewToken(address: string, amount: number): Token {
  return {
    address,
    amount,
  };
}

export declare enum PaymentEventEventEnum {
  EventPaymentReceivedSuccess = 'EventPaymentReceivedSuccess',
  EventPaymentSentSuccess = 'EventPaymentSentSuccess',
  EventPaymentSentFailed = 'EventPaymentSentFailed',
}

export interface PaymentReceipt extends PaymentReceiptS {}
export interface PaymentEvent extends PaymentEventS {
  event: PaymentEventEventEnum;
}

export class Payments {
  public static create(config?: Configuration) {
    const paymentsApi = new PaymentsApi(config);

    return new Payments(paymentsApi);
  }

  constructor(private readonly paymentsApi: PaymentsApi) {}

  /**
   * Initiate a payment
   *
   * @remarks
   * The request will only return once the payment either succeeded or failed.
   *
   * A payment can fail due to the expiration of a lock, the target being offline,
   * channels on the path to the target not having enough `settleTimeout` and
   *  `revealTimeout` in order to allow the payment to be propagated safely, not enough funds etc.
   * @param token - Payment details
   * @param to - Address of the recipient
   * @param identifier - Identifier of the payment
   *
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#post--api-(version)-payments-(token_address)-(target_address)}
   */
  public initiate(
    token: Readonly<Token>,
    to: string,
    identifier?: number,
  ): Observable<Readonly<PaymentReceipt>> {
    return this.paymentsApi.pay({
      tokenAddress: token.address,
      targetAddress: to,
      payment: {
        amount: token.amount,
        identifier: identifier,
      },
    });
  }

  /**
   * Payment History
   *
   * @param tokenAddress - The token you want history for
   * @param targetAddress - The target address you want history for
   *
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#get--api-v1-payments-(token_address)-(target_address)}
   */
  public history(
    tokenAddress?: string,
    targetAddress?: string,
  ): Observable<ReadonlyArray<Readonly<PaymentEvent>>> {
    if (tokenAddress && targetAddress) {
      return this.paymentsApi.getPaymentsByTokenForTarget({
        tokenAddress,
        targetAddress,
      });
    }
    if (tokenAddress) {
      return this.paymentsApi.getPaymentsByToken({
        tokenAddress,
      });
    }
    return this.paymentsApi.getPayments();
  }
}
