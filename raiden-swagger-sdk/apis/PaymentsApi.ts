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

import { Observable } from "rxjs";
import {
  BaseAPI,
  throwIfRequired,
  HttpHeaders,
  HttpQuery,
  COLLECTION_FORMATS
} from "../runtime";
import { Errors, Payment, PaymentEvent, PaymentReceipt } from "../models";

export interface GetPaymentsByTokenRequest {
  tokenAddress: string;
}

export interface GetPaymentsByTokenForTargetRequest {
  tokenAddress: string;
  targetAddress: string;
}

export interface PayRequest {
  tokenAddress: string;
  targetAddress: string;
  payment: Payment;
}

/**
 * no description
 */
export class PaymentsApi extends BaseAPI {
  /**
   * List All Payments
   */
  getPayments = (): Observable<Array<PaymentEvent>> => {
    const headers: HttpHeaders = {};

    const query: HttpQuery = {};

    return this.request<Array<PaymentEvent>>({
      path: `/payments`,
      method: "GET",
      headers,
      query
    });
  };

  /**
   * List All Payments for Token
   */
  getPaymentsByToken = (
    requestParameters: GetPaymentsByTokenRequest
  ): Observable<Array<PaymentEvent>> => {
    throwIfRequired(requestParameters, "tokenAddress", "getPaymentsByToken");

    const headers: HttpHeaders = {};

    const query: HttpQuery = {};

    return this.request<Array<PaymentEvent>>({
      path: `/payments/{token_address}`.replace(
        `{token_address}`,
        encodeURIComponent(String(requestParameters.tokenAddress))
      ),
      method: "GET",
      headers,
      query
    });
  };

  /**
   * List All Payments for Token by Target
   */
  getPaymentsByTokenForTarget = (
    requestParameters: GetPaymentsByTokenForTargetRequest
  ): Observable<Array<PaymentEvent>> => {
    throwIfRequired(
      requestParameters,
      "tokenAddress",
      "getPaymentsByTokenForTarget"
    );
    throwIfRequired(
      requestParameters,
      "targetAddress",
      "getPaymentsByTokenForTarget"
    );

    const headers: HttpHeaders = {};

    const query: HttpQuery = {};

    return this.request<Array<PaymentEvent>>({
      path: `/payments/{token_address}/{target_address}`
        .replace(
          `{token_address}`,
          encodeURIComponent(String(requestParameters.tokenAddress))
        )
        .replace(
          `{target_address}`,
          encodeURIComponent(String(requestParameters.targetAddress))
        ),
      method: "GET",
      headers,
      query
    });
  };

  /**
   * The request will only return once the payment either succeeded or failed. A payment can fail due to the expiration of a lock, the target being offline, channels on the path to the target not having enough `settle_timeout` and `reveal_timeout` in order to allow the payment to be propagated safely, not enough funds etc.
   * Initiate a payment
   */
  pay = (requestParameters: PayRequest): Observable<PaymentReceipt> => {
    throwIfRequired(requestParameters, "tokenAddress", "pay");
    throwIfRequired(requestParameters, "targetAddress", "pay");
    throwIfRequired(requestParameters, "payment", "pay");

    const headers: HttpHeaders = {
      "Content-Type": "application/json"
    };

    const query: HttpQuery = {};

    return this.request<PaymentReceipt>({
      path: `/payments/{token_address}/{target_address}`
        .replace(
          `{token_address}`,
          encodeURIComponent(String(requestParameters.tokenAddress))
        )
        .replace(
          `{target_address}`,
          encodeURIComponent(String(requestParameters.targetAddress))
        ),
      method: "POST",
      headers,
      query,
      body: requestParameters.payment
    });
  };
}
