import { Configuration } from "raiden-swagger-sdk";
import { Node } from "./node";
import { Channels } from "./channels";

export interface RaidenSwaggerApis {
  node: Node;
  channels: Channels;
}

export class Raiden {
  /**
   * @summary Entrypoint to your raiden node
   */
  public readonly node: Node;

  public readonly channels: Channels;

  public static create(config?: Configuration): Raiden {
    const node = Node.create(config);
    const channels = Channels.create(config);
    return new Raiden({ node, channels });
  }

  public constructor({ node, channels }: RaidenSwaggerApis) {
    this.node = node;
    this.channels = channels;
  }
}
