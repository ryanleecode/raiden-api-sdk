import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Configuration, RaidenNodeApi } from './apis';
import { AjaxError } from 'rxjs/ajax';
import { RaidenAPIError } from './errors';

export class Node {
  public static create(config?: Configuration) {
    const nodeApi = new RaidenNodeApi(config);

    return new Node(nodeApi);
  }

  constructor(private readonly nodeApi: RaidenNodeApi) {}

  /**
   * Query your address
   *
   * @remarks
   * When raiden starts, you choose an ethereum address which will
   * also be your raiden address.
   *
   * @example
   * ```typescript
   * import Raiden from 'raiden-api-sdk';
   *
   * (async function() {
   *   const raiden = Raiden.create();
   *   const ourAddress = await raiden.node.ourAddress().toPromise();
   *
   *   // 0xA44e09ea90eAF80DC1B59aA45687e2c4d572049D
   *   console.log(ourAddress);
   * })()
   * ```
   *
   * @since 0.100.3
   * @throws {@link RaidenAPIError}
   * @see {@link https://raiden-network.readthedocs.io/en/latest/rest_api.html#get--api-(version)-address}
   */
  public ourAddress(): Observable<string> {
    return this.nodeApi.getAddress().pipe(
      map((val) => val.ourAddress),
      catchError((err) => {
        if (err instanceof AjaxError) {
          return throwError(new RaidenAPIError(err));
        }
        return throwError(err);
      }),
    );
  }
}
