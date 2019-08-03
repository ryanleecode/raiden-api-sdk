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
 * @interface ChannelPartial
 */
export interface ChannelPartial {
  /**
   * EIP55-encoded address of the partner with whom we have opened a channel
   * @type {string}
   * @memberof ChannelPartial
   */
  partner_address: string;
  /**
   * EIP55-encoded address of the token we are trading in the channel
   * @type {string}
   * @memberof ChannelPartial
   */
  token_address: string;
  /**
   * Amount of the token_address token we have deposited into the contract for this channel.
   * @type {number}
   * @memberof ChannelPartial
   */
  total_deposit: number;
  /**
   * The number of blocks that are required to be mined from the time that close() is called until the channel can be settled with a call to settle()
   * @type {number}
   * @memberof ChannelPartial
   */
  settle_timeout: number;
}
