import { ChannelsApi, Configuration, Channel } from "raiden-swagger-sdk";
import { Observable } from "rxjs";

export class Channels {
  public static create(config?: Configuration) {
    const channelsApi = new ChannelsApi(config);

    return new Channels(channelsApi);
  }

  constructor(private readonly channelsApi: ChannelsApi) {}

  /**
   * @summary List of all unsettled channels
   * @link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-channels
   */
  public allUnsettled(): Observable<Channel[]> {
    return this.channelsApi.getChannels();
  }

  /**
   * @summary List of all unsettled channels for the given token address
   * @param tokenAddress the address of the token with unsettled channels
   * @link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-channels-(token_address)
   */
  public allUnsettledFor(tokenAddress: string): Observable<Channel[]> {
    return this.channelsApi.getChannelsForToken({ tokenAddress });
  }

  /**
   * @summary Query information about one of your channels
   * @description The channel is specified by the address of the token and the partner’s address.
   * @param tokenAddress the token address
   * @param partnerAddress the partner address
   * @link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-channels-(token_address)-(partner_address)
   */
  public inspect(
    tokenAddress: string,
    partnerAddress: string
  ): Observable<Channel> {
    return this.channelsApi.getPartnerChannel({ tokenAddress, partnerAddress });
  }
}
