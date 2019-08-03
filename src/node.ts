import { RaidenNodeApi, Configuration, Address } from 'raiden-swagger-sdk';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import camelcase from 'camelcase-keys';

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
   * import Raiden from 'raiden-sdk';
   *
   * (async function() {
   *   const raiden = Raiden.create();
   *   const ourAddress = raiden.node.ourAddress().toPromise();
   *
   *   // 0xA44e09ea90eAF80DC1B59aA45687e2c4d572049D
   *   console.log(ourAddress);
   * })()
   * ```
   *  <br />
   * {@link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-address | Official API Documentation}
   */
  public ourAddress(): Observable<string> {
    return this.nodeApi.getAddress().pipe(
      map((val) => (camelcase(val) as unknown) as Address),
      map((val) => val.ourAddress),
    );
  }
}
