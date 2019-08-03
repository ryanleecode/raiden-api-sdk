import { PendingTransfer } from 'raiden-swagger-sdk';
import { Observable } from 'rxjs';
import { Configuration, PendingTransfersApi } from './apis';

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
   * All transfers that have not been completed yet.
   *
   * {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-pending_transfers}
   */
  public findAll(): Observable<ReadonlyArray<Readonly<PendingTransfer>>> {
    return this.pendingTransfersApi.getPendingTransfers();
  }

  /**
   * All transfers that have not been completed yet for the specified token.
   *
   * @param tokenAddress - the address of the respective token
   * @param by - additional filters for querying pending transfers
   */
  public findAllFor(
    tokenAddress: string,
    by: QueryPendingTransfersFilter = {},
  ): Observable<ReadonlyArray<PendingTransfer>> {
    if (by.channelAddress !== undefined) {
      return this.pendingTransfersApi.getPendingTransfersForTokenOnChannel({
        tokenAddress,
        partnerAddress: by.channelAddress,
      });
    }
    return this.pendingTransfersApi.getPendingTransfersForToken({
      tokenAddress,
    });
  }
}
