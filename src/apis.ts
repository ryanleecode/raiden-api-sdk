import {
  Configuration as ConfigurationS,
  ConfigurationParameters as ConfigurationParametersS,
  ChannelsApi as ChannelsApiS,
  RaidenNodeApi as RaidenNodeApiS,
  PaymentsApi as PaymentsApiS,
  PendingTransfersApi as PendingTransfersApiS,
  TokensApi as TokensApiS,
  ConnectionsApi as ConnectionsApiS,
} from 'raiden-openapi-sdk';

export interface ConfigurationParameters extends ConfigurationParametersS {}

/**
 * @public
 */
export class Configuration extends ConfigurationS {
  constructor(configuration?: ConfigurationParameters) {
    super(configuration);
  }
}

export class ChannelsApi extends ChannelsApiS {
  constructor(configuration?: Configuration) {
    super(configuration);
  }
}

export class PaymentsApi extends PaymentsApiS {
  constructor(configuration?: Configuration) {
    super(configuration);
  }
}

export class PendingTransfersApi extends PendingTransfersApiS {
  constructor(configuration?: Configuration) {
    super(configuration);
  }
}

export class RaidenNodeApi extends RaidenNodeApiS {
  constructor(configuration?: Configuration) {
    super(configuration);
  }
}

export class TokensApi extends TokensApiS {
  constructor(configuration?: Configuration) {
    super(configuration);
  }
}

export class ConnectionsApi extends ConnectionsApiS {
  constructor(configuration?: Configuration) {
    super(configuration);
  }
}
