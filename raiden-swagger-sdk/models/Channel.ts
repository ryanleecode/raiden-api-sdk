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

import { ChannelAllOf, ChannelPartial, ChannelState } from './';

/**
 * @export
 * @interface Channel
 */
export interface Channel {
  /**
   * EIP55-encoded address of the partner with whom we have opened a channel
   * @type {string}
   * @memberof Channel
   */
  partner_address: string;
  /**
   * EIP55-encoded address of the token we are trading in the channel
   * @type {string}
   * @memberof Channel
   */
  token_address: string;
  /**
   * Amount of the token_address token we have deposited into the contract for this channel.
   * @type {number}
   * @memberof Channel
   */
  total_deposit: number;
  /**
   * The number of blocks that are required to be mined from the time that close() is called until the channel can be settled with a call to settle()
   * @type {number}
   * @memberof Channel
   */
  settle_timeout: number;
  /**
   * identifier of the channel
   * @type {number}
   * @memberof Channel
   */
  channel_identifier: number;
  /**
   * EIP55-encoded address of the token network the channel is part of
   * @type {string}
   * @memberof Channel
   */
  token_network_identifier: string;
  /**
   * Amount of the token_address token we have available for payments.
   * @type {number}
   * @memberof Channel
   */
  balance: number;
  /**
   * Amount of the token_address token we have withdrawn into the contract for this channel.
   * @type {number}
   * @memberof Channel
   */
  total_withdraw: number;
  /**
   *
   * @type {ChannelState}
   * @memberof Channel
   */
  state: ChannelState;
  /**
   * The maximum number of blocks allowed between the setting of a hashlock and the revealing of the related secret.
   * @type {number}
   * @memberof Channel
   */
  reveal_timeout: number;
}
