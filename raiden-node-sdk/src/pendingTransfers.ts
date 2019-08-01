import {
  PendingTransfersApi,
  PendingTransfer,
  Configuration
} from "raiden-swagger-sdk";
import { Observable } from "rxjs";

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
  public all(): Observable<PendingTransfer[]> {
    return this.pendingTransfersApi.getPendingTransfers();
  }

  /**
   * @summary All transfers that have not been completed yet for the specified token.
   * @param tokenAddress
   * @by additional filters for querying pending transfers
   */
  public allFor(
    tokenAddress: string,
    by: QueryPendingTransfersFilter = {}
  ): Observable<PendingTransfer[]> {
    if (by.channelAddress !== undefined) {
      return this.pendingTransfersApi.getPendingTransfersForTokenOnChannel({
        tokenAddress,
        partnerAddress: by.channelAddress
      });
    }
    return this.pendingTransfersApi.getPendingTransfersForToken({
      tokenAddress
    });
  }
}
