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
  RequiredError,
  HttpHeaders,
  HttpQuery,
  COLLECTION_FORMATS
} from "../runtime";
import { Errors, PendingTransfer } from "../models";

export interface GetPendingTransfersForTokenRequest {
  tokenAddress: string;
}

export interface GetPendingTransfersForTokenOnChannelRequest {
  tokenAddress: string;
  partnerAddress: string;
}

/**
 * no description
 */
export class PendingTransfersApi extends BaseAPI {
  /**
   * Returns a list of all transfers that have not been completed yet.
   */
  getPendingTransfers(): Observable<Array<PendingTransfer>> {
    const queryParameters: HttpQuery = {};

    const headerParameters: HttpHeaders = {};

    return this.request<Array<PendingTransfer>>({
      path: `/pending_transfers`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });
  }

  /**
   * List of all transfers that have not been completed yet for this token
   */
  getPendingTransfersForToken(
    requestParameters: GetPendingTransfersForTokenRequest
  ): Observable<Array<PendingTransfer>> {
    if (
      requestParameters.tokenAddress === null ||
      requestParameters.tokenAddress === undefined
    ) {
      throw new RequiredError(
        "tokenAddress",
        "Required parameter requestParameters.tokenAddress was null or undefined when calling getPendingTransfersForToken."
      );
    }

    const queryParameters: HttpQuery = {};

    const headerParameters: HttpHeaders = {};

    return this.request<Array<PendingTransfer>>({
      path: `/pending_transfers/{token_address}`.replace(
        `{${"token_address"}}`,
        encodeURIComponent(String(requestParameters.tokenAddress))
      ),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });
  }

  /**
   * List of all transfers that have not been completed yet for this token on this channel
   */
  getPendingTransfersForTokenOnChannel(
    requestParameters: GetPendingTransfersForTokenOnChannelRequest
  ): Observable<Array<PendingTransfer>> {
    if (
      requestParameters.tokenAddress === null ||
      requestParameters.tokenAddress === undefined
    ) {
      throw new RequiredError(
        "tokenAddress",
        "Required parameter requestParameters.tokenAddress was null or undefined when calling getPendingTransfersForTokenOnChannel."
      );
    }

    if (
      requestParameters.partnerAddress === null ||
      requestParameters.partnerAddress === undefined
    ) {
      throw new RequiredError(
        "partnerAddress",
        "Required parameter requestParameters.partnerAddress was null or undefined when calling getPendingTransfersForTokenOnChannel."
      );
    }

    const queryParameters: HttpQuery = {};

    const headerParameters: HttpHeaders = {};

    return this.request<Array<PendingTransfer>>({
      path: `/pending_transfers/{token_address}/{partner_address}`
        .replace(
          `{${"token_address"}}`,
          encodeURIComponent(String(requestParameters.tokenAddress))
        )
        .replace(
          `{${"partner_address"}}`,
          encodeURIComponent(String(requestParameters.partnerAddress))
        ),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });
  }
}
