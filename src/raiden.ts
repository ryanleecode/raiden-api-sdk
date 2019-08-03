import { Node } from './node';
import { Channels } from './channels';
import { Tokens } from './tokens';
import { PendingTransfers } from './pendingTransfers';
import { TokenNetworks } from './token-networks';
import { Payments } from './payments';
import { Configuration } from './apis';
import snakecaseKeys = require('snakecase-keys');
import camelcaseKeys from 'camelcase-keys';

export interface RaidenSwaggerApis {
  node: Node;
  channels: Channels;
  tokens: Tokens;
  pendingTransfers: PendingTransfers;
  tokenNetworks: TokenNetworks;
  payments: Payments;
}

/**
 * @public
 */
export class Raiden {
  /**
   * Entrypoint to your raiden node
   */
  public readonly node: Node;

  public readonly channels: Channels;

  public readonly tokens: Tokens;

  public readonly pendingTransfers: PendingTransfers;

  public readonly tokenNetworks: TokenNetworks;

  public readonly payments: Payments;

  public static create(config?: Configuration): Raiden {
    const middleware = config ? config.middleware : [];
    middleware.push({
      pre: (ctx) => {
        const { body } = ctx.options;
        if (body) {
          const bodySC = snakecaseKeys(JSON.parse(body as string));
          ctx.options.body = JSON.stringify(bodySC);
        }
        return ctx;
      },
      post: (res) => {
        const { response: body } = res.response;
        res.response.response = camelcaseKeys(body);
        return res.response;
      },
    });
    const newConf: Configuration = new Configuration({
      basePath: config ? config.basePath : undefined,
      username: config ? config.username : undefined,
      password: config ? config.password : undefined,
      apiKey: config ? config.apiKey : undefined,
      accessToken: config ? config.accessToken : undefined,
      middleware,
    });

    const node = Node.create(newConf);
    const channels = Channels.create(newConf);
    const tokens = Tokens.create(newConf);
    const pendingTransfers = PendingTransfers.create(newConf);
    const tokenNetworks = TokenNetworks.create(newConf);
    const payments = Payments.create(newConf);

    return new Raiden({
      node,
      channels,
      tokens,
      pendingTransfers,
      tokenNetworks,
      payments,
    });
  }

  public constructor({
    node,
    channels,
    tokens,
    pendingTransfers,
    tokenNetworks,
    payments,
  }: RaidenSwaggerApis) {
    this.node = node;
    this.channels = channels;
    this.tokens = tokens;
    this.pendingTransfers = pendingTransfers;
    this.tokenNetworks = tokenNetworks;
    this.payments = payments;
  }
}
