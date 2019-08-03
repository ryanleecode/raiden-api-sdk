import {
  Configuration as ConfigurationS,
  ConfigurationParameters as ConfigurationParametersS,
} from 'raiden-swagger-sdk';

export interface ConfigurationParameters extends ConfigurationParametersS {}

export class Configuration extends ConfigurationS {
  constructor(configuration?: ConfigurationParameters) {
    super(configuration);
  }
}
