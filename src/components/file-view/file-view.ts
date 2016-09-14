import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { MinimalNodeEntryEntity } from 'alfresco-js-api';
import { NodeService } from '../../services/node.service';
import { HightlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'alf-file-view',
  template: `
    <div *ngIf="contentUrl && !hasTextContent" [ngSwitch]="mimeType">
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
        <h2 text-center>This document can't be previewed.</h2>
        <pre *ngIf="debug">{{node | json}}</pre>
      </div>
    </div>
    <div *ngIf="hasTextContent">
      <h2 *ngIf="!textContent" text-center>Loading content...</h2>
      <pre *ngIf="textContent" no-margin><code highlight [class]="highlightClass">{{textContent}}</code></pre>
    </div>
  `,
  directives: [HightlightDirective]
})
export class FileViewComponent implements OnInit {

  @Input()
  nodeId: string;

  @Input()
  debug: boolean = false;

  node: MinimalNodeEntryEntity;
  mimeType: string;
  contentUrl: string;

  hasTextContent: boolean = false;
  textContent: string;
  highlightClass: string = 'nohighlight';

  constructor(
    private nodeService: NodeService,
    private http: Http) {
  }

  ngOnInit() {
    this.nodeService
      .getNodeInfo(this.nodeId)
      .then(node => {
        this.node = node;
        if (node && node.content && node.content.mimeType) {
          this.mimeType = node.content.mimeType;
          this.contentUrl = this.nodeService.getContentUrl(this.nodeId);
          if (this.isTextFile(this.mimeType)) {
            this.hasTextContent = true;
            this.highlightClass = this.detectHighlightClass(this.mimeType);
            this.loadTextContent(this.contentUrl);
          }
        }
      });
  }

  private isTextFile(mimeType: string): boolean {
    return [
      'text/plain',
      'text/csv',
      'text/xml',
      'text/html',
      'application/json',
      'application/x-javascript'
    ].indexOf(mimeType) > -1;
  }

  private detectHighlightClass(mimeType: string): string {
    if (mimeType === 'text/plain') {
      return 'nohighlight';
    }
    // allow auto-detection
    return null;
  }

  private loadTextContent(url: string) {
    this.http.get(url).subscribe(
      res => {
        // console.log(res);
        this.textContent = res.text();
      });
  }

}
