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
 * @interface PendingTransfer
 */
export interface PendingTransfer {
  /**
   *
   * @type {string}
   * @memberof PendingTransfer
   */
  channelIdentifier: string;
  /**
   *
   * @type {string}
   * @memberof PendingTransfer
   */
  initiator: string;
  /**
   *
   * @type {string}
   * @memberof PendingTransfer
   */
  lockedAmount: string;
  /**
   *
   * @type {string}
   * @memberof PendingTransfer
   */
  paymentIdentifier: string;
  /**
   *
   * @type {string}
   * @memberof PendingTransfer
   */
  role: PendingTransferRoleEnum;
  /**
   *
   * @type {string}
   * @memberof PendingTransfer
   */
  target: string;
  /**
   *
   * @type {string}
   * @memberof PendingTransfer
   */
  tokenAddress: string;
  /**
   *
   * @type {string}
   * @memberof PendingTransfer
   */
  tokenNetworkIdentifier: string;
  /**
   *
   * @type {string}
   * @memberof PendingTransfer
   */
  transferredAmount: string;
}

/**
 * @export
 * @enum {string}
 */
export enum PendingTransferRoleEnum {
  Initiator = "initiator",
  Mediator = "mediator",
  Target = "target"
}
