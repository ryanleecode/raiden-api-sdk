// tslint:disable
/**
 * Raiden API
 * https://raiden-network.readthedocs.io/en/stable/rest_api.html
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * @export
 * @interface Transfer
 */
export interface Transfer {
  /**
   *
   * @type {string}
   * @memberof Transfer
   */
  channelIdentifier?: string;
  /**
   *
   * @type {string}
   * @memberof Transfer
   */
  initiator?: string;
  /**
   *
   * @type {string}
   * @memberof Transfer
   */
  lockedAmount?: string;
  /**
   *
   * @type {string}
   * @memberof Transfer
   */
  paymentIdentifier?: string;
  /**
   *
   * @type {string}
   * @memberof Transfer
   */
  role?: TransferRoleEnum;
  /**
   *
   * @type {string}
   * @memberof Transfer
   */
  target?: string;
  /**
   *
   * @type {string}
   * @memberof Transfer
   */
  tokenAddress?: string;
  /**
   *
   * @type {string}
   * @memberof Transfer
   */
  tokenNetworkIdentifier?: string;
  /**
   *
   * @type {string}
   * @memberof Transfer
   */
  transferredAmount?: string;
}

/**
 * @export
 * @enum {string}
 */
export enum TransferRoleEnum {
  Initiator = "initiator",
  Mediator = "mediator",
  Target = "target"
}
