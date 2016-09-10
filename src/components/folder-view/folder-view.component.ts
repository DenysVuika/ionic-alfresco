import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Platform, ActionSheetController } from 'ionic-angular';
import { NodePagingList, MinimalNodeEntryEntity } from 'alfresco-js-api';

import { NodeService } from '../../services/node.service';
import { NodeEvent } from '../../events/node.event';
import { NodePagingEvent } from '../../events/node-paging.event';

@Component({
  selector: 'alf-folder-view',
  template: `
    <div *ngIf="isEmpty()">
      <h2 text-center>No content</h2>
    </div>

    <ion-list *ngIf="nodeList" class="folder-view">
      <ion-item-sliding *ngFor="let node of nodeList.entries">
        <button *ngIf="node.entry.isFolder" ion-item (click)="onNodeTapped(node.entry, $event)">
          <ion-avatar item-left>
            <img class="folder-view--node-thumbnail" [src]="getNodeThumbnailUrl(node.entry)">
          </ion-avatar>
          <h2>{{node.entry.name}}</h2>
          <p>{{node.entry.createdAt | date:'medium'}}</p>
        </button>
        <button *ngIf="node.entry.isFile" detail-none ion-item (click)="onNodeTapped(node.entry, $event)">
          <ion-avatar item-left>
            <img class="folder-view--node-thumbnail" [src]="getNodeThumbnailUrl(node.entry)">
          </ion-avatar>
          <h2>{{node.entry.name}}</h2>
          <p>{{node.entry.createdAt | date:'medium'}}</p>
        </button>
        <ion-item-options side="right">
          <button primary (click)="openNodeActionsMenu()">
            <ion-icon name="more"></ion-icon>
          </button>
          <button danger>
            <ion-icon name="trash"></ion-icon>
          </button>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
  `,
  styles: [`
    .folder-view--node-thumbnail {
      width: 100%;
      height: 100%;
    }
  `]
})
export class FolderViewComponent implements OnInit {

  private ROOT_FOLDER_ID: string = '-root-';

  @Input()
  folderId: string;

  @Output()
  nodeTapped: EventEmitter<NodeEvent> = new EventEmitter<NodeEvent>();

  @Output()
  loaded: EventEmitter<NodePagingEvent> = new EventEmitter<NodePagingEvent>();

  @Output()
  error: EventEmitter<any> = new EventEmitter<any>();

  nodeList: NodePagingList;

  constructor(private platform: Platform,
              private actionSheetController: ActionSheetController,
              private nodeService: NodeService) {
  }

  isEmpty(): boolean {
    return this.nodeList && this.nodeList.entries.length === 0;
  }

  ngOnInit() {
    this.nodeService
      .getNodeChildren(this.folderId || this.ROOT_FOLDER_ID)
      .then(
        page => {
          this.nodeList = page.list;
          let e = new NodePagingEvent(page);
          this.loaded.emit(e);
        },
        error => this.error.emit({ error: error })
      );
  }

  onNodeTapped(node: MinimalNodeEntryEntity, event: any) {
    let nodeEvent = new NodeEvent(node);
    this.nodeTapped.emit(nodeEvent);
  }

  getNodeThumbnailUrl(node: MinimalNodeEntryEntity): string {
    return this.nodeService.getNodeThumbnailUrl(node);
  }

  openNodeActionsMenu() {
    let actionSheet = this.actionSheetController.create({
      title: 'Content actions',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
