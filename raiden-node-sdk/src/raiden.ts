import { Configuration } from "raiden-swagger-sdk";
import { Node } from "./node";

export interface RaidenSwaggerApis {
  node: Node;
}

export class Raiden {
  private readonly _node: Node;

  public static create(config?: Configuration): Raiden {
    const node = new Node(config);
    return new Raiden({ node });
  }

  public constructor({ node }: RaidenSwaggerApis) {
    this._node = node;
  }

  /**
   * @summary Entrypoint to your raiden node
   */
  public node(): Node {
    return this._node;
  }
}
