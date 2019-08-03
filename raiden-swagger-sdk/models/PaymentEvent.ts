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
 * @interface PaymentEvent
 */
export interface PaymentEvent {
  /**
   *
   * @type {string}
   * @memberof PaymentEvent
   */
  event?: PaymentEventEventEnum;
  /**
   *
   * @type {number}
   * @memberof PaymentEvent
   */
  amount?: number;
  /**
   *
   * @type {string}
   * @memberof PaymentEvent
   */
  initiator?: string;
  /**
   *
   * @type {number}
   * @memberof PaymentEvent
   */
  identifier?: number;
  /**
   *
   * @type {string}
   * @memberof PaymentEvent
   */
  logTime?: string;
}

/**
 * @export
 * @enum {string}
 */
export enum PaymentEventEventEnum {
  EventPaymentReceivedSuccess = 'EventPaymentReceivedSuccess',
  EventPaymentSentSuccess = 'EventPaymentSentSuccess',
  EventPaymentSentFailed = 'EventPaymentSentFailed',
}
