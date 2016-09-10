import { MinimalNodeEntryEntity } from 'alfresco-js-api';
import { CoreEvent } from './core.event';

export class NodeEvent extends CoreEvent<MinimalNodeEntryEntity> {

  constructor(node: MinimalNodeEntryEntity) {
    super(node);
  }

}
