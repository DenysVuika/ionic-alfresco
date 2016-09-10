import { NodePaging } from 'alfresco-js-api';
import { CoreEvent } from './core.event';

export class NodePagingEvent extends CoreEvent<NodePaging> {

  constructor(page: NodePaging) {
    super(page);
  }

}
