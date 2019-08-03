import { PendingTransfer as PendingTransferS } from 'raiden-swagger-sdk';
import { Observable } from 'rxjs';
import { Configuration, PendingTransfersApi } from './apis';

export declare enum PendingTransferRoleEnum {
  Initiator = 'initiator',
  Mediator = 'mediator',
  Target = 'target',
}

export interface PendingTransfer extends PendingTransferS {
  role: PendingTransferRoleEnum;
}

export interface QueryPendingTransfersFilter {
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
   * @see {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-pending_transfers}
   */
  public findAll(): Observable<ReadonlyArray<Readonly<PendingTransfer>>> {
    return this.pendingTransfersApi.getPendingTransfers();
  }

  /**
   * All transfers that have not been completed yet for the specified token.
   *
   * @param tokenAddress - The address of the respective token
   * @param by - Additional filters for querying pending transfers
   *
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#get--api-(version)-pending_transfers-(token_address)}
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#get--api-(version)-pending_transfers-(token_address)-(partner_address)}
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
