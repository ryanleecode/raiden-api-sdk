import { Configuration } from "raiden-swagger-sdk";
import { Node } from "./node";

export class Raiden {
  private readonly _node: Node;

  constructor(readonly config?: Configuration) {
    this._node = new Node(config);
  }

  /**
   * @summary Entrypoint to your raiden node
   */
  public node(): Node {
    return this._node;
  }
}
