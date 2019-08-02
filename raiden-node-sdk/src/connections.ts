import {
  Configuration,
  ConnectionsApi,
  Connection,
  ChannelAllocation
} from "raiden-swagger-sdk";
import { Observable } from "rxjs";

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

  public join(tokenAddress: string, allocation: ChannelAllocation) {
    return this.connectionsApi.joinNetwork({
      tokenAddress,
      channelAllocation: allocation
    });
  }
}
