import {
  Channel as ChannelS,
  ChannelPartial,
  InlineObjectStateEnum,
} from 'raiden-swagger-sdk';
import { Observable } from 'rxjs';
import { Configuration, ChannelsApi } from './apis';

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
   * @see {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-channels}
   */
  public findAllUnsettled(): Observable<ReadonlyArray<Readonly<Channel>>> {
    return this.channelsApi.getChannels();
  }

  /**
   * List of all unsettled channels for the given token address
   *
   * @param tokenAddress - The address of the token with unsettled channels
   * @see {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-channels-(token_address)}
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
   * @see {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-channels-(token_address)-(partner_address)}
   *
   * @param tokenAddress - The respective token address
   * @param partnerAddress - The respective partner address
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

  /**
   * Opens a channel
   *
   * @param request - Open channel request parameters
   *
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#put--api-(version)-channels}
   */
  public open(
    request: Readonly<OpenChannelRequest>,
  ): Observable<Readonly<Channel>> {
    return this.channelsApi.openChannel({ channelPartial: request });
  }

  /**
   * Close a channel
   *
   * @param channel - The channel to be closed
   *
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#patch--api-(version)-channels-(token_address)-(partner_address)}
   */
  public close(channel: Readonly<Channel>): Observable<Readonly<Channel>> {
    return this.channelsApi.patchChannel({
      tokenAddress: channel.tokenAddress,
      partnerAddress: channel.partnerAddress,
      inlineObject: { state: InlineObjectStateEnum.Closed },
    });
  }

  /**
   * Increase Deposit
   *
   * @param amount - The amount of funds you want to deposit in the channel
   * @param channel - The respective channel
   *
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#patch--api-(version)-channels-(token_address)-(partner_address)}
   */
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

  /**
   * Withdraw Tokens
   *
   * @param amount - The amount you want to withdraw
   * @param channel - The respective channel
   *
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#patch--api-(version)-channels-(token_address)-(partner_address)}
   */
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
