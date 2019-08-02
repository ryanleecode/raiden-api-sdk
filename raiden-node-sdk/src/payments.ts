import {
  Configuration,
  PaymentsApi,
  PaymentReceipt,
  PaymentEvent
} from "raiden-swagger-sdk";
import { Observable } from "rxjs";

export interface Token {
  address: string;

  amount: number;
}

export function NewToken(address: string, amount: number): Token {
  return {
    address,
    amount
  };
}

export class Payments {
  public static create(config?: Configuration) {
    const paymentsApi = new PaymentsApi(config);

    return new Payments(paymentsApi);
  }

  constructor(private readonly paymentsApi: PaymentsApi) {}

  /**
   * @summary Initiate a payment
   * @description
   * The request will only return once the payment either succeeded or failed.
   *
   * A payment can fail due to the expiration of a lock, the target being offline,
   * channels on the path to the target not having enough `settleTimeout` and
   *  `revealTimeout` in order to allow the payment to be propagated safely, not enough funds etc.
   * @param token payment details
   * @param to address of the recipient
   * @param identifier identifier of the payment
   * @link https://raiden-network.readthedocs.io/en/latest/rest_api.html#post--api-(version)-payments-(token_address)-(target_address)
   */
  public initiate(
    token: Readonly<Token>,
    to: string,
    identifier?: number
  ): Observable<Readonly<PaymentReceipt>> {
    return this.paymentsApi.pay({
      tokenAddress: token.address,
      targetAddress: to,
      payment: {
        amount: token.amount,
        identifier: identifier
      }
    });
  }

  /**
   * @summary Payment History
   * @param tokenAddress the token you want history for
   * @param targetAddress the target address you want history for
   * @link https://raiden-network.readthedocs.io/en/latest/rest_api.html#get--api-v1-payments-(token_address)-(target_address)
   */
  public history(
    tokenAddress?: string,
    targetAddress?: string
  ): Observable<ReadonlyArray<Readonly<PaymentEvent>>> {
    if (tokenAddress && targetAddress) {
      return this.paymentsApi.getPaymentsByTokenForTarget({
        tokenAddress,
        targetAddress
      });
    }
    if (tokenAddress) {
      return this.paymentsApi.getPaymentsByToken({ tokenAddress });
    }
    return this.paymentsApi.getPayments();
  }
}
