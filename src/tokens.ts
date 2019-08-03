import { Partner } from 'raiden-swagger-sdk';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Configuration, TokensApi } from './apis';
import { RaidenAPIError } from './errors';
import { AjaxError } from 'rxjs/ajax';

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
   * @throws {@link RaidenAPIError}
   * @see {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-tokens}
   */
  public findAllRegistered(): Observable<ReadonlyArray<TokenAddress>> {
    return this.tokensApi.getTokens().pipe(
      catchError((err) => {
        if (err instanceof AjaxError) {
          return throwError(new RaidenAPIError(err));
        }
        return throwError(err);
      }),
    );
  }

  /**
   * Token network address
   *
   * @remarks
   * The address of the corresponding token network for the given token, if the token is registered.
   * @param tokenAddress - The address of the token
   * @throws {@link RaidenAPIError}
   * @see {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-tokens-(token_address)}
   */
  public networkAddressFor(
    tokenAddress: string,
  ): Observable<TokenNetworkAddress> {
    return this.tokensApi.getToken({ tokenAddress }).pipe(
      catchError((err) => {
        if (err instanceof AjaxError) {
          return throwError(new RaidenAPIError(err));
        }
        return throwError(err);
      }),
    );
  }

  /**
   * List of all partners with whom you have non-settled channels for a certain token
   *
   * @param tokenAddress - the address of the token
   *
   * @throws {@link RaidenAPIError}
   * @see {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-tokens-(token_address)-partners}
   */
  public partners(
    tokenAddress: string,
  ): Observable<ReadonlyArray<Readonly<Partner>>> {
    return this.tokensApi.getTokenPartners({ tokenAddress }).pipe(
      catchError((err) => {
        if (err instanceof AjaxError) {
          return throwError(new RaidenAPIError(err));
        }
        return throwError(err);
      }),
    );
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
   *
   * @throws {@link RaidenAPIError}
   * @see {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#put--api-(version)-tokens-(token_address)}
   */
  public register(
    tokenAddress: string,
  ): Observable<Readonly<TokenNetworkAddress>> {
    return this.tokensApi.registerToken({ tokenAddress }).pipe(
      map((res) => res.tokenNetworkAddress),
      catchError((err) => {
        if (err instanceof AjaxError) {
          return throwError(new RaidenAPIError(err));
        }
        return throwError(err);
      }),
    );
  }
}
