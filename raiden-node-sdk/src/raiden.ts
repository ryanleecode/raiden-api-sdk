import { Configuration, DefaultApi, Address } from "raiden-swagger-sdk";
import { Observable } from "rxjs";

export class Raiden {
  private readonly api: DefaultApi;

  constructor(readonly config?: Configuration) {
    this.api = new DefaultApi(config);
  }

  /**
   * @summary Query your address
   * @description When raiden starts, you choose an ethereum address which will
   * also be your raiden address.
   */
  public address(): Observable<Address> {
    return this.api.getAddress();
  }
}
