import {
  Channel as ChannelS,
  ChannelPartial,
  InlineObjectStateEnum,
} from 'raiden-swagger-sdk';
import { Observable, throwError } from 'rxjs';
import { Configuration, ChannelsApi } from './apis';
import { catchError } from 'rxjs/operators';
import { AjaxError } from 'rxjs/ajax';
import { RaidenAPIError } from './errors';

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
   * @example
   * ```typescript
   * import Raiden from 'raiden-api-sdk';
   *
   * (async function() {
   *   const raiden = Raiden.create();
   *   const unsettledChannels = await raiden.channels.findAllUnsettled().toPromise();
   *
   *   // [
   *   //   {
   *   //     settleTimeout: 500,
   *   //     balance: 0,
   *   //     partnerAddress: "0x26704469E95202191bf3Fb277669B6E6Bdd8cC65",
   *   //     revealTimeout: 50,
   *   //     state: "opened",
   *   //     totalDeposit: 0,
   *   //     totalWithdraw: 0 // Only in >= 0.100.4
   *   //     tokenAddress: "0xaFF4481D10270F50f203E0763e2597776068CBc5",
   *   //     channelIdentifier: 2,
   *   //     tokenNetworkIdentifier: "0x26746540aBB01b15294Bf93715e4EEdAF1946110"
   *   //   }
   *   // ];
   *   console.log(unsettledChannels);
   * })()
   * ```
   *
   * @since 0.100.3
   * @throws {@link RaidenAPIError}
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#get--api-(version)-channels}
   */
  public findAllUnsettled(): Observable<ReadonlyArray<Readonly<Channel>>> {
    return this.channelsApi.getChannels().pipe(
      catchError((err) => {
        if (err instanceof AjaxError) {
          return throwError(new RaidenAPIError(err));
        }
        return throwError(err);
      }),
    );
  }

  /**
   * List of all unsettled channels for the given token address
   *
   * @example
   * ```typescript
   * import Raiden from 'raiden-api-sdk';
   *
   * (async function() {
   *   const raiden = Raiden.create();
   *   const tokenAddress = '0xaFF4481D10270F50f203E0763e2597776068CBc5';
   *   const unsettledChannels = await raiden.channels
   *     .findAllUnsettledFor(tokenAddress)
   *     .toPromise();
   *
   *   // [
   *   //   {
   *   //     settleTimeout: 500,
   *   //     balance: 0,
   *   //     partnerAddress: "0x26704469E95202191bf3Fb277669B6E6Bdd8cC65",
   *   //     revealTimeout: 50,
   *   //     state: "opened",
   *   //     totalDeposit: 0,
   *   //     totalWithdraw: 0 // Only in >= 0.100.4
   *   //     tokenAddress: "0xaFF4481D10270F50f203E0763e2597776068CBc5",
   *   //     channelIdentifier: 2,
   *   //     tokenNetworkIdentifier: "0x26746540aBB01b15294Bf93715e4EEdAF1946110"
   *   //   }
   *   // ];
   *   console.log(unsettledChannels);
   * })()
   * ```
   * @param tokenAddress - The address of the token with unsettled channels
   * @throws {@link RaidenAPIError}
   * @since 0.100.3
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#get--api-(version)-channels-(token_address)}
   */
  public findAllUnsettledFor(
    tokenAddress: string,
  ): Observable<ReadonlyArray<Readonly<Channel>>> {
    return this.channelsApi
      .getChannelsForToken({
        tokenAddress,
      })
      .pipe(
        catchError((err) => {
          if (err instanceof AjaxError) {
            return throwError(new RaidenAPIError(err));
          }
          return throwError(err);
        }),
      );
  }

  /**
   * Query information about one of your channels
   *
   * @remarks
   * The channel is specified by the address of the token and the partner’s address.
   *
   *
   * @param tokenAddress - The respective token address
   * @param partnerAddress - The respective partner address
   * @example
   * ```typescript
   * import Raiden from "raiden-api-sdk";
   *
   * (async function() {
   *   const raiden = Raiden.create();
   *   const tokenAddress = "0xaFF4481D10270F50f203E0763e2597776068CBc5";
   *   const partnerAddress = "0x26704469E95202191bf3Fb277669B6E6Bdd8cC65";
   *   const channel = await raiden.channels
   *     .inspect(tokenAddress, partnerAddress)
   *     .toPromise();
   *
   *   // {
   *   //   settleTimeout: 500,
   *   //   balance: 0,
   *   //   partnerAddress: "0x26704469E95202191bf3Fb277669B6E6Bdd8cC65",
   *   //   revealTimeout: 50,
   *   //   state: "opened",
   *   //   totalDeposit: 0,
   *   //   totalWithdraw: 0 // Only in >= 0.100.4
   *   //   tokenAddress: "0xaFF4481D10270F50f203E0763e2597776068CBc5",
   *   //   channelIdentifier: 2,
   *   //   tokenNetworkIdentifier: "0x26746540aBB01b15294Bf93715e4EEdAF1946110"
   *   // }
   *   console.log(channel);
   * })();
   * ```
   * @throws {@link RaidenAPIError}
   * @since 0.100.3
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#get--api-(version)-channels-(token_address)-(partner_address)}
   *
   */
  public inspect(
    tokenAddress: string,
    partnerAddress: string,
  ): Observable<Readonly<Channel>> {
    return this.channelsApi
      .getPartnerChannel({
        tokenAddress,
        partnerAddress,
      })
      .pipe(
        catchError((err) => {
          if (err instanceof AjaxError) {
            return throwError(new RaidenAPIError(err));
          }
          return throwError(err);
        }),
      );
  }

  /**
   * Opens a channel
   *
   * @param request - Open channel request parameters
   *
   * @example
   * ```typescript
   * import Raiden from "raiden-api-sdk";
   *
   * (async function() {
   *   const raiden = Raiden.create();
   *   const tokenAddress = '0xaFF4481D10270F50f203E0763e2597776068CBc5';
   *   const partnerAddress = '0x26704469E95202191bf3Fb277669B6E6Bdd8cC65';
   *   const channel = await raiden.channels
   *     .open({
   *       tokenAddress,
   *       partnerAddress,
   *       totalDeposit: 6 * Math.pow(10, 18),
   *       settleTimeout: 500,
   *     })
   *     .toPromise();
   *
   *   // {
   *   //   settleTimeout: 500,
   *   //   balance: 0,
   *   //   partnerAddress: "0x26704469E95202191bf3Fb277669B6E6Bdd8cC65",
   *   //   revealTimeout: 50,
   *   //   state: "opened",
   *   //   totalDeposit: 0,
   *   //   totalWithdraw: 0 // Only in >= 0.100.4
   *   //   tokenAddress: "0xaFF4481D10270F50f203E0763e2597776068CBc5",
   *   //   channelIdentifier: 2,
   *   //   tokenNetworkIdentifier: "0x26746540aBB01b15294Bf93715e4EEdAF1946110"
   *   // }
   *   console.log(channel);
   * })();
   * ```
   *
   * @throws {@link RaidenAPIError}
   *
   * @since 0.100.3
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#put--api-(version)-channels}
   */
  public open(
    request: Readonly<OpenChannelRequest>,
  ): Observable<Readonly<Channel>> {
    return this.channelsApi.openChannel({ channelPartial: request }).pipe(
      catchError((err) => {
        if (err instanceof AjaxError) {
          return throwError(new RaidenAPIError(err));
        }
        return throwError(err);
      }),
    );
  }

  /**
   * Close a channel
   *
   * @param channel - The channel to be closed
   *
   * @example
   * ```typescript
   * import Raiden from "raiden-api-sdk";
   *
   * (async function() {
   *   const raiden = Raiden.create();
   *   const tokenAddress = '0xaFF4481D10270F50f203E0763e2597776068CBc5';
   *   const partnerAddress = '0x26704469E95202191bf3Fb277669B6E6Bdd8cC65';
   *   const channel = await raiden.channels
   *     .inspect(tokenAddress, partnerAddress)
   *     .toPromise();
   *
   *   const closedChannel = await raiden.channels.close(channel).toPromise();
   *
   *   // {
   *   //   settleTimeout: 500,
   *   //   balance: 0,
   *   //   partnerAddress: "0x26704469E95202191bf3Fb277669B6E6Bdd8cC65",
   *   //   revealTimeout: 50,
   *   //   state: "closed",
   *   //   totalDeposit: 0,
   *   //   totalWithdraw: 0 // Only in >= 0.100.4
   *   //   tokenAddress: "0xaFF4481D10270F50f203E0763e2597776068CBc5",
   *   //   channelIdentifier: 2,
   *   //   tokenNetworkIdentifier: "0x26746540aBB01b15294Bf93715e4EEdAF1946110"
   *   // }
   *   console.log(closedChannel);
   * })();
   * ```
   * @throws {@link RaidenAPIError}
   *
   * @since 0.100.3
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#patch--api-(version)-channels-(token_address)-(partner_address)}
   */
  public close(channel: Readonly<Channel>): Observable<Readonly<Channel>> {
    return this.channelsApi
      .patchChannel({
        tokenAddress: channel.tokenAddress,
        partnerAddress: channel.partnerAddress,
        inlineObject: { state: InlineObjectStateEnum.Closed },
      })
      .pipe(
        catchError((err) => {
          if (err instanceof AjaxError) {
            return throwError(new RaidenAPIError(err));
          }
          return throwError(err);
        }),
      );
  }

  /**
   * Increase Deposit
   *
   * @param amount - The amount of funds you want to deposit in the channel
   * @param channel - The respective channel
   *
   * @example
   * ```typescript
   * import Raiden from "raiden-api-sdk";
   *
   * (async function() {
   *   const raiden = Raiden.create();
   *   const tokenAddress = '0xaFF4481D10270F50f203E0763e2597776068CBc5';
   *   const partnerAddress = '0x26704469E95202191bf3Fb277669B6E6Bdd8cC65';
   *   const channel = await raiden.channels
   *     .inspect(tokenAddress, partnerAddress)
   *     .toPromise();
   *
   *   // The channel has 6 * 10^18 currently. A deposit of 2 * 10^18, will make it 8 * 10^18
   *   const channelPostDeposit = await raiden.channels.deposit(
   *     2 * Math.pow(10, 18),
   *     channel,
   *   );
   *
   *   // {
   *   //   settleTimeout: 500,
   *   //   balance: 8000000000000000000,
   *   //   partnerAddress: "0x26704469E95202191bf3Fb277669B6E6Bdd8cC65",
   *   //   revealTimeout: 50,
   *   //   state: "open",
   *   //   totalDeposit: 8000000000000000000,
   *   //   totalWithdraw: 0 // Only in >= 0.100.4
   *   //   tokenAddress: "0xaFF4481D10270F50f203E0763e2597776068CBc5",
   *   //   channelIdentifier: 2,
   *   //   tokenNetworkIdentifier: "0x26746540aBB01b15294Bf93715e4EEdAF1946110"
   *   // }
   *   console.log(channelPostDeposit);
   * })();
   * ```
   *
   * @throws {@link RaidenAPIError}
   *
   * @since 0.100.3
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#patch--api-(version)-channels-(token_address)-(partner_address)}
   */
  public deposit(
    amount: number,
    channel: Readonly<Channel>,
  ): Observable<Readonly<Channel>> {
    return this.channelsApi
      .patchChannel({
        tokenAddress: channel.tokenAddress,
        partnerAddress: channel.partnerAddress,
        inlineObject: { totalDeposit: channel.totalDeposit + amount },
      })
      .pipe(
        catchError((err) => {
          if (err instanceof AjaxError) {
            return throwError(new RaidenAPIError(err));
          }
          return throwError(err);
        }),
      );
  }

  /**
   * Withdraw Tokens
   *
   * @param amount - The amount you want to withdraw
   * @param channel - The respective channel
   *
   * @throws {@link RaidenAPIError}
   *
   * @since 0.100.4
   * @throws {@link RaidenAPIError}
   *
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#patch--api-(version)-channels-(token_address)-(partner_address)}
   */
  public withdraw(
    amount: number,
    channel: Readonly<Channel>,
  ): Observable<Readonly<Channel>> {
    return this.channelsApi
      .patchChannel({
        tokenAddress: channel.tokenAddress,
        partnerAddress: channel.partnerAddress,
        inlineObject: { totalWithdraw: channel.totalWithdraw!! + amount },
      })
      .pipe(
        catchError((err) => {
          if (err instanceof AjaxError) {
            return throwError(new RaidenAPIError(err));
          }
          return throwError(err);
        }),
      );
  }
}
