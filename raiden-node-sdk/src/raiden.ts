import { Configuration } from "raiden-swagger-sdk";
import { Node } from "./node";
import { Channels } from "./channels";
import { Tokens } from "./tokens";
import { PendingTransfers } from "./pendingTransfers";

export interface RaidenSwaggerApis {
  node: Node;
  channels: Channels;
  tokens: Tokens;
  pendingTransfers: PendingTransfers;
}

export class Raiden {
  /**
   * @summary Entrypoint to your raiden node
   */
  public readonly node: Node;

  public readonly channels: Channels;

  public readonly tokens: Tokens;

  public readonly pendingTransfers: PendingTransfers;

  public static create(config?: Configuration): Raiden {
    const node = Node.create(config);
    const channels = Channels.create(config);
    const tokens = Tokens.create(config);
    const pendingTransfers = PendingTransfers.create(config);
    return new Raiden({ node, channels, tokens, pendingTransfers });
  }

  public constructor({
    node,
    channels,
    tokens,
    pendingTransfers
  }: RaidenSwaggerApis) {
    this.node = node;
    this.channels = channels;
    this.tokens = tokens;
    this.pendingTransfers = pendingTransfers;
  }
}
