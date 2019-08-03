import {
  ChannelsApi,
  Configuration,
  Channel,
  ChannelPartial,
  InlineObjectStateEnum,
} from 'raiden-swagger-sdk';
import { Observable } from 'rxjs';

export interface OpenChannelRequest extends ChannelPartial {}

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
  public findAllUnsettled(): Observable<ReadonlyArray<Readonly<Channel>>> {
    return this.channelsApi.getChannels();
  }

  /**
   * @summary List of all unsettled channels for the given token address
   * @param tokenAddress the address of the token with unsettled channels
   * @link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-channels-(token_address)
   */
  public findAllUnsettledFor(
    tokenAddress: string,
  ): Observable<ReadonlyArray<Readonly<Channel>>> {
    return this.channelsApi.getChannelsForToken({
      token_address: tokenAddress,
    });
  }

  /**
   * @summary Query information about one of your channels
   * @description The channel is specified by the address of the token and the partner’s address.
   * @param tokenAddress
   * @param partnerAddress
   * @link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-channels-(token_address)-(partner_address)
   */
  public inspect(
    tokenAddress: string,
    partnerAddress: string,
  ): Observable<Readonly<Channel>> {
    return this.channelsApi.getPartnerChannel({
      token_address: tokenAddress,
      partner_address: partnerAddress,
    });
  }

  public open(
    request: Readonly<OpenChannelRequest>,
  ): Observable<Readonly<Channel>> {
    return this.channelsApi.openChannel({ ChannelPartial: request });
  }

  public close(channel: Readonly<Channel>): Observable<Readonly<Channel>> {
    return this.channelsApi.patchChannel({
      token_address: channel.token_address,
      partner_address: channel.partner_address,
      InlineObject: { state: InlineObjectStateEnum.Closed },
    });
  }

  public deposit(
    amount: number,
    channel: Readonly<Channel>,
  ): Observable<Readonly<Channel>> {
    return this.channelsApi.patchChannel({
      token_address: channel.token_address,
      partner_address: channel.partner_address,
      InlineObject: { total_deposit: channel.total_deposit + amount },
    });
  }

  public withdraw(
    amount: number,
    channel: Readonly<Channel>,
  ): Observable<Readonly<Channel>> {
    return this.channelsApi.patchChannel({
      token_address: channel.token_address,
      partner_address: channel.partner_address,
      InlineObject: { total_withdraw: channel.total_withdraw + amount },
    });
  }
}
