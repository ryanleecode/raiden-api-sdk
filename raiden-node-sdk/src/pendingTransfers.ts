import {
  PendingTransfersApi,
  PendingTransfer,
  Configuration,
} from 'raiden-swagger-sdk';
import { Observable } from 'rxjs';

interface QueryPendingTransfersFilter {
  channelAddress?: string;
}

export class PendingTransfers {
  public static create(config?: Configuration) {
    const pendingTransfersApi = new PendingTransfersApi(config);
    return new PendingTransfers(pendingTransfersApi);
  }

  constructor(private readonly pendingTransfersApi: PendingTransfersApi) {}

  /**
   * @summary All transfers that have not been completed yet.
   * @link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-pending_transfers
   */
  public findAll(): Observable<ReadonlyArray<Readonly<PendingTransfer>>> {
    return this.pendingTransfersApi.getPendingTransfers();
  }

  /**
   * @summary All transfers that have not been completed yet for the specified token.
   * @param tokenAddress
   * @by additional filters for querying pending transfers
   */
  public findAllFor(
    tokenAddress: string,
    by: QueryPendingTransfersFilter = {},
  ): Observable<ReadonlyArray<PendingTransfer>> {
    if (by.channelAddress !== undefined) {
      return this.pendingTransfersApi.getPendingTransfersForTokenOnChannel({
        token_address: tokenAddress,
        partner_address: by.channelAddress,
      });
    }
    return this.pendingTransfersApi.getPendingTransfersForToken({
      token_address: tokenAddress,
    });
  }
}
