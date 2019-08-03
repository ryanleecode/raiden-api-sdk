import { Connection as ConnectionS } from 'raiden-swagger-sdk';
import { Observable, throwError } from 'rxjs';
import { Configuration, ConnectionsApi } from './apis';
import { catchError } from 'rxjs/operators';
import { AjaxError } from 'rxjs/ajax';
import { RaidenAPIError } from './errors';

export interface Connection extends ConnectionS {}

export interface DepositAllocation {
  /**
   * Number of channels to open proactively.
   *
   * @defaultValue 3
   */
  initialChannelTarget: number;

  /**
   * Fraction of funds that will be used to join channels
   * opened by other participants.
   *
   * @defaultValue 0.4
   */
  joinableFundsTarget: number;
}

export type ClosedChannelAddress = string;

export class TokenNetworks {
  public static create(config?: Configuration) {
    const connectionsApi = new ConnectionsApi(config);

    return new TokenNetworks(connectionsApi);
  }
  constructor(private readonly connectionsApi: ConnectionsApi) {}

  /**
   * Joined Token Networks
   *
   * @remarks
   * Each key is a token address for which you have open channels.
   *
   * @throws {@link RaidenAPIError}
   * @see {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-connections}
   */
  public findAll(): Observable<{ [key: string]: Readonly<Connection> }> {
    return this.connectionsApi.getConnections().pipe(
      catchError((err) => {
        if (err instanceof AjaxError) {
          return throwError(new RaidenAPIError(err));
        }
        return throwError(err);
      }),
    );
  }

  /**
   * Automatically join a token network.
   *
   * @remarks
   * The request will only return once all blockchain calls
   * for opening and/or depositing to a channel have completed.
   *
   * @param tokenAddress - Token address of the respective token network
   * @param funds - The amount of funds you want to deposit
   * @param allocation - Allocation of funds for each channel in the network
   *
   * @throws {@link RaidenAPIError}
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#put--api-(version)-connections-(token_address)}
   */
  public join(
    tokenAddress: string,
    funds: number,
    allocation?: DepositAllocation,
  ): Observable<void> {
    return this.connectionsApi
      .joinNetwork({
        tokenAddress,
        channelAllocation: {
          funds,
          ...allocation,
        },
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
   * Leave a token network
   *
   * @remarks
   * The request will only return once all blockchain calls
   * for closing/settling a channel have completed.
   * @param tokenAddress - Token address of the respective token network
   *
   * @throws {@link RaidenAPIError}
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#delete--api-(version)-connections-(token_address)}
   */
  public leave(
    tokenAddress: string,
  ): Observable<ReadonlyArray<ClosedChannelAddress>> {
    return this.connectionsApi.leaveNetwork({ tokenAddress }).pipe(
      catchError((err) => {
        if (err instanceof AjaxError) {
          return throwError(new RaidenAPIError(err));
        }
        return throwError(err);
      }),
    );
  }
}
