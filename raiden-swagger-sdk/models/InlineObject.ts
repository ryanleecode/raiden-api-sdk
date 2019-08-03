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
 * @interface InlineObject
 */
export interface InlineObject {
  /**
   * The increased total deposit
   * @type {number}
   * @memberof InlineObject
   */
  totalDeposit?: number;
  /**
   * The increased total withdrawal
   * @type {number}
   * @memberof InlineObject
   */
  totalWithdraw?: number;
  /**
   * Desired new state
   * @type {string}
   * @memberof InlineObject
   */
  state?: InlineObjectStateEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum InlineObjectStateEnum {
  Closed = 'closed',
}
