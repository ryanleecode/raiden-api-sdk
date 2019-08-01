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
import { Channel, Errors } from "../models";

export interface GetChannelsRequest {
  tokenAddress: string;
}

export interface GetPartnerChannelRequest {
  tokenAddress: string;
  partnerAddress: string;
}

/**
 * no description
 */
export class ChannelsApi extends BaseAPI {
  /**
   * Get a list of all unsettled channels.
   */
  getChannels(
    requestParameters: GetChannelsRequest
  ): Observable<Array<Channel>> {
    if (
      requestParameters.tokenAddress === null ||
      requestParameters.tokenAddress === undefined
    ) {
      throw new RequiredError(
        "tokenAddress",
        "Required parameter requestParameters.tokenAddress was null or undefined when calling getChannels."
      );
    }

    const queryParameters: HttpQuery = {};

    const headerParameters: HttpHeaders = {};

    return this.request<Array<Channel>>({
      path: `/channels/{token_address}`.replace(
        `{${"token_address"}}`,
        encodeURIComponent(String(requestParameters.tokenAddress))
      ),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });
  }

  /**
   * The channel is specified by the address of the token and the partner’s address.
   * Query information about one of your channels.
   */
  getPartnerChannel(
    requestParameters: GetPartnerChannelRequest
  ): Observable<Channel> {
    if (
      requestParameters.tokenAddress === null ||
      requestParameters.tokenAddress === undefined
    ) {
      throw new RequiredError(
        "tokenAddress",
        "Required parameter requestParameters.tokenAddress was null or undefined when calling getPartnerChannel."
      );
    }

    if (
      requestParameters.partnerAddress === null ||
      requestParameters.partnerAddress === undefined
    ) {
      throw new RequiredError(
        "partnerAddress",
        "Required parameter requestParameters.partnerAddress was null or undefined when calling getPartnerChannel."
      );
    }

    const queryParameters: HttpQuery = {};

    const headerParameters: HttpHeaders = {};

    return this.request<Channel>({
      path: `/channels/{token_address}/{partner_address}`
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
