import { PendingTransfer as PendingTransferS } from 'raiden-openapi-sdk';
import { Observable, throwError } from 'rxjs';
import { Configuration, PendingTransfersApi } from './apis';
import { AjaxError } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';
import { RaidenAPIError } from './errors';

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
   * @since 0.100.3
   * @throws {@link RaidenAPIError}
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#get--api-(version)-pending_transfers}
   */
  public findAll(): Observable<ReadonlyArray<Readonly<PendingTransfer>>> {
    return this.pendingTransfersApi.getPendingTransfers().pipe(
      catchError((err) => {
        if (err instanceof AjaxError) {
          return throwError(new RaidenAPIError(err));
        }
        return throwError(err);
      }),
    );
  }

  /**
   * All transfers that have not been completed yet for the specified token.
   *
   * @param tokenAddress - The address of the respective token
   * @param by - Additional filters for querying pending transfers
   *
   * @since 0.100.3
   * @throws {@link RaidenAPIError}
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#get--api-(version)-pending_transfers-(token_address)}
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#get--api-(version)-pending_transfers-(token_address)-(partner_address)}
   */
  public findAllFor(
    tokenAddress: string,
    by: QueryPendingTransfersFilter = {},
  ): Observable<ReadonlyArray<PendingTransfer>> {
    let stream: Observable<ReadonlyArray<PendingTransfer>>;
    if (by.channelAddress !== undefined) {
      stream = this.pendingTransfersApi
        .getPendingTransfersForTokenOnChannel({
          tokenAddress,
          partnerAddress: by.channelAddress,
        })
        .pipe(
          catchError((err) => {
            if (err instanceof AjaxError) {
              return throwError(new RaidenAPIError(err));
            }
            return throwError(err);
          }),
        );
    } else {
      stream = this.pendingTransfersApi
        .getPendingTransfersForToken({
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

    return stream;
  }
}
