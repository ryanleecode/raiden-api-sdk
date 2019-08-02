import {
  TokensApi,
  Configuration,
  Partner,
  PaymentsApi
} from "raiden-swagger-sdk";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export type TokenNetworkAddress = string;
export type TokenAddress = string;

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

export class Tokens {
  public static create(config?: Configuration) {
    const tokensApi = new TokensApi(config);
    const paymentsApi = new PaymentsApi(config);

    return new Tokens(tokensApi, paymentsApi);
  }

  constructor(
    private readonly tokensApi: TokensApi,
    private readonly paymentsApi: PaymentsApi
  ) {}

  /**
   * @summary Addresses of all registered tokens
   * @link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-tokens
   */
  public findAllRegistered(): Observable<ReadonlyArray<TokenAddress>> {
    return this.tokensApi.getTokens();
  }

  /**
   * @summary Token network address
   * @description The address of the corresponding token network for the given token, if the token is registered.
   * @param tokenAddress
   * @link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-tokens-(token_address)
   */
  public networkAddressFor(
    tokenAddress: string
  ): Observable<TokenNetworkAddress> {
    return this.tokensApi.getToken({ tokenAddress });
  }

  /**
   * @summary List of all partners with whom you have non-settled channels for a certain token
   * @link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-tokens-(token_address)-partners
   */
  public partners(): Observable<ReadonlyArray<Readonly<Partner>>> {
    return this.tokensApi.getTokenPartners();
  }

  /**
   * @summary Register a token
   * @description  If a token is not registered yet
   * (i.e.: A token network for that token does not exist in the registry),
   *  we need to register it by deploying a token network contract for
   *  that token.
   * @param tokenAddress
   * @link https://raiden-network.readthedocs.io/en/stable/rest_api.html#put--api-(version)-tokens-(token_address)
   */
  public register(
    tokenAddress: string
  ): Observable<Readonly<TokenNetworkAddress>> {
    return this.tokensApi
      .registerToken({ tokenAddress })
      .pipe(map(res => res.tokenNetworkAddress));
  }

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
  public pay(token: Readonly<Token>, to: string, identifier?: number) {
    return this.paymentsApi.pay({
      tokenAddress: token.address,
      targetAddress: to,
      payment: {
        amount: token.amount,
        identifier: identifier
      }
    });
  }
}
