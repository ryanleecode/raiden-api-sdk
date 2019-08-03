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

import { Observable } from 'rxjs';
import {
  BaseAPI,
  throwIfRequired,
  HttpHeaders,
  HttpQuery,
  COLLECTION_FORMATS,
} from '../runtime';
import { Errors, PendingTransfer } from '../models';

export interface GetPendingTransfersForTokenRequest {
  token_address: string;
}

export interface GetPendingTransfersForTokenOnChannelRequest {
  token_address: string;
  partner_address: string;
}

/**
 * no description
 */
export class PendingTransfersApi extends BaseAPI {
  /**
   * Returns a list of all transfers that have not been completed yet.
   */
  getPendingTransfers = (): Observable<Array<PendingTransfer>> => {
    const headers: HttpHeaders = {};

    const query: HttpQuery = {};

    return this.request<Array<PendingTransfer>>({
      path: `/pending_transfers`,
      method: 'GET',
      headers,
      query,
    });
  };

  /**
   * List of all transfers that have not been completed yet for this token
   */
  getPendingTransfersForToken = (
    requestParameters: GetPendingTransfersForTokenRequest,
  ): Observable<Array<PendingTransfer>> => {
    throwIfRequired(
      requestParameters,
      'token_address',
      'getPendingTransfersForToken',
    );

    const headers: HttpHeaders = {};

    const query: HttpQuery = {};

    return this.request<Array<PendingTransfer>>({
      path: `/pending_transfers/{token_address}`.replace(
        `{token_address}`,
        encodeURIComponent(String(requestParameters.token_address)),
      ),
      method: 'GET',
      headers,
      query,
    });
  };

  /**
   * List of all transfers that have not been completed yet for this token on this channel
   */
  getPendingTransfersForTokenOnChannel = (
    requestParameters: GetPendingTransfersForTokenOnChannelRequest,
  ): Observable<Array<PendingTransfer>> => {
    throwIfRequired(
      requestParameters,
      'token_address',
      'getPendingTransfersForTokenOnChannel',
    );
    throwIfRequired(
      requestParameters,
      'partner_address',
      'getPendingTransfersForTokenOnChannel',
    );

    const headers: HttpHeaders = {};

    const query: HttpQuery = {};

    return this.request<Array<PendingTransfer>>({
      path: `/pending_transfers/{token_address}/{partner_address}`
        .replace(
          `{token_address}`,
          encodeURIComponent(String(requestParameters.token_address)),
        )
        .replace(
          `{partner_address}`,
          encodeURIComponent(String(requestParameters.partner_address)),
        ),
      method: 'GET',
      headers,
      query,
    });
  };
}
