import { MinimalNode } from 'alfresco-js-api';
import { CoreEvent } from './core.event';

export class NodeEvent extends CoreEvent<MinimalNode> {

  constructor(node: MinimalNode) {
    super(node);
  }

}
