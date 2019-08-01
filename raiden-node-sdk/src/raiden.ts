import { Configuration } from "raiden-swagger-sdk";
import { Node } from "./node";

export interface RaidenSwaggerApis {
  node: Node;
}

export class Raiden {
  /**
   * @summary Entrypoint to your raiden node
   */
  public readonly node: Node;

  public static create(config?: Configuration): Raiden {
    const node = Node.create(config);
    return new Raiden({ node });
  }

  public constructor({ node }: RaidenSwaggerApis) {
    this.node = node;
  }
}
