import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Platform, ActionSheetController, AlertController } from 'ionic-angular';
import { DeletedNodesPagingList, DeletedNodeMinimalEntry } from 'alfresco-js-api';

import { NodeService } from '../../services/node.service';
import { NodeEvent } from '../../events/node.event';

@Component({
  selector: 'alf-trashcan-view',
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
          <p>Deleted on {{node.entry.archivedAt | date:'medium'}}</p>
        </button>
        <button *ngIf="node.entry.isFile" detail-none ion-item (click)="onNodeTapped(node.entry, $event)">
          <ion-avatar item-left>
            <img class="folder-view--node-thumbnail" [src]="getNodeThumbnailUrl(node.entry)">
          </ion-avatar>
          <h2>{{node.entry.name}}</h2>
          <p>Deleted on {{node.entry.archivedAt | date:'medium'}}</p>
        </button>
        <ion-item-options side="right">
          <button light (click)="openNodeActionsMenu(node.entry)">
            <ion-icon name="more"></ion-icon>
          </button>
          <button danger (click)="purgeNode(node.entry)">
            <ion-icon name="trash"></ion-icon>
          </button>
          <button primary (click)="restoreNode(node.entry)">
            <ion-icon name="share-alt"></ion-icon>
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
export class TrashcanViewComponent implements OnInit {

  @Output()
  nodeTapped: EventEmitter<NodeEvent> = new EventEmitter<NodeEvent>();

  @Output()
  error: EventEmitter<any> = new EventEmitter<any>();

  nodeList: DeletedNodesPagingList;

  constructor(private platform: Platform,
              private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private nodeService: NodeService) {
  }

  ngOnInit() {
    this.loadNodes();
  }

  loadNodes() {
    this.nodeService.getDeletedNodes().then(
      page => {
        this.nodeList = page.list;
      },
      error => this.error.emit({ error: error })
    );
  }

  isEmpty(): boolean {
    return this.nodeList && this.nodeList.entries.length === 0;
  }

  onNodeTapped(node: DeletedNodeMinimalEntry, event: any) {
    let nodeEvent = new NodeEvent(node);
    this.nodeTapped.emit(nodeEvent);
  }

  getNodeThumbnailUrl(node: DeletedNodeMinimalEntry): string {
    return this.nodeService.getNodeThumbnailUrl(node);
  }

  showAlert(title: string, text: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  restoreNode(node: DeletedNodeMinimalEntry) {
    if (node && node.id) {
      this.nodeService
        .restoreNode(node.id)
        .then(
          () => {
            this.loadNodes();
            this.showAlert('Trashcan', 'Node was successfuly recovered.');
          },
          error => this.error.emit({ error: error })
        );
    }
  }

  purgeNode(node: DeletedNodeMinimalEntry) {
    if (node && node.id) {
      this.nodeService
        .purgeDeletedNode(node.id)
        .then(
          () => {
            this.loadNodes();
            this.showAlert('Trashcan', 'Node was successfuly deleted.');
          },
          error => this.error.emit({ error: error })
        );
    }
  }

  openNodeActionsMenu(node: DeletedNodeMinimalEntry) {
    let actionSheet = this.actionSheetController.create({
      title: 'Content actions',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => this.purgeNode(node)
        },
        {
          text: 'Recover',
          icon: !this.platform.is('ios') ? 'share-alt' : null,
          handler: () => this.restoreNode(node)
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
