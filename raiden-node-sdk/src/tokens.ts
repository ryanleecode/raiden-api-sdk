import { TokensApi, Configuration, Partner } from "raiden-swagger-sdk";
import { Observable } from "rxjs";

export class Tokens {
  public static create(config?: Configuration) {
    const tokensApi = new TokensApi(config);

    return new Tokens(tokensApi);
  }

  constructor(private readonly tokensApi: TokensApi) {}

  /**
   * @summary Addresses of all registered tokens
   * @link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-tokens
   */
  public allRegistered(): Observable<string[]> {
    return this.tokensApi.getTokens();
  }

  /**
   * @summary Token network address
   * @description The address of the corresponding token network for the given token, if the token is registered.
   * @param tokenAddress
   * @link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-tokens-(token_address)
   */
  public networkAddressFor(tokenAddress: string): Observable<string> {
    return this.tokensApi.getToken({ tokenAddress });
  }

  /**
   * @summary List of all partners with whom you have non-settled channels for a certain token
   * @link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-tokens-(token_address)-partners
   */
  public partners(): Observable<Partner[]> {
    return this.tokensApi.getTokenPartners();
  }
}
