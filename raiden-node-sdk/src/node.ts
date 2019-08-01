import { RaidenNodeApi, Configuration, Address } from "raiden-swagger-sdk";
import { Observable } from "rxjs";

export class Node {
  private readonly raidenNodeApi: RaidenNodeApi;

  constructor(config?: Configuration) {
    this.raidenNodeApi = new RaidenNodeApi(config);
  }

  /**
   * @summary Query your address
   * @description When raiden starts, you choose an ethereum address which will
   * also be your raiden address.
   */
  public address(): Observable<Address> {
    return this.raidenNodeApi.getAddress();
  }
}
