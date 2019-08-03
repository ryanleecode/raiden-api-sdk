import {
  Configuration,
  ConnectionsApi,
  Connection,
  ChannelAllocation,
} from 'raiden-swagger-sdk';
import { Observable } from 'rxjs';

export interface DepositAllocation {
  /**
   * @summary Number of channels to open proactively.
   * @default 3
   */
  initialChannelTarget: number;

  /**
   * @summary Fraction of funds that will be used to join channels
   * opened by other participants.
   * @default 0.4
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
   * @summary Joined Token Networks
   * @description Each key is a token address for which you have open channels.
   * @link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-connections
   */
  public findAll(): Observable<{ [key: string]: Readonly<Connection> }> {
    return this.connectionsApi.getConnections();
  }

  /**
   * @summary Automatically join a token network.
   * @description The request will only return once all blockchain calls
   * for opening and/or depositing to a channel have completed.
   *
   * @param tokenAddress token address of the respective token network
   * @param funds the amount of funds you want to deposit
   * @param allocation allocation of funds for each channel in the network
   * @link https://raiden-network.readthedocs.io/en/latest/rest_api.html#put--api-(version)-connections-(token_address)
   */
  public join(
    tokenAddress: string,
    funds: number,
    allocation?: DepositAllocation,
  ): Observable<void> {
    return this.connectionsApi.joinNetwork({
      tokenAddress,
      channelAllocation: {
        funds,
        ...allocation,
      },
    });
  }

  /**
   * @summary Leave a token network
   * @description The request will only return once all blockchain calls
   * for closing/settling a channel have completed.
   * @param tokenAddress token address of the respective token network
   * @link https://raiden-network.readthedocs.io/en/latest/rest_api.html#delete--api-(version)-connections-(token_address)
   */
  public leave(
    tokenAddress: string,
  ): Observable<ReadonlyArray<ClosedChannelAddress>> {
    return this.connectionsApi.leaveNetwork({ tokenAddress });
  }
}
