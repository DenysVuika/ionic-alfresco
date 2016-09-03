import { Component, OnInit, Input } from '@angular/core';
import { MinimalNodeEntryEntity } from 'alfresco-js-api';
import { NodeService } from '../../services/node.service';

@Component({
  selector: 'alf-file-view',
  template: `
    <div *ngIf="contentUrl" [ngSwitch]="mimeType">
      <div *ngSwitchCase="'video/mp4'">
        <video controls autoplay class="video-player">
          <source [src]="contentUrl" type="video/mp4">
        </video>
      </div>
      <div *ngSwitchCase="'image/png'">
        <img [src]="contentUrl">
      </div>
      <div *ngSwitchCase="'image/jpeg'">
        <img [src]="contentUrl">
      </div>
      <div *ngSwitchCase="'image/gif'">
        <img [src]="contentUrl">
      </div>
      <div *ngSwitchDefault>
        <span>Unsupported file type: {{mimeType}}</span>
        <pre *ngIf="debug">{{node | json}}</pre>
      </div>
    </div>
  `
})
export class FileViewComponent implements OnInit {

  @Input()
  nodeId: string;

  @Input()
  debug: boolean = false;

  node: MinimalNodeEntryEntity;
  mimeType: string;
  contentUrl: string;

  constructor(private nodeService: NodeService) {
  }

  ngOnInit() {
    this.nodeService
      .getNodeInfo(this.nodeId)
      .then(node => {
        this.node = node;
        if (node && node.content && node.content.mimeType) {
          this.mimeType = node.content.mimeType;
          this.contentUrl = this.nodeService.getContentUrl(this.nodeId);
        }
      });
  }

}
