import { RaidenNodeApi, Configuration, Address } from "raiden-swagger-sdk";
import { Observable } from "rxjs";

export class Node {
  public static create(config?: Configuration) {
    const nodeApi = new RaidenNodeApi(config);
    return new Node(nodeApi);
  }

  constructor(private readonly nodeApi: RaidenNodeApi) {}

  /**
   * @summary Query your address
   * @description When raiden starts, you choose an ethereum address which will
   * also be your raiden address.
   * @link https://raiden-network.readthedocs.io/en/stable/rest_api.html#get--api-(version)-address
   */
  public address(): Observable<Address> {
    return this.nodeApi.getAddress();
  }
}
