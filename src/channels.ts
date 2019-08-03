import {
  ChannelsApi,
  Configuration,
  Channel as ChannelS,
  ChannelPartial,
  InlineObjectStateEnum,
} from 'raiden-swagger-sdk';
import { Observable } from 'rxjs';

export enum ChannelState {
  Opened = 'opened',
  Closed = 'closed',
  Settled = 'settled',
}
export interface OpenChannelRequest extends ChannelPartial {}
/**
 * @public
 */
export interface Channel extends ChannelS {
  state: ChannelState;
}

export class Channels {
  public static create(config?: Configuration) {
    const channelsApi = new ChannelsApi(config);

    return new Channels(channelsApi);
  }

  constructor(private readonly channelsApi: ChannelsApi) {}

  /**
   * List of all unsettled channels
   *
   * {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-channels}
   */
  public findAllUnsettled(): Observable<ReadonlyArray<Readonly<Channel>>> {
    return this.channelsApi.getChannels();
  }

  /**
   * List of all unsettled channels for the given token address
   *
   * @param tokenAddress - the address of the token with unsettled channels
   * {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-channels-(token_address)}
   */
  public findAllUnsettledFor(
    tokenAddress: string,
  ): Observable<ReadonlyArray<Readonly<Channel>>> {
    return this.channelsApi.getChannelsForToken({
      tokenAddress,
    });
  }

  /**
   * Query information about one of your channels
   *
   * @remarks
   * The channel is specified by the address of the token and the partner’s address.
   *
   * @param tokenAddress -
   * @param partnerAddress -
   * {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-channels-(token_address)-(partner_address)}
   */
  public inspect(
    tokenAddress: string,
    partnerAddress: string,
  ): Observable<Readonly<Channel>> {
    return this.channelsApi.getPartnerChannel({
      tokenAddress,
      partnerAddress,
    });
  }

  public open(
    request: Readonly<OpenChannelRequest>,
  ): Observable<Readonly<Channel>> {
    return this.channelsApi.openChannel({ channelPartial: request });
  }

  public close(channel: Readonly<Channel>): Observable<Readonly<Channel>> {
    return this.channelsApi.patchChannel({
      tokenAddress: channel.tokenAddress,
      partnerAddress: channel.partnerAddress,
      inlineObject: { state: InlineObjectStateEnum.Closed },
    });
  }

  public deposit(
    amount: number,
    channel: Readonly<Channel>,
  ): Observable<Readonly<Channel>> {
    return this.channelsApi.patchChannel({
      tokenAddress: channel.tokenAddress,
      partnerAddress: channel.partnerAddress,
      inlineObject: { totalDeposit: channel.totalDeposit + amount },
    });
  }

  public withdraw(
    amount: number,
    channel: Readonly<Channel>,
  ): Observable<Readonly<Channel>> {
    return this.channelsApi.patchChannel({
      tokenAddress: channel.tokenAddress,
      partnerAddress: channel.partnerAddress,
      inlineObject: { totalWithdraw: channel.totalWithdraw + amount },
    });
  }
}
