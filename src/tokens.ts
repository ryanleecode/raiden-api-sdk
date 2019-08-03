import { TokensApi, Configuration, Partner } from 'raiden-swagger-sdk';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type TokenNetworkAddress = string;
export type TokenAddress = string;

export class Tokens {
  public static create(config?: Configuration) {
    const tokensApi = new TokensApi(config);

    return new Tokens(tokensApi);
  }

  constructor(private readonly tokensApi: TokensApi) {}

  /**
   * Addresses of all registered tokens
   *
   * {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-tokens}
   */
  public findAllRegistered(): Observable<ReadonlyArray<TokenAddress>> {
    return this.tokensApi.getTokens();
  }

  /**
   * Token network address
   *
   * @remarks
   * The address of the corresponding token network for the given token, if the token is registered.
   * @param tokenAddress - the address of the token
   * {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-tokens-(token_address)}
   */
  public networkAddressFor(
    tokenAddress: string,
  ): Observable<TokenNetworkAddress> {
    return this.tokensApi.getToken({ tokenAddress });
  }

  /**
   * List of all partners with whom you have non-settled channels for a certain token
   *
   * {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-tokens-(token_address)-partners}
   */
  public partners(): Observable<ReadonlyArray<Readonly<Partner>>> {
    return this.tokensApi.getTokenPartners();
  }

  /**
   * Register a token
   *
   * @remarks
   * If a token is not registered yet
   * (i.e.: A token network for that token does not exist in the registry),
   *  we need to register it by deploying a token network contract for
   *  that token.
   * @param tokenAddress - the address of the token
   * {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#put--api-(version)-tokens-(token_address)}
   */
  public register(
    tokenAddress: string,
  ): Observable<Readonly<TokenNetworkAddress>> {
    return this.tokensApi
      .registerToken({ tokenAddress })
      .pipe(map((res) => res.tokenNetworkAddress));
  }
}
